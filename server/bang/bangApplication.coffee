AbstractApplication = require '../lib/abstractApplication.coffee'

class BangApplication extends AbstractApplication
  __appName:    'bang'
  __appVersion: 1.0
  __appPath:    __dirname

  __controllers: [ '/bang', '/' ]

  constructor:  (cb) ->

    super @, ()=> @loadControllers ()=>
      @logger.logMessage '[Server][Bang] - BangApplication is loaded'
      cb()

      @

  loadControllers: (cb) ->

    @app.get "/", (req, res) =>
      res.render "index",
        title: "Bang.js"
        settings: @settings
        layout: "index.layout.jade"

    @app.get "/bang", (req, res) =>
      @settings.app = "bang"
      res.render "bang", {
        layout: "bang.layout.jade"
        title: "Bang.js"
        settings: @settings
      }

    cb()

module.exports = BangApplication