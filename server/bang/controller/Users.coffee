Controller = require '../../lib/Controller.coffee'

class Users extends Controller
  constructor: (application, cb) ->
    super application

    @app.get "/bang/users/read", (req, res) =>
      @getUsers req, res

    cb()


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

module.exports = Users
