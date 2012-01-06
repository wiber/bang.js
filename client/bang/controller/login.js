Ext.define('bang.controller.login', {
  extend: 'Ext.app.Controller',
  views:  ['loginPanel'],
  init: function() {
    remotejs.logMessage('[Client] - Initialized login controller');
        
    this.initialized = true;
    
    this.control({
      'loginPanel button[action=login]': {
        click: function(button) {
        
          // Hide our button and form items for cosmetic and functional reasons
          button.hide();
          Ext.getCmp('loginPanel.password').hide();
          Ext.getCmp('loginPanel.username').hide();
            
          var win        = button.up('window'),
              form       = win.down('form');

          form.submit({
            reset: true,
            success: function(button, action) {
              win.close();
              
              Ext.bang.security = {
                user_id:  action.result.data._id,
                username: action.result.data.username
              };
              
              remotejs.logMessage('[Client] - ' + Ext.bang.security.username + ' has logged in, loading interface');
            },
            failure: function() {
              Ext.Msg.alert('Failed Authentication');
            }
          });
        }
      },
      'loginPanel': {
        render: function(formPanel) {
          formPanel.down('form').on('beforeaction', function(form) {
            var pwd    = Crypto.SHA256(form.getValues().password);            
                
            form.setValues({
              password: pwd
            });
          });
        },
        close: function() {
          delete(Ext.bang.views.loginPanel);
        }
      }
    });
  }
});