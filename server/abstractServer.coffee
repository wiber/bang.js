class AbstractServer
  _instance = undefined

  @getInstance: (Server) ->
    if !_instance
      _instance = new Server ()->
        _instance.start ->
          # Do not allow start to be fired again
          delete _instance.start

          _instance.logger.logMessage '[/server/server.coffee] - server.start() completed', () ->

          return _instance
    else
      return _instance;

  constructor: (server, cb) ->
    @mongoose = require 'mongoose'
    @settings = require './settings'
    @bang     = require './bang'
    @routes   = require './routes'

    Db = require './lib/db.coffee'
    @db = new Db server, (err) ->
      if err
        console.log err
        process.exit()

      console.log 'abstractServer.db = new Db()'
      cb()

    return server

  start: (cb) ->
    console.log '[/server/abstractServer.coffee] - abstractServer.start()'
    cb()


module.exports = AbstractServer