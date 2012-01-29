class abstractServer

  constructor: (cb) ->
    @mongoose = require 'mongoose'
    @settings = require './settings'
    @bang     = require './bang'
    @routes   = require './routes'
    @security = require './lib/security'

    server = @

    Db = require './lib/db.coffee'
    @db = new Db @, () ->
      console.log 'abstractServer.db = new Db()'
      server.loadLogger()
      console.log 'abstractServer.constructor() - **** HELLO WORLD WE HAVE LIFT OFF ******'
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