var fs   = require('fs'),
    util = require('util');

var logger = {};

// initialize the logger, add needed components
logger.init = function(obj, cb) {
  logger.settings = obj.settings;
  logger.mongoose = obj.mongoose;
  logger.debug    = logger.settings.debug;
  
  if(logger.debug)
    console.log('DEBUG ENABLED'); 
};

logger.logMessage = function(msg, cb) {

  var logMessages = logger.mongoose.model('logmessages');

  logMessages.create({
    date:    Date.now(),
    message: msg
    
  }, function(err, doc) {
    cb(err, doc);
  });
  
  if(logger.debug)
    console.log('logged: ' + msg);
};

logger.getMessages = function(params, cb) {
  
  logger.logMessage('enable paging on logger - ' + util.inspect(params), function() {});
  
  var logMessages = logger.mongoose.model('logmessages');
  
  var query = logMessages.find({});
  query.sort('date', 'descending');
  query.limit(100);
  
  query.exec(function(err, docs) {
  
    var response = {
      results: docs.length,
      items: docs
    };
    
    cb(err, response);
  });
};

module.exports = logger;