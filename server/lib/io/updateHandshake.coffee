class UpdateHandshake
  constructor: (server, cb) ->
    @security = server.security
    @mongoose = server.db.mongoose
    @ioStream = server.ioStream
    @logger   = server.logger

    @ioStream.addListener {
      name: "update handshake",
      fn: @updateHandshake
    }

    return @

  updateHandshake: (data) =>

    crypto = @security.crypto
    hash = crypto.createHash("sha256")
    hash.update data.handshake + Date.now() + data.user_id
    newHandshake = hash.digest("hex")
    clients = @mongoose.model("clients")
    query =
      socket_id: data.old_socket_id
      handshake: data.handshake

    @logger.logMessage query
    clients.findOne query, (err, doc) =>
      console.log doc
      if doc
        doc.handshake = newHandshake
        doc.timestamp = Date.now()
        doc.socket_id = data.new_socket_id
        doc.save (err) =>
          @logger.logMessage err, ->
            if err
              console.log err
      else
        client = new clients(
          handshake: newHandshake
          timestamp: Date.now()
          socket_id: data.new_socket_id
          username: data.username
        )
        client.save (err) ->
          console.log "failed to create new client"  if err
      @ioStream.io.sockets.emit "newClient"
      @ioStream.socket.emit "update handshake",
        handshake: newHandshake
        socket_id: @ioStream.socket.id

module.exports = UpdateHandshake