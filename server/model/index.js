var model = {};

model.init = function(mongoose, cb) {
  
  var fs = require('fs');
  
  fs.readdirSync(__dirname).forEach(function(file) {
    
    if(!(file === "index.js" || file === "log_messages.js")) {
      console.log('[Server][Model] - loading model from ' + file);
      require('./' + file).init(mongoose);
    }
  });

  cb();
};

module.exports = model;