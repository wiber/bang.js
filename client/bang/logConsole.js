{
  main: function() {
  
    // Lets define our socket.io actions first.  
    // For now, we do not unload socket actions, but we should
    //
    // We are also refreshing the grid rather carelessly, we might
    // want to cache the data for a specific timeframe
    
    socket.on('newLogMessage', function(data) {
      console.log(data);
      
      var logMessages = Ext.data.StoreManager.lookup('logMessages');
      
      logMessages.load();
    });
  
  
    // Define the application itself
    Ext.application({
      name: 'bang',
      appFolder: 'bang',
      controllers: [ 'logConsole' ],
      launch: function() {
        remotejs.logMessage('[Client] - launching logger app');
        
        var tabPanel = Ext.create('bang.view.logMessageGrid');
        Ext.bang.views.interfaceCenter.add(tabPanel);
      }
    });        
    

  }
}