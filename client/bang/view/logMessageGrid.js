Ext.define('bang.view.logMessageGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.logMessageGrid',
  title: 'logMessageGrid',
  initComponent: function() {    
    this.columns = [
      { text: 'date',    dataIndex: 'date', xtype: 'datecolumn', format:'Y-m-d h:m:s', width: 200},
      { text: 'message', dataIndex: 'message', flex: 1}
    ];
    
    this.layout   = 'fit';
    this.closable = true;

    this.store = Ext.create('bang.store.logMessages');
    this.store.load();
    
    // this.callParent(arguments) is required.  Not clear in API
    this.callParent(arguments);
  }
});