module.exports =
  post:     require './post'
  get:      require './get'
  put:      require './put'
  ioStream: require './ioStream'
  
  init: (server) ->
  
    @ioStream.init server

    @post.init server
    @get.init server
    @put.init server