Ext.define('bang.controller.login', {
  extend: 'Ext.app.Controller',
  views:  ['loginPanel'],
  init: function() {
    remotejs.logMessage('[Client] - Initialized bang controller');
        
    this.control({
      'loginPanel button[action=login]': {
        click: function(button) {
            
          var win    = button.up('window'),
              form   = win.down('form');
            
          form.submit({
            success: function(button) {
              win.close();
              remotejs.logMessage('[Client] - ' + form.getValues().username + ' has logged in, loading interface');
            }
          });
        }
      }
    });
  }
});