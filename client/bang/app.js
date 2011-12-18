{
  main: function() {
  
    // Lets load the dependencies first
    var request = { 
      js: '/controller/bang.js', 
      app: 'bang'
    };
    
    remotejs.getJS(request, function(provider, response) {
      var obj = Ext.JSON.decode(response.result);
      
      Ext.define('bang.controller.bang', obj);
      
      Ext.application({
        name: 'bang',
        controllers: [ 'bang' ],
        launch: function() {
          console.log('launching app');
        },
        onLaunch: function() {
          console.log('onLaunch');
        }
      });    
    });
  }
}