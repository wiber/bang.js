db =

  init: (server, cb) ->
    server.mongoose.connect server.settings.db.connect, (err) ->
      if err
        cb err
  
    server.mongoose.connection.on 'open', () ->
      server.logger.logMessage '[Server][db] - mongoose opened', (err, doc) ->
  
    db.loadSchema server, (err) ->
      if err
        cb err

      server.logger.logMessage '[Server][db] - schemas loaded', (err, doc) ->
      cb()
  
    return db

  loadSchema: (server, cb) ->
    model = require __dirname + '/../model'
    model.init server.mongoose, (err) ->
      if err 
        server.logger.logMessage '[Server][db][model] - ' + err.msg, () ->
    
      server.logger.logMessage '[Server][db][model] - models loaded', () ->
  
    cb()
  
    return db

module.exports = db
