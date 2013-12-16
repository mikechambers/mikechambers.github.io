---
title: Flash Player content, Mouse Events, and Touch input
author: mikechambers
date: 2010-02-22 12:11:01 -0800
layout: post
permalink: /2010/02/22/flash-player-content-mouse-events-and-touch-input/
categories:
  - General
tags:
  - flashplayer
  - fp10.1
  - mobile
---

So, the Interwebs is all a buzz again around the latest [article][1] that "proves" that Flash will not be useful on mobile devices (much less the iPad). From the article:

> Current Flash sites could never be made work well on any touchscreen device, and this cannot be solved by Apple, Adobe, or magical new hardware.
> 
> That’s not because of slow mobile performance, battery drain or crashes. It’s because of the hover or mouseover problem.

Basically, the writer is arguing that because some Flash content uses Mouse over / hover events (*MouseEvent.MOUSE_OVER*), and because there is no such event as a hover on a touch devices, then apparently, most Flash content just flat out wont work on touch devices.

I wanted to make a quick post that corrects some of the false assumptions and conclusions presented in the article, which include:  
<!--more-->

1. Hover events do not work in Flash content on devices with touch screens. That is false, they do work.  
2. Any issue with hover or any other mouse events on a touch screen device, are specific to Flash. They are not. They affect HTML and any other web content as much as Flash.  
3. Most Flash content relies on hover events. Wrong. I don't have a scientific breakdown on how much Flash content RELIES on hover events, but at least in my experience with the Nexus one, almost all content I have come across has worked well with touch screen input, including those that use hover events. 

First, lets look at all of the Mouse events that Flash developers normally have access to.

*   MouseEvent.CLICK
*   MouseEvent.DOUBLE_CLICK
*   MouseEvent.MIDDLE_CLICK
*   MouseEvent.MIDDLE_MOUSE_DOWN
*   MouseEvent.MIDDLE_MOUSE_UP
*   MouseEvent.MOUSE_DOWN
*   MouseEvent.MOUSE_MOVE
*   MouseEvent.MOUSE_OUT
*   MouseEvent.MOUSE_OVER
*   MouseEvent.MOUSE_UP
*   MouseEvent.MOUSE_WHEEL
*   MouseEvent.RIGHT_CLICK
*   MouseEvent.RIGHT_CLICK_DOWN
*   MouseEvent.RIGHT_MOUSE_UP
*   MouseEvent.ROLL_OUT
*   MouseEvent.ROLL_OVER

Now, lets look at a list of events that will not work on a device whose primary input is a touch screen:

*   MouseEvent.MIDDLE_CLICK
*   MouseEvent.MIDDLE_MOUSE_DOWN
*   MouseEvent.MIDDLE_MOUSE_UP
*   MouseEvent.MOUSE_WHEEL
*   MouseEvent.RIGHT_CLICK
*   MouseEvent.RIGHT_CLICK_DOWN
*   MouseEvent.RIGHT_MOUSE_UP

As you can see that list doesn't include the *MOUSE_OVER* and *ROLL_OVER* events. It only includes middle and right mouse button events, as well as mouse wheel events, which in general, are used as a secondary means of user input / interaction.

Basically, hover events do work in Flash content on touch screen devices. The main difference is that on a touch device, you will get also get a *MouseEvent.MOUSE_DOWN* event prior to the *MouseEvent.MOUSE_OVER* event, where as on a desktop machine, you MAY only get the *MouseEvent.MOUSE_OVER* event.

I put together a very simple Flash example for the iphone, that shows all of the MouseEvents being generated. You can view the video here:

<object width="425" height="344"><param name="movie" value="http://www.youtube.com/v/tj1hiLnIp_g&hl=en_US&fs=1&"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/tj1hiLnIp_g&hl=en_US&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344"></embed></object>
  
[View Video on YouTube][2]

Here is a list of the events which were generated in the video:

*   doubleClick
*   mouseUp
*   mouseDown
*   click
*   mouseUp
*   mouseOver
*   rollOver
*   mouseDown
*   rollOut
*   mouseOver
*   rollOver
*   rollOut
*   mouseOut
*   click
*   mouseUp
*   mouseOver
*   rollOver

So, to summarize:

1.  Hover events do work in Flash content on touch devices.
2.  Any issues with mouse input on a touch device are not specific to Flash, but affect all content, including HTML based content.
3.  If your content RELIES on MIDDLE, RIGHT and / or SCROLL_WHEEL mouse events, then you will need to update your content IF you want users on touch devices to be able to use it. This applies just as much to HTML content as it does to Flash content.

Now, this doesn't mean that all Flash content designed and developed for mouse input on a desktop computer will run well on a mobile device with touch input. Indeed, some content will not run well due to differences in input (such as keyboard input), user interface, or performance. However, again, those are all issues that affect HTML content as much as they affect Flash content.

Again, any potential input issues apply as much to HTML as they do to Flash, and as browsing the web on the iPhone has demonstrated, these have not been a major barrier to consuming content on a touch device.

As a content creator, you should focus on creating content that provides a good user experience across all platforms that you are targeting. However, even though most Flash content on the web today is not designed with mobile viewing and touch input in mind, my experience has been that existing content works surprisingly well when viewed on a mobile device with touch input.

Here are some links to videos of existing Flash content running on mobile devices. A lot of this content is content never designed to be run on a device with touch input.

*   [Demos of Flash Player 10.1 on various mobile devices][3] (iPhone, Palm Pre, Nexus One, Droid, and more...)
*   [Flash Player content on Nexus One][4]
*   [Unofficial Nexus One Flash Demos][5]

Please keep comments constructive and on topic. Off topic comments will be moderated.

 [1]: http://www.roughlydrafted.com/2010/02/20/an-adobe-flash-developer-on-why-the-ipad-cant-use-flash/
 [2]: http://www.youtube.com/watch?v=tj1hiLnIp_g
 [3]: http://www.adobe.com/devnet/devices/demos/
 [4]: http://vimeo.com/9596010
 [5]: http://theflashblog.com/?p=1781