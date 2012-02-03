AbstractApplication = require '../abstractApplication.coffee'

class BangApplication extends AbstractApplication
  __appName:    'bang'
  __appVersion: 1.0

  constructor:  (server, cb) ->
    @server = server

    super @, ()=>

      BangControllerIndex = require './controller/BangControllerIndex.coffee'
      @controller = new BangControllerIndex server, () =>
        @logger.logMessage '[Server][Bang] - server.bang.controller.init() completed'

      cb()
    
    return @

module.exports = BangApplication