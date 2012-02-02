Put = {}
Put.init = (obj) ->
  app = obj.app
  logger = obj.logger
  logger.logMessage "[Server][routes] - Mapping Put", (err, doc) ->

module.exports = Put
