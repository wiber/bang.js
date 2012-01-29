require "coffee-script"
server = require './server'

server.configure ->
  console.log 'server.configure.() completed'
server.start ->
  console.log 'server.start() completed'
  
module.exports = server
