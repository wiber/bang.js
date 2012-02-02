AbstractSecurity = require './abstractSecurity.coffee'

class Security extends AbstractSecurity

  constructor: (server, cb) ->

    super
    
    @server   = server
    @mongoose = server.mongoose
    @crypto   = require('crypto')

    @clearClients(Security.mongoose)

    cb()

    return @;

  clearClients: () ->
    clients = @mongoose.model 'clients'
    clients.find {}, (err, docs) ->
      docs.forEach (doc) ->
        doc.remove()

    return @;

  authenticateHandshake: (request, cb) ->
    clients = @mongoose.model 'clients'

    search =
      userHash:  request.username
      handshake: request.handshake

    clients.findOne search, (err, client) ->
      if err
        cb(err)
        return

      if !client
        cb { msg: 'invalid handshake' }
        return

      response =
        username:  client.username
        user_id:   client.user_id
        handshake: client.handshake

      cb undefined, response

    return @;

  authenticate: (request, cb) ->
    users  = @mongoose.model 'users'
    crypto = @crypto
    hash   =  crypto.createHash 'sha256'

    search =
      userHash: request.username
      password: request.password

    users.findOne search, (err, user) ->
      if err
        cb err
        return

      if !user
        cb { msg: 'incorrect user/pass combination' }
        return

      hash.update user.password + Date.now().toString()
      handshake = hash.digest('hex')

      response =
        username:  user.username
        user_id:   user._id
        handshake: handshake

      cb(undefined, response)

    return @;

module.exports = Security