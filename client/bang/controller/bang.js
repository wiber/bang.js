Ext.define('bang.controller.bang', {
  extend: 'Ext.app.Controller',
  views:  ['bang'],
  init: function() {
    remotejs.logMessage('[Client] - Initialized bang controller');
        
    this.control({
      'bangPanel button[action=login]': {
        click: function(button) {
            
          var win    = button.up('window'),
              form   = win.down('form');
            
          form.submit({
            success: function(button) {
              win.close();
              remotejs.logMessage('[Client] - ' + form.getValues().username + ' has logged in, loading interface');
              
              // Now that we're logged in, get the interface
              remotejs.getJS({ js: 'interface.js', app: 'bang'}, Ext.bang.util.run);
            }
          });
        }
      }
    });
  }
});