class Disconnect
  constructor: (server, cb) ->
    @logger   = server.logger
    @ioStream = server.ioStream
    @mongoose = server.db.mongoose

    @ioStream.addListener {
      name: "disconnect",
      fn: @disconnect
    }

    return @

  disconnect: () =>
    clients = @mongoose.model("clients")
    clients.findOne {socket_id: @ioStream.socket.id}, (err, doc) =>
      return  if err
      return  unless doc
      console.log doc
      doc.remove()
      @ioStream.io.sockets.emit "newClient", {}
      @logger.logMessage @ioStream.socket.id + ".sid disconnected "

module.exports = Disconnect