class DefaultRoutes
  constructor: () ->
    @post     = require './post'
    @ioStream = require './ioStream'

    return @

  init: (server, cb) ->

    @ioStream.init server
    @post.init server

    cb()

    return @


module.exports = DefaultRoutes