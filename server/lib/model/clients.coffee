CoreModel = require '../CoreModel.coffee'

class ClientsModel extends CoreModel
  constructor: (mongoose, cb) ->
    super mongoose

    @init () =>
      cb()

    return @

  init: (cb) ->
    Schema = @mongoose.Schema
    ObjectId = Schema.ObjectId
    @mongoose.model "clients", new Schema(
      timestamp:
        type: Date

      socket_id:
        type: String

      user_id:
        type: ObjectId
        ref: "users"

      username:
        type: String

      handshake:
        type: String
    )
    cb()

module.exports = ClientsModel

