vows   = require 'vows'
assert = require 'assert'
Server = require './server/Server'



exports.testServerBootsUpSuccessfully = vows.describe('Server').addBatch
  'when we start the webserver':
    topic: ->
      Server.start @callback
      undefined
  
    'we get a server instance returned': (err, serverInstance) ->
      assert.isNull err
      assert.equal Server.getInstance(), serverInstance
