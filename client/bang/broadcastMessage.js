(function() { 

    // Launch the controller if it hasnt been already
    var controller = Ext.bang.util.app.getController('broadcastMessage');
    if(!controller.initialized) {
      controller.init();
    }
    
    if(!Ext.bang.views.broadcastMessagePanel) {
      Ext.bang.views.broadcastMessagePanel = Ext.create('bang.view.broadcastMessagePanel');        
    }    
})()