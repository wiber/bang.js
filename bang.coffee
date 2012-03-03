###
  Bang.js

  Bang.js is a work in progress.

  GPL 3.0

  Author Mike Kunze
###
require "coffee-script"

Server = require './server/Server.coffee'

Server.onReady () ->
  console.log 'bang.js ready'

module.exports = Server.start()


