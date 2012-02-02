AbstractDb = require './abstractDb.coffee'

class Db extends AbstractDb

  constructor: (server, cb) ->
    super server, ()->
      console.log 'AbstractDb.constructor()'
      cb()

    return @

module.exports = Db
