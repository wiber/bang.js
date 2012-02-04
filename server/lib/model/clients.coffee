module.exports = init: (mongoose, callback) ->
  Schema = mongoose.Schema
  ObjectId = Schema.ObjectId
  mongoose.model "clients", new Schema(
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
  callback()
