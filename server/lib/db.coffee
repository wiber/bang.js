AbstractDb = require './abstractDb.coffee'

class Db extends AbstractDb

  constructor: (server, cb) ->
    super server, ()->
      cb()

    return @

module.exports = Db
