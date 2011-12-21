Ext.define('bang.store.logMessages', {
    extend: 'Ext.data.Store',
    model: 'bang.model.logMessage',
    items: [[ 'one', 'two' ], [ 'three', 'four' ]],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'items'
        }
    }    
});