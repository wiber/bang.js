Server = require process.cwd() + '/server/Server'

class TestServer extends Server
  constructor:  (cb) ->
    super(cb)

    return @

  @start: (cb)->
    return TestServer.getInstance(cb)

  @getInstance: (cb) -> return super(cb)

module.exports = TestServer