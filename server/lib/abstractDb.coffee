AbstractLibrary = require './abstractLibrary.coffee'

class AbstractDb extends AbstractLibrary

  constructor: (server, cb) ->
    super server, ()->

    @mongoose.connect @settings.db.connect, (err) =>
      if err
        console.log err
        process.exit()

      fs = require 'fs'
      fs.readdirSync(__dirname + '/model').forEach (file)=>
        model = require __dirname + '/model/' + file
        model.init @mongoose, () ->

      cb()

    return @

module.exports = AbstractDb

