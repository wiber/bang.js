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
                    delete(Ext.bang.views.clientsGrid);
                }
            }
        });
    }
});