Ext.define('bang.controller.chatConsole', {
    extend: 'Ext.app.Controller',
    views:  ['chatMessageGrid'],
    models: ['chatMessage'],
    stores: ['chatMessages'],
    init: function() {
    
        var sendMessage = function(textField) {
        
          var clearTextField = function() {
            textField.setValue("");
          };
          
          var chatMessageData = (function() {
            return { 
              msg: textField.getValue(),
              security: Ext.bang.security,
              timestamp: Date.now()
            }            
          })();
                    
          remotejs.chatMessage(chatMessageData, function(p, res) {
            console.log(res);
            clearTextField();
          });
        };
        
        remotejs.logMessage('[Client] - Initialized chat controller');
        this.initalized = true,
        this.control({
            'chatMessageGrid': {
              render: function() {
                Ext.getCmp('bang.view.chatMessageGrid.message').focus(true, 100);
              }
            },
            'chatMessageGrid textfield[id=bang.view.chatMessageGrid.message]': {
              keyup: function(textfield, event) {
                if(event.getKey()==13) {      
                  if(textfield.getValue() === "") {
                    return
                  }            
                  sendMessage(textfield);
                }
              }
            }
        });
    }
});