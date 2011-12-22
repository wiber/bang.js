module.exports = {
  init: function(obj, callback) {
    var mongoose = obj.mongoose;
    var Schema   = mongoose.Schema,
        ObjectId = Schema.ObjectId;
    
    mongoose.model('logmessages', new Schema({
      date:      { type: Date   },
      timestamp: { time: Number },
      message:   { type: String }
    }));
  }
}