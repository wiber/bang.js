CoreServer = require './lib/CoreServer.coffee'

###
  Server extends abstractServer
  Server will setup necessary components
###
class Server extends CoreServer
  Server: Server

  @start: () ->
    return Server.getInstance()

  @getInstance: () ->
    return super Server

  constructor: (cb) ->
    super @, () =>
      @logger.logMessage '[Server] new db() completed'
      @logger.logMessage '[Server] new logger() completed'

      @app      = @configureApp();
      @io       = require('socket.io').listen(@app)
      @io.set 'transports', ['websocket', 'xhr-polling']

      @loadLibraries()

      cb();

    return @

  start: (cb) ->
    super () => @loadApplications()

    @port = @settings.web.port
    @app.listen @port

    @logger.logMessage '[Server] - listening on port ' + @port + ' in ' + @app.settings.env + ' mode'

    cb();
    return @

  loadApplications: () ->
    BangApplication = require './bang/bangApplication.coffee'
    @bang = new BangApplication ()=>
      @logger.logMessage '[Server][Bang] - new BangApplication() completed'

    ioStream = require './routes/ioStream.coffee'
    ioStream.init @

    @io.sockets.on 'connection', ioStream.addRoutes

  loadLibraries: () ->
    Security = require './lib/security.coffee'
    @security = new Security @, () =>
      @logger.logMessage '[Server][Security] - new Security() completed'

    delete Server.getInstance().loadLibraries

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
          .set('compress', true)
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

    return app

module.exports = Server