Ext.define('bang.view.interfaceEast', {
  extend: 'Ext.panel.Panel',
  title: 'Actions',
  alias: 'widget.interfaceEast',
  
  autoShow: true,
  requires: ['Ext.form.Panel'],
  
  initComponent: function() {    
    Ext.bang.views.interfaceEast = this;
    
    this.width       = 150;
    this.region      = 'east';
    this.layout      = 'fit';
    this.collapsible = true;
    this.collapsed   = true;

    // this.callParent(arguments) is required.  Not clear in API
    this.callParent(arguments);
  }
});