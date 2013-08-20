/*
The MIT License (MIT)

Copyright (c) 2013 wrongite

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


// Javascript OOP pattern.
// Usage: 
//   function SubClass(..) { .. }
//   SubClass = SubClass.Extend(BaseClass, additionalAttributes);
Function.prototype.Extend = function (base, attrs) {
    if (this == undefined) {
        throw ('This method should not be called without instance object.');
        return;
    }

    var fnBody = this.toString();

    // Create empty constructor.
    var fnConstructor = (function () {
        var m = fnBody.match(/function\s+(\w+)/, fnBody);
        var name = m && m[1] || '';
        var ctorFn = eval('(function ' + name + '() {} )');
        if(typeof(ctorFn) == 'function') {
            return ctorFn;
        }
        else {
            // IE8 workaround
            return eval(name);
        }
    })();
    fnConstructor.prototype = base.prototype;
    this.prototype = new fnConstructor();

    // Assign the reference to base class.
    this.prototype.__base__ = function () {
        base.apply(this, arguments);
    }
    this.__base__ = base;

    // Assigned attributes
    if (attrs) {
        if(typeof(Object.getOwnPropertyNames) == 'function') {
            var attrsNames = Object.getOwnPropertyNames(attrs);
            for (var idx in attrsNames) {
                var key = attrsNames[idx];
                Object.defineProperty(this.prototype, key, Object.getOwnPropertyDescriptor(attrs, key));
            }
        }
        else {
            for (var key in attrs) {
                if(key != 'constructor' && attrs.hasOwnProperty(key)) {
                    this.prototype[key] = attrs[key];
                }
            }
        }
    }
    return this;
}
