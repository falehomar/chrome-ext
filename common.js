var common = common || {}

common.Super = function(){

    if(this){
        for( var prop in arguments[0]){
            if(arguments[0].hasOwnProperty(prop)){
                this[prop] = arguments[0][prop]
            }
        }
    }
}

common.extend = function(Super,def){
    function f(){
        Super.apply(this,arguments)
        if(def)
            def.constructor.apply(this,arguments)
    }
    f.prototype = Object.create(Super.prototype)
    for(var prop in def){
        f.prototype[prop] = def[prop]
    }
    return f
}

common.Super.prototype.assert = function(){
    if(!arguments[0]) throw new Error(arguments[1]?arguments[1]:'assertion failed')
}
