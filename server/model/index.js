var model = {};

model.init = function(mongoose, cb) {
  console.log('load dynamically in server/model/index.js for models');
  require('./users').init(mongoose);
  require('./log_messages').init(mongoose);
  require('./clients').init(mongoose);
  require('./loaded_applications').init(mongoose);
  require('./chat_messages').init(mongoose);
  
  cb();
};

module.exports = model;