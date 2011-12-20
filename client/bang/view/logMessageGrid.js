Ext.define('bang.view.logMessageGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.logMessageGrid',
  layout: 'fit',
  store: 'bang.model.logMessages',
  columns: [
    { header: 'date',    dataIndex: 'date',   xtype: 'datefield'},
    { header: 'message', dataIndex: 'message'}
  ],
  autoShow: true,
  initComponent: function() {    
    Ext.bang.views.logMessageGrid = this;
	Ext.bang.views.interfaceCenter.add(this);

    // this.callParent(arguments) is required.  Not clear in API
    this.callParent(arguments);
  }
});