class Controller
  constructor: (application)->
    @application = application

    server = application.server

    @app      = server.app
    @logger   = server.logger
    @mongoose = server.db.mongoose
    @settings = server.settings
    @security = server.security
    @io       = server.io

    return @

module.exports = Controller