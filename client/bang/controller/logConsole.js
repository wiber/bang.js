Ext.define('bang.controller.logConsole', {
  extend: 'Ext.app.Controller',
  models: ['logMessage'],
  stores: ['logMessages'],
  views:  ['logMessageGrid'],
  init: function() {
    remotejs.logMessage('[Client] - Initialized interface controller');
    this.control({
    });
  }
});