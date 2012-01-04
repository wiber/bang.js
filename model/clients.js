module.exports = {
  init: function(bang, callback) {
    var mongoose = bang.mongoose,
        Schema   = mongoose.Schema,
        ObjectId = Schema.ObjectId;
    
  
    mongoose.model('clients', new Schema({
      session_id: { type: String   },
      socket_id:  { type: String   },
      user_id:    { type: ObjectId },
      username:   { type: String   }
    }));
  }
}