var Post = {};

Post.init = function(obj) {
  var app      = obj.app;
  var logger   = obj.logger;
  var settings = obj.settings;

  logger.logMessage('Mapping Routes for post');
  
  /**
   * /baing/getJS is our Ext.Direct api caller.  getJS takes
   * one or more objects.
   *
   * each req.body object: { js: <string> }
   * 
   * response will be an object or an array of objects
   */
  app.post('/bang/getJS', function(req, res) {
    //res.send(req.body);
    
    var rpc = function(request, cb) {
      switch(request.method) {
        case "getJS":
        
          require('fs').readFile(settings.path + '/client/' + request.data[0].app + '/' + request.data[0].js, 'utf8',
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
}

module.exports = Post;