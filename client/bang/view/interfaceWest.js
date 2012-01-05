Ext.define('bang.view.interfaceWest', {
  extend: 'Ext.panel.Panel',
  title: 'Navigation',
  alias: 'widget.interfaceWest',

  autoShow: true,
  requires: ['Ext.form.Panel'],
  
  initComponent: function() {    

    this.collapsible  = true;
    this.collapsed    = true;
    this.region       = 'west';
    this.width        = 150;
    this.layout       = 'fit';
    this.animCollapse = 1000;

    Ext.bang.views.interfaceWest = this;

    // this.callParent(arguments) is required.  Not clear in API
    this.callParent(arguments);
  }
});