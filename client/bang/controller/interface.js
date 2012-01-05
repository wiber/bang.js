Ext.define('bang.controller.interface', {
  extend: 'Ext.app.Controller',
  models: ['bang'],
  stores: ['bang'],
  views:  ['interfaceEast', 'interfaceCenter', 'interfaceWest'],
  init: function() {
    remotejs.logMessage('[Client] - Initialized interface controller');
                
    this.control({
    });
  }
});