AbstractServer = require './abstractServer.coffee'

###
  Server extends abstractServer
  Server will setup necessary components
###
class Server extends AbstractServer
  _instance = undefined

  @getInstance: () ->
    if !_instance
      _instance = new Server ()->
        _instance.start ->
          # Do not allow start to be fired again
          delete _instance.start

          _instance.logger.logMessage '[/server/server.coffee] - server.start() completed', () ->
    else
      return _instance;

  constructor: (cb) ->
    server = @
    super @, () ->
      console.log 'abstractServer.constructor() completed'
      server.app      = server.configureApp();
      server.io       = require('socket.io').listen(server.app)
      server.io.set 'transports', ['websocket', 'xhr-polling']

      server.loadLibraries()

      cb();

    return @;

  start: (cb) ->
    super () ->

    @bang.init @, ()->
      console.log 'server.bang.init() completed'

    @routes.init @

    @io.sockets.on 'connection', @routes.ioStream.addRoutes

    @app.listen @settings.web.port

    port       = @app.address().port
    env        = @app.settings.env
    @logger.logMessage '[Server] - listening on port ' + port + ' in ' + env + ' mode', (err, doc) ->

    cb();
    return @;

  loadLibraries: () ->
    server = @

    @db.init (err) ->
      if err
        console.log err
        process.exit()

    Logger = require './lib/logger'
    @logger = new Logger @, (err) ->
      if err
        console.log err.msg
      console.log 'server.logger = new Logger() completed'

    @logger.init @, (err) ->
      console.log 'server.logger.init() completed'


    Security = require './lib/security.coffee'
    @security = new Security @, () ->
      console.log 'loaded security.coffee'

    delete _instance.loadLibraries

  configureApp: () ->
    redisKey = @settings.web.redisKey

    express = require 'express'
    stylus  = require 'stylus'
    app     = express.createServer()

    app.configure () ->
      app.set 'views', __dirname + '/../client'
      app.set 'view engine', 'jade'
      app.use express.bodyParser()
      app.use express.methodOverride()
      app.use express.cookieParser()
      app.use express.session({ secret: redisKey })
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

module.exports = Server