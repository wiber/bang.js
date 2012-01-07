Ext.define('bang.model.client', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'timestamp', type: 'date'   },
    { name: '_id',       type: 'string' },
    { name: 'socket_id', type: 'string' },
    { name: 'user_id',   type: 'string' },
    { name: 'username',  type: 'string' },
    { name: 'handshake', type: 'string' }
  ],
  idProperty: '_id'
});