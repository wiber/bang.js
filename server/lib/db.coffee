class Db

  constructor: (server, cb) ->
    @mongoose = server.mongoose

    server.mongoose.connect server.settings.db.connect, (err) ->
      if err
        cb err

      log_messages = require __dirname + '/../model/log_messages'
      log_messages.init server.mongoose, () ->
        console.log 'Db.constructor loaded log_messages model into mongoose'

      cb()
    return @

  init: (server, cb) ->
    @mongoose.connection.on 'open', () ->
      console.log '[Server][db] - mongoose opened', (err, doc) ->

    @loadSchema server, (err) ->
      if err
        cb err

      console.log '[Server][db] - schemas loaded', (err, doc) ->
      cb()

    return @

  loadSchema: (server, cb) ->
    model = require __dirname + '/../model'
    model.init @mongoose, (err) ->
      if err 
        console.log '[Server][db][model] - ' + err.msg, () ->
    
      console.log '[Server][db][model] - models loaded', () ->
  
    cb()
  
    return @

module.exports = Db
