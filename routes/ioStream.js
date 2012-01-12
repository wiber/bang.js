var ioStream = {};
    
ioStream.init = function(bang) {
  ioStream.mongoose = bang.mongoose;
  ioStream.logger   = bang.logger;
  ioStream.io       = bang.io;
  ioStream.security = bang.security;
  
  return ioStream;
};

 /**
  * This is where we add our socket.io routes.
  */ 
ioStream.addRoutes = function(socket) {

  ioStream.socket = socket;

  console.log('socket_id: '  + socket.id + ' has connected');
  socket.emit('connection received', {
    timestamp: Date.now(),
    socket_id: socket.id
  });
  
  socket.on('update handshake',     ioStream.updateHandshake);
  socket.on('client authenticated', ioStream.clientAuthenticated);    
  socket.on('disconnect',           ioStream.disconnect);
};

ioStream.updateHandshake = function(data) {
  var security = ioStream.security,
      logger   = ioStream.logger,
      mongoose = ioStream.mongoose,
      crypto   = security.crypto;
      
  var hash = crypto.createHash('sha256');      
  hash.update(data.handshake + Date.now() + data.user_id);
  
  var newHandshake = hash.digest('hex');
    
  var clients = mongoose.model('clients');
  
  var query = { 
    socket_id: data.socket_id,
    handshake: data.handshake 
  }

  console.log(query);

  clients.findOne(query, function(err, doc) {
    
    console.log(doc);
    if(doc) {
      doc.handshake = newHandshake;
      doc.timestamp = Date.now();
      doc.socket_id = ioStream.socket.id
      
      doc.save(function(err) {
        if(err) {
          logger.logMessage(err, function() {});
        }
      });
    } else {
      var client = new clients({
        handshake: newHandshake,
        timestamp: Date.now(),
        socket_id: ioStream.socket.id,
        username:  data.username   
      });
      
      client.save(function(err) {
        if(err) {
          console.log('failed to create new client');
        }
      });
    }  
    
    ioStream.io.sockets.emit('newClient');
    ioStream.socket.emit('update handshake', { 
      handshake: newHandshake,
      socket_id: ioStream.socket.id
    });
  });
};

/**
 *
 */
ioStream.disconnect = function() {
    var clients = ioStream.mongoose.model('clients');
    clients.findOne({ socket_id: ioStream.socket.id }, function(err, doc) {
    
      if(err) {
        return;
      }
      
      if(!doc) {
        return;
      }
      
      console.log(doc);      
      
      doc.remove();
      ioStream.io.sockets.emit('newClient', {});
      console.log(ioStream.socket.id + '.sid disconnected ');
    });
};

ioStream.clientAuthenticated = function(data) {
    var clients = ioStream.mongoose.model('clients');
    
    var client = new clients(data);
    client.save(function(err) {
      ioStream.io.sockets.emit('newClient', data);
    });
};

module.exports = ioStream;