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
    
  mongoose.connect(settings.db.connect);
  
  if(settings.debug) {
    mongoose.connection.on('open', function() {
      logger.logMessage('mongoose opened');
    });
  }
  
  loadSchema(mongoose, function(err) {
    if(err) {
      console.log(err.msg);
      cb(err);
    }
    
    logger.logMessage('schemas loaded');
  });
  
  cb();
};

module.exports = db;


/** scoped functions
*/

function loadSchema(mongoose, cb) {

  var Schema   = mongoose.Schema,
      ObjectId = Schema.ObjectId;
      
  mongoose.model('users', new Schema({
    username:    { type: String },
    description: { type: String },
    email:       { type: String },
    password:    { type: String }
  }));
  
  cb();
}