# input-validation

[![Build Status](https://travis-ci.org/any-code/input-validation.svg?branch=master)](https://travis-ci.org/any-code/input-validation)

> Very simple universal input validation module

This module has zero dependencies, is extensible and uses data attributes to target validation conditions

## Getting Started

### 1. Installation (node)

```bash

npm install input-validation

```

### 2. Examples

```javascript

    var validatior require('input-validation'),
        handlers = {
            blur: function(target) {
                target.className = validator.validate(target) ? '' : 'invalid';
            }
        }
   
```

```html

    <input name="email" data-required data-valid-email onblur="handlers.onblur(this)">

```

- **data-required**
The user must supply some value to for the input to be valid
```html
    <input data-required>
```

- **data-valid-email**
The user must supply a loosely valid email for the input to be valid
```html
    <input data-valid-email>
```

### Adding new validators

When extending input validation with new validators use camelCase without 'data' when specifying the attribute name.
```javascript
    
    var validatior require('input-validation');
    
    validator.add('greaterThanTen', function(value) {
        return value !== undefined && parseInt(value,10) > 10;
    })
    
```

The user must supply an int value greater than 10
```html
    <input data-greater-than-ten>
```



## Copyright and license
Copyright (c) 2015 [Anycode](https://anycode.io/ "Anycode") <lee@anycode.io>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
