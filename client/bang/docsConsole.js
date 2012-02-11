(function() {

    var controller = Ext.bang.util.app.getController('docsConsole');
    if(!controller.initialized) {
        controller.init();
    }

    // Create the view
    if(!Ext.bang.views.docsConsole) {

        var docsConsole = Ext.create('bang.view.docsPanel');
        Ext.bang.views.docsConsole = docsConsole;
        Ext.bang.views.interfaceCenter.add(docsConsole).show();
    }
})()