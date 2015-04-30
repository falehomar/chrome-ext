var vfs  = vfs || {}


// content script interface
vfs.ContentScriptDelegate = common.extend(ext.ContentScriptDelegate)

vfs.ContentScriptDelegate.prototype.processPage = new ext.Message('processPage')


var eventPage = new ext.EventPage({

    contextMenu:[{"title": "VFS", "id": "vfs"}],

    contextMenuListener:function(info,tab) {
        if(info.menuItemId === 'vfs') {
            var contentScriptDelegate = new vfs.ContentScriptDelegate({active:true,currentWindow:true})
            contentScriptDelegate.processPage(function(value){
                console.log(value)
            })
        }
    }
})
