module.exports = {
  init: function(bang, callback) {
    var mongoose = bang.mongoose,
        Schema   = mongoose.Schema,
        ObjectId = Schema.ObjectId;
    
  
    mongoose.model('loaded_applications', new Schema({
      user_id: { type: ObjectId },
      js:      { type: String   }
    }));
  }
}