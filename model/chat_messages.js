module.exports = {
  init: function(mongoose, callback) {
    var Schema   = mongoose.Schema,
        ObjectId = Schema.ObjectId;
  
    mongoose.model('chat_message', new Schema({
      timestamp:  { type: Date     },
      user_id:    { type: ObjectId, ref: 'users' },
      username:   { type: String   },
      msg:        { type: String   }
    }));
  }
}