Ext.define('bang.controller.logConsole', {
  extend: 'Ext.app.Controller',
  views:  ['logMessageGrid'],
  models: ['logMessage'],
  stores: ['logMessages'],
  init: function() {
    remotejs.logMessage('[Client] - Initialized logConsole controller');
    this.control({
      'logMessageGrid': {
        render: function() {  
          remotejs.logMessage('[Client] - logMessageGrid rendered'); 
        },
        close: function() {
          delete(Ext.bang.views.logMessageGrid);
        }
      }
    });
  }
});