{
  main: function() {
 
    if(Ext.bang.views.broadcastMessagePanel) {
      return;
    }
 
    Ext.bang.util.app.getController('broadcastMessage').init();
    
    remotejs.logMessage('[Client] - launching broadcast controller');
          
    Ext.bang.views.broadcastMessagePanel = Ext.create('bang.view.broadcastMessagePanel');    
  }
}