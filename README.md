timepicker as a jQuery plugin
=============================
This is a simple timepicker as a jQuery plugin. This also requires bootstrap.css for compatible layout with many browsers.

Requirements
------------
- jQuery
- Bootstrap.css

How to use
----------
Include timepicker.css and timepicker.js and call the following method after the include directive.
```javascript
$(".inputs-for-time").timepicker(options)
```
You can customize your timepicker by giving a parameter ```options``` which is a javascript object. It's paramters you can configure
shows below.

Option
------
- **ampmText**
Strings used for am/pm symbol.
default: { am:"am", pm:"pm", AM:"AM", PM:"PM" }

- **hourHeaderText**
String used for the header of hours.
default: ""

- **minHeaderText**
String used for the header of minutes.
default: ""

- **okButtonText**
String used for the ok-button.
default: Check mark "&#10004;"

- **cancelButtonText**
String used for the cancel-button.
default: X mark "&#10005;"

- **hourStep**
Step of hours in the select of hours.
default: 1

- **minStep**
Step of minutes in the select of minutes.
default: 1
