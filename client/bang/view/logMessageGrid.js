Ext.define('bang.view.logMessageGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.logMessageGrid',
  title: 'logConsole',
  initComponent: function() {    
    this.columns = [
      { text: 'date',    dataIndex: 'date', xtype: 'datecolumn', format:'Y-m-d - H:i:s', width: 200},
      { text: 'message', dataIndex: 'message', flex: 1}
    ];
    
    this.layout   = 'fit';
    this.closable = true;

    this.store = Ext.create('bang.store.logMessages');
    
    
    this.dockedItems = [
      {
        xtype: 'pagingtoolbar',
        store: this.store,
        dock:  'bottom',
        displayInfo: true
      }
    ];
    
    this.store.load();
    
    // this.callParent(arguments) is required.  Not clear in API
    this.callParent(arguments);
  }
});