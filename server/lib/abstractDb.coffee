AbstractLibrary = require './abstractLibrary.coffee'

class AbstractDb extends AbstractLibrary

  constructor: (server, cb) ->
    super ()->
      console.log 'AbstractLibrary.constructor() completed for AbstractDB'

    @server   = server
    @mongoose = server.mongoose
    @settings = server.settings

    @mongoose.connect @settings.db.connect, (err) =>
      if err
        cb err
        return

      console.log '[Server][db] - mongoose opened'

      log_messages = require __dirname + '/model/log_messages'
      log_messages.init @mongoose, () ->
        console.log 'Db.constructor loaded log_messages model into mongoose'

      users = require __dirname + '/model/users'
      users.init @mongoose, () ->
        console.log 'Db.constructor loaded users model into mongoose'

      clients = require __dirname + '/model/clients'
      clients.init @mongoose, () ->
        console.log 'Db.constructor loaded clients model into mongoose'

      cb()

    return @;

module.exports = AbstractDb

