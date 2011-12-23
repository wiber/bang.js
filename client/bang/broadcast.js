{
  main: function() {
 
      Ext.application({
        name: 'bang',
        appFolder: 'bang',
        controllers: [ 'broadcast' ],
        launch: function() {
          remotejs.logMessage('[Client] - launching broadcast app');
          
          Ext.create('bang.view.broadcastPanel');
        }
      });
  }
}