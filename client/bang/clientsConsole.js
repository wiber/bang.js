(function() {

    // Create the view
    if(!Ext.bang.views.clientsConsole) {
      var clientsConsole = Ext.create('bang.view.clientsGrid');
      Ext.bang.views.clientsConsole = clientsConsole;
      Ext.bang.views.interfaceCenter.add(clientsConsole).show(); 
    }
  
    var controller = Ext.bang.util.app.getController('clientsConsole');
    if(!controller.initialized) {      
      controller.init();
      
      socket.on('newClient', function(data) {
        var clients = Ext.data.StoreManager.lookup('clients');
        clients.load();
      });
    } 
})()