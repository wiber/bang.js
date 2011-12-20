{
  main: function() {

    Ext.application({
      name: 'bang',
      appFolder: 'bang',
      controllers: [ 'interface' ],
      launch: function() {
        remotejs.logMessage('[Client] - launching interface app');

        Ext.create('Ext.container.Viewport', {
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