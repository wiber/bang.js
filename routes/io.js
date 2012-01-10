var ioStream = {};

var mongoose,
    logger,
    io;
    
ioStream.init = function(bang) {
  mongoose = bang.mongoose;
  logger   = bang.logger;
  io       = bang.io;
};

ioStream.disconnect = function() {
    var clients = mongoose.model('clients');
    clients.findOne({ socket_id: ioStream.socket.id }, function(err, doc) {
    
      if(err) {
        return;
      }
      
      if(!doc) {
        return;
      }
      
      doc.remove();
      io.sockets.emit('newClient', {});
      console.log(ioStream.socket.id + '.sid disconnected ');
    });
};

ioStream.clientAuthenticated = function(data) {
    var clients = mongoose.model('clients');
    
    var client = new clients(data);
    client.save(function(err) {
      io.sockets.emit('newClient', data);
    });
};
 
 /**
  * This is where we add our socket.io routes.
  */ 
ioStream.addRoutes = function(socket) {
  // Reference our socket
  ioStream.socket = socket;

  console.log('socket_id: '  + socket.id + ' has connected');
  socket.emit('connection received', {
    timestamp: Date.now(),
    socket_id: socket.id
  });
  
  
  socket.on('disconnect',           ioStream.disconnect);
  socket.on('client authenticated', ioStream.clientAuthenticated);  
};

module.exports = ioStream;