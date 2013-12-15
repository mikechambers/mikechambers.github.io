---
title: Scrolling HTML with Flash Content on Touch Devices
author: mikechambers
layout: post
permalink: /2010/02/23/scrolling-html-with-flash-content-on-touch-devices/
categories:
  - General
tags:
  - flash
  - mobile
  - touch
---


In response to my post on [Mouse Events and hover in Flash Player][1] content on touch devices, John Gruber (daringfireball.net) [raises an issue][2]:

> The problem, though, for a hypothetic Flash plugin that renders pages within web pages (as on traditional desktop browsers), is how to tell whether a tap-and-drag within a Flash element is supposed to scroll the entire web page or be passed as a mouse movement event to the Flash element. It can’t do both, and it can’t read the user’s mind.

This is a potential issue, and as John notes, is one not isolated to Flash content (scrolling textareas have similar issues on a touch device).

Here is how the current pre-release builds of [Flash Player 10.1][3] handle this on the Nexus One (I havent had a chance to confirm for the other devices).  
<!--more-->

  
When the page is loaded the Flash content is embedded within the HTML and laid out as specified by that HTML. If all of the web page content cannot fit on the screen (i.e. you can scroll) and if the user swipes / drags their finger (including over the Flash content), it will scroll the page.

However, if the user double taps the Flash content, it will go into a scaled full screen mode, and the swipe / drag gesture will then be passed to the Flash content. In the case of the Nexus One, the user presses the device back button, which takes the content out of fullscreen mode.

If the scroll position is at the top of the page, and the user drags down on the Flash content, then the drag will be passed to the Flash content. This makes sense to me, but I am not sure if that is a feature or a bug at this point.

In practice, this works very well, and at least among the people I have watched interact with the content, appears to be pretty intuitive.

You can see a video of the interactions here:



Now, this is all pre-release software, and could change. I would be interested in hearing any other suggestions on how this particular interaction could be made better (for Flash and HTML content). Again though, this is just as much a potential HTML issue, as it is a potential Flash issue, so think about solutions in that context.

Please keep comments constructive and on topic. Off topic comments will be assassinated.

 [1]: /blog/2010/02/22/flash-player-content-mouse-events-and-touch-input/
 [2]: http://www.mikechambers.com/blog/2010/02/22/flash-player-content-mouse-events-and-touch-input/
 [3]: http://www.adobe.com/devnet/devices/demos/