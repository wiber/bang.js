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
        console.log err
        process.exit()

      console.log '[Server][db] - mongoose opened'

      fs = require 'fs'
      fs.readdirSync(__dirname + '/model').forEach (file)=>
        model = require __dirname + '/model/' + file
        model.init @mongoose, () ->
          console.log 'Db.constructor loaded ' + file + ' model into mongoose'

      cb()

    return @;

module.exports = AbstractDb

