class DefaultRoutes
  constructor: () ->
    @ioStream = require './ioStream'

    return @

  init: (server, cb) ->

    @ioStream.init server

    cb()

    return @


module.exports = DefaultRoutes