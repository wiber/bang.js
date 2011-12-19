Ext.define('bang.controller.bang', {
    extend: 'Ext.app.Controller',
    models: ['bang'],
    stores: ['bang'],
    views:  ['bang'],
    init: function() {
        remotejs.logMessage('Initialized bang controller, view logic should go here');
        
        this.control({
          'bangPanel button[action=login]': {
            click: function() { console.log('submit dmanit') }
          }
        });
    }
});