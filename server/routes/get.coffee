get = {}
get.logMessages = (logger, req, res) ->
  logger.getMessages req.query, (err, response) ->
    res.send response
    return

get.chatMessages = (mongoose, req, res) ->
  chatMessages = mongoose.model("chat_message")
  chatMessages.count {}, (err, count) ->
    query = chatMessages.find({})
    query.sort("timestamp", -1).populate("user_id", [ "username" ]).limit(req.params.limit).skip req.params.start
    query.exec (err, docs) ->
      response =
        results: count
        items: docs

      res.send response

get.getClients = (mongoose, req, res) ->
  clients = mongoose.model("clients")
  clients.count {}, (err, count) ->
    query = clients.find({})
    query.sort("timestamp", -1).populate("user_id").limit(req.params.limit).skip req.params.start
    query.exec (err, docs) ->
      response =
        results: count
        items: docs

      res.send response

get.getUsers = (mongoose, req, res) ->
  users = mongoose.model("users")
  users.count {}, (err, count) ->
    query = users.find({}).limit(req.params.limit).skip(req.params.start)
    query.exec (err, docs) ->
      response =
        results: count
        items: docs

      res.send response

get.init = (bang) ->
  app = bang.app
  logger = bang.logger
  settings = bang.settings
  mongoose = bang.mongoose
  logger.logMessage "[Server][routes] - Mapping Gets", (err, doc) ->

  app.get "/", (req, res) ->
    res.render "index",
      title: "Bang.js"
      settings: settings
      layout: "index.layout.jade"


  app.get "/:app/:component/read", (req, res) ->
    switch req.params.app
      when "bang"
        switch req.params.component
          when "logMessages"
            get.logMessages logger, req, res
          when "clients"
            get.getClients mongoose, req, res
          when "users"
            get.getUsers mongoose, req, res
          when "chatMessages"
            get.chatMessages mongoose, req, res
          else
            logger.logMessage "[Server][Router] Bang READ - unknown request " + req.params.component, (err, doc) ->
      else
        logger.logMessage "unknown app " + req.params.app, (err, doc) ->

module.exports = get
