(function() {
         
    // Only load the controller if it hasnt been already.
    var controller = Ext.bang.util.app.getController('login');
    if(!controller.initialized) {
      controller.init();
    }
    
    if(!Ext.bang.views.loginPanel) {
      Ext.bang.views.loginPanel = Ext.create('bang.view.loginPanel');    
    }    
})()