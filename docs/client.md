## Client Documentation

##### chatConsole - GUI for realtime global chat
    Ext.bang.util.getApp({ app: 'bang', js: 'chatConsole.js' }, function(err, app) {
      Ext.JSON.decode(app);
    });

##### logConsole - GUI for realtime log monitoring
    Ext.bang.util.getApp({ app: 'bang', js: 'logConsole.js' }, function(err, app) {
      Ext.JSON.decode(app);
    });

##### clientsConsole - GUI for realtime authenticated clients monitoring
    Ext.bang.util.getApp({ app: 'bang', js: 'clientsConsole.js' }, function(err, app) {
      Ext.JSON.decode(app);
    });

    This console will show all connected socket clients.  Currently, that means
    all authenticated clients that are listening to the server.

##### broadcastMessage - messages all users with interface loaded
    Ext.bang.util.getApp({ app: 'bang', js: 'broadcastMessage.js' }, function(err, app) {
      Ext.JSON.decode(app);
    });


##### logMessage - API for server logger
    remotejs.logMessage('message', function() {
      console.log('logger succeeds');
    });

#### remote execution
    There is the ability to push a client to run an application.  To do so, first
    you must obtain the socket_id, found in the clientsConsole.

    Once you have the socket_id, remote push like so:

    remotejs.getJS({ app: 'bang', js: 'broadcastMessage.js', remoteClient: '123412341234' }, Ext.bang.util.run);

