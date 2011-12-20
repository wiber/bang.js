{
  main: function() {
      Ext.Loader.setConfig({
        enabled: true
      });

      Ext.application({
        name: 'bang',
        appFolder: 'bang',
        controllers: [ 'bang' ],
        launch: function() {
          remotejs.logMessage('[Client] - launching bang app');
          
          Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
              { xtype: 'bangPanel' }
            ]
          });
        }
      });
  }
}