class Logger

  constructor: (server, cb) ->
    @fs       = require 'fs'
    @util     = require 'util'
    @debug    = server.settings.debug
    @settings = server.settings

    cb()

    return @

  init: (server, cb) ->
    @server   = server
    @logQueue = Array()
    @mongoose = server.mongoose

    @logMessage '[Console] - Logger Initialized', () ->

    cb()
    return @

  clearLogMessages: (mongoose) ->
    log_messages = @mongoose.model 'log_messages'

    log_messages.find {}, (err, docs) ->
      docs.forEach (doc) ->
        doc.remove()

    return @

  purgeQueue: (logQueue) ->
    if logQueue.length > 0
      queueItem = logQueue.pop()
      @logMessage queueItem, () ->
  
    return @

  logMessage: (msg, cb) ->

    server = @server

    logMessages = @mongoose.model 'log_messages'

    newLogMessage =
      date:      Date.now()
      timestamp: Date.now()
      message:   msg

    logMessages.create newLogMessage, (err, doc) ->

      server.io.sockets.emit 'newLogMessage', {
        doc: doc
      }

      cb err, doc

    if @debug
      console.log('logged: ' + msg);

    return @

  getMessages: (params, cb) ->

    logMessages = @mongoose.model 'log_messages'

    logMessages.count {}, (err, count) ->

      query = logMessages.find {}
      query.sort('timestamp', -1)
      query.limit params.limit
      query.skip params.start

      query.exec (err, docs) ->

        response =
          results: count
          items: docs

        cb err, response

    return @


module.exports = Logger