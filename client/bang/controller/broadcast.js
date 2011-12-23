Ext.define('bang.controller.broadcast', {
  extend: 'Ext.app.Controller',
  views:  ['broadcastPanel'],
  init: function() {
    remotejs.logMessage('[Client] - Initialized broadcast controller');
        
    this.control({
      'broadcastPanel button[action=submit]': {
        click: function(button) {
            
          var win    = button.up('window'),
              form   = win.down('form');
            
          form.submit({
            success: function(button) {
              win.close();
            }
          });
        }
      }
    });
  }
});