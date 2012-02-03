class BangControllerIndex
  constructor: () ->
    return @

  init: (server, cb) ->
    @app = server.app
    @settings = server.settings

    @app.get "/bang", (req, res) =>
      @settings.app = "bang"
      res.render "bang", {
        layout: "bang.layout.jade"
        title: "Bang.js"
        settings: @settings
      }

    cb()
    return server
  
module.exports = BangControllerIndex