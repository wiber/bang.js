CoreLibrary = require './CoreLibrary.coffee'

class AbstractSecurity extends CoreLibrary

  constructor: (server) ->
    super server, ()->

    return @


module.exports = AbstractSecurity