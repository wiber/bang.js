AbstractApplication = require '../abstractApplication.coffee'

class BangApplication extends AbstractApplication

  constructor: () ->
    super()
    return @

  init: (server, cb) ->
    @mongoose = server.mongoose

    BangControllerIndex = require './controller/BangControllerIndex.coffee'
    @controller = new BangControllerIndex()
    @controller.init server, () ->
      console.log 'server.bang.controller.init() completed'

    fs = require 'fs'
    fs.readdirSync(__dirname + '/model').forEach (file)=>
      model = require __dirname + '/model/' + file
      model.init @mongoose, () ->
        console.log 'BangApplication loaded ' + file + ' model into mongoose'

    cb()
    
    return @

module.exports = BangApplication