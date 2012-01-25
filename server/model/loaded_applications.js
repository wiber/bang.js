module.exports = {
  init: function(mongoose, callback) {
    var Schema   = mongoose.Schema,
        ObjectId = Schema.ObjectId;
    
  
    mongoose.model('loaded_applications', new Schema({
      user_id: { type: ObjectId },
      js:      { type: String   }
    }));
  }
}