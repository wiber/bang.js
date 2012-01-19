var server = {};

/**
 * start will bootup the server
 */
server.start = function() {

  server.mongoose = require('mongoose');
  server.settings = require('./settings');
  
  var routes   = require('./routes'); 


  var app = server.configureApp();
  server.io  = require('socket.io').listen(app);

  server.loadLibraries();


  /**
   * start up the app and io services
   * 
   */
  server.io.set('transports', ['websocket', 'xhr-polling']);

  /**
   * add the routes
   */
  routes.init({
    mongoose: server.mongoose,
    logger:   server.logger,
    settings: server.settings,
    security: server.security,
    app:      app,
    io:       server.io
  });

  // Socket.io
  server.io.sockets.on('connection', routes.ioStream.addRoutes);

  /**
   * listen on the web Port
   */
  app.listen(server.settings.web.port);
  server.logger.logMessage('[Server] - listening on port ' + app.address().port + ' in ' + app.settings.env + ' mode', function(err, doc) {});



  console.log('find apps in ./server');
};

server.loadLibraries = function() {
  var settings = server.settings;
  
  server.logger   = require('./lib/logger');
  server.security = require('./lib/security');
  server.db       = require('./lib/db');
  
  /**
   * start up the database
   */
  server.db.extend({ 
    mongoose: server.mongoose, 
    logger:   server.logger, 
    settings: server.settings
  })
  .init(function(err) {
    if(err) {
      console.log(err);
      process.exit();
    }
  
  
  /**
   * Initialize the logger.  init[obj, callback]
   * callback takes a function(err)
   */
  server.logger.extend({ 
    settings: server.settings,
    mongoose: server.mongoose,
    io:       server.io
  })
  .init(function(err) {
    if(err) {
      console.log(err.msg);
      process.exit();
    }
    
  });    
  

  });
    

   

  /**
   * start up security
   *
   */
  server.security.extend({ 
    logger:   server.logger, 
    settings: server.settings,
    mongoose: server.mongoose
  })
  .init(function(err) {
    if(err) {
      server.logger.logMessage(err.msg);
      console.log('security failed - exiting...');
      process.exit();
    }
  });  
};

/**
 * configureApp 
 * @param {Object} settings bang's settings object, see /server/settings/index.js
 */
server.configureApp = function() {
  var settings = server.settings;
  
  var express = require('express'),
      stylus  = require('stylus'),
      app     = express.createServer();

  app.configure(function(){
    app.set('views', __dirname + '/../client');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: settings.web.redisKey }));
    app.use(stylus.middleware({
      src: __dirname + '/../client/css',
      dest: __dirname + '/../client/public',
      compile: function(str, path) {
        return stylus(str)
          .set('filename', path)
          .set('compress', true);
      }
    }));
    app.use(app.router);
    app.use('/extjs', express.static(__dirname + '/../client/extjs'));
    app.use('/img',   express.static(__dirname + '/../client/img'));
    app.use(express.static(__dirname + '/../client/public'));
  });

  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  });

  app.configure('production', function(){
    app.use(express.errorHandler()); 
  });
  
  return app;
};

module.exports = server;