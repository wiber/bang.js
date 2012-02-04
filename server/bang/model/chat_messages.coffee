CoreModel = require '../../lib/CoreModel.coffee'

class ChatMessagesModel extends CoreModel
  constructor: (mongoose, cb) ->
    super mongoose

    @init ()=>
      cb()

    return @

  init: (cb)->
    Schema = @mongoose.Schema
    ObjectId = Schema.ObjectId
    @mongoose.model "chat_message", new Schema(
      timestamp:
        type: Date

      user_id:
        type: ObjectId
        ref: "users"

      username:
        type: String

      msg:
        type: String
    )
    cb()

module.exports = ChatMessagesModel
