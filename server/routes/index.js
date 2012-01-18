module.exports = {
  post: require('./post'),
  get:  require('./get'),
  put:  require('./put'), 
  ioStream:   require('./ioStream'),
  
  init: function(bang) {
  
    // Add the ioStream to bang
    this.ioStream.init(bang);
    
    this.post.init(bang);
    this.get.init(bang);
    this.put.init(bang);
  }
}