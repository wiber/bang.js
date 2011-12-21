Ext.define('bang.view.bang', {
  extend: 'Ext.window.Window',
  alias: 'widget.bangPanel',
  layout: 'fit',
  autoShow: true,
  requires: ['Ext.form.Panel'],
  initComponent: function() {    
        
    this.items = [
      {
        xtype: 'form',
        padding: '5 5 0 5',
        border: false,
        style: 'background-color: #fff;',
        url: '/bang/login',
        items: [
          {
            xtype: 'box',
            autoEl: {
              tag: 'div',
              html: '<img src="img/logo.jpg">&nbsp;\n<br>&nbsp;<br>'
            }
          },            
          {
            xtype: 'textfield',
            name : 'username',
            fieldLabel: 'Username',
            value: 'test',
            width: 420
          },
          {
            xtype: 'textfield',
            inputType: 'password',
            name : 'password',
            fieldLabel: 'Password',
            value: 'test',
            width: 420
          }
        ]
      }
    ];

    this.buttons = [
      {
        text: 'Login',
        formBind: true,
        action: 'login'
      }
    ];    
    
    this.width  = 492;
    this.height = 550;
    // this.callParent(arguments) is required.  Not clear in API
    this.callParent(arguments);
  }
});