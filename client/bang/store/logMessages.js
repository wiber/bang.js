Ext.define('bang.store.logMessages', {
    extend: 'Ext.data.Store',
    model: 'bang.model.logMessage',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'items'
        }
    }    
});