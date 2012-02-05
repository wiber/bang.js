AbstractApplication = require '../lib/abstractApplication.coffee'

class DocExplorerApplication extends AbstractApplication
  __appName:    'boom'
  __appVersion: 1.0
  __appPath:    __dirname

  __controllers: [ '/DocExplorer' ]

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