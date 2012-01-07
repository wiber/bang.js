var express = require('express');
    
var get = {};

get.init = function(bang) {

  var app      = bang.app,
      logger   = bang.logger,
      settings = bang.settings,
      mongoose = bang.mongoose;
  
  logger.logMessage('[Server][routes] - Mapping Gets', function(err, doc) {});
  
  app.get('/', function(req, res){
    res.render('index', { 
  	  title: 'Bang.js',
  	  settings: settings,
  	  layout: 'index.layout.jade'
    })  	
  });
  
  // GET '/bang' 
  app.get('/bang', function(req, res) {
  
    settings.app = 'bang';
    
    res.render('bang', {
      layout: 'bang.layout.jade',
      title: 'Bang.js',
      settings: settings
    });
  });
  
  // GET '/:app/:component/read
  app.get('/:app/:component/read', function(req, res) {
    
    // Which app
    switch(req.params.app) {
    
      // App bang
      case 'bang':
      
        // Which component
        switch(req.params.component) {
          case 'logMessages':
            
            // Get the messages, provide a callback that uses res

            logger.getMessages(req.query, function(err, response) {
              if(err) {
                logger.logMessage(err, function() {});
              }
              
              res.send(response);
              return;
            });
            
            break;
          
          case 'clients':
            
          // refactor this  
          var clients = mongoose.model('clients');
          clients.count({}, function(err, count) {
  
            var query = clients.find({});
            query.sort('timestamp', -1)
            .limit(req.params.limit)
            .skip(req.params.start);
  
            query.exec(function(err, docs) {
  
            var response = {
            results: count,
            items: docs
            };
    
            res.send(response);
            });  
          });

            break;
            
          default:
            logger.logMessage('unknown component ' + req.params.component, function(err, doc) {});
            break;
        }
        break;
        
      default:
        logger.logMessage('unknown app ' + req.params.app, function(err, doc) {});      
        break;
    }
  });
  
  // GET '/:app/:component/:js'
  /**
   * @todo add security / check for app, component and js roles&permissions / filter req.params
   */
  app.get('/:app/:component/:js', function(req, res) {
    var fullPath = settings.path + '/client/' + req.params.app 
      + '/' + req.params.component + '/' + req.params.js;
            
    res.sendfile(fullPath);
  });
}

module.exports = get;