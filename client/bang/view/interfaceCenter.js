Ext.define('bang.view.interfaceCenter', {
  extend: 'Ext.panel.Panel',
  title: 'bang panel Center',
  alias: 'widget.interfaceCenter',
  layout: 'fit',
  autoShow: true,
  requires: ['Ext.form.Panel'],
  region: 'center',
  initComponent: function() {    

    // this.callParent(arguments) is required.  Not clear in API
    this.callParent(arguments);
  }
});