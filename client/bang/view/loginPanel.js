Ext.define('bang.view.loginPanel', {
  extend: 'Ext.window.Window',
  alias: 'widget.loginPanel',
  layout: 'fit',
  autoShow: true,
  requires: ['Ext.form.Panel'],
  initComponent: function() {    
        
    this.items = [
      {
        xtype: 'form',
        padding: '15 15 15 25',
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
            width: 470
          },
          {
            xtype: 'textfield',
            inputType: 'password',
            name : 'password',
            fieldLabel: 'Password',
            value: 'test',
            width: 470
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
    
    this.width  = 540;
    this.height = 375;
    // this.callParent(arguments) is required.  Not clear in API
    this.callParent(arguments);
  }
});