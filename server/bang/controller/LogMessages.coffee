Controller = require '../../lib/Controller.coffee'

class LogMessages extends Controller
  constructor: (application, cb) ->
    super application

    @app.get "/bang/logMessages/read", (req, res) =>
      @logMessages req, res

    cb()

  # GET '/bang/logMessages/read'
  logMessages: (req, res) ->
    @logger.getMessages req.query, (err, response) ->
      res.send response
      return

module.exports = LogMessages