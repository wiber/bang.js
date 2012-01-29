###
  Bang.js

  Bang.js is a work in progress.

  GPL 3.0

  Author Mike Kunze
###
require "iced-coffee-script"

Server = require './server/index.coffee'

server = new Server ()->
  server.logger.logMessage '[/server/index.coffee] - server.configure.() completed', () ->

  server.start ->
    server.logger.logMessage '[/server/index.coffee] - server.start() completed', () ->
  
module.exports = server
