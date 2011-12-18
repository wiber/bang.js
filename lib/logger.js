var fs = require('fs');

var logger = {};

logger.cache = Array();

logger.init = function(obj, cb) {
  var settings = obj.settings;
  
  logger.filePath = settings.logger.filePath;
  logger.debug    = settings.debug;
  
  if(logger.debug)
    console.log('DEBUG ENABLED');
      
  logger.logStream = fs.createWriteStream(logger.filePath, {
    flags: 'a+',
    encoding: 'utf8',
    mode: 0755
  });
  
  logger.logStream.on('open', function(fd) {
    logger.logMessage('logStream \'' + logger.filePath + '\' loaded');
    cb();
  });
};

logger.logMessage = function(msg) {


  if(logger.debug)
    console.log('logged: ' + Date.now() + ' ' + msg);
  
  msg = Date.now() + ' ' + msg + '\n';
  if(logger.logStream.fd != null) {
    fs.write(logger.logStream.fd, msg);
    
    // Clear the cache
    if(logger.cache.length > 0) {
      logger.cache.forEach(function(item) {
        fs.write(logger.logStream.fd, logger.cache.pop());
      });
    }
  } else {
    logger.cache.push(msg);
  }
};

module.exports = logger;