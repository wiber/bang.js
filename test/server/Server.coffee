Server = require process.cwd() + '/server/Server'

class TestServer extends Server
  constructor:  (cb) ->
    super(cb)

    return @

  @start: (cb)->
    serverInstance = TestServer.getInstance()
    cb(null, serverInstance)

  @getInstance: () -> return super TestServer

module.exports = TestServer