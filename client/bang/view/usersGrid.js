Ext.define('bang.view.usersGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.usersGrid',
  title: 'usersConsole',
  initComponent: function() {    
    this.columns = [
      { text: 'username', dataIndex: 'username', width: 200 },
      { text: '_id', dataIndex: '_id', flex: 1 }
    ];
    
    this.layout   = 'fit';
    this.closable = true;

    this.store = Ext.create('bang.store.users');
    
    
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