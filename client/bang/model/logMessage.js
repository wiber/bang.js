Ext.define('bang.model.logMessage', {
  extend: 'Ext.data.Model',
  fields: [ 
    { name: 'date',    type: 'date'   },
    { name: 'message', type: 'string' }
  ],
  idProperty: '_id',
  totalProperty: 'results'
});