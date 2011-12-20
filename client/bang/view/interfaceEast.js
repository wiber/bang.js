Ext.define('bang.view.interfaceEast', {
  extend: 'Ext.panel.Panel',
  title: 'bang panel East',
  alias: 'widget.interfaceEast',
  layout: 'fit',
  autoShow: true,
  requires: ['Ext.form.Panel'],
  region: 'east',
  width: 150,
  initComponent: function() {    

    // this.callParent(arguments) is required.  Not clear in API
    this.callParent(arguments);
  }
});