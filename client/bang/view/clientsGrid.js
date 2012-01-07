Ext.define('bang.view.clientsGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.clientsGrid',
  title: 'clientsGrid',
  initComponent: function() {    
    this.columns = [
      { text: 'timestamp',    dataIndex: 'timestamp', xtype: 'datecolumn', format:'Y-m-d - H:i:s', width: 200 },
      { text: 'username', dataIndex: 'username', width: 200 },
      { text: 'socket_id', dataIndex: 'socket_id', flex: 1 }
    ];
    
    this.layout   = 'fit';
    this.closable = true;

    this.store = Ext.create('bang.store.clients');
    
    
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