Ext.define('bang.controller.usersConsole', {
    extend: 'Ext.app.Controller',
    views:  ['usersGrid'],
    models: ['user'],
    stores: ['users'],
    init: function() {
        remotejs.logMessage('[Client] - Initialized users controller');
        this.initalized = true,
        this.control({
            'usersGrid': {
                render: function() {
                    remotejs.logMessage('[Client] - usersGrid rendered');
                },
                close: function() {
                    delete(Ext.bang.views.usersGrid);
                },
                
                itemdblclick: function(view, record) {
                  console.log(record);
                }
            }
        });
    }
});