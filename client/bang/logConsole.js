(function() {

    // This first checks to see if the view exists or not
    if(!Ext.bang.views.logMessageGrid) {
      var logMessageGrid = Ext.create('bang.view.logMessageGrid');
      Ext.bang.views.logMessageGrid = logMessageGrid;
        
      Ext.bang.views.interfaceCenter.add(logMessageGrid).show();    
    }
      
    // This checks to see if the controller and io are initialized
    var controller = Ext.bang.util.app.getController('logConsole');
    if(!controller.initialized) {
      controller.init();      
      socket.on('newLogMessage', function(data) {
        var logMessages = Ext.data.StoreManager.lookup('logMessages');
        logMessages.load();
      });      
    }
})()