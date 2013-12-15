---
title: 'Accelerate : Flash / Arduino Based Speed Detector'
author: mikechambers
layout: post
permalink: /2010/08/11/accelerate-flash-arduino-based-speedometer/
categories:
  - General
tags:
  - adobeair
  - arduino
  - flash
---


Well, as you may have noticed from my [blog posts the past week or two][1], I have been playing around with Flash and [Arduino][2]. I have a ton of ideas and projects in mind, but wanted to start on something that wouldn&#8217;t be too overwhelming, and would give me a good opportunity to learn the basics. Well, I have finished my first project, and wanted to share it with everyone. It is a Flash / Arduino based speed detector with clients for Mac, Windows and Android based devices (via [Adobe AIR 2.5 beta][3]).

I have put together a quick video that shows the app in action:  
<!--more-->

  
View HD version [here][4].

Here is how it works. I have an Arduino Duemilanove with ATMega328 which has two photo-resistors connected (with a 10k pull down resistor). I set up two laser pointers to shine a laser directly onto the photo-resistor (which is enclosed within a dark box). The Arduino monitors the values returned from the light sensor, and watches for any changes that indicate that the laser bean has been broken. When both laser beams are broken, the Arduino calculates the amount of time between when each sensor was tripped. It then sends that value to the Adobe AIR based client, which is connected to the Arduino via USB / Serial port and a serial port proxy (in the case, TinkerProxy).

[<img src="http://farm5.static.flickr.com/4143/4884468886_c93a9daae1.jpg" width="500" height="291" alt="" />][5]

You can download [the schematic from the project&#8217;s repository][6].

Once the AIR application (running on the desktop, or an Android based device) gets the message from the Arduino that both sensors have been tripped, the AIR app takes the time that it took for each sensor to be tripped, and combines it with the distance between the sensors (in inches), and uses that data to determine the speed.

[<img src="http://farm5.static.flickr.com/4134/4884434876_ae2fa2dc45.jpg" width="500" height="306" alt="Accelerate Screenshot" />][7]

While I put this together mostly for fun, it is actually useful for tweaking RC car gears and setup. You can use it to help tweak both maximum speed, as well as acceleration / starting speed. Unfortunately, I dont know enough about working on RC cars yet to actually take advantage of the data, but it is fun to hack around with regardless.

I have [posted all of the Flash and Arduino code on GitHub][8], and released it under an open source [MIT License][9]. The AIR application is built using Flex 4, and although Flex 4 is not optimized for mobile, it performs really well on my Nexus One.

When looking at the Arduino code, keep in mind this is my first Arduino project, and the code could use some optimization, refactoring. (post in the comments if you have any suggestions).

I have posted some of the lessons learned from the projects in [another blog post][10] , so make sure to check that out.

Big thanks to Ben Griffith, Geoffrey Mattie who made some suggestions to clean up the design and UI of the app.

*   [View video of Accelerate project.][11]
*   [Code Repository for all code.][8]
*   [Images of Project.][12]

If you have any questions or suggestions about the project, just post them in the comments.

Update: Changed title since it is really more of a speed detector than speedometer.

 [1]: http://www.mikechambers.com/blog/tag/arduino/
 [2]: http://www.arduino.cc
 [3]: https://prerelease.adobe.com/callout/default.html?callid={AEF64EB4-A977-4317-909A-14AD8014BA21}
 [4]: http://vimeo.com/14053460?hd=1
 [5]: http://www.flickr.com/photos/mikechambers/4884468886/ "Untitled by mike.chambers, on Flickr"
 [6]: http://github.com/mikechambers/Accelerate/tree/master/src/arduino/eagle/
 [7]: http://www.flickr.com/photos/mikechambers/4884434876/ "Accelerate Screenshot by mike.chambers, on Flickr"
 [8]: http://github.com/mikechambers/Accelerate
 [9]: http://www.opensource.org/licenses/mit-license.php
 [10]: http://www.mikechambers.com/blog/2010/08/06/flash-arduino-tips-tricks-and-gotchas/
 [11]: http://vimeo.com/14053460
 [12]: http://www.flickr.com/photos/mikechambers/sets/72157624582669047/