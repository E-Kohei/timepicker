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

- **minTime/maxTime**
Minimum time and maximum time users can select.
default:
  minTime: null
  maxTime: null

- **hourStep**  
Step of hours in the hour-select. If minTime is set, the first hour in the hour-select will be minTime's hour. For example, if minTime = "15:30" and hourStep = 2, hours in the hour-select will be 15, 17, 19, ...
default: 1

- **minStep**  
Step of minutes in the minute-select. If minTime is set and the first hour is selected, the first minute in the minute-select will be the smallest multiple of minStep which is larger than minTime's minute. For example, if minTime = "15:30", minStep = 7 and you select 15 in the hour-select, minutes in the minute-select will be 35, 42, 49, ...
default: 1

- **timeStep**  
Step of minutes in the total time range. This is similar to minStep, but timeStep affects options of the minute-select every time the selected hour has changed. For example, if minTime = "15:30" and timeStep = 7, minutes in the minute-select will be 30, 37, 44, ...,58 if you select hour 15; 5, 12, 19, ..., 54 if you select hour 16, etc.
timeStep is prior to hourStep and minStep. That is, if timeStep is set, hourStep and minStep is ignored.
default: null

- **disableTimeRanges**  

- **scrollDefault**  

- **selectOnBlur**  

- **selectSize**  

- **timeFormat**  

- **use12HourClock**  
