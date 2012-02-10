CoreApplication = require '../lib/CoreApplication.coffee'

class MobileApplication extends CoreApplication
  __appName:    'mobile'
  __appVersion: 1.0
  __appPath:    __dirname

  __controllers: [ '/mobile' ]

  constructor:  (cb) ->

    super @, ()=> @loadControllers ()=>
      @logger.logMessage '[Server][DocExplorer] - DocExplorerApplication is loaded'
      cb()

      @

  loadControllers: (cb) ->

    @app.get "/mobile", (req, res) =>
      @settings.app = "mobile"
      res.render "mobile", {
      layout: "mobileApplication.layout.jade"
      title: "Mobile"
      settings: @settings
      }

    cb()

module.exports = MobileApplication