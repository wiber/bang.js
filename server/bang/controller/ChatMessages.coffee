Controller = require '../../lib/Controller.coffee'

class ChatMessages extends Controller
  constructor: (application, cb) ->
    super application

    @app.get "/bang/chatMessages/read", (req, res) =>
      @chatMessages req, res

    cb()

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

module.exports = ChatMessages
