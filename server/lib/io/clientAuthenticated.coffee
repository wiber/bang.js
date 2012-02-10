class ClientAuthenticated
  constructor: (server, cb) ->
    @mongoose = server.db.mongoose
    @ioStream = server.ioStream

    @ioStream.addListener {
      name: "client authenticated",
      fn: @clientAuthenticated
    }

    return @

  clientAuthenticated: (data) =>
    clients = @mongoose.model("clients")
    client = new clients(data)
    client.save (err) =>
      @ioStream.io.sockets.emit "newClient", data

module.exports = ClientAuthenticated