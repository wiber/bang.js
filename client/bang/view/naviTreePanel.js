Ext.define('bang.view.naviTreePanel', {
  extend: 'Ext.tree.Panel',
  alias: 'widget.naviTreePanel',
  initComponent: function() {    
    this.layout   = 'fit';
        
    // this.callParent(arguments) is required.  Not clear in API
    this.callParent(arguments);
  }
});