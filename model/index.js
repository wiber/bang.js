var model = {};

model.init = function(obj, cb) {
  
  require('./users').init(obj);   
  require('./logMessages').init(obj);
  
  cb();
};

module.exports = model;