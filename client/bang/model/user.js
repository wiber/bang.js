Ext.define('bang.model.user', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'timestamp', type: 'date'   },
    { name: '_id',       type: 'string' },
    { name: 'username',  type: 'string' },
    { name: 'userHash',  type: 'string' }
  ],
  idProperty: '_id'
});