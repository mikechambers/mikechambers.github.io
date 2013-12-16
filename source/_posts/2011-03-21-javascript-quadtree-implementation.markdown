---
title: JavaScript QuadTree Implementation
author: mikechambers
date: 2011-03-21 12:47:01 -0800
layout: post
permalink: /2011/03/21/javascript-quadtree-implementation/
categories:
  - General
tags:
  - collision_detection
  - easeljs
  - html
  - javascript
  - quadtree
---

Last week I was playing around with a little [EaselJS][1] experiment which required me to do collision detection against all items on the screen. This worked fine with a small number of items, but of course, the more items I added, the slower everything became.

I knew that I needed to optimize the code, and pare down the number of collision checks. I have done this before with a grid (even held a [contest][2] for it) and was going to port that AS3 code to JavaScript. However, [Ralph Hauwert][3] suggested I look at implemented a QuadTree, which should be more efficient.  
<!--more-->

A [QuadTree][4] is a data structure in which the coordinate space is broken up into regions / nodes that contain items. If too many items are added into a node, then that node is divided into 4 sub-nodes. This can provide very fast lookup of items based on the coordinates and coordinates and dimensions.

There are a couple of implementations in both JavaScript and ActionScript (Michael Baczynski has a nice [AS3 implementation][5]), but I decided that I wanted to learn a bit more and implement one from scratch.

The result if a QuadTree implemented in JavaScript that works with both 2D coordinates (x,y) and well as regions / items with dimensions.

I've released all of the code under an MIT License, and you can [download it from my GitHub repository][6].

Here is an example of the tree in action:

<iframe src="/html5/javascript/QuadTree/examples/collision.html" width="520" height="600"></iframe>

This example shows how to use the QuadTree to pare down the number of items that need to be tested for collision detection.

I have created a couple of other simple examples:

*   [Collision Detection (shown above)][7]
*   [Inserting points][8]
*   [Inserting items with bounds][9]
*   [Retrieving points][10]
*   [Retrieving items with bounds][11]

The basic code is pretty simple. Here is an example showing using the QuadTree to store and retrieve points:

``` javascript
var pointQuad = true;
var bounds = {
	x:0,
	y:0,
	width:canvas.width,
	height:canvas.height
}

var quad = new QuadTree(bounds, pointQuad);

//insert a random point
quad.insert({x:12, y:25});

var items = quad.retrieve({x:11, y:20});
```

And here is a simple example showing using the QuadTree to store and retrieve items with dimensions / bounds:

``` javascript
var bounds = {
	x:0,
	y:0,
	width:canvas.width,
	height:canvas.height
}
var quad = new QuadTree(bounds);

//insert a random point
quad.insert({
	x:12, 
	y:25,
	height:10,
	width:25
});
		
var items = quad.retrieve({x:11, y:20, height:10, width:20});
```

Again, you can download all of the code from my [GitHub Repository][6]. It seems fairly solid at this point, but if you find any issues, or have any suggestions either fork the project, and submit the changes to me, or post them in the comments.

There is still a lot of room for optimization and improvement in the implementation, such as pre-allocating the nodes, but Ill leave that for another day.

Btw, big thanks to [Ralph Hauwert][3] for pointing me in the right direction for my project.

Post any questions or suggestions in the comments.

 [1]: http://www.easeljs.com
 [2]: http://www.mikechambers.com/blog/tag/as3dtc1/
 [3]: http://unitzeroone.com/blog/
 [4]: http://en.wikipedia.org/wiki/Quadtree
 [5]: http://lab.polygonal.de/2007/09/09/quadtree-demonstration/
 [6]: https://github.com/mikechambers/ExamplesByMesh/tree/master/JavaScript/QuadTree
 [7]: /html5/javascript/QuadTree/examples/collision.html
 [8]: /html5/javascript/QuadTree/examples/insert.html
 [9]: /html5/javascript/QuadTree/examples/insert_bounds.html
 [10]: /html5/javascript/QuadTree/examples/retrieve.html
 [11]: /html5/javascript/QuadTree/examples/retrieve_bounds.html