var Post = {};

Post.init = function(obj) {
  var app      = obj.app;
  var logger   = obj.logger;
  var settings = obj.settings;
  var io       = obj.io;

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
    //res.send(req.body);
    
    var rpc = function(request, cb) {
      
      switch(request.method) {
        case "getJS":

          var app = request.data[0].app;
          var js  = request.data[0].js;
          
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
          
          io.sockets.emit('broadcastMessage', {
            message: data
          });

          logger.logMessage('[Server][broadcastMessage] - ' + data, function() {});
          request.result = data;

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
  
    // check with security
    var response = {
      success: true,
      username: req.body.username
    };
     
    res.send(response);
  });
  
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
