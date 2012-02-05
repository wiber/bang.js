class Controller
  constructor: (application)->

    @application = application

    @server = application.server

    @app      = @server.app
    @logger   = @server.logger
    @mongoose = @server.db.mongoose
    @settings = @server.settings
    @security = @server.security
    @io       = @server.io

    return @

  verifyHandshake: (security, cb)->
    authHandshake =
      username: security.userHash
      handshake: security.handshake

    @security.authenticateHandshake authHandshake, (err, user) =>
      if err
        cb(err, user)
      else
        cb(undefined, user)


module.exports = Controller