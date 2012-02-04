AbstractApplication = require '../abstractApplication.coffee'

class BangApplication extends AbstractApplication
  __appName:    'bang'
  __appVersion: 1.0

  __controllers: [ '/bang', '/' ]

  constructor:  (cb) ->

    super @, ()=> @loadController ()=> cb()
    
    return @

  loadController: (cb) ->
    BangController = require './controller/BangController.coffee'
    @controller = new BangController @, () =>
      @logger.logMessage '[Server][Bang] - new BangController() completed'
      cb()

    return @

module.exports = BangApplication