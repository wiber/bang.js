Ext.define('bang.store.clients', {
    extend: 'Ext.data.Store',
    model: 'bang.model.client',
    storeId: 'clients',
    pageSize: 100,
    proxy: {
      extraParams: {},
      api: {
        read:    '/bang/clients/read',
        create:  '/bang/clients/create',
        update:  '/bang/clients/update',
        destroy: '/bang/clients/destroy'
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