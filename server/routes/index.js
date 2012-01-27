module.exports = {
  post: require('./post'),
  get:  require('./get'),
  put:  require('./put'), 
  ioStream:   require('./ioStream'),
  
  init: function(server) {
  
    // Add the ioStream to bang
    this.ioStream.init(server);
    
    this.post.init(server);
    this.get.init(server);
    this.put.init(server);
  }
}