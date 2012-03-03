CoreServer  = require './lib/CoreServer.coffee'
###
  Server extends abstractServer
  Server will setup necessary components
###
class Server extends CoreServer
  __applications: [
    './bang/bangApplication.coffee'
    './boom/boomApplication.coffee'
    './docExplorer/DocExplorerApplication.coffee'
    './mobile/MobileApplication.coffee'
    './quank/QuankApplication.coffee'
  ]

  @onReady:     (fn) -> @__onReady = fn
  @start:       ()   -> return Server.getInstance()
  @getInstance: ()   -> return super Server

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
    fs = require 'fs'

    IoStream = require './lib/IoStream.coffee'
    @ioStream = new IoStream @

    fs = require 'fs'
    fs.readdirSync(__dirname + '/lib/io').forEach (file)=>
      Io = require __dirname + '/lib/io/' + file
      new Io @

    super () =>
      @loadApplications()
      @io.sockets.on 'connection', @ioStream.addAllRoutesOnConnect

    @port = @settings.web.port
    @app.listen @port

    @logger.logMessage '[Server] - listening on port ' + @port + ' in ' + @app.settings.env + ' mode'

    Server.__onReady()

    cb()
    return @

  loadIo: () ->


  loadApplications: () ->
    @__applications.forEach (app) =>
      App = require app
      new App ()=>
        @logger.logMessage '[Server] - initialized ' + app + '\n'

  loadLibraries: () ->
    Security = require './lib/Security.coffee'
    @security = new Security @, () =>
      # security loaded

    delete @loadLibraries

  configureApp: () ->
    express = require 'express'
    stylus  = require 'stylus'
    app     = express.createServer()

    redisKey = @settings.web.redisKey
    @redisStore = new (require('connect-redis')(express))

    app.configure () =>
      app.set 'views', __dirname + '/../client'
      app.set 'view engine', 'jade'
      app.use express.bodyParser()
      app.use express.methodOverride()
      app.use express.cookieParser()
      app.use express.session({ secret: redisKey, store: @redisStore })
      app.use stylus.middleware({
      src: __dirname + '/../client/css',
      dest: __dirname + '/../client/public',
      compile: (str, path) ->
        return stylus(str)
          .set('filename', path)
          .set('compress', true)
      })

      app.use app.router

      # These are for application bang's client side ExtJS MVC environment
      app.use '/client/bang/controller', express.static __dirname + '/../client/bang/controller'
      app.use '/client/bang/model',      express.static __dirname + '/../client/bang/model'
      app.use '/client/bang/store',      express.static __dirname + '/../client/bang/store'
      app.use '/client/bang/view',       express.static __dirname + '/../client/bang/view'

      # Define client lib routes
      app.use '/lib',           express.static __dirname + '/../client/lib'
      app.use '/lib/extjs',     express.static __dirname + '/../client/lib/extjs'
      app.use '/lib/touch',     express.static __dirname + '/../client/lib/touch'
      app.use '/lib/bootstrap', express.static __dirname + '/../client/lib/bootstrap'

      app.use '/img', express.static __dirname + '/../client/img'

      app.use express.static __dirname + '/../client/public'

    app.configure 'development', () ->
      app.use express.errorHandler({ dumpExceptions: true, showStack: true })

    app.configure 'production', () ->
      app.use express.errorHandler()

    return app

module.exports = Server
