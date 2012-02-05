class IoStream
  constructor: (server) ->
    @__listeners = []

    @mongoose = server.db.mongoose
    @logger   = server.logger
    @io       = server.io
    @security = server.security

    return @

  addListener: (listener) ->
    @logger.logMessage '[Server][Socket.io] - adding ' + listener.name + ' socket listener'
    @__listeners.push(listener)

    return @

  addAllRoutesOnConnect: (socket) =>
    @logger.logMessage "socket_id: " + socket.id + " has connected"
    @socket = socket

    socket.emit "connection received",
      timestamp: Date.now()
      socket_id: socket.id

    @__listeners.forEach (listener) =>
      socket.on listener.name, listener.fn

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
      @io.sockets.emit "newClient"
      @socket.emit "update handshake",
        handshake: newHandshake
        socket_id: @socket.id

  clientAuthenticated: (data) =>
    clients = @mongoose.model("clients")
    client = new clients(data)
    client.save (err) =>
      @io.sockets.emit "newClient", data

  disconnect: () =>
    clients = @mongoose.model("clients")
    clients.findOne {socket_id: @socket.id}, (err, doc) =>
      return  if err
      return  unless doc
      console.log doc
      doc.remove()
      @io.sockets.emit "newClient", {}
      @logger.logMessage @socket.id + ".sid disconnected "

module.exports = IoStream
