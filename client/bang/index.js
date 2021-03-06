// Create namespaces for specific components of the application
Ext.namespace('Ext.bang.settings')
Ext.namespace('Ext.bang.apps');
Ext.namespace('Ext.bang.views');
Ext.namespace('Ext.bang.security');
Ext.namespace('Ext.bang.util');
Ext.namespace('Ext.bang.socket');

/**
 * findKey array searching
 * @param {String} key value to find
 * @param {Array}  array to iterate
 * @returns {Number}
 */
Ext.bang.util.findKey = function(string, array) {

    for(var i = 0; i < array.length; i++) {
        if(array[i] === string) {
            return i;
        }
    }

    return -1;
}

var socket = new io.connect(Ext.bang.settings.url);

socket.on('connection received', function(data) {
    Ext.bang.socket = data;

    if(Ext.bang.security.handshake) {
        socket.emit('update handshake', {
            handshake: Ext.bang.security.handshake,
            user_id: Ext.bang.security.user_id,
            old_socket_id: Ext.bang.security.socket_id,
            new_socket_id: Ext.bang.socket.socket_id,
            username: Ext.bang.security.username
        });
    }
});

socket.on('update handshake', function(data) {
    Ext.bang.security.handshake = data.handshake;
    Ext.bang.security.socket_id = data.socket_id;
});

// Setup anonymous self executing function caching
Ext.bang.apps.appNames   = []
Ext.bang.apps.appStrings = [];

/**
 * @param {object} request
 *  - request.app {string} the application name
 *  - request.js  {string} the js code to obtain
 * @param {function} cb callback [err, js]
 */
Ext.bang.util.getApp = function(request, cb) {
    var appKey = Ext.bang.util.findKey(request.js, Ext.bang.apps.appNames);

    // We don't have it in cache
    if(appKey < 0) {
        appKey = Ext.bang.apps.appNames.push(request.js);

        // Get the string
        remotejs.getJS({
            app: request.app,
            js: request.js,
            security: Ext.bang.security
        }, function(provider, response) {
            Ext.bang.apps.appStrings.push(response.result);
            cb(undefined, response.result);

            return;
        });
    } else {
        cb(undefined, Ext.bang.apps.appStrings[appKey]);
        return;
    }

    return false;
};


// CONFIGURE UTILS
/**
 */
Ext.bang.util.run = function(provider, response) {
    Ext.JSON.decode(response.result);
};

/**
 * startup is our most important part of the layout.
 * @todo this should probably be moved somewhere else, or at least move the
 * provider definitions or make them more dynamic (core vs app specific)
 */
Ext.bang.util.startup = function() {

    Ext.direct.Manager.addProvider({
        url: '/bang/getJS',
        type: 'remoting',
        actions: {
            remotejs: [
                {name: 'getJS',            len: 1},
                {name: 'logMessage',       len: 1},
                {name: 'broadcastMessage', len: 1},
                {name: 'chatMessage',      len: 1}
            ]
        }
    });

    // Load our interface and then our login window
    Ext.bang.util.getApp({ app: 'bang', js: 'interface.js' }, function(err, app) {
        Ext.JSON.decode(app);

        Ext.bang.util.getApp({ app: 'bang', js: 'login.js' }, function(err, app) {
            Ext.JSON.decode(app);
        });
    });
};

Ext.require('Ext.direct.*', Ext.bang.util.startup);