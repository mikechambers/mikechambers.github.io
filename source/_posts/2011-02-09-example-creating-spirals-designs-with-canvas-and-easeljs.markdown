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

&nbsp;

<div style="text-align:center;">
  <a href="http://www.flickr.com/photos/mikechambers/5429181578/" title="Untitled by mike.chambers, on Flickr"><img src="http://farm6.static.flickr.com/5299/5429181578_ce3395c4e2_m.jpg" width="240" height="150" alt="" style="border:1px solid black; moz-box-shadow: 3px 3px 4px rgba(0,0,0,0.7);-webkit-box-shadow: 3px 3px 4px rgba(0,0,0,0.7);box-shadow: 3px 3px 4px rgba(0,0,0,0.7);" /></a>
</div>

&nbsp;

The example was pretty simple to put together, but is fun to play with, and can make some pretty nice patterns / spirals. I have uploaded a couple of images that I have created using the example:  
<!--more-->

<div style="text-align:center;">
  <a href="http://www.flickr.com/photos/mikechambers/5428579683/" title="Untitled by mike.chambers, on Flickr"><img src="http://farm6.static.flickr.com/5258/5428579683_82a6c9c317_m.jpg" width="240" height="150" alt="" style="border:1px solid black; moz-box-shadow: 3px 3px 4px rgba(0,0,0,0.7);-webkit-box-shadow: 3px 3px 4px rgba(0,0,0,0.7);box-shadow: 3px 3px 4px rgba(0,0,0,0.7);" /></a>
</div>

&nbsp;

<div style="text-align:center;">
  <a href="http://www.flickr.com/photos/mikechambers/5428784263/" title="Untitled by mike.chambers, on Flickr"><img src="http://farm6.static.flickr.com/5098/5428784263_a6b3eafced_m.jpg" width="240" height="150" alt="" style="border:1px solid black; moz-box-shadow: 3px 3px 4px rgba(0,0,0,0.7);-webkit-box-shadow: 3px 3px 4px rgba(0,0,0,0.7);box-shadow: 3px 3px 4px rgba(0,0,0,0.7);" /></a>
</div>

&nbsp;

<div style="text-align:center;">
  <a href="http://www.flickr.com/photos/mikechambers/5429181324/" title="Untitled by mike.chambers, on Flickr"><img src="http://farm6.static.flickr.com/5098/5429181324_5eac51ae97_m.jpg" width="240" height="150" alt="" style="border:1px solid black; moz-box-shadow: 3px 3px 4px rgba(0,0,0,0.7);-webkit-box-shadow: 3px 3px 4px rgba(0,0,0,0.7);box-shadow: 3px 3px 4px rgba(0,0,0,0.7);" /></a>
</div>

&nbsp;

and put together a time lapse video showing a spiral being created:

<div style="text-align:center;">
</div>

&nbsp;

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