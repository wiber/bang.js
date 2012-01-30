class AbstractDb

  constructor: (server, cb) ->
    @server   = server
    @mongoose = server.mongoose
    @settings = server.settings

    cb()
    return @;

module.exports = AbstractDb

