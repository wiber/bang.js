Controller = require '../../lib/Controller.coffee'

class Clients extends Controller
  constructor: (application, cb) ->
    super application

    @app.get "/bang/clients/read", (req, res) =>
      @getClients req, res

    cb()

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

module.exports = Clients