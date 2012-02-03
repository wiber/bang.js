AbstractLibrary = require './abstractLibrary.coffee'

class AbstractSecurity extends AbstractLibrary

  constructor: (server) ->
    super server, ()->
      console.log 'AbstractLibrary.constructor() completed for AbstractSecurity'

    return @


module.exports = AbstractSecurity