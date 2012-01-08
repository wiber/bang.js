Ext.define('bang.controller.naviTree', {
    extend: 'Ext.app.Controller',
    views:  ['naviTreePanel'],
    init: function() {
        remotejs.logMessage('[Client] - Initialized naviTree controller');
        this.initalized = true,
        this.control({
            'naviTreePanel': {
                render: function() {
                    remotejs.logMessage('[Client] - naviTree rendered');
                },
                close: function() {
                    delete(Ext.bang.views.naviTreePanel);
                }
            }
        });
    }
});