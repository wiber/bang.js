module.exports = {
  post: require('./post'),
  get:  require('./get'),
  put:  require('./put'), 
  io:   require('./io'),
  
  init: function(bang) {
    this.post.init(bang);
    this.get.init(bang);
    this.put.init(bang);
    this.io.init(bang);
  }
}