Controller = require '../../lib/Controller.coffee'

class Login extends Controller
  constructor: (application, cb) ->
    super application

    @app.post "/bang/login", (req, res) =>
      authCallback = (err, user) ->
        if err
          response =
            success: false
            err: err

          logMessage = "[Server][routes] - bad user/pass for "
          @logger.logMessage logMessage + req.body.username, (err, doc) ->

          res.send response
          return
        response =
          success: true
          data: user

        res.send response

      request =
        username: req.body.username
        password: req.body.password

      @security.authenticate request, authCallback

    cb()

module.exports = Login