class abstractServer

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


module.exports = abstractServer