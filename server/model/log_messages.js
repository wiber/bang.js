module.exports = {
  init: function(mongoose, callback) {
    var Schema   = mongoose.Schema,
        ObjectId = Schema.ObjectId;
    
    mongoose.model('log_messages', new Schema({
      date:      { type: Date   },
      timestamp: { time: Number },
      message:   { type: String }
    }));
  }
}