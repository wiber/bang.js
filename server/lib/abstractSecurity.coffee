AbstractLibrary = require './abstractLibrary.coffee'

class AbstractSecurity extends AbstractLibrary

  constructor: (server) ->
    super server, ()->

    return @


module.exports = AbstractSecurity