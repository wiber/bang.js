/**
 * Bang.js
 *
 * Author: Mike Kunze
 * GPL 3.0
 *
 * Module dependencies.
 */
var express  = require('express')
  , mongoose = require('mongoose')
  , stylus   = require('stylus')
  , settings = require('./settings')
  , lib      = require('./lib')
  , routes   = require('./routes');

// Startup libraries
var logger   = lib.logger;
var db       = lib.db;
var security = lib.security;

/**
 * Initialize the logger.  init[obj, callback]
 * callback takes a function(err)
 */
logger.init({ 
  settings: settings ,
  mongoose: mongoose
}, function(err) {
  if(err) {
    console.log(err.msg);
  }
});

/**
 * start up the database
 */
db.init({ 
  mongoose: mongoose, 
  logger:   logger, 
  settings: settings
}, function(err) {
  if(err) {
    logger.logMessage(err.msg, function(err, doc) {});
  }
});

/**
 * start up security
 *
 */
security.init({ 
  logger: logger, 
  settings: settings,
  mongoose: mongoose
}, function(err) {
  if(err) {
    logger.logMessage(err.msg);
    console.log(err.msg);
  }
});

/**
 * start up the app server
 * 
 */
var app = module.exports = express.createServer();
var io  = require('socket.io').listen(app);

io.set('transports', ['websocket', 'xhr-polling']);

app.configure(function(){
  app.set('views', __dirname + '/client');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: settings.web.redisKey }));
  app.use(stylus.middleware({
    src: __dirname + '/client/css',
    dest: __dirname + '/client/public',
    compile: function(str, path) {
      return stylus(str)
        .set('filename', path)
        .set('compress', true);
    }
  }));
  app.use(app.router);
  app.use('/extjs', express.static(__dirname + '/client/extjs'));
  app.use('/img',   express.static(__dirname + '/client/img'));
  app.use(express.static(__dirname + '/client/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

/**
 * add the routes
 */
routes.init({
  mongoose: mongoose,
  logger:   lib.logger,
  settings: settings,
  app:      app
});

// Socket.io
io.sockets.on('connection', function(socket) {
  console.log('socket_id: '  + socket.id + ' has connected');
  
  socket.emit('connection received', {
    timestamp: Date.now(),
    socket_id: socket.id
  });
  
  socket.on('client authenticated', function(data) {
    console.log(data.username + '@' + data.socket_id + ' authenticated, store socket in mongo');
  });
  
  socket.on('disconnect', function() {
    console.log(socket.id + '.sid disconnected ');
  });
});

/**
 * listen on the web Port
 */
app.listen(settings.web.port);
logger.logMessage('[Server] - listening on port ' + app.address().port + ' in ' + app.settings.env + ' mode', function(err, doc) {});
