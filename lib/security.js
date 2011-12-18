var Security = {};

Security.init = function(obj, cb) {
  var logger = obj.logger;
  
  logger.logMessage('Security init');
  
  cb();
};

module.exports = Security;