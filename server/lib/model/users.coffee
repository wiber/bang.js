CoreModel = require '../CoreModel.coffee'

class UsersModel extends CoreModel
  constructor: (mongoose, cb) ->
    super mongoose

    @init () =>
      cb()

    return @

  init: (cb) ->
    Schema = @mongoose.Schema
    ObjectId = Schema.ObjectId
    @mongoose.model "users", new Schema(
      username:
        type: String

      description:
        type: String

      email:
        type: String

      password:
        type: String

      userHash:
        type: String
    )
    cb()

module.exports = UsersModel