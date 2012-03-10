Server = require process.cwd() + '/server/Server'

class TestServer extends Server
  constructor:  (cb) ->
    super(cb)

  @start:       () -> return TestServer.getInstance()
  @getInstance: () -> return super TestServer

module.exports = TestServer