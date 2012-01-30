AbstractSecurity = require './abstractSecurity.coffee'

class Security extends AbstractSecurity
  constructor: () ->
    console.log 'security constructor'

module.exports = Security