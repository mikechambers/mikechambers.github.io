---
title: 'Example : Creating spiral designs with Canvas, JavaScript and EaselJS'
author: mikechambers
layout: post
permalink: /2011/02/09/example-creating-spirals-designs-with-canvas-and-easeljs/
categories:
  - General
tags:
  - canvas
  - easeljs
  - example
  - html5
  - javascript
---


I have been having fun playing around with JavaScript, the HTML5 Canvas element and [EaselJS][1] lately, and have been building a lot of small experiments. I wanted to share a simple one I created, which creates spiral designs.

[![title](http://farm6.static.flickr.com/5299/5429181578_ce3395c4e2_m.jpg)](http://www.flickr.com/photos/mikechambers/5429181578/)

The example was pretty simple to put together, but is fun to play with, and can make some pretty nice patterns / spirals. I have uploaded a couple of images that I have created using the example:  
<!--more-->

[![title](http://farm6.static.flickr.com/5258/5428579683_82a6c9c317_m.jpg)](http://www.flickr.com/photos/mikechambers/5428579683/)

[![title](http://farm6.static.flickr.com/5098/5428784263_a6b3eafced_m.jpg)](http://www.flickr.com/photos/mikechambers/5428784263/)

[![title](http://farm6.static.flickr.com/5098/5429181324_5eac51ae97_m.jpg)](http://www.flickr.com/photos/mikechambers/5429181324/)

and put together a time lapse video showing a spiral being created:

<div style="text-align:center;"><object type="application/x-shockwave-flash" width="400" height="225" data="http://www.flickr.com/apps/video/stewart.swf?v=71377" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"> <param name="flashvars" value="intl_lang=en-us&photo_secret=8e3c1c5b4c&photo_id=5430459320"></param> <param name="movie" value="http://www.flickr.com/apps/video/stewart.swf?v=71377"></param> <param name="bgcolor" value="#000000"></param> <param name="allowFullScreen" value="true"></param><embed type="application/x-shockwave-flash" src="http://www.flickr.com/apps/video/stewart.swf?v=71377" bgcolor="#000000" allowfullscreen="true" flashvars="intl_lang=en-us&photo_secret=8e3c1c5b4c&photo_id=5430459320" height="225" width="400"></embed></object></div>

You can view the example at:  
<http://www.mikechambers.com/html5/easeljs/Spirals/index.html>

I have also [posted all of the code in my GitHub Repository][2].

There is no UI to change settings, but you can tweak the designs you create by passing in some URL params, like so:

[/index.html?minradius=10&maxradius=3000&strokealpha=0.2&spread=.8][3]

**minradius** : The minimum radius of the circle that will be drawn.  
**maxradius** : The maximum radius of the circle that will be drawn.

If minradius and maxradius are different, the circle radius will tween back and forth between the sizes.

**strokealpha** : A number between 0.0 and 1.0 that specifies the alpha of the stroke of the circle  
**spread**: How quickly the spiral expands / opens up

Click the screen to start / pause the drawing.

Play around with different combinations of settings. If you create anything cool, or have any questions / suggestions, then post them below.

 [1]: http://www.easeljs.com
 [2]: https://github.com/mikechambers/ExamplesByMesh/tree/master/HTML5/EaselJS/Spirals
 [3]: http://www.mikechambers.com/html5/easeljs/Spirals/index.html?minradius=10&maxradius=3000&strokealpha=0.2&spread=.8