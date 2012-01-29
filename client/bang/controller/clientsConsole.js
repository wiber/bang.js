Ext.define('bang.controller.clientsConsole', {
    extend: 'Ext.app.Controller',
    views:  ['clientsGrid'],
    models: ['client'],
    stores: ['clients'],
    init: function() {
        remotejs.logMessage('[Client] - Initialized clients controller');
        this.initalized = true,
        this.control({
            'clientsGrid': {
                render: function() {
                    remotejs.logMessage('[Client] - clientsGrid rendered');
                },
                close: function() {
                    delete(Ext.bang.views.clientsConsole);
                },
                
                itemdblclick: function(view, record) {
                  console.log(record);
                  // Here we want a navi like treepanel that can have things
                  // added and removed when necessary.. based on the apps needs
                  // a global navi.
                  Ext.bang.views.interfaceEast.expand();
                }
            }
        });
    }
});