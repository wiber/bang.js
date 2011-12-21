Ext.define('bang.view.logMessageGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.logMessageGrid',
  title: 'logMessageGrid',
  initComponent: function() {    
    this.columns = [
    { header: 'date',    dataIndex: 'date'},
    { header: 'message', dataIndex: 'message'}
    ];
    
    this.layout   = 'fit';
    this.closable = true;

    this.store = Ext.create('bang.store.logMessages');
    
    // this.callParent(arguments) is required.  Not clear in API
    this.callParent(arguments);
  }
});