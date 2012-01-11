var model = {};

model.init = function(mongoose, cb) {
  
  require('./users').init(mongoose);
  require('./log_messages').init(mongoose);
  require('./clients').init(mongoose);
  require('./loaded_applications').init(mongoose);
  
  cb();
};

module.exports = model;