require "coffee-script"

Server = require './server'

server = new Server ->
  console.log 'server.configure.() completed'

server.start ->
  console.log 'server.start() completed'
  
module.exports = server
