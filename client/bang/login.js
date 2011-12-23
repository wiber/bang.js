{
  main: function() {
      Ext.application({
        name: 'bang',
        appFolder: 'bang',
        controllers: [ 'login' ],
        launch: function() {
          remotejs.logMessage('[Client] - launching bang app');
          
          Ext.create('bang.view.loginPanel');
        }
      });
  }
}