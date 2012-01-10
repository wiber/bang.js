Ext.define('bang.store.users', {
    extend: 'Ext.data.Store',
    model: 'bang.model.user',
    storeId: 'users',
    pageSize: 100,
    proxy: {
      extraParams: {},
      api: {
        read:    '/bang/users/read',
        create:  '/bang/users/create',
        update:  '/bang/users/update',
        destroy: '/bang/users/'
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