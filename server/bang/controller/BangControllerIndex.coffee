class BangControllerIndex
  constructor: (server, cb) ->
    @app      = server.app
    @logger   = server.logger
    @mongoose = server.mongoose
    @settings = server.settings

    @app.get "/", (req, res) =>
      res.render "index",
        title: "Bang.js"
        settings: @settings
        layout: "index.layout.jade"

    @app.get "/bang", (req, res) =>
      @settings.app = "bang"
      res.render "bang", {
        layout: "bang.layout.jade"
        title: "Bang.js"
        settings: @settings
      }

    @app.get "/bang/:component/read", (req, res) =>
      switch req.params.component
        when "logMessages"
          @logMessages req, res
        when "clients"
          @getClients req, res
        when "users"
          @getUsers req, res
        when "chatMessages"
          @chatMessages req, res
        else
          @logger.logMessage "[Server][Router] Bang READ - unknown request " + req.params.component

    cb()
    return server

  logMessages: (req, res) ->
    @logger.getMessages req.query, (err, response) ->
      res.send response
      return

  chatMessages: (req, res) ->
    chatMessages = @mongoose.model "chat_message"
    chatMessages.count {}, (err, count) =>
      query = chatMessages.find({})
      query.sort("timestamp", -1).populate("user_id", [ "username" ]).limit(req.params.limit).skip(req.params.start)
      query.exec (err, docs) ->
        response =
          results: count
          items: docs

        res.send response

  getClients: (req, res) ->
    clients = @mongoose.model("clients")
    clients.count {}, (err, count) =>
      query = clients.find({})
      query.sort("timestamp", -1).populate("user_id").limit(req.params.limit).skip(req.params.start)
      query.exec (err, docs) ->
        response =
          results: count
          items: docs
          err: err

        res.send response

  getUsers: (req, res) ->
    users = @mongoose.model("users")
    users.count {}, (err, count) =>
      query = users.find({}).limit(req.params.limit).skip(req.params.start)
      query.exec (err, docs) ->
        response =
          results: count
          items: docs

        res.send response
  
module.exports = BangControllerIndex