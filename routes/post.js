var Post = {};

Post.init = function(bang) {
  var app      = bang.app;
  var logger   = bang.logger;
  var settings = bang.settings;
  var io       = bang.io;
  var security = bang.security;
  var mongoose = bang.mongoose;

  logger.logMessage('[Server][routes] - Mapping posts', function(err, doc) {});
  
  /**
   * /baing/getJS is our Ext.Direct api caller.  getJS takes
   * one or more objects.
   *
   * each req.body object: { js: <string>, app: <app name> }
   * 
   * response will be an object or an array of objects
   */
   // POST '/bang/getJS'
  app.post('/bang/getJS', function(req, res) {
    
    /**
     * @todo refactor rpc function, put it in a library
     */
    var rpc = function(request, cb) {
      
      switch(request.method) {
        case "getJS":
        
          var remoteClient = request.data[0].remoteClient;
          var app = request.data[0].app;
          var js  = request.data[0].js;          

          // Check to see if the command is for a remoteClient
          if(remoteClient) {
            var message = '[Server][getJS] - remote execution sent to ' + remoteClient;
            logger.logMessage(message + remoteClient, function(err) {});
            io.sockets.socket(remoteClient).emit('loadJs', {
              js: js
            });
            
            cb({
              tid:    request.tid,
              type:   request.type,
              action: request.action,
              method: request.method,
              result: '(function(){ Ext.Msg.alert(\'Remote Exec\', \'Executed...\') })()'
            });
              
             return;
          }
          
          require('fs').readFile(settings.path + '/client/' + app + '/' + js, 'utf8',
            function(err, data) {
              var response = {
                tid:    request.tid,
                type:   request.type,
                action: request.action,
                method: request.method,
                result: data,
                err: err
              };            
            
              cb(response);  
          });
          break;
          
        case "logMessage":
        
          var data = request.data[0];
          logger.logMessage(data, function(err, doc) {
          
            if(err) {
              console.log(err);
            }
            
            request.result = doc;
            
            cb(request);
          });
          break;
        
        case "broadcastMessage":
          var data = request.data[0];
          
          if(data.remoteClient) {
          
            logger.logMessage('[Server][broadcastMessage][' 
              + data.remoteClient + '] - ' + data, function() {});
              
            io.sockets.socket(data.remoteClient).emit('broadcastMessage', {
              message: data.msg
            });

          } else {
            io.sockets.emit('broadcastMessage', {
              message: data.msg
            });
            
            logger.logMessage('[Server][broadcastMessage] - ' + data.msg, function() {});
          }

          request.result = data.msg;

          cb(request);
          break;
          
        case "chatMessage":
          var data = request.data[0];
          
          if(!data.msg || !data.security.handshake) {
            logger.logMessage('[Server][chatMessage] - missing arguments', function() {});
            cb(request);
            return;
          }

          security.authenticateHandshake({
            username: data.security.userHash,
            handshake: data.security.handshake
          }, function(err, user) {
                // if we have an error, give the err in the response
            if(err) {
              request.result = '(function(){ Ext.Msg.alert(\'Failed\', \'Failed to authorize action...\') })()'
              cb(request);
              return;
            } else {
              if(data.msg) {
                var message = '[Server][chatMessage][' + data.user_id + '] -' + data.msg;
                logger.logMessage(message, function() {});
            
                var chatMessageObject = {
                  msg:       data.msg,
                  username:  data.security.username,
                  user_id:   data.security.user_id,
                  timestamp: Date.now()
                };
                 
                var chatMessages = mongoose.model('chat_message');
                var chatMessage = new chatMessages(chatMessageObject);
            
                chatMessage.save(function(err) {
                  if(err) {
                    logger.logMessage(err, function() {});
                  }
              
                  io.sockets.emit('newChatMessage', chatMessageObject);
                });
                request.result = data.msg;
              }
            }
          });
          
          cb(request);
          break;
  
        default:
          logger.logMessage("unknown method \'" + request.method + "\' called from " 
            + request.action);
          break;
      }
    };
    
    if(req.body instanceof Array) {
      var response  = new Array();
      var async     = require('async');
      var fs        = require('fs');
      
      // async forEach iterator function
      var iterator = function(item, cb) {
      
        rpc(item, function(data) {
          response.push(data);
          cb();
        });
      };
      
      async.forEach(req.body, iterator, function(err) {
        res.send(response);
      });
    } else {
      rpc(req.body, function(data) {
        res.send(data);
      });
    }    
  });

  // POST '/bang/login'
  app.post('/bang/login', function(req, res) {
  
    /**
     * authCallback
     *
     * @param {object} error information upon auth failure
     * @param {object} user information upon successful auth
     */
    var authCallback = function(err, user) {

      // if we have an error, give the err in the response
      if(err) {
        var response = {
          success: false,
          err: err
        };
        
        var logMessage = '[Server][routes] - bad user/pass for ';
        logger.logMessage(logMessage + req.body.username, function(err, doc) {});
     
        res.send(response); 
        return;       
      }

      // authed user, provide user response
      var response = {
        success: true,
        data: user
      };
     
      res.send(response); 
    };
    
    // Authenticate our user, cb provides response
    var request = {
      username: req.body.username,
      password: req.body.password
    };
    security.authenticate(request, authCallback);  
  });
  
  // POST '/bang/broadcastMessage'
  app.post('/bang/broadcastMessage', function(req, res) {
    
    var response = {
      success: true,
      message: req.body.message
    };
    
    io.sockets.emit('broadcastMessage', {
      message: req.body.message
    });
    
    logger.logMessage('[Server][broadcastMessage] - ' + req.body.message, function() {});
    res.send(response);
  });
}

module.exports = Post;
