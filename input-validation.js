function Module(exports) {
    var _reference = [];

    /*
    Default Validators
     */
    validator('required', function(value) {
        return value !== undefined && value.length > 0;
    })

    validator('validEmail', function(value) {
        return !!value.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
    })

    /*
     Public Methods
     */

    exports.add = validator;
    exports.which = whichConditions;
    exports.validate = function(element) {
        var valid = true,
            conditions = whichConditions(element);

        if (conditions.length > 0) {
            var satisfied = 0;
            for (var cx in conditions) {
                satisfied = satisfied + exports[conditions[cx]].call(null, element.value)
            }
            valid = conditions.length === satisfied;
        }
        return valid;
    }


    function validator(name, fn) {
        _reference.push(name);
        exports[name] = fn;
    }

    function whichConditions(element) {
        var conditions = [],
            index;

        for (index in element.dataset) {
            if (_reference.indexOf(index) > -1) {
                conditions.push(index)
            }
        }
        return conditions;
    }
}

Module.prototype.global = "validator";

// Module UMD Loader
(function (g, f) {
    var d=Module.prototype.dependencies,gn=Module.prototype.global
    if (typeof define==='function'&&define.amd){define(['exports'].concat(d||[]),f)}
    else if (typeof exports==='object'&&typeof exports.nodeName!=='string'){f.apply(this,[exports].concat(d?d.map(require):[]))}
    else {f.apply(this, [(g[gn]={})].concat(d?d.map(function(d){return g[d]}):[]))}
}(this, Module));
