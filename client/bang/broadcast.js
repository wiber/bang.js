{
  main: function() {
 
    Ext.bang.util.app.getController('broadcast').init();
    
    remotejs.logMessage('[Client] - launching broadcast app');
          
    Ext.create('bang.view.broadcastPanel');    
  }
}