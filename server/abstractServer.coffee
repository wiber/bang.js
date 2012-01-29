class abstractServer

  constructor: () ->
    @mongoose = require 'mongoose'
    @settings = require './settings'
    @bang     = require './bang'
    @routes   = require './routes'
    @logger   = require './lib/logger'
    @security = require './lib/security'
    @db       = require './lib/db.coffee'

    console.log 'abstractServer.constructor() - **** HELLO WORLD WE HAVE LIFT OFF ******'

module.exports = abstractServer