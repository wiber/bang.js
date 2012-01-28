/**
 * Bang.js
 *
 * Author: Mike Kunze
 * GPL 3.0
 */
module.exports = require('./server').configure(function() {
  console.log('server.configure() completed');
})
.start(function() {
  console.log('server.start() completed');
});



