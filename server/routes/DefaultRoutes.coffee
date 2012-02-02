class DefaultRoutes
  constructor: () ->
    @post     = require './post'
    @get      = require './get'
    @put      = require './put'
    @ioStream = require './ioStream'

    return @

  init: (server, cb) ->

    @ioStream.init server

    @post.init server
    @get.init server
    @put.init server

    cb()

    return @


module.exports = DefaultRoutes