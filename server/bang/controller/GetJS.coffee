Controller = require '../../lib/Controller.coffee'

class GetJS extends Controller
  constructor: (application, cb) ->
    super application

    @app.post "/bang/getJS", (req, res) =>

      if req.body instanceof Array
        response = new Array()
        async = require("async")
        fs = require("fs")
        iterator = (item, cb) =>
          @rpc item, (data) ->
            response.push data
            cb()

        async.forEach req.body, iterator, (err) =>
          res.send response
      else
        @rpc req.body, (data) ->
          res.send data

  rpc: (request, cb) ->
    switch request.method
      when "getJS"
        remoteClient = request.data[0].remoteClient
        app = request.data[0].app
        js = request.data[0].js
        if remoteClient
          message = "[Server][getJS] - remote execution sent to " + remoteClient
          @logger.logMessage message + remoteClient

          @io.sockets.socket(remoteClient).emit "loadJs",
            js: js

          cb
            tid: request.tid
            type: request.type
            action: request.action
            method: request.method
            result: "(function(){ Ext.Msg.alert('Remote Exec', 'Executed...') })()"

          return
        require("fs").readFile @settings.path + "/client/" + app + "/" + js, "utf8", (err, data) ->
          response =
            tid: request.tid
            type: request.type
            action: request.action
            method: request.method
            result: data
            err: err

          cb response
      when "logMessage"
        data = request.data[0]
        @logger.logMessage data, (err, doc) ->
          console.log err  if err
          request.result = doc
          cb request
      when "broadcastMessage"
        data = request.data[0]
        if data.remoteClient
          @logger.logMessage "[Server][broadcastMessage][" + data.remoteClient + "] - " + data

          @io.sockets.socket(data.remoteClient).emit "broadcastMessage",
            message: data.msg
        else
          @io.sockets.emit "broadcastMessage",
            message: data.msg

          @logger.logMessage "[Server][broadcastMessage] - " + data.msg
        request.result = data.msg
        cb request
      when "chatMessage"
        data = request.data[0]
        if not data.msg or not data.security.handshake
          @logger.logMessage "[Server][chatMessage] - missing arguments"

          delete (request.data)

          cb request
          return
        response =
          tid: request.tid
          type: request.type
          action: request.action
          method: request.method

        authHandshake =
          username: data.security.userHash
          handshake: data.security.handshake

        @security.authenticateHandshake authHandshake, (err, user) =>
          if err
            response.err = err.msg
            @logger.logMessage "bad handshake " + data.security.username

            cb response
          else
            if data.msg
              message = "[Server][chatMessage][" + data.security.username + "] - " + data.msg
              @logger.logMessage message

              chatMessageObject =
                msg: data.msg
                username: data.security.username
                user_id: data.security.user_id
                timestamp: Date.now()

              chatMessages = @mongoose.model("chat_message")
              chatMessage = new chatMessages(chatMessageObject)
              chatMessage.save (err) =>
                @io.sockets.emit "newChatMessage", chatMessageObject

              response.result = data.msg
              cb response
      else
        @logger.logMessage "unknown method '" + request.method + "' called from " + request.action

module.exports = GetJS