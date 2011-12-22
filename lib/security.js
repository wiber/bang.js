var Security = {};

Security.init = function(obj, cb) {
  var logger = obj.logger;
  
  logger.logMessage('Security init', function(err, doc) {});
  
  cb();
};

module.exports = Security;