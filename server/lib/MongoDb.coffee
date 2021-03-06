CoreLibrary = require './CoreLibrary.coffee'

# extends CoreLibrary?
class MongoDb extends CoreLibrary

  constructor: (server, cb) ->
    super server, ()=>

    @mongoose = require 'mongoose'
    @mongoose.connect @settings.db.connect, (err) =>
      if err
        console.log err
        process.exit()

      fs = require 'fs'
      fs.readdirSync(__dirname + '/model').forEach (file)=>
        Model = require __dirname + '/model/' + file
        new Model @mongoose, () ->
          #model is loaded, or err

      cb()

    return @

module.exports = MongoDb