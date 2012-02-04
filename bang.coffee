###
  Bang.js

  Bang.js is a work in progress.

  GPL 3.0

  Author Mike Kunze
###
require "iced-coffee-script"

Server = require './server/server.coffee'

module.exports = Server.start()
