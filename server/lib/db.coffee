MongoDb = require './MongoDb.coffee'

class Db extends MongoDb

  constructor: (server, cb) ->
    super server, ()->
      cb()

    return @



module.exports = Db
