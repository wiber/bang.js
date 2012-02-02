class AbstractServer

  ###
    AbstractServer::getInstance will obtain our server instance

    @param {Object} Server Class

    @return {Object} Server instance
  ###
  _instance = undefined
  @getInstance: (Server) ->
    if !_instance
      _instance = new Server ()->
        _instance.start ->
          # Do not allow start to be fired again
          delete _instance.start

          return _instance
    else
      return _instance

  ###
    AbstractServer's constructor loads necessary libraries and boots the db

    @param {Object} server instance
    @param {Function} cb callback

    @return {Object} server
  ###
  constructor: (server, cb) ->
    @mongoose = require 'mongoose'
    @settings = require './settings'
    @routes   = require './routes'

    Db = require './lib/db.coffee'
    @db = new Db server, () ->

      console.log 'abstractServer.db = new Db()'
      cb()

    return server

  ###
    AbstractServer start currently doesnt do anything special
  ###
  start: (cb) ->
    cb()


module.exports = AbstractServer