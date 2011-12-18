var express = require('express');

var get = {};

get.init = function(obj) {

  var app      = obj.app;
  var logger   = obj.logger;
  var settings = obj.settings;
  
  logger.logMessage('Mapping Routes for Get');
  
  app.get('/', function(req, res){
    res.render('index', { 
  	  title: 'Bang.js',
  	  settings: settings,
  	  layout: 'index.layout.jade'
    })  	
  });
  
  app.get('/bang', function(req, res) {
  
    settings.app = 'bang';
    
    res.render('bang', {
      layout: 'bang.layout.jade',
      title: 'Bang.js',
      settings: settings
    });
  });
}

module.exports = get;