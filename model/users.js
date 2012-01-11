module.exports = {
  init: function(mongoose, callback) {
    var Schema   = mongoose.Schema,
        ObjectId = Schema.ObjectId;
    
  
    mongoose.model('users', new Schema({
      username:    { type: String },
      description: { type: String },
      email:       { type: String },
      password:    { type: String },
      userHash:    { type: String }
    }));
  }
}