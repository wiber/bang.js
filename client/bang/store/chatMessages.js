Ext.define('bang.store.chatMessages', {
    extend: 'Ext.data.Store',
    model: 'bang.model.chatMessage',
    storeId: 'chatMessages',
    pageSize: 100,
    proxy: {
      extraParams: {},
      api: {
        read:    '/bang/chatMessages/read',
        create:  '/bang/chatMessages/create',
        update:  '/bang/chatMessages/update',
        destroy: '/bang/chatMessages/destroy'
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