Ext.define('bang.store.logMessages', {
    extend: 'Ext.data.Store',
    model: 'bang.model.logMessage',
    storeId: 'logMessages',
    pageSize: 100,
    proxy: {
      extraParams: {},
      api: {
        read:    '/bang/logMessages/read',
        create:  '/bang/logMessages/create',
        update:  '/bang/logMessages/update',
        destroy: '/bang/logMessages/'
      },
      type: 'ajax',
      reader: {
        type: 'json',
        root: 'items',
        totalProperty: 'results'
      },
      writer: {
        type: 'json'
      }
    }  
});