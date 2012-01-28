var bangControllerIndex = {};

bangControllerIndex.init = function(bangIndex, server, cb) {
  
  bangIndex.controller.logMessages = require('./logMessages').init(server, function() {
    console.log('server.bang.controller.logMessages.init() completed');
    cb();
  });
  
  return server;
};

module.exports = bangControllerIndex;