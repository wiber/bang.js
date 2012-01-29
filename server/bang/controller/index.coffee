bangControllerIndex =

  init: (bangIndex, server, cb) ->
  
    bangIndex.controller.logMessages = require './logMessages' 
    
    bangIndex.controller.logMessages.init server, () ->
      console.log 'server.bang.controller.logMessages.init() completed'
      cb()
  
    return server
  
module.exports = bangControllerIndex;