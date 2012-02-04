CoreModel = require '../CoreModel.coffee'

class LogMessagesModel extends CoreModel
  constructor: (mongoose, cb) ->
    super mongoose

    @init () =>
      cb()

    return @

  init: (cb) ->
    Schema = @mongoose.Schema
    ObjectId = Schema.ObjectId
    @mongoose.model "log_messages", new Schema(
      date:
        type: Date

      timestamp:
        type: Number

      message:
        type: String
    )
    cb()


module.exports = LogMessagesModel
