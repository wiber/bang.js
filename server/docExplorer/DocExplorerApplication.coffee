CoreApplication = require '../lib/CoreApplication.coffee'

class DocExplorerApplication extends CoreApplication
  __appName:    'docExplorer'
  __appVersion: 1.0
  __appPath:    __dirname

  __controllers: [ '/docExplorer' ]

  constructor:  (cb) ->

    super @, ()=> @loadControllers ()=>
      @logger.logMessage '[Server][DocExplorer] - DocExplorerApplication is loaded'
      cb()

      @

  loadControllers: (cb) ->

    @app.get "/DocExplorer", (req, res) =>
      @settings.app = "DocExplorerApplication"
      res.render "DocExplorerApplication", {
      layout: "DocExplorerApplication.layout.jade"
      title: "DocExplorerApplication"
      settings: @settings
      }

    cb()

module.exports = DocExplorerApplication