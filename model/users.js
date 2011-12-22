module.exports = {
  init: function(obj, callback) {
    var mongoose = obj.mongoose,
        Schema   = mongoose.Schema,
        ObjectId = Schema.ObjectId;
    
  
    mongoose.model('users', new Schema({
      username:    { type: String },
      description: { type: String },
      email:       { type: String },
      password:    { type: String }
    }));
  }
}