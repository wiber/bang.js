Ext.define('bang.model.chatMessage', {
  extend: 'Ext.data.Model',
  fields: [ 
    { name: 'timestamp', type: 'date'   },
    { name: 'user_id',  type: 'string' },
    { name: 'msg',   type: 'string' }
  ],
  idProperty: '_id'
});