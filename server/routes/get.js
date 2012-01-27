var get = {};

get.logMessages = function(logger, req, res) {

  logger.getMessages(req.query, function(err, response) {
    if(err) {
      logger.logMessage(err, function() {});
    }
              
    res.send(response);
    return;
  });
};

get.chatMessages = function(mongoose, req, res) {
  var chatMessages = mongoose.model('chat_message');
  chatMessages.count({}, function(err, count) {
  
  /**
   * @todo refine this so username in clients is not necessary.
   * @todo refine amount of detail returned
   */
  var query = chatMessages.find({});
  query.sort('timestamp', -1)
  .populate('user_id', ['username'])
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
};

get.getClients = function(mongoose, req, res) {
  var clients = mongoose.model('clients');
  clients.count({}, function(err, count) {
  
  /**
   * @todo refine this so username in clients is not necessary.
   * @todo refine amount of detail returned
   */
  var query = clients.find({});
  query.sort('timestamp', -1)
  .populate('user_id')
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
};

get.getUsers = function(mongoose, req, res) {
  var users = mongoose.model('users');
  users.count({}, function(err, count) {
  
  /**
   * @todo refine amount of detail returned
   */
  var query = users.find({})
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
};

get.init = function(bang) {

  var app      = bang.app,
      logger   = bang.logger,
      settings = bang.settings,
      mongoose = bang.mongoose;
  
  logger.logMessage('[Server][routes] - Mapping Gets', function(err, doc) {});
  
  // GET '/'
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
      
        // Which bang component
        switch(req.params.component) {
          case 'logMessages':
            get.logMessages(logger, req, res);
            break;
          
          case 'clients':
            get.getClients(mongoose, req, res);
            break;
            
          case 'users':
            get.getUsers(mongoose, req, res);          
            break;  
            
          case 'chatMessages':
            get.chatMessages(mongoose, req, res);
            break;
            
          default:
            logger.logMessage('[Server][Router] Bang READ - unknown request ' + req.params.component, function(err, doc) {});
            break;
        }
        break;
        
      default:
        logger.logMessage('unknown app ' + req.params.app, function(err, doc) {});      
        break;
    }
  });
}

module.exports = get;