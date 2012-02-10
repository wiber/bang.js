class CoreLibrary

  constructor: (server, cb) ->
    @server = server
    @settings = server.settings

    cb()

module.exports = CoreLibrary