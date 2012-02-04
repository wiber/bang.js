class Controller
  constructor: (Application)->
    server    = Application.server

    @app      = server.app
    @logger   = server.logger
    @mongoose = server.mongoose
    @settings = server.settings

    return @
3444
module.exports = Controller