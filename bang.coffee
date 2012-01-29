###
  Bang.js

  Bang.js is a work in progress.

  GPL 3.0

  Author Mike Kunze
###
require "iced-coffee-script"

Server = require './server/index.coffee'

server = new Server ()->
  console.log 'server.configure.() completed'

  server.start ->
    console.log 'server.start() completed'
  
module.exports = server
