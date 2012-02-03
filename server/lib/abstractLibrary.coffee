class AbstractLibrary

  constructor: (server, cb) ->
    @server = server
    @mongoose = server.mongoose
    @settings = server.settings

    cb()

module.exports = AbstractLibrary