Ext.define('bang.view.broadcastMessagePanel', {
  extend: 'Ext.window.Window',
  alias: 'widget.broadcastMessagePanel',
  layout: 'fit',
  autoShow: true,
  requires: ['Ext.form.Panel'],
  initComponent: function() {    
    this.title = 'broadcastMessage';
    this.items = [
      {
        xtype: 'form',
        padding: '5 5 0 5',
        border: false,
        style: 'background-color: #fff;',
        url: '/bang/broadcastMessage',
        items: [           
          {
            xtype: 'textareafield',
            name : 'message',
            width: 420,
            anchor: '100% 100%'
          }
        ]
      }
    ];

    this.buttons = [
      {
        text: 'Submit Message',
        formBind: true,
        action: 'submit'
      }
    ];    
    
    this.width  = 492;
    this.height = 550;
    // this.callParent(arguments) is required.  Not clear in API
    this.callParent(arguments);
  }
});