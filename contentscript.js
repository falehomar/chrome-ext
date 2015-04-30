var vfs  = vfs || {}

vfs.ContentScript = common.extend(ext.ContentScript,{
    processPage:function(){
        console.log("process page called",arguments)
    }
})

var contentScript = new vfs.ContentScript()
