---
title: 'POC : Implementing HTML 5 Video Element using JavaScript and Flash'
author: mikechambers
date: 2008-05-27 12:56:01 -0800
layout: post
permalink: /2008/05/27/poc-implementing-html-5-video-element-using-javascript-and-flash/
categories:
  - General
---


Since the first leg of the [European on AIR Tour][1] wrapped up, I have had some time to take some time and research / play around with some new technologies. In particular, I have been looking into the [HTML 5 draft spec][2], as well as some of the work that Google has been doing with [Google Gears][3].  
<!--more-->

  
One thing I have been watching closely around the HTML 5 draft is the implementation of the [VIDEO element / tag][4]. This is basically a tag that would allow browsers to implement video support. However, at least based on the current draft, there is no requirement that browsers support the same codecs. From the [spec][5]:

> It would be helpful for interoperability if all browsers could support the same codecs. However, there are no known codecs that satisfy all the current players: we need a codec that is known to not require per-unit or per-distributor licensing, that is compatible with the open source development model, that is of sufficient quality as to be usable, and that is not an additional submarine patent risk for large companies. This is an ongoing issue and this section will be updated once more information is available.

Which in part means that developers may have to encode the video in different formats depending on which browsers they wanted to support.

I have also been following some of the work that Google is doing around Google Gears, and have been particularly interested in some of their talk about how they [aim to implement parts of HTML 5 within Google Gears][6]. By doing so, they can implement features quicker, and can ensure that they work consistently across browsers.

Putting these two things together, gave me the idea of seeing if it would be feasible to implement the HTML 5 video tag using JavaScript and Flash in order to provide an implementation that worked consistently across browsers.

I have put together a simple proof of concept that shows that this should be possible.

[View HTML 5 Video Example][7]

Here is the markup used to display the video:

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">&lt;script </span><span style="color: #7D9029">type=</span><span style="color: #BA2121">"text/javascript"</span> <span style="color: #7D9029">src=</span><span style="color: #BA2121">"swfobject/src/swfobject.js"</span><span style="color: #008000; font-weight: bold">&gt;&lt;/script&gt;</span>
<span style="color: #008000; font-weight: bold">&lt;script </span><span style="color: #7D9029">type=</span><span style="color: #BA2121">"text/javascript"</span> <span style="color: #7D9029">src=</span><span style="color: #BA2121">"html5_video.js"</span><span style="color: #008000; font-weight: bold">&gt;&lt;/script&gt;</span>

<span style="color: #008000; font-weight: bold">&lt;video</span>
<span style="color: #7D9029">src=</span><span style="color: #BA2121">"http://onair.adobe.com.edgesuite.net/onair/raulph_hauwert_papervision3d.flv"</span>
	<span style="color: #7D9029">controls</span> 
	<span style="color: #7D9029">poster=</span><span style="color: #BA2121">"testpattern.png"</span>
	<span style="color: #7D9029">autoplay=</span><span style="color: #BA2121">"true"</span>
	<span style="color: #7D9029">width=</span><span style="color: #BA2121">"640"</span> 
	<span style="color: #7D9029">height=</span><span style="color: #BA2121">"360"</span>
	<span style="color: #7D9029">playcount=</span><span style="color: #BA2121">"500"</span><span style="color: #008000; font-weight: bold">&gt;</span>
<span style="color: #008000; font-weight: bold">&lt;/video&gt;</span>
</pre>
</div>

You can see the JavaScript code for this [here][8].

Basically, this parses out VIDEO element / tag and its attributes, and replaces it with the appropriate OBJECT or EMBED element to display a Flash video player that loads the specified video. It has support for playing back both h264 content and FLVs. 

It uses the [SWFObject JavaScript library][9] to display the Flash content.

Currently the following VIDEO attributes are implemented:

*   controls
*   poster
*   autoplay
*   width
*   height
*   playcount

The tricky part will be cleanly implementing the VIDEO DOM scripting API, although I believe that that should also be possible. 

Again, this is just a proof of concept, and regardless of what is done with the VIDEO element in the HTML 5 draft, it shows how SWFObject could be extended to make it even easier to deploy Flash content (by using HTML markup).

 [1]: http://onair.adobe.com
 [2]: http://www.w3.org/html/wg/html5/
 [3]: http://gears.google.com/
 [4]: http://www.w3.org/html/wg/html5/#video
 [5]: http://www.w3.org/html/wg/html5/#video0
 [6]: http://almaer.com/blog/gears-as-a-bleeding-edge-html-5-implementation
 [7]: /mesh/files/video_javascript/
 [8]: http://www.mikechambers.com/mesh/files/video_javascript/html5_video.js
 [9]: http://code.google.com/p/swfobject/