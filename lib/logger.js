var fs   = require('fs'),
    util = require('util');

var logger = {};

// initialize the logger, add needed components
logger.init = function(obj, cb) {
  logger.settings = obj.settings;
  logger.mongoose = obj.mongoose;
  logger.debug    = logger.settings.debug;
  logger.io       = obj.io;
  
  if(logger.debug)
    console.log('[Console] - DEBUG ENABLED'); 
};

logger.logMessage = function(msg, cb) {

  var logMessages = logger.mongoose.model('log_messages');
   
  logMessages.create({
    date:      Date.now(),
    timestamp: Date.now(),
    message:   msg
    
  }, function(err, doc) {
  
    // refine this to specific sessions with an open logConsole
    logger.io.sockets.emit('newLogMessage', {
      doc: doc
    });
        
    cb(err, doc);
  });
  
  if(logger.debug)
    console.log('logged: ' + msg);
};

logger.getMessages = function(params, cb) {
  
  var logMessages = logger.mongoose.model('log_messages');
  

  logMessages.count({}, function(err, count) {
  
    var query = logMessages.find({});
    query.sort('timestamp', -1)
      .limit(params.limit)
      .skip(params.start);
  
    query.exec(function(err, docs) {
  
      var response = {
        results: count,
        items: docs
      };
    
      cb(err, response);
    });  
  });
};

module.exports = logger;