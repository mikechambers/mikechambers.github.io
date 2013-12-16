---
title: 'Flash Video Test (#2) : Multiple Streams : StarWars BattleFront'
author: mikechambers
date: 2004-10-04 12:46:01 -0800
layout: post
permalink: /2004/10/04/flash-video-test-2-multiple-streams-starwars-battlefront/
categories:
  - General
---


I have been player around with Flash video for the past couple of days, and have been running a couple of tests. The [first test][1] was to test a hardware setup to get live video from a video source (in this case an [Xbox][2]) to [Flash][3]. This test is testing the ability to play back different video streams in Flash based on the user&#8217;s bandwidth.

So, here is a simple video clip of my playing a level of [StarWars BattleFront][4] on the Xbox:

<!--more-->

<div id="videoDiv" align="center">
</div>

The quality of the video and sound will depend on your bandwidth. The slower your connection, the lower the quality of the video and sound. This allows me to offer multiple versions to ensure the best possible experience for all users.

Btw, I am using [Peldi&#8217;s FLVPlayer][5] (which rocks). Thanks to Peldi for putting it together, and helping me work out some kinks in my code.

One tip with using the FLVPlayer. If you want to install the player in one place on your web server and then load it from multiple pages / directories, make sure to set the BASE attribute (within the player&#8217;s object and embed HTML tags) to &#8220;.&#8221;. This will tell Flash to load its resources (such as the player skins) relative to the FLVPlayer.swf file, and not relative to the HTML page / directory that the file is loaded into. You can read more on this in this [technote][6].

If you seem to be getting poor quality for your connection, try to reload the page. You connection may have been busy / full when the player detected your bandwidth.

If you have any problems viewing the video, post your info in the comments (include browser, OS, Flash player version and connection speed).

 [1]: http://www.markme.com/mesh/archives/006075.cfm
 [2]: http://www.xbox.com
 [3]: http://www.macromedia.com/devnet/mx/flash/video.html
 [4]: http://www.xbox.com/en-US/starwarsbattlefront/default.htm?level3=starwarsbattlefront&level2=fg5blurb&level1=enusgames
 [5]: http://www.peldi.com/blog/archives/2004/05/flvplayer_new_r.html
 [6]: http://www.macromedia.com/support/flash/ts/documents/tn4157.html