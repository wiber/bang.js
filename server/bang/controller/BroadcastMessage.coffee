Controller = require '../../lib/Controller.coffee'

class BroadcastMessage extends Controller
  constructor: (application, cb) ->
    super application

    @app.post "/bang/broadcastMessage", (req, res) =>
      response =
        success: true
        message: req.body.message

      @io.sockets.emit "broadcastMessage",
        message: req.body.message

      @logger.logMessage "[Server][broadcastMessage] - " + req.body.message

      res.send response

    return @

module.exports = BroadcastMessage