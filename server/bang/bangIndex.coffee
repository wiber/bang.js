class BangIndex

  constructor: () ->
    return @

  init: (server, cb) ->

    BangControllerIndex = require './controller/BangControllerIndex.coffee'
    @controller = new BangControllerIndex()
    @controller.init server, () ->
      console.log 'server.bang.controller.init() completed'

    BangModelIndex = require './model/BangModelIndex.coffee'
    @model = new BangModelIndex()
    @model.init server, () ->
      console.log 'server.bang.model.init() completed'

    cb()
    
    return @

module.exports = BangIndex