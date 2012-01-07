Ext.define('bang.controller.broadcastMessage', {
  extend: 'Ext.app.Controller',
  views:  ['broadcastMessagePanel'],
  init: function() {
    remotejs.logMessage('[Client] - Initialized broadcastMessage controller');
    
    this.initialized = true;
    
    this.control({
      'broadcastMessagePanel button[action=submit]': {
        click: function(button) {
            
          var win    = button.up('window'),
              form   = win.down('form');
            
          form.submit({
            success: function(button) {
              win.close();
            }
          });
        }
      },
      'broadcastMessagePanel': {
        close: function() {
          delete(Ext.bang.views.broadcastMessagePanel);
        }
      }
    });
  }
});