{
  main: function() {
 
    if(Ext.bang.views.broadcastPanel) {
      return;
    }
 
    Ext.bang.util.app.getController('broadcast').init();
    
    remotejs.logMessage('[Client] - launching broadcast controller');
          
    Ext.bang.views.broadcastPanel = Ext.create('bang.view.broadcastPanel');    
  }
}