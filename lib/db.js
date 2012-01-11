// Scoped
var db = {};

db.extend = function(bang) {

  db.mongoose      = bang.mongoose;
  db.logger        = bang.logger;
  db.settings      = bang.settings.db;
  db.settings.path = bang.settings.path;
  
  return db;
};

/**
 * db.init will connect to the database, load the schemas, and run a callback
 * 
 * @param {object} bang 
 *    bang.mongoose
 *    bang.logger
 *    bang.settings
 * @return {boolean} success or failure of running the function
 */
db.init = function(cb) {
  
  db.mongoose.connect(db.settings.connect, function(err) {
    if(err) {
      cb(err);
    }
  });
  
  db.mongoose.connection.on('open', function() {
    db.logger.logMessage('[Server][db] - mongoose opened', function(err, doc) {});
  });
  
  db.loadSchema(function(err) {
    if(err) {
      cb(err);
    }
    
    db.logger.logMessage('[Server][db] - schemas loaded', function(err, doc) {});
  });
  
  cb();
  
  return db;
};

db.loadSchema = function(cb) {

  var model = require(db.settings.path + '/model');
  model.init(db.mongoose, function(err) {
    if(err) {
      db.logger.logMessage('[Server][db][model] - ' + err.msg, function(err, doc) {});
    }
    
    db.logger.logMessage('[Server][db][model] - models loaded', function(err, doc) {});
  });
  
  cb();
  
  return db;
}

module.exports = db;
