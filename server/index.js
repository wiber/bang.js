var server = {};

/**
 * server.configure will do the most important server configurations
 * this must be run before server.start()
 *
 * @param {Function} cb callback takes no params
 */
server.configure = function(cb) {


  server.mongoose = require('mongoose');
  server.settings = require('./settings');
  
  // Require Apps
  server.bang     = require('./bang');

  // Require Default Routes
  server.routes   = require('./routes');
  
  // Configure server web engine and socket.io
  server.app      = server.configureApp();
  server.io       = require('socket.io').listen(server.app);
  server.io.set('transports', ['websocket', 'xhr-polling']);

  // Load server libraries: security, db, logger, etc
  server.loadLibraries();
  
  cb();
  return server;
};

/**
 * start will bootup the server
 */
server.start = function(cb) {
  /**
   * add the routes
   */
  server.bang.init(server, function() {
    console.log('server.bang.init() completed');
  });
  
  server.routes.init(server);

  // Socket.io
  server.io.sockets.on('connection', server.routes.ioStream.addRoutes);

  /**
   * listen on the web Port
   */
  server.app.listen(server.settings.web.port);
  server.logger.logMessage('[Server] - listening on port ' 
    + server.app.address().port + ' in ' 
    + server.app.settings.env   + ' mode', function(err, doc) {});

  cb();
  return server;
};

server.loadLibraries = function() {
  var settings = server.settings;
  
  server.logger   = require('./lib/logger');
  server.security = require('./lib/security');
  server.db       = require('./lib/db');
  
  /**
   * start up the database.  The logger is currently an async dependency of db,
   * thus why its loaded in here
   */
  server.db.init(server, function(err) {
    if(err) {
      console.log(err);
      process.exit();
    }
  
    /**
     * Initialize the logger.  init[obj, callback]
     * callback takes a function(err)
     */
    server.logger.extend(server).init(function(err) {
      if(err) {
        console.log(err.msg);
      process.exit();
      }
    
    });  

  });
    
  /**
   * start up security
   */
  server.security.extend(server).init(function(err) {
    if(err) {
      server.logger.logMessage(err.msg);
      console.log('security failed - exiting...');
      process.exit();
    }
  });  
  
  /**
   * This is needed once the server already has the libraries loaded
   * @todo - expand on this.  Maybe we want to add additional libraries at runtime
   */
  server.loadLibraries = function() {
    return { msg: 'libraries have already been loaded' };
  };
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
    
    // Setup bang's client repo of static JS files
    // @todo - refine this
    // @todo - minify static JS
    app.use('/client/bang/controller', express.static(__dirname + '/../client/bang/controller'));
    app.use('/client/bang/model',      express.static(__dirname + '/../client/bang/model'));
    app.use('/client/bang/store',      express.static(__dirname + '/../client/bang/store'));
    app.use('/client/bang/view',       express.static(__dirname + '/../client/bang/view'));
            
    // Core static routes
    app.use('/extjs',  express.static(__dirname + '/../client/extjs'));
    app.use('/img',    express.static(__dirname + '/../client/img'));
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