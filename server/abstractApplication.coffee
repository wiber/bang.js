Server              = require './server.coffee'

class AbstractApplication
  constructor: (Application, cb)->
    @server   = Server.getInstance()

    @mongoose = @server.mongoose
    @logger   = @server.logger

    fs = require 'fs'
    modelDir = __dirname + '/' + Application.__appName + '/model'

    fs.readdirSync(modelDir).forEach (file)=>
      model = require modelDir + '/' + file
      model.init @mongoose, () =>
        @logger.logMessage '[Server][Bang] - BangApplication loaded ' + file + ' model into mongoose'

    cb()
    return Application

module.exports = AbstractApplication