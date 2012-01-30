AbstractDb = require './abstractDb.coffee'

class Db extends AbstractDb

  constructor: (server, cb) ->
    super server, ()->
      console.log 'AbstractDb.constructor()'

    @mongoose.connect @settings.db.connect, (err) ->
      if err
        cb err

      console.log '[Server][db] - mongoose opened'

      log_messages = require __dirname + '/../model/log_messages'
      log_messages.init server.mongoose, () ->
        console.log 'Db.constructor loaded log_messages model into mongoose'

      cb()
    return @;

  init: (cb) ->

    @loadSchema (err) ->
      if err
        cb err

      console.log '[Server][db] - schemas loaded'
      cb()

    return @;


  loadSchema: (cb) ->
    server = @server
    model = require __dirname + '/../model'
    model.init @mongoose, (err) ->
      if err 
        console.log '[Server][db][model] - ' + err.msg
    
      console.log '[Server][db][model] - models loaded'
  
    cb()
  
    return @

module.exports = Db
