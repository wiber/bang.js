Controller = require '../../lib/Controller.coffee'

class BangController extends Controller
  constructor: (Application, cb) ->
    super Application

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
          @logger.logMessage "[Server][Bang] GET Bang -s unknown request " + req.params.component

    cb()
    return Application.server

  # GET '/bang/logMessages/read'
  logMessages: (req, res) ->
    @logger.getMessages req.query, (err, response) ->
      res.send response
      return

  # GET '/bang/chatMessages/read'
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

  # GET '/bang/clients/read'
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

  # GET '/bang/users/read'
  getUsers: (req, res) ->
    users = @mongoose.model("users")
    users.count {}, (err, count) =>
      query = users.find({}).limit(req.params.limit).skip(req.params.start)
      query.exec (err, docs) ->
        response =
          results: count
          items: docs

        res.send response
  
module.exports = BangController