timepicker as a jQuery plugin
=============================

<img src="https://github.com/E-Kohei/timepicker/screenshots/timepicker_24.png" alt="timepicker"/>
<img src="https://github.com/E-Kohei/timepicker/screenshots/timepicker_12.png" alt="timepicker"/>

This is a simple timepicker as a jQuery plugin. This also requires bootstrap.css for compatible layout with many browsers. 
 
This timepicker widget has two select elements; one is for hours (hour-select) and the other is for minutes (minute-select). Some typical timepickers in other libraries have only one select-like element and let users to select one option of time, which makes it defficult to select time in minutes. 
Because my timepicker has select elements for both of hours and minutes, it's easy to select times in minutes. You can also select am/pm  by setting an option ```use12HourSelect : true```.

Requirements
------------
- jQuery
- Bootstrap.css

How to use
----------
Include timepicker.css and timepicker.js and call the following method after the include directive.
```javascript
$(".inputs-for-time").timepicker(options);
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
default: "hour"

- **minHeaderText** 
String used for the header of minutes. 
default: "minute"

- **okButtonText** 
String used for the ok-button. 
default: Check mark \&\#10004: "&#10004;"

- **cancelButtonText**  
String used for the cancel-button.  
default: X mark: "&#10005;"

- **minTime/maxTime**
Minimum time and maximum time users can select. 
default: 
  minTime: null 
  maxTime: null

- **hourStep**  
Step of hours in the hour-select. If minTime is set, hour-select starts from minTime's hour. For example, if minTime = "15:30" and hourStep = 2, hours in the hour-select will be 15, 17, 19, ... 
default: 100

- **minStep**  
Step of minutes in the minute-select. If minTime is set and the first hour is selected, minute-select starts from the smallest multiple of minStep which is larger than minTime's minute. For example, if minTime = "15:30", minStep = 7 and you select 15 in the hour-select, minutes in the minute-select will be 35, 42, 49, ...  
default: 1

- **timeStep**  
Step of minutes in the total time range. This is similar to minStep, but timeStep affects options of the minute-select every time the selected hour has changed. For example, if minTime = "15:30" and timeStep = 7, minutes in the minute-select will be 30, 37, 44, ..., 58 if you select 15 in hour-select; 5, 12, 19, ..., 54 if you select 16 in hour-select; etc. 
timeStep is prior to hourStep and minStep. That is, if timeStep is set, hourStep and minStep are ignored. 
default: null

- **disableTimeRanges** 
Disable to select specified time ranges. This object must be a list of time pairs, such as ```[["12:00", "15:59"], ["17:30", "20:14"]]```. Both of the start and the end will be disabled. 
default: null 

- **scrollDefault** 
Time to scroll to when the timepicker is showed. For example, if scorllDefault = "15:30", the hour-select scroll to 15 and the minute-select scroll to 30. If the input element has time value, the timepicker scroll to the value instead. 
default: null 

- **selectOnBlur** 
Select the selected hour and minute when both of the input element and the timepicker lost focus. 
default: false 

- **selectSize** 
Size of the hour-select and minute-select. 
default: 8 

- **timeFormat** 
String format of time. This format is same as PHP's date() format syntax except using a character '%' for placeholders. 
default: "%H:%i" 

- **use12HourClock** 
Use 12-hour clock. If set true, a new button to change am/pm is added to the timepicker and the hour-select's range changes to 12, 1, 2, ... , 11. Of cause, this is compatible with other options.  
default: false 

Methods
-------
- **option** 
Change the current settings.
```javascript
$(".inputs-for-time").timepicker("option", { hourStep:5, minStep:15 });
```

- **show** 
Show a timepicker if the input element is already set up for the timepicker.
```javascript
$(".inputs-for-time").timepicker("show");
```

- **hide** 
Hide the timepicker if it is currently showed.
```javascript
$(".inputs-for-time").timepicker("hide");
```

- **remove** 
Hide the timepicker and unbind it from the input element.
```javascript
$(".inputs-for-time").timepicker("remove");
```

Events
------
- **change** 
This is native onchange event for the input element. Called even if the input value has changed by the timepicker. 

- **toggleAmpm** 
Called when am/pm has changed by clicking the am/pm button. You can use this event only when use12HourClock is true. 

- **selectHour** 
Called when an option of the hour-select changed. 

- **selectMinute** 
Called when an option of the minute-select changed.
