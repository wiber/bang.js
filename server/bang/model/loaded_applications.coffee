CoreModel = require '../../lib/CoreModel.coffee'

class LoadedApplicationsModel extends CoreModel
  constructor: (mongoose, cb) ->
    super mongoose

    @init ()=>
      cb()

    return @

  init: (cb)->
    Schema = @mongoose.Schema
    ObjectId = Schema.ObjectId
    @mongoose.model "loaded_applications", new Schema(
      user_id:
        type: ObjectId

      js:
        type: String
    )
    cb()

module.exports = LoadedApplicationsModel