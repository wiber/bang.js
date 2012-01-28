// Scoped
var db = {};

/**
 * db.init will connect to the database, load the schemas, and run a callback
 * 
 * @param {object} bang 
 *    bang.mongoose
 *    bang.logger
 *    bang.settings
 * @return {boolean} success or failure of running the function
 */
db.init = function(server, cb) {
  
  server.mongoose.connect(server.settings.db.connect, function(err) {
    if(err) {
      cb(err);
    }
  });
  
  server.mongoose.connection.on('open', function() {
    server.logger.logMessage('[Server][db] - mongoose opened', function(err, doc) {});
  });
  
  db.loadSchema(server, function(err) {
    if(err) {
      cb(err);
    }

    server.logger.logMessage('[Server][db] - schemas loaded', function(err, doc) {});
    cb();
  });
  
  
  return db;
};

db.loadSchema = function(server, cb) {

  var model = require(__dirname + '/../model');
  model.init(server.mongoose, function(err) {
    if(err) {
      server.logger.logMessage('[Server][db][model] - ' + err.msg, function(err, doc) {});
    }
    
    server.logger.logMessage('[Server][db][model] - models loaded', function(err, doc) {});
  });
  
  cb();
  
  return db;
}

module.exports = db;
