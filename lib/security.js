var Security = {};

var mongoose;
var logger;

Security.init = function(bang, cb) {
  logger   = bang.logger;
  mongoose = bang.mongoose;

    
  var clients = mongoose.model('clients');
  clients.find({}, function(err, docs) {
    docs.forEach(function(doc) {
      doc.remove();
    });
  });
  
  var message = '[Server][security] init - cleared clients cache';
  logger.logMessage(message, function(err, doc) {});

  cb();
};

/**
 * authenticate will take username and password credentials from
 * request and send a user object with the callback.
 *
 * @param {object}   request will provide username and password
 * @param {function} cb takes [err, user] 
 * @return {boolean} tells the caller that the function went smoothly
 */
Security.authenticate = function(request, cb) {
  
  var users = mongoose.model('users');
  
  users.findOne(request, function(err, user) {
    // mongoose problem, return err
    if(err) {
      cb(err);
      return true;
    }
    
    // No user, callback an err
    if(!user) {
      cb({
        msg: 'incorrect user/pass combination'
      });
      return true;
    }

    user.password = undefined;
    cb(undefined, user);
  });
  
  return true;
};

module.exports = Security;