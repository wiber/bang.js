(function() {
  
    var controller = Ext.bang.util.app.getController('chatConsole');
    if(!controller.initialized) {      
      controller.init();
    } 
    
    // Create the view
    if(!Ext.bang.views.chatConsole) {
      var chatConsole = Ext.create('bang.view.chatMessageGrid');
      Ext.bang.views.chatConsole = chatConsole;
      Ext.bang.views.interfaceCenter.add(chatConsole).show(); 
    }
})()