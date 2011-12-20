{
  main: function() {

    Ext.application({
      name: 'bang',
      appFolder: 'bang',
      controllers: [ 'logConsole' ],
      launch: function() {
        remotejs.logMessage('[Client] - launching logger app');
      }
    });        
  }
}