/**
 * Bang.js
 *
 * Author: Mike Kunze
 * GPL 3.0
 */
module.exports = require('./server').configure(function() {
  console.log('server configured');
})
.start(function() {
  console.log('server.start()');
});



