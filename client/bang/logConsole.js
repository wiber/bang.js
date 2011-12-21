{
  main: function() {
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