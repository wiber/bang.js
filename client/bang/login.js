{
  main: function() {
    
    // We do not want to load anything if the view is present.
    if(Ext.bang.views.loginPanel) {
      return;
    }
        
    // Only load the controller if it hasnt been already.
    var controller = Ext.bang.util.app.getController('login');
    if(!controller.initialized) {
      remotejs.logMessage('[Client] - launching bang controller');
      controller.init();
    }
    
    Ext.bang.views.loginPanel = Ext.create('bang.view.loginPanel');
  }
}