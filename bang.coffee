###
  Bang.js

  Bang.js is a work in progress.

  GPL 3.0

  Author Mike Kunze
###
require "iced-coffee-script"

Server = require './server/index.coffee'

server = Server.getServer()


module.exports = server