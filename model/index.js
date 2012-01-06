var model = {};

model.init = function(bang, cb) {
  
  require('./users').init(bang);
  require('./log_messages').init(bang);
  require('./clients').init(bang);
  require('./loaded_applications').init(bang);
  
  cb();
};

module.exports = model;