AbstractLibrary = require './abstractLibrary.coffee'

class AbstractSecurity extends AbstractLibrary

  constructor: () ->
    super ()->
      console.log 'AbstractLibrary.constructor() completed for AbstractSecurity'

    return @


module.exports = AbstractSecurity