## Server Documentation

### interactive debugging with tab completion
    iced
    > server = require './bang'

    > server.settings   // settings object
    > server.db         // db object containing db functions
    > server.logger     // logger object containing logging functionality

    // Log a message to the log_messages collection:
    > server.logger.logMessage 'hey, our servers are belong to us', () ->
        console.log '#    logger succeeds'

