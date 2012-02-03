class DefaultRoutes
  constructor: () ->
    @post     = require './post'
    @put      = require './put'
    @ioStream = require './ioStream'

    return @

  init: (server, cb) ->

    @ioStream.init server

    @post.init server
    @put.init server

    cb()

    return @


module.exports = DefaultRoutes