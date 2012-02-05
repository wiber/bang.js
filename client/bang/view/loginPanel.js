Ext.define('bang.view.loginPanel', {
  extend: 'Ext.window.Window',
  alias: 'widget.loginPanel',
  layout: 'fit',
  autoShow: true,
  requires: ['Ext.form.Panel'],
  initComponent: function() {    
    this.modal = true,
    this.items = [
      {
        xtype: 'form',
        padding: '15 15 15 25',
        border: false,
        style: 'background-color: #fff;',
        url: '/bang/login',
        
        // Insert our fields
        items: [
          {
            xtype: 'box',
            autoEl: {
              tag: 'div',
              html: '<img src="img/logo.jpg">&nbsp;\n<br>&nbsp;<br>'
                +   '<center><br><font size=2>'
                +   'This system encrypts your password before sending'
                +   '</center><br><br>'
            }
          },            
          {
            xtype: 'textfield',
            name : 'username',
            fieldLabel: 'Username',
            id: 'loginPanel.username',
            width: 470
          },
          {
            xtype: 'textfield',
            inputType: 'password',
            name : 'password',
            fieldLabel: 'Password',
            id: 'loginPanel.password',
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
    this.height = 475;
    // this.callParent(arguments) is required.  Not clear in API
    this.callParent(arguments);
  }
});