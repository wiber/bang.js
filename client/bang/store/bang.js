Ext.define('bang.store.bang', {
    extend: 'Ext.data.Store',
    model: 'bang.model.bang',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'items'
        }
    }    
});