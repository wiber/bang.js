{
  main: function() {
  
    // We do not want to load anything if the view is present.
    if(Ext.bang.views.loginPanel) {
      return;
    }
        
    remotejs.logMessage('[Client] - launching bang controller');
    
    Ext.bang.util.app.getController('login').init();
    
    Ext.bang.views.loginPanel = Ext.create('bang.view.loginPanel');
  }
}