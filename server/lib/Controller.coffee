class Controller
  constructor: (application)->
    server    = application.server

    @app      = server.app
    @logger   = server.logger
    @mongoose = server.mongoose
    @settings = server.settings

    return @

module.exports = Controller