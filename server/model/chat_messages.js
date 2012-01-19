var chat_messages = {}

chat_messages.init = function(mongoose) {
  chat_messages.loadModule(mongoose);
}

chat_messages.loadModule = function(mongoose) {
  var Schema   = mongoose.Schema,
      ObjectId = Schema.ObjectId;
  
  mongoose.model('chat_message', new Schema({
    timestamp:  { type: Date     },
    user_id:    { type: ObjectId, ref: 'users' },
    username:   { type: String   },
    msg:        { type: String   }
  }));
};

module.exports = chat_messages;