// Scoped
var db = {};

/**
 * @param obj.mongoose
 * @param obj.logger
 * @param obj.settings
 *
 * db.init starts up the db object, which will be part of the global lib object
 */
db.init = function(obj, cb) {
  
  var mongoose = obj.mongoose
    , logger   = obj.logger
    , settings = obj.settings;
    
  mongoose.connect(settings.db.connect, function(err) {
    if(err) {
      cb(err);
    }
  });
  
  mongoose.connection.on('open', function() {
    logger.logMessage('[Server][db] - mongoose opened', function(err, doc) {});
  });
  
  loadSchema(obj, function(err) {
    if(err) {
      cb(err);
    }
    
    logger.logMessage('[Server][db] - schemas loaded', function(err, doc) {});
  });
  
  cb();
};

module.exports = db;


/** scoped functions
*/

function loadSchema(obj, cb) {
  var settings = obj.settings;
  var mongoose = obj.mongoose;
  var logger   = obj.logger;

  var model = require(settings.path + '/model');
  model.init(obj, function(err) {
    if(err) {
      logger.logMessage('[Server][db][model] - ' + err.msg, function(err, doc) {});
    }
    
    logger.logMessage('[Server][db][model] - models loaded', function(err, doc) {});
  });
  
  cb();
}