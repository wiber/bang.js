Server     = require './server.coffee'
Controller = require './lib/Controller.coffee'

class AbstractApplication
  constructor: (application, cb)->
    @server   = Server.getInstance()

    @settings = @server.settings
    @app      = @server.app
    @mongoose = @server.mongoose
    @logger   = @server.logger

    fs = require 'fs'
    modelDir = __dirname + '/' + application.__appName + '/model'

    fs.readdirSync(modelDir).forEach (file)=>
      model = require modelDir + '/' + file
      model.init @mongoose, () =>
        @logger.logMessage '[Server][Bang] - BangApplication loaded ' + file + ' model into mongoose'

    controllerDir = __dirname + '/' + application.__appName + '/controller'
    fs.readdirSync(controllerDir).forEach (file)=>
      Controller = require controllerDir + '/' + file
      controller = new Controller application, ()=>
        @logger.logMessage '[Server][Bang] - BangApplication loaded' + file + ' controller into app'

    cb()
    return application

module.exports = AbstractApplication