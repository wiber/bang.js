var express = require('express');
    
var get = {};

get.init = function(obj) {

  var app      = obj.app;
  var logger   = obj.logger;
  var settings = obj.settings;
  
  logger.logMessage('Mapping Routes for Get', function(err, doc) {});
  
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
    
    switch(req.params.app) {
      case 'bang':
        switch(req.params.component) {
          case 'logMessages':
            
            // Get the messages, provide a callback that uses res

            logger.getMessages({
              page:  req.query.page,
              start: req.query.start,
              limit: req.query.start
              
            }, function(err, response) {
              if(err) {
                logger.logMessage(err, function() {});
              }
              
              res.send(response);
              return;
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
  app.get('/:app/:component/:js', function(req, res) {
    var fullPath = settings.path + '/client/' + req.params.app 
      + '/' + req.params.component + '/' + req.params.js;
            
    res.sendfile(fullPath);
  });
}

module.exports = get;