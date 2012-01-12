var logger = {};

logger.extend = function(bang) {
  logger.fs       = require('fs');
  logger.util     = require('util');
  logger.settings = bang.settings;
  logger.mongoose = bang.mongoose;
  logger.debug    = logger.settings.debug;
  logger.io       = bang.io;  
  
  return logger;
};

// initialize the logger, add needed components
logger.init = function(cb) {
  console.log('[Console] - Logger Initialized'); 
};

logger.clearLogMessages = function(mongoose) {
  
  var logMessages = mongoose.model('log_messages');
  logMessages.find({}, function(err, docs) {
    docs.forEach(function(doc) {
      doc.remove();
    });
  });
  
};

/**
 * logMessage will log a message to the database and update socket users
 *
 * @param { String } msg message to log
 * @param { Function } callback takes [err, doc]
 * @return { Object } logger
 */
logger.logMessage = function(msg, cb) {

  var logMessages = logger.mongoose.model('log_messages');
   
  var newLogMessage = {
    date:      Date.now(),
    timestamp: Date.now(),
    message:   msg
  };
  
  logMessages.create(newLogMessage, function(err, doc) {
  
    // refine this to specific sessions with an open logConsole
    logger.io.sockets.emit('newLogMessage', {
      doc: doc
    });
        
    cb(err, doc);
  });
  
  if(logger.debug)
    console.log('logged: ' + msg);
    
  return logger;
};

/**
 * getMessages will retrieve log messages from the database
 *
 * @param { Object } params will contain grid parameters to limit retrieval
 * @param { Function } cb callback takes [err, response]
 * @return { Object } logger
 */ 
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
  
  return logger;
};

module.exports = logger;