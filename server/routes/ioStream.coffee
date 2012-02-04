ioStream = {}
ioStream.init = (server) ->
  ioStream.mongoose = server.db.mongoose
  ioStream.logger = server.logger
  ioStream.io = server.io
  ioStream.security = server.security
  ioStream

ioStream.addRoutes = (socket) ->
  ioStream.socket = socket
  console.log "socket_id: " + socket.id + " has connected"
  socket.emit "connection received",
    timestamp: Date.now()
    socket_id: socket.id

  socket.on "update handshake", ioStream.updateHandshake
  socket.on "client authenticated", ioStream.clientAuthenticated
  socket.on "disconnect", ioStream.disconnect

ioStream.updateHandshake = (data) ->
  security = ioStream.security
  logger = ioStream.logger
  mongoose = ioStream.mongoose
  crypto = security.crypto
  hash = crypto.createHash("sha256")
  hash.update data.handshake + Date.now() + data.user_id
  newHandshake = hash.digest("hex")
  clients = mongoose.model("clients")
  query =
    socket_id: data.old_socket_id
    handshake: data.handshake

  console.log query
  clients.findOne query, (err, doc) ->
    console.log doc
    if doc
      doc.handshake = newHandshake
      doc.timestamp = Date.now()
      doc.socket_id = data.new_socket_id
      doc.save (err) ->
        logger.logMessage err, ->
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
    ioStream.io.sockets.emit "newClient"
    ioStream.socket.emit "update handshake",
      handshake: newHandshake
      socket_id: ioStream.socket.id

ioStream.disconnect = ->
  clients = ioStream.mongoose.model("clients")
  clients.findOne {socket_id: ioStream.socket.id}, (err, doc) ->
    return  if err
    return  unless doc
    console.log doc
    doc.remove()
    ioStream.io.sockets.emit "newClient", {}
    console.log ioStream.socket.id + ".sid disconnected "

ioStream.clientAuthenticated = (data) ->
  clients = ioStream.mongoose.model("clients")
  client = new clients(data)
  client.save (err) ->
    ioStream.io.sockets.emit "newClient", data

module.exports = ioStream
