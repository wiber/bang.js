(function() {

    var controller = Ext.bang.util.app.getController('usersConsole');
    if(!controller.initialized) {
      remotejs.logMessage('[Client] - launching usersConsole controller');  
      controller.init();
    }   
    
    if(!Ext.bang.views.usersConsole) {
      var usersConsole = Ext.create('bang.view.usersGrid');

      Ext.bang.views.usersConsole = usersConsole;
      Ext.bang.views.interfaceCenter.add(usersConsole).show(); 
    }    
})()