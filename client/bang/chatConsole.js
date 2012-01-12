(function() {
  
    var controller = Ext.bang.util.app.getController('chatConsole');
    if(!controller.initialized) {      
      controller.init();
    } 
    
    // Create the view
    if(!Ext.bang.views.chatConsole) {
      // Add socket listener 'newChatMessage'
      socket.on('newChatMessage', function(data) {
        var chatMessages = Ext.data.StoreManager.lookup('chatMessages');
        chatMessages.load();
      });
      
      var chatConsole = Ext.create('bang.view.chatMessageGrid');
      Ext.bang.views.chatConsole = chatConsole;
      Ext.bang.views.interfaceCenter.add(chatConsole).show(); 
    }
})()