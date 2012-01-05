{
  main: function() {
  
    // First add our broadcastMessage listener
    socket.on('broadcastMessage', function(data) {
      Ext.Msg.alert('broadcastMessage', data.message);
    });
      
    Ext.Loader.setConfig({
      enabled: true
    });
      
    Ext.bang.util.app = Ext.create('Ext.app.Application', {
      name: 'bang',
      appFolder: 'bang',
      controllers: [ 'interface' ],
      launch: function() {
        remotejs.logMessage('[Client] - launching interface app');

        // Border Viewport
        Ext.bang.views.viewport = Ext.create('Ext.container.Viewport', {
          layout: 'border',
          renderTo: Ext.getBody(),
          items: [ 
            { xtype: 'interfaceWest'   },
            { xtype: 'interfaceEast'   },
            { xtype: 'interfaceCenter' }
          ]
        });    

      }
    });
    
     
  }
}