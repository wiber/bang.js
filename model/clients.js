module.exports = {
  init: function(bang, callback) {
    var mongoose = bang.mongoose,
        Schema   = mongoose.Schema,
        ObjectId = Schema.ObjectId;
    
  
    mongoose.model('clients', new Schema({
      socket_id:  { type: String   },
      user_id:    { type: ObjectId },
      username:   { type: String   },
      handshake:  { type: String   }
    }));
  }
}