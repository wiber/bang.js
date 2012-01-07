{
  main: function() {

    if(Ext.bang.views.clientsConsole) {
      return;
    }


    socket.on('newClient', function(data) {
      var clients = Ext.data.StoreManager.lookup('clients');
      clients.load();
    });


    Ext.bang.util.app.getController('clientsConsole').init();

    remotejs.logMessage('[Client] - launching clientsConsole controller');

    var clientsConsole = Ext.create('bang.view.clientsGrid');

    Ext.bang.views.clientsConsole = clientsConsole;
    Ext.bang.views.interfaceCenter.add(clientsConsole);

  }
}