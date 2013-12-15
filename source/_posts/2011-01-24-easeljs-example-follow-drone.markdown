---
title: 'EaselJS / Canvas Example : Follow Drone'
author: mikechambers
layout: post
permalink: /2011/01/24/easeljs-example-follow-drone/
categories:
  - General
tags:
  - canvas
  - easeljs
  - example javascript
  - follow_drone
  - html5
---


As I [posted the other day][1], I have been spending some time playing around with dynamic drawing with the HTML5 Canvas element and [EaselJS][2]. I have put together quite a few examples and experiments and will be posting them (along with what I learned from them) over the next couple of weeks.

The first example I want to share is a simple one which I call &#8220;follow&#8221;. It basically uses EaselJS to create a snake like shape that follows you mouse. Here is a screen shot of a graphic I created with it:

<div style="text-align:center;">
  <a href="http://www.flickr.com/photos/mikechambers/5373349685/" title="Untitled by mike.chambers, on Flickr"><img src="http://farm6.static.flickr.com/5208/5373349685_2c82f5de47.jpg" width="500" height="313" alt="" style="border:1px solid black; moz-box-shadow: 3px 3px 4px rgba(0,0,0,0.7);-webkit-box-shadow: 3px 3px 4px rgba(0,0,0,0.7);box-shadow: 3px 3px 4px rgba(0,0,0,0.7);" /></a>
</div>

&nbsp;

Here is an inline version of the example that you can play with. Just click to toggle whether the drone follows your mouse (requires a browser with support for the HTML5 Canvas element).  
<!--more-->

  


You can view the example fullscreen (which looks better) [here][3].

You can view, as well as [download all of the code from my GitHub repository][4] (released under an MIT License).

Im going to write a series of posts over the next couple of days on a couple of things I learned while building this example. In the mean time, here is the main gist of what is going on:

*   I am drawing to a canvas, but telling EaselJS to not clear the canvas when it redraws. This makes it very easy to create a persistent design, and since I only have one Shape to track / render, it helps keep CPU usage down.
*   On Mouse based devices, I use a second overlay canvas, and display the mouse point, and a line showing the direction the drone is moving in.
*   The example has support for multitouch when running on iOS devices (works really well on the iPad). It also works on Android, but not as well as Android only supports single touch events in JavaScript and has some aliasing issues when drawing to Canvas.

Again, you can view the full version of the example [here][3], and view and download all of the code from [here][4].

I will be making some more posts over the next couple of days, going into more detail on the example, as well as some of the lessons I learned from making it. In the meantime, post any questions or comments below.

 [1]: http://www.mikechambers.com/blog/2011/01/19/getting-started-with-the-canvas-element-and-easeljs/
 [2]: http://www.easeljs.com
 [3]: http://www.mikechambers.com/html5/easeljs/follow/
 [4]: https://github.com/mikechambers/ExamplesByMesh/tree/master/HTML5/EaselJS/follow