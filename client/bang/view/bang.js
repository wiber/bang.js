Ext.define('bang.view.bang', {
  extend: 'Ext.window.Window',
  title: 'bang panel',
  alias: 'widget.bangPanel',
  layout: 'fit',
  autoShow: true,
  requires: ['Ext.form.Panel'],
  initComponent: function() {    
    
    var form = Ext.create('Ext.form.Panel', {
      url: '/bang/login',
      padding: '5 5 0 5',
      border: false,
      style: 'background-color: #fff;',
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
          width: 420
        },
        {
          xtype: 'textfield',
          inputType: 'password',
          name : 'password',
          fieldLabel: 'Password',
          width: 420
        }
      ],
      buttons: [
        {
          text: 'Login',
          formBind: true,
          action: login
        },
        {
          text: 'Cancel',
          scope: this,
          handler: this.close
        }
      ]
    });
      
    this.items = [ form ];
    this.width  = 492;
    this.height = 530;
    // this.callParent(arguments) is required.  Not clear in API
    this.callParent(arguments);
  }
});