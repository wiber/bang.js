#!/usr/bin/env coffee

require 'coffee-script'
###
  Bang.js

  Bang.js is a work in progress.

  GPL 3.0

  Author Mike Kunze
###
Server = require '../server/Server.coffee'

Server.onReady () ->
  console.log 'bang.js ready'

Server.start (serverInstance)->
  module.exports = serverInstance
