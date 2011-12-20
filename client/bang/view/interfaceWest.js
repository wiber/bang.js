Ext.define('bang.view.interfaceWest', {
  extend: 'Ext.panel.Panel',
  title: 'bang panel West',
  alias: 'widget.interfaceWest',
  layout: 'fit',
  autoShow: true,
  requires: ['Ext.form.Panel'],
  region: 'west',
  width: 150,
  initComponent: function() {    

    Ext.bang.views.interfaceWest = this;

    // this.callParent(arguments) is required.  Not clear in API
    this.callParent(arguments);
  }
});