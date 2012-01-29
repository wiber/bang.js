server = 
  configure: (cb) ->
    server.mongoose = require 'mongoose'
    server.settings = require './settings'
  
    server.bang     = require './bang'

    server.routes   = require './routes'
  
    server.app      = server.configureApp();
    server.io       = require('socket.io').listen(server.app)
    server.io.set 'transports', ['websocket', 'xhr-polling']

    server.loadLibraries();
  
    cb();
    return server;

  start: (cb) ->
    server.bang.init server, ()->
      console.log 'server.bang.init() completed'

    server.routes.init server 

    server.io.sockets.on 'connection', server.routes.ioStream.addRoutes

    server.app.listen server.settings.web.port 
    
    logMessage = server.logger.logMessage
    port       = server.app.address().port
    env        = server.app.settings.env
    logMessage '[Server] - listening on port ' + port + ' in ' + env + ' mode', (err, doc) ->

    cb();
    return server;


  loadLibraries: () ->
    settings = server.settings
  
    server.logger   = require './lib/logger' 
    server.security = require './lib/security' 
    server.db       = require './lib/db' 
   
    server.db.init server, (err) ->
      if err 
        console.log(err) 
        process.exit() 
  
      server.logger.extend server 
      server.logger.init (err) ->
        if err 
          console.log err.msg 
          process.exit();  

    server.security.extend server 
    server.security.init (err) ->
      if err
        server.logger.logMessage err.msg
        console.log 'security failed - exiting...'
        process.exit()
          
    server.loadLibraries = () ->
      return msg: 'libraries have already been loaded'



  configureApp: () ->
    settings = server.settings
  
    express = require 'express'
    stylus  = require 'stylus'
    app     = express.createServer()

    app.configure () ->
      app.set 'views', __dirname + '/../client' 
      app.set 'view engine', 'jade' 
      app.use express.bodyParser()  
      app.use express.methodOverride() 
      app.use express.cookieParser() 
      app.use express.session({ secret: settings.web.redisKey })
      app.use stylus.middleware({
        src: __dirname + '/../client/css',
        dest: __dirname + '/../client/public',
        compile: (str, path) ->
          return stylus(str)
            .set('filename', path)
            .set('compress', true);
      })
      
      app.use app.router
    
      app.use '/client/bang/controller', express.static __dirname + '/../client/bang/controller' 
      app.use '/client/bang/model',      express.static __dirname + '/../client/bang/model' 
      app.use '/client/bang/store',      express.static __dirname + '/../client/bang/store' 
      app.use '/client/bang/view',       express.static __dirname + '/../client/bang/view' 

      app.use '/extjs',  express.static __dirname + '/../client/extjs'
      app.use '/img',    express.static __dirname + '/../client/img'
      app.use express.static __dirname + '/../client/public'

    app.configure 'development', () ->
      app.use express.errorHandler({ dumpExceptions: true, showStack: true })

    app.configure 'production', () ->
      app.use express.errorHandler()
      
    return app;

module.exports = server