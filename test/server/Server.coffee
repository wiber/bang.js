vows   = require 'vows'
assert = require 'assert'
Server = require process.cwd() + '/server/Server'

vows
  .describe('Server').addBatch
    'when we start the webserver':
      topic: ->
        return Server.start()

      'we get a server instance returned': (serverInstance) ->
        assert.equal Server.getInstance(), serverInstance

  .export(module)
