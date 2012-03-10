class CoreServer
  @__onReady = () ->
    return @

  ###
    AbstractServer::getInstance will obtain our server instance

    @param {Object} Server Class

    @return {Object} Server instance
  ###
  _instance = undefined
  @getInstance: (Server, cb) ->
    if !_instance
      _instance = new Server ()->
        _instance.start ->
          # Do not allow start to be fired again
          delete _instance.start

          cb(null, _instance)
          return _instance
    else
      return _instance

  ###
    AbstractServer's constructor boots up the logger and db

    @param {Object} server instance
    @param {Function} cb callback

    @return {Object} server
  ###
  constructor: (server, cb) ->
    @settings = require '../settings'

    Db = require './Db.coffee'
    @db = new Db server, () =>

      # logger depends on db
      Logger = require './logger.coffee'
      @logger = new Logger server, ()=>

      cb()

    return server

  ###
    AbstractServer start currently doesnt do anything special
  ###
  start: (cb) -> cb()


module.exports = CoreServer