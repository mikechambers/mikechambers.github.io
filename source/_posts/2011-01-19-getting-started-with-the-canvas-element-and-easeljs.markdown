---
title: Getting Started with the Canvas Element and EaselJS
author: mikechambers
layout: post
permalink: /2011/01/19/getting-started-with-the-canvas-element-and-easeljs/
categories:
  - General
tags:
  - canvas
  - easeljs
  - html5
  - javascript
---

One of the features of HTML5 that developers are most excited about is the [Canvas](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#the-canvas-element) element. The Canvas element essentials provides a bitmap canvas for dynamically rendering shapes and bitmap graphics. It is very similar to the Flash Player&#8217;s [Bitmap](http://help.adobe.com/en_US/FlashPlatform/beta/reference/actionscript/3/flash/display/Bitmap.html) and [BitmapData](http://help.adobe.com/en_US/FlashPlatform/beta/reference/actionscript/3/flash/display/BitmapData.html) classes.

However, working with the Canvas element can be difficult, especially if you need to manage, update and or / animate multiple shapes and bitmaps. Unlike the Flash Player, the Canvas element does not have a concept of a display list or individual items to render. Instead, it provides a single Canvas on which to draw, and it is up to the developer to determine what needs to be rendered and when.

[Grant Skinner](http://gskinner.com/) has release a JavaScript library named [EaselJS](http://www.easeljs.com), which attempts to provide a Flash like DisplayList API in order to make it easier to work with the Canvas element. The library is just an alpha release, but is surprisingly full featured at this early stage. If you are interested in experimenting with the Canvas API, this is a great way to get started.
<!--more-->

In this post, I will show how to get started animating content in the Canvas element using the EaselJS JavaScript library.

Here is a list of the main classes in the library:

* **DisplayObject** : Abstract base class for all display elements in EaselJS. Exposes all of the display properties (ex. x, y, rotation, scaleX, scaleY, alpha, shadow, etc) that are common to all display objects.
* **Stage** : The root level display container for display elements that wraps the Canvas element.
* **Container** : A nestable display container, which lets you aggregate display objects and manipulate them as a group.
* **Text** : Renders text in the context of the display list.
* **Bitmap** : Draws an image, video or canvas to the canvas according to its display properties.
* **BitmapSequence** : Displays animated or dynamic sprite sheets (images with multiple frames on a grid), and provides APIs for managing playback and sequencing.
* **Graphics** : Provides a simple but powerful API for dynamically drawing vector graphics.
* **Shape** : Renders vector art via the Graphics object within the context of the display list.


You can view the complete api docs [here](http://easeljs.com/docs/).

Now, before we get started, lets look at where you can actually use the Canvas element (and thus EaselJS). Canvas is part of the HTML5 specification, and is supported in the latest version of most current browsers, including:

* Safari
* Google Chrome
* Opera
* Firefox


However, there is one exception, and it is a pretty big one. Internet Explorer does not currently support the Canvas element (although the next version of the Internet Explorer will). According to NetMarketShare, [Internet Explorer 6, 7 and 8 make up about 57% of the browser market](http://marketshare.hitslink.com/browser-market-share.aspx?qprid=2), which is a large segment of users. There is a project named [ExplorerCanvas](http://excanvas.sourceforge.net/) that attempts to replicate Canvas support in Internet Explorer, but EaselJS has not been tested with it yet. Keep these points in mind when considering using the Canvas element.

Now that we have a good idea of where and when we can use the Canvas element, lets look at a simple example. In this example, we will use EaselJS to dynamically draw a circle and animate it across the Canvas. This will show us how to set up the library, introduce us to some basic concepts when working with the library, and show how to animate a graphic.

First, here is the working example:
<div width="400" height="300" id="canvasWrapper">
	<canvas width="400" height="300" id="stageCanvas"></canvas>
</div>
<link rel="stylesheet" href="/blog/post_files/getting-started-with-the-canvas-element-and-easeljs/styles.css">
<script src="/scripts/easeljs.js"></script><br />
<script src="/blog/post_files/getting-started-with-the-canvas-element-and-easeljs/Main.js"></script>

Now, lets look at the code, with comments:

``` html
<!DOCTYPE html>
<html lang="en"><head>
	<meta charset="utf-8" />
	
	<meta name="author" content="Mike Chambers" /> 
	<meta name="keywords" content="" /> 
	<meta name="description" content="" /> 
	<meta name="copyright" content="Mike Chambers" /> 
	<meta name="robots" content="index,follow" /> 	
	
	<title>TITLE</title>
	
	<style>
		#stageCanvas
		{
			background-color:#333333;
		}
	</style>

	<!-- import the Easel library. Downloaded from:
		http://easeljs.com/
	-->
	<script src="scripts/easel.js"></script>

	<script>
		//EaselJS Stage instance that wraps the Canvas element
		var stage;
		
		//EaselJS Shape instance that we will animate
		var circle;
		
		//radius of the circle Graphics that we will draw.
		var CIRCLE_RADIUS = 10;
		
		//x position that we will reset Shape to when it goes off
		//screen
		var circleXReset;
		
		//EaselJS Rectangle instance we will use to store the bounds
		//of the Canvas
		var bounds;
		
		//initialize function, called when page loads.
		function init()
		{
			//check and see if the canvas element is supported in
			//the current browser
			//http://diveintohtml5.org/detect.html#canvas
			if(!(!!document.createElement('canvas').getContext))
			{
				var wrapper = document.getElementById("canvasWrapper");
				wrapper.innerHTML = "Your browser does not appear to support " +
				"the HTML5 Canvas element";
				return;
			}
			
			//get a reference to the canvas element
			var canvas = document.getElementById("stageCanvas");
			
			//copy the canvas bounds to the bounds instance.
			//Note, if we resize the canvas, we need to reset
			//these bounds.
			bounds = new Rectangle();
			bounds.width = canvas.width;
			bounds.height = canvas.height;
			
			//pass the canvas element to the EaselJS Stage instance
			//The Stage class abstracts away the Canvas element and
			//is the root level display container for display elements.
			stage = new Stage(canvas);
			
			//Create an EaselJS Graphics element to create the
			//commands to draw a circle
			var g = new Graphics();
			
			//stroke of 1 px
			g.setStrokeStyle(1);
			
			//Set the stroke color, using the EaselJS 
			//Graphics.getRGB static method.
			//This creates a white color, with an alpha
			//of .7
			g.beginStroke(Graphics.getRGB(255,255,255,.7));
			
			//draw the circle
			g.drawCircle(0,0, CIRCLE_RADIUS);
			
			//note that the circle has not been drawn yet. 
			//the Graphics instance just has the commands to
			//draw the circle.
			//It will be drawn when the stage needs to render it
			//which is usually when we call stage.tick()
			
			//create a new Shape instance. This is a DisplayObject
			//which can be added directly to the stage (and rendered).
			//Pass in the Graphics instance that we created, and that
			//we want the Shape to draw.
			circle = new Shape(g);
			
			//set the initial x position, and the reset position
			circle.x = circleXReset = -CIRCLE_RADIUS;
			
			//set the y position
			circle.y = canvas.height / 2;
			
			//add the circle to the stage.
			stage.addChild(circle);
			
			//tell the stage to render to the canvas
			stage.update();
			
			Ticker.setFPS(24);
			
			//Subscribe to the Tick class. This will call the tick
			//method at a set interval (similar to ENTER_FRAME with
			//the Flash Player)
			Ticker.addListener(this);
		}
		
		//function called by the Tick instance at a set interval
		function tick()
		{
			//check and see if the Shape has gone of the right
			//of the stage.
			if(circle.x > bounds.width)
			{
				//if it has, reset it.
				circle.x = circleXReset;
			}
			
			//move the circle over 10 pixels
			circle.x += 8;
			
			//re-render the stage
			stage.update();
		}
	</script>
	
</head>
<body onload="init()">
	<div width="400" height="300" id="canvasWrapper">
		<canvas width="400" height="300" id="stageCanvas"></canvas>
	</div>
</body>
</html>
```

You can download the code for the example from [here](https://github.com/mikechambers/ExamplesByMesh/tree/master/HTML5/EaselJS/HelloWorld).

As you can see, the code is pretty simple, and its structure is very similar to using the DisplayList API within the Flash Player.

There are a couple of things that are important to point out. 

The EaselJS [Stage](http://easeljs.com/docs/symbols/Stage.html) instance wraps the Canvas element, and handles when and how items are rendered. The stage is only rendered when you call `stage.update()`, and for performance reasons, you should only call this if something has changed and you need to update the canvas.

The [Ticker](http://easeljs.com/docs/symbols/Ticker.html) class handles time management. It will call a tick event on any object that has subscribed to be notified. This is analogous to the `ENTER_FRAME` event in ActionScript.

If you resize the canvas, then its contents will be erased. However, using EaselJS, all you need to do is call `stage.update()` after resizing in order to re-render the graphics. 

Given the lack of Canvas support in Internet Explorer, it is important that you detect for Canvas support in the browser, and provide an appropriate fall back for the user. I have some simple code in the example above, or you can use the [Modernizr JavaScript Library](http://www.modernizr.com/) which provides an API for detecting support for HTML5 features.

Finally, this is an early release of the library, and thus APIs may (and probably will) change. In addition, some things which you might expect to work may not be supported yet. For example, there are currently no APIs to retrieve the height / width of a DisplayObject (you will have to figure it out yourself). However, in general, the library is very robust and has been used in some [production projects](http://gskinner.com/blog/archives/2010/12/pirates-love-daisies-html5-game-launches.html).

Here are some resources which are useful if you want to start playing around with the Canvas element via EaselJS:

* [EaselJS Homepage](http://www.easeljs.com)
* [EaselJS API Docs](http://easeljs.com/docs/)
* [Modernizr JavaScript Library](http://www.modernizr.com/) (for detecting support for HTML5 features).
* [Canvas Element Draft Specification](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#the-canvas-element)
* [Canvas Element](http://en.wikipedia.org/wiki/Canvas_element) (Wikipedia)
* [Let's call it a draw(ing surface)](http://diveintohtml5.org/canvas.html) Good introduction to the low level Canvas API.
* [HTML5 Browser Support Matrix](http://html5test.com/)
* [HTML5 and CSS3 Readiness](http://html5readiness.com/)
* [HTML5 Support in your Browser](http://www.findmebyip.com/#target-selector)

UPDATED : (02/15/2010) : Updated to work with EaselJS 0.3.1 release.

Post any questions / comments in the comments section below.
