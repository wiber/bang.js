var Security = {};

Security.extend = function(bang) {
  Security.logger   = bang.logger;
  Security.mongoose = bang.mongoose;
  
  return Security;
};

Security.init = function(cb) {

  Security.crypto = require('crypto');
  Security.clearClients(Security.mongoose);
  
  cb();
  
  return Security
};

Security.clearClients = function(mongoose) {
  var clients = mongoose.model('clients');
  clients.find({}, function(err, docs) {
    docs.forEach(function(doc) {
      doc.remove();
    });
  });
  
  var message = '[Server][security] init - cleared clients cache';
  Security.logger.logMessage(message, function(err, doc) {});  
  
  return Security;
};

/**
 * authenticateHandshake will take a username hash and a handshake
 * and check it against the clients table.  if a client is returned
 * the user is assumed to be logged in.
 * @param {Object} request has username, handshake
 * @param {Function} cb callback which takes [err, response]
 */
Security.authenticateHandshake = function(request, cb) {
  
  var clients  = Security.mongoose.model('clients');
  
  var search = {
    userHash: request.username,
    handshake: request.handshake
  };
  
  clients.findOne(search, function(err, client) {
    // mongoose problem, return err
    if(err) {
      cb(err);
      return;
    }
    
    // No user, callback an err
    if(!client) {
      cb({ msg: 'invalid handshake' });
      return;
    }
   
    var response = {
      username:  client.username,
      user_id:   client.user_id,
      handshake: client.handshake
    };
        
    cb(undefined, response);      
  });
  
  return Security;
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
  
  var users  = Security.mongoose.model('users'),
      crypto = Security.crypto,
      hash   = crypto.createHash('sha256');
  
  var search = {
    userHash: request.username,
    password: request.password
  };
  
  users.findOne(search, function(err, user) {
    // mongoose problem, return err
    if(err) {
      cb(err);
      return;
    }
    
    // No user, callback an err
    if(!user) {
      cb({
        msg: 'incorrect user/pass combination'
      });
      return;
    }

    hash.update(user.password + Date.now().toString());
    var handshake = hash.digest('hex');    
    
    var response = {
      username:  user.username,
      user_id:   user._id,
      handshake: handshake
    };
        
    cb(undefined, response);      
  });
  
  return true;
};

module.exports = Security;