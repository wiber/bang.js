AbstractApplication = require '../abstractApplication.coffee'

class BangApplication extends AbstractApplication

  constructor:  (server, cb) ->

    super server

    BangControllerIndex = require './controller/BangControllerIndex.coffee'
    @controller = new BangControllerIndex()
    @controller.init server, () =>
      @logger.logMessage '[Server][Bang] - server.bang.controller.init() completed'

    fs = require 'fs'
    fs.readdirSync(__dirname + '/model').forEach (file)=>
      model = require __dirname + '/model/' + file
      model.init @mongoose, () =>
        @logger.logMessage '[Server][bang] - BangApplication loaded ' + file + ' model into mongoose'

    cb()
    
    return @

module.exports = BangApplication