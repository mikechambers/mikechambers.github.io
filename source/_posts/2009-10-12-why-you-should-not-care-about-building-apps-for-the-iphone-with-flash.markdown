---
title: Why you should NOT care about building apps for the iPhone with Flash
author: mikechambers
layout: post
permalink: /2009/10/12/why-you-should-not-care-about-building-apps-for-the-iphone-with-flash/
categories:
  - General
tags:
  - 10.1
  - android
  - flashplayer
  - iphone
  - max
  - palmpre
  - rim
---


The news from Adobe MAX 2009 that probably generated the most buzz and discussion online was the announcement that [Flash CS5 will have support for outputting applications for the iPhone][1]. While I am really excited about the news, and the work we are doing around the iPhone, I am here to tell you that you should not care about it.  
<!--more-->

  
Let me repeat that:

You should NOT care about using Flash to build applications for the iPhone.

Hear me out on this. One of the major advantages of using Flash has always been that you can create your content, and then be confident that it will run consistently across different platforms and browsers. However, in the past, if you wanted to deploy to mobile platforms or devices, you would have to target a different player (most likely based on Flash Lite), which lagged behind the capabilities of the desktop player. However, the fragmentation between desktop and mobile players is about to change.

I think the biggest news out of Max last week was not the Flash applications for iPhone announcements, but rather the [unveiling of Flash Player 10.1][2]. Not only will Flash Player 10.1 run across desktop operating systems and browsers, but it will also be available on the newest generation of smart phones. This includes Palm Pre, as well as Android and [RIM][3] based devices. Furthermore, the iPhone work, as well as Adobe AIR 2.0 are both also based on Flash Player 10.1.

Thus, not only will you be able to create content and target multiple browsers and operating systems, but you will also be able to target mobile devices, as well as desktops.

Now, it is important to remember that devices, such as the Palm Pre and iPhone have significantly slower processors and less memory, as well as smaller screens than desktop machines. However, if you design and develop with these limitations in mind, then you will be able to leverage you content anywhere that Flash Player 10.1 is available.

Furthermore, if you are leveraging functionality that is only available on a subset of devices, then of course, your content can only leverage that functionality on devices where it is supported. This is the same as on the desktop when using APIs to access the user&#8217;s microphone and webcam. If the target platform supports the functionality then you can use the APIs to access that functionality. (The Flash Player includes APIs to check at runtime if specific functionality is supported on any particular target platform).

The important thing is that the Flash Player exposes the APIs across platforms in a consistent manner. So, for example, if you want to use multitouch functionality in Flash Player 10.1, then you will use the same APIs regardless of whether your content is running on the desktop, in a browser, on the iPhone, the Palm Pre, etc...

[<img src="http://farm3.static.flickr.com/2571/4005016921_aa3d6d3472_m.jpg" width="160" height="240" alt="PewPew" align="right" />][4]For the past couple of months, I have been working on a gamed called &#8220;Pew Pew&#8221;. I originally developed it by targeting the browser, but knowing that I wanted to deploy it to the iPhone, payed attention to performance, and sized the content, and designed the user interactions appropriately. Once the iPhone work was at a point internally that I could deploy content to it, I was able to run my content on the device with no changes at all. Now, I did have to do some additional code optimizations to bring the frame-rate up (something which benefitted the game on the desktop as well), but once I did these, the SWF for my game was able to run on both in the browser on my desktop and as a standalone iPhone application. Indeed, the team working on Flash Player 10.1 for Android asked if I could send them the SWF, and it ran on that device as well with no modifications. This was possible because Flash Player 10.1 allowed me to target the capabilities that my game needed, as opposed to targeting a particular device.

So, to summarize, when developing content targeted at Flash Player 10.1, you should think in terms of the capabilities of the platform, and not get hung up on a particular device or browser.

Creating applications for the iPhone is great. But creating content for the iPhone, and having the option to deploy it on an Android, RIM or Palm Pre device, in a browser on Mac, Windows, Linux and Solaris, and being able to deploy to the Mac, Windows and Linux desktops via Adobe AIR 2.0 is even better.

 [1]: http://www.mikechambers.com/blog/2009/10/05/building-applications-for-the-iphone-with-flash/
 [2]: http://labs.adobe.com/technologies/flashplayer10/
 [3]: http://www.adobe.com/aboutadobe/pressroom/pressreleases/200910/100509RIMjoinsOSP.html
 [4]: http://www.flickr.com/photos/mikechambers/4005016921/ "PewPew by mike.chambers, on Flickr"