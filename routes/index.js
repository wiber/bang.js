module.exports = {
  post: require('./post'),
  get:  require('./get'),
  put:  require('./put'), 
  
  init: function(obj) {
    this.post.init(obj);
    this.get.init(obj);
    this.put.init(obj);
  }
}