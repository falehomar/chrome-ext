var ext = ext || {}

ext.Message = function(name) {
    this.name = name
}

ext.ContentScriptDelegate = common.extend(common.Super, {
    constructor: function() {
        this.assert(this.hasOwnProperty('active'))
        this.assert(this.hasOwnProperty('currentWindow'))

        var _this = this

        for (var methodName in Object.getPrototypeOf(_this)) {
            if (Object.getPrototypeOf(_this)[methodName] instanceof ext.Message) {
                (function(methodName){
                    _this[methodName] = function(callback) {
                        var args = Array.prototype.slice.call(arguments)
                    var messageName = methodName
                    chrome.tabs.query({
                        active: _this.active,
                        currentWindow: _this.currentWindow
                    }, function(tabs) {


                        chrome.tabs.sendMessage(tabs[0].id, {
                            name: messageName,
                            arguments: args.splice(args.length-1)
                        }, function(response) {
                            // pass result to callback
                            if (response) {
                                callback(response.value)
                            } else {
                                callback(response)
                            }

                            console.log(response);
                        })
                    })

                }
                })(methodName)

            }
        }


    }
})

ext.ContentScript = common.extend(common.Super, {

    constructor: function() {
        var _this = this

        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {


                    sendResponse({
                        value: _this.evaluate(request.name,request.arguments)
                    })
            })
    },
    evaluate: function(name, args) {

        var method = Object.getPrototypeOf(this)[name]
        return method.call(args)

    }

})

ext.EventPage = common.extend(common.Super, {
    constructor: function() {
        var _this = this
            // Set up context menu tree at install time.
        chrome.runtime.onInstalled.addListener(function() {

            if (_this.contextMenu) {

                _this.assert(_this.contextMenuListener)
                chrome.contextMenus.onClicked.addListener(_this.contextMenuListener)

                _this.contextMenu.forEach(function(menuItem) {
                    chrome.contextMenus.create(menuItem)
                })
            }
        })
    }
})
