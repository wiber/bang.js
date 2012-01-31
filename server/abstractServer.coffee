class abstractServer

  constructor: (cb) ->
    @mongoose = require 'mongoose'
    @settings = require './settings'
    @bang     = require './bang'
    @routes   = require './routes'
    @security = require './lib/security'

    server = @

    Db = require './lib/db.coffee'
    @db = new Db @, (err) ->
      if err
        console.log err
        process.exit()
        
      console.log 'abstractServer.db = new Db()'
      server.loadLogger()
      console.log 'abstractServer.constructor() - DB loaded, kicked off logger'
      cb()

  loadLogger: () ->
    Logger = require './lib/logger'
    @logger = new Logger @, (err) ->
      if err
        console.log err.msg
        process.exit();

      console.log('abstractServer.logger = new Logger()')

  start: (cb) ->
    console.log '[/server/abstractServer.coffee] - abstractServer.start()'
    cb()


module.exports = abstractServer