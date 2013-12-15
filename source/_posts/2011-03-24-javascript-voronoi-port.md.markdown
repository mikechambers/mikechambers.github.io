---
title: JavaScript Voronoi port
author: mikechambers
layout: post
permalink: /2011/03/24/javascript-voronoi-port/
categories:
  - General
tags:
  - canvas
  - easeljs
  - example
  - html5
  - javascript
  - voronoi
---


I have always been amazed by some of the [digital art work][1] that [Mario Klingemann][2] (aka [@Quasimondo][3] has created using with [Voronois][4]. After doing some searching, I found an early [ActionScript 1 Voronoi implementation][5] that Mario did, and I ported it to JavaScript.

I wanted to share the results:  
<!--more-->

<div style="text-align:center;">
</div>

&nbsp;

Here is a graphic I created by playing around with the code:

<div style="text-align:center;">
  <a href="http://www.flickr.com/photos/mikechambers/5532232341/" title="Untitled by mike.chambers, on Flickr"><img src="http://farm6.static.flickr.com/5256/5532232341_6788f59d19.jpg" width="500" height="313" alt="" style="border:1px solid black; moz-box-shadow: 3px 3px 4px rgba(0,0,0,0.7);-webkit-box-shadow: 3px 3px 4px rgba(0,0,0,0.7);box-shadow: 3px 3px 4px rgba(0,0,0,0.7);" /></a>
</div>

&nbsp;

The code is pretty much a straight up port, with some minor optimizations for JavaScript. I also replaced the rendering from the Flash display list API, to [EaselJS][6]. All of the credit really goes to Mario who wrote the original code.

You can view all of the code on my [GitHub repository][7], and [grab the original code from Mario&#8217;s website][5].

 [1]: http://www.flickr.com/photos/quasimondo/tags/voronoi/
 [2]: http://www.quasimondo.com/
 [3]: http://twitter.com/Quasimondo
 [4]: http://en.wikipedia.org/wiki/Voronoi_diagram
 [5]: http://www.quasimondo.com/archives/000110.php
 [6]: http://www.easeljs.com
 [7]: https://github.com/mikechambers/ExamplesByMesh/tree/master/HTML5/EaselJS/Voronoi