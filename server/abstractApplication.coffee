class AbstractApplication
  constructor: (server)->

    @mongoose = server.mongoose
    @logger   = server.logger

    return server

module.exports = AbstractApplication