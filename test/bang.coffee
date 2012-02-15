require 'coffee-script'

assert = require 'assert'


# start server first
Server = require './../server/Server.coffee'
Server.start()

Server.onReady ()->
  server = Server.getInstance()
  assert server is Server.getInstance(), 'Checking to make sure start created an instance'
  console.log 'Server.onReady'


