Ext.define('bang.view.chatMessageGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.chatMessageGrid',
  title: 'chatConsole',
  initComponent: function() {    
    this.columns = [
      { text: 'date',     dataIndex: 'timestamp', xtype: 'datecolumn', format:'m-d - H:i:s', width: 100},
      { text: 'username', dataIndex: 'user_id.username', width: 125},
      { text: 'message',  dataIndex: 'msg', flex: 1}
    ];
    
    this.layout   = 'fit';
    this.closable = true;

    this.store = Ext.create('bang.store.chatMessages');
    
    this.tbar = [
      { xtype: 'textfield', flex: 1, id: 'message', enableKeyEvents: true }
    ];
    
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