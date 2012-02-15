CoreApplication = require '../lib/CoreApplication.coffee'

class QuankApplication extends CoreApplication
  __appName:    'quank'
  __appVersion: 1.0
  __appPath:    __dirname

  __controllers: [ '/quank' ]

  constructor:  (cb) ->

    super @, ()=> @loadControllers ()=>
      @logger.logMessage '[Server][Quank] - QuankApplication is loaded'
      cb()

      @

  loadControllers: (cb) ->

    @app.get "/quank", (req, res) =>
      @settings.app = "quank"
      res.render "quank", {
      layout: "quank.layout.jade"
      title: "Quank"
      settings: @settings
      }

    cb()

module.exports = QuankApplication