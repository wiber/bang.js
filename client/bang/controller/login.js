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
              // Expand our navigation view once we're logged in
              Ext.bang.views.interfaceWest.expand(true);
              win.close();
              
              Ext.bang.security = {
                user_id:   action.result.data.user_id,
                username:  action.result.data.username,
                handshake: action.result.data.handshake,
                socket_id: Ext.bang.socket.socket_id,
                timestamp: Date.now()
              };
              
              socket.emit('client authenticated', Ext.bang.security);
          
              remotejs.logMessage('[Client] - ' + Ext.bang.security.username + ' has logged in, loading interface');
            },
            failure: function() {
              var title = 'Failed Authentication',
                  msg   = 'Bad user/pass combination';

              win.close();                  
              Ext.Msg.show({
                title: title, 
                msg: msg, 
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR,
                fn: function(btn, text) {
                  if(btn == 'ok') {
                    // Reload the login window
                    Ext.bang.util.getApp({ app: 'bang', js: 'login.js' }, function(err, app) {
                      Ext.JSON.decode(app);
                    });                 
                  }
                }
              });                            
            }
          });
        }
      },
      'loginPanel': {
        render: function(formPanel) {
          formPanel.down('form').on('beforeaction', function(form) {
            var pwd      = Crypto.SHA256(form.getValues().password);
            var userHash = Crypto.SHA256(form.getValues().username);  
            
            Ext.bang.security.userHash = userHash;   
                
            form.setValues({
              password: pwd,
              username: userHash
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