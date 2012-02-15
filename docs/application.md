#### Creating an application

##### ExampleApplication.coffee
    CoreApplication = require '../lib/CoreApplication.coffee'
    
    class ExampleApplication extends CoreApplication
      __appName:    'example'
      __appVersion: 1.0
      __appPath:    __dirname
    
      __controllers: [ '/example' ]
    
      constructor:  (cb) ->
    
        super @, ()=> @loadControllers ()=>
          @logger.logMessage '[Server][Example] - ExampleApplication is loaded'
          cb()
    
          @
    
      loadControllers: (cb) ->
    
        @app.get "/example", (req, res) =>
          @settings.app = "example"
          res.render "example", {
          layout: "example.layout.jade"
          title: "Example"
          settings: @settings
          }
    
        cb()
    
    module.exports = ExampleApplication