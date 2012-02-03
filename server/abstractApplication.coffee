Server              = require './server.coffee'

class AbstractApplication
  constructor: (Application, cb)->
    @server   = Server.getInstance()

    @mongoose = @server.mongoose
    @logger   = @server.logger

    fs = require 'fs'
    folder = __dirname + '/' + Application.__appName + '/model'

    fs.readdirSync(folder).forEach (file)=>
      model = require folder + '/' + file
      model.init @mongoose, () =>
        @logger.logMessage '[Server][Bang] - BangApplication loaded ' + file + ' model into mongoose'

    cb()
    return Application

module.exports = AbstractApplication