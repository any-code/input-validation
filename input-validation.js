(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports'], function (exports) {
            factory((root.validator = exports));
        });
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(exports);
    } else {
        // Browser globals
        factory((root.validator = {}));
    }
}(this, function (exports, riot) {

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

}));
