{
  main: function() {
    Ext.bang.util.app.getController('login').init();
    
    remotejs.logMessage('[Client] - launching bang app');
          
    Ext.create('bang.view.loginPanel');    
  }
}