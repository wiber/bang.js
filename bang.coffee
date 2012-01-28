server = require './server'

server.configure ->
  console.log 'server.configure.() completed'
.start ->
  console.log 'server.start() completed'
  
module.exports = server
