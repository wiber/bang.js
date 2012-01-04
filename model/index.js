var model = {};

model.init = function(bang, cb) {
  
  require('./users').init(bang);
  require('./logMessages').init(bang);
  require('./clients').init(bang);
  
  cb();
};

module.exports = model;