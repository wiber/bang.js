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

module.exports = IoStream
