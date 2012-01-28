var bangIndex = {
  controller: require('./controller'),
  model:      require('./model')
};

bangIndex.init = function(server, cb) {

  bangIndex.controller.init(bangIndex, server, function() {
    console.log('server.bang.controller.init() completed');
  });
  
  bangIndex.model.init(bangIndex, server, function() {
    console.log('server.bang.model.init() completed');
  });

  cb();
  return bangIndex;
};

module.exports = bangIndex;