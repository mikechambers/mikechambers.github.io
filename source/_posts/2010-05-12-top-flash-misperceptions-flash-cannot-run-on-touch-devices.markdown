---
title: 'Top Flash Misperceptions : Flash cannot run on touch devices'
author: mikechambers
date: 2010-05-12 12:24:01 -0800
layout: post
permalink: /2010/05/12/top-flash-misperceptions-flash-cannot-run-on-touch-devices/
categories:
  - General
tags:
  - flash_myths
---

Today I wanted to look at a more recent misperception around Flash. That is the idea that Flash cannot work on devices with touch screens. If you know your Flash history then you will probably find this a bit ironic, considering that [Flash was originally created specifically for tablets with touch inputs][1]. Regardless, lets take a closer look at this myth.  
<!--more-->


The myth began with the publishing of this [article][2]. I have already covered this topic in another [post][3], but I wanted to address it again as it seems to have spread lately.

Basically, the myth is that because the concept of hover events can be different on a touch device (compared to a device with mouse input), Flash content cannot work well on touch devices. From the original article:

> Current Flash sites could never be made work well on any touchscreen device, and this cannot be solved by Apple, Adobe, or magical new hardware.
> 
> That’s not because of slow mobile performance, battery drain or crashes. It’s because of the hover or mouseover problem.

The assumptions that the myth is based on are incorrect, and therefore its conclusions are also wrong. The vast majority of Flash content works fine on devices with touch screens. For any content that does not work well due to changes in the input interactions, the content can be easily updated to work.

There are two types of Flash content we need to look at in order to see whether Flash content can work well on touch devices. The first is Flash content created and / or updated specifically with mobile and touch devices in mind. The second is existing Flash content created for desktop computers with mouse inputs.

Flash content created or updated with mobile and touch devices in mind works fine. Single touch events can be captured within Flash content on a touch device as MouseEvents (as if the finger was a cursor). In addition, <del datetime="2010-05-18T20:14:16+00:00">Flash Player 10.1</del> Adobe AIR 2.0 for mobile also includes a complete set of APIs specifically for working with multi-touch input and gestures. Here is a listing of some of the new touch specific APIs in <del datetime="2010-05-18T20:14:16+00:00">Flash Player 10.1</del> Adobe AIR 2.0 for mobile:

*   flash.events.GestureEvent
*   flash.events.GesturePhase
*   flash.events.MultitouchInputMode
*   flash.events.PressAndTapGestureEvent
*   flash.events.TouchEvent
*   flash.events.TransformGestureEvent
*   flash.ui.Multitouch

The Flash player can support as many touch points as the underlying operating system supports.

There is already hundreds of Flash based content online created for touch devices in the form of content created for the iPhone with Flash CS5, as well as an increasing number of Flash based content that runs on touch devices (via Flash Player and Adobe AIR). You can view videos (nearly 50) of Flash content created for touch devices on the following pages:

*   [Flash to AIR for Android in 10 minutes!][4]
*   [Google Reinforces Commitment to Adobe and Flash][5]
*   [Flash is Not Designed for Touch][6]

It is pretty clear that there is no problem with creating new Flash content designed to work on touch devices.

Next, we need to look at existing Flash content created for the desktop in order to see if it can work on devices with touch input. Again, the assertion is that "Current Flash sites could never be made work well on any touchscreen device". Lets get the absolutes ("never" and "any") out of the way first.

Lets look at some examples. Ryan Stewart has a posted a [video showing existing Flash content running in the browser on a Google Nexus One][7], and Lee Brimelow has posted [a video showing existing content running on a touch based tablet][8]. As you can see from the videos, the Flash content works just fine even though it was created with mouse input in mind.

The myth specifically mentions hover events as the reason that Flash content will not be able to work on touch devices. However, as shown in [this video][9], hover events (*MouseEvent.MOUSE_OVER* and *MouseEvent.MOUSE_OUT*) are broadcast in Flash content on touch devices. This is discussed in more detail on my [original blog post on this topic][3]. Lee's [video][8] also shows a number of sites with Flash content that rely on hover events (all of which work fine).

It is possible for a developer to write code that creates mouse based interactions that would not work well (or at all on a touch device). For example:

*   *MouseEvent.MOUSE_OVER* then *MouseEvent.CLICK* without a *MouseEvent.MOUSE_UP* being broadcast first
*   *MouseEvent.MOUSE_OVER* without first receiving a *MouseEvent.CLICK* event

However, these interactions are the exception, rather than the rule.

This is not suggesting that all Flash content created for the desktop will work great on mobile devices. Just as with HTML content, some content will need to be updated due to differences in performance, memory and UI Interactions. However, as discussed above, there is no fundamental issue that prevents Flash content (new or existing) from running well on touch based devices.

Resources:

*   [Flash Player content, Mouse Events, and Touch input][3]
*   [Scrolling HTML with Flash Content on Touch Devices][10]
*   [Flash Works On Touch-Based Devices (Video)][8]
*   [Google Reinforces Commitment to Adobe and Flash][5]
*   [Flash to AIR for Android in 10 minutes!][4]
*   [Flash is Not Designed for Touch][6]
*   [Examples of Flash Content Running on Android][7]
*   [Flash Player Mouse Events on Touch Screen Devices][9]
*   [Introduction to Multitouch in Flash Player 10.1. (Video)][11]
*   [TETRIS, TOUCH API AND ANDROID][12]
*   [Video of Flash multi-touch on Windows and Mac][13]
*   [Simple Flash Player 10.1 Multitouch example][14]
*   [The History of Flash][1]

Please keep comments constructive and on topic. Off topic comments may be moderated / deleted.

 [1]: http://www.adobe.com/macromedia/events/john_gay/page03.html
 [2]: http://www.roughlydrafted.com/2010/02/20/an-adobe-flash-developer-on-why-the-ipad-cant-use-flash/
 [3]: http://www.mikechambers.com/blog/2010/02/22/flash-player-content-mouse-events-and-touch-input/
 [4]: http://blogs.adobe.com/air/2010/04/adobe_air_applications_for_and.html
 [5]: http://theflashblog.com/?p=1926
 [6]: http://theflashblog.com/?p=1975
 [7]: http://blog.digitalbackcountry.com/2010/05/examples-of-flash-content-running-on-android/
 [8]: http://theflashblog.com/?p=2027
 [9]: http://www.youtube.com/watch?v=tj1hiLnIp_g
 [10]: http://www.mikechambers.com/blog/2010/02/23/scrolling-html-with-flash-content-on-touch-devices/
 [11]: http://tv.adobe.com/watch/flash-camp-san-francisco/introduction-to-multitouch-in-flash-player-101/
 [12]: http://www.riagora.com/2010/05/tetris-touch-api-and-android/
 [13]: http://theflashblog.com/?p=1666
 [14]: http://www.youtube.com/watch?v=NGVNmR4vL5U