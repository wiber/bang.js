class AbstractLibrary

  constructor: (server, cb) ->
    @server = server
    @settings = server.settings

    cb()

module.exports = AbstractLibrary