CoreApplication = require '../lib/CoreApplication.coffee'

class BoomApplication extends CoreApplication
  __appName:    'boom'
  __appVersion: 1.0
  __appPath:    __dirname

  __controllers: [ '/boom' ]

  constructor:  (cb) ->

    super @, ()=> @loadControllers ()=>
      @logger.logMessage '[Server][Boom] - BoomApplication is loaded'
      cb()

      @

  loadControllers: (cb) ->

    @app.get "/boom", (req, res) =>
      @settings.app = "bang"
      res.render "boom", {
      layout: "boom.layout.jade"
      title: "Boom.js"
      settings: @settings
      }

    cb()

module.exports = BoomApplication