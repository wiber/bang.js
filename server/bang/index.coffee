bangIndex =
  controller: require './controller'
  model:      require './model'
  init: (server, cb) ->

    @controller.init bangIndex, server, () ->
      console.log 'server.bang.controller.init() completed'
  
    @model.init bangIndex, server, () ->
      console.log 'server.bang.model.init() completed'

    cb()
    
    return bangIndex

module.exports = bangIndex