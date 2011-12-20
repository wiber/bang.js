Ext.define('bang.view.interfaceCenter', {
  extend: 'Ext.tab.Panel',
  alias: 'widget.interfaceCenter',
  layout: 'fit',
  autoShow: true,
  region: 'center',
  initComponent: function() {    
    Ext.bang.views.interfaceCenter = this;

    // this.callParent(arguments) is required.  Not clear in API
    this.callParent(arguments);
  }
});