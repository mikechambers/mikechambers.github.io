---
title: Layering Multiple Canvas Elements using JavaScript and EaselJS
author: mikechambers
layout: post
permalink: /2011/01/25/layering-multiple-canvas-elements-using-javascript-and-easeljs/
categories:
  - General
tags:
  - canvas
  - easeljs
  - example
  - follow_drone
  - html5
  - javascript
---


If you run my [EaselJS Drone Follow example from yesterday][1] on any non-Android / iOS computer / device, you may notice that a graphic is drawn between the mouse touch point and the current position of the drone. This is done by managing and drawing to two canvas elements and is provided to help make it clear what the drone is following (your mouse) and which direction it is currently heading.

Why use two canvas elements, instead of just drawing to one? Well, there are two primary reasons I architected the example like this.  
<!--more-->

  
First, the main drawing canvas is persistent and is not cleared between renders. This allows me to have a single drone instance in memory (position, render, repeat) and minimize the region of the canvas that has to be rendered on any given pass. It makes it very simple to create trails of graphics, without having to instantiate and manage each individual graphic in the trail. Thus, any graphics drawn to the main canvas is permanent, and not appropriate for something like a UI overlay which needs to move, but not persist.

Second, and perhaps more importantly, by drawing the overlay ui on its own canvas, I can minimize the bounds of the region of each canvas that needs to be drawn on any given frame. Given that drawing to the canvas can be CPU intensive, and that the larger the drawing area, the more CPU is required, it is important to try and minimize the amount that is drawn as well as the size that is updated on any given render pass.

Separating the drawing canvas from the overlay canvas allows me to do this. Otherwise, I would not only have to manage the graphics for the entire canvas (in order to re-render them), but I would have to redraw all graphics on the canvas as opposed to just updating what had changed. This would lead to more complex code, higher memory requirements, as well as (sometimes) significantly higher CPU usage.

On the basic level, doing this in EaselJS is pretty simple. Just create two Canvas elements in your HTML document, and then create two [Stage][2] instances that wrap them. Indeed, EaselJS adds some interesting possibilities by allowing you to easily reparent and / or clone DisplayObjects across multiple stages. However, while EaselJS made working with multiple stages pretty easy, trying to leverage two canvas elements overlaid on top each other did present some issues, which I will discuss in this post.

[View Example][1]  
[Download and View Code][3] (MIT License)

My original goal was to have the example work on both the desktop with Mouse input, as well as on iOS and Android 2.2 based touch devices. 

In initial testing prior to adding the overlay, performance on Android and iOS devices lagged behind that on the desktop, but was still acceptable. However, as soon as I added the second canvas, performance took a huge drop on Android and iOS devices. Because of this, I had to branch my code, and only show the overlay on browsers that had a mouse based input (with an assumption that those would be regular computers with better performance).

Lets look at the code. First, here is the HTML markup for the example:

``` html
<body>
	<canvas id="mainCanvas" width="600" height="400"></canvas>
</body>
```

Notice that there is only a single canvas element. At runtime, we detect the environment in which we are running, and then then dynamically add the second canvas only if it is needed (Note that the content uses [jQuery][4]).

``` javascript
if((navigator.userAgent.match(/iPad/i) != null) ||
	(navigator.userAgent.match(/iPhone/i)) || 
	(navigator.userAgent.match(/iPod/i)) ||
	(navigator.userAgent.match(/Android/i))
	)
{	
	//...
}
else
{
	//assume we are on a device with a mouse / pointer
	
	//we have to dynamically add the overlay canvas, because if we do it
	//in HTML, and then remove it for mobile devices, it causes all of
	//the drawing on the mobile devices to no be anti-aliased
	
	//create the overlayCanvas, and add it to the DOM after the main
	//canvas (which is specified in the HTML)
	//canvasWrapper is a jQUery object that wraps the main canvas element
	 canvasWrapper.after(
		'<canvas id="overlayCanvas" width="600" height="400"></canvas>'
		);
		
	//overlay canvas used to draw target and line
	canvasOverlayWrapper = $("#overlayCanvas");
	
	//...
	
	//stage to manage the overlay canvas. Need to get the actual
	//element from the JQuery object.
	overlayStage = new Stage(canvasOverlayWrapper.get(0));		

	//..
}
```

Note, that I am testing for specific devices instead of general capabilities, as in general I am branching based on known CPU performance. However, a more robust solution would probably be to quickly profile the performance of the current environment and then use the overlay only in environments that met a certain performance threshold.

In the code above, I detect whether I am running on an Android or iOS device and if not, I dynamically create and add the overlay canvas element to the HTML DOM. I am dynamically adding the overlay canvas as opposed to dynamically removing it, as that puts the burden of the extra work on the environment that I am more confident has better performance (the non-device environment). Further, having the overlay Canvas element in the HTML, and then removing it would require a number of additional (and unnecessary) page reflows when running on Android and iOS (which again could negatively affect performance).

At this point, when running on a non-Android / iOS device, I have two Canvas elements wrapped by two EaselJS Stage instances. Since I am drawing graphics on the overlay canvas based on the position of the mouse as well as a graphic on the main stage, I need to do two things:

1.  Align the two stages and ensure they stay aligned so they will share the same coordinate space.
2.  Ensure that the canvas sizes remain the same when the window is resized (so graphics are not clipped in one or both stages).

First, I had to add a simple CSS rule to overlay the overlay canvas on top of the main canvas, and position it at 0,0 in the document:

``` css
#overlayCanvas
{
	position:absolute;
	left:0;
	top:0;
}
```

As far as sizing, I already had code to handle resizing the main canvas based on the window resizing, so I only had to add code to also resize the overlay canvas.

``` javascript
//called when the browser window is resized
function onWindowResize(e)
{
	//..
	
	//update the canvas dimensions since the window
	//has resized. Note that changing canvas dimensions, 
	//will cause it to be cleared
	updateCanvasDimensions();
	
	//..
}

//function that updates the size of the canvas based on the window size
function updateCanvasDimensions()
{
	//note that changing the canvas dimensions clears the canvas.
	canvasWrapper.attr("height", $(window).height(true));
	canvasWrapper.attr("width", $(window).width(true));
	
	//save the canvas offset
	canvasOffset = canvasWrapper.offset();	
	
	//if we have an overlay canvas
	if(canvasOverlayWrapper)
	{
		//resize it
		canvasOverlayWrapper.attr("height", $(window).height(true));
		canvasOverlayWrapper.attr("width", $(window).width(true));
		canvasOverlayOffset = canvasOverlayWrapper.offset();
	}	
}
```

So, now both canvases are aligned, and when the window is resized they are both resized to the same dimensions.

Again, the importance of this is that it means that both canvases same the same coordinate space. I can use x,y coordinates from one in the other, and ensure they will be on the same spot of the screen.

Once I got this setup, I ran into an issue. The overlay canvas was preventing the main canvas from receiving mouse events which it needed to position the drone. This was an issue because both canvases needed to access data from the mouse events.

Luckily, both canvases are in the same coordinate space, so I can just listen for the mouse events on one canvas and used them on both.

The main change this required was changing which canvas listened for the events based on whether there was an overlay canvas or not. If there is an overlay canvas, then the overlay canvas will capture the mouse events (since it is at a higher z-order). If there is no overlay, then the main canvas will capture the mouse events.

``` javascript
if(	(navigator.userAgent.match(/iPad/i) != null) ||
	(navigator.userAgent.match(/iPhone/i)) || 
	(navigator.userAgent.match(/iPod/i)) ||
	(navigator.userAgent.match(/Android/i))
	)
{	
	mainCanvas.ontouchstart = onTouchStart;
	mainCanvas.ontouchend = onTouchEnd;
	//...
}
else
{
	//..
	
	//listen for when the mouse moves
	canvasOverlayWrapper.mousemove(onMouseMove);
	
	//listen for a click event
	canvasOverlayWrapper.click(onMouseClick);

	//..
}
```

At this point, both canvases are aligned and in the same coordinate space, and I am receiving the relevant mouse events that I need. All I need to do now is listen for the relevant mouse events, and re-draw both canvases when the mouse position changes.

First, I listen for when the mouse moves:

``` javascript
function onMouseMove(e)
{
	//update the Mouse position coordinates
	updateMouseCoordinates(e);
}

//update the mouse coordinates
function updateMouseCoordinates(e)
{
	//we store these in a global object so they can be easily accessed
	//from anywhere (other classes)
	Mouse.x = e.pageX - canvasOffset.left;
	Mouse.y = e.pageY - canvasOffset.top;
}
```

When the mouse moves, I copy the canvas relative mouse cursor coordinates into a global object. Given that hundreds of mouse events can fire a second, I try to minimize code being executed here, and don&#8217;t do any rendering updates.

The rendering updates occur when the EaselJS tick event is called (which in my case occurs at a target 24 frames per second).

Here is the tick listener for the main page:

``` javascript
//called at each time interval. This is essentially the listener
//for Tick.addListener
function tick()
{
	//update the main stage / canvas
	stage.tick();
	
	//check if we have an overlay stage
	if(overlayStage)
	{
		//update the overlay line
		updateLine();
		
		//re-render the overlay stage / canvas
		overlayStage.tick();
	}
}
```

Note that the order of the stage.tick() calls is important. We need to update / tick the main stage first, as the overlay stage relies on properties from DisplayObjects on the main stage (and we want to make sure they have been updated before we render the overlay stage).

Basically, it renders the main canvas (with the new position of the drone shape), and if there is an overlayStage, re-renders the ui:

``` javascript
//redraws the overlay line based on Mouse and Drone position
function updateLine()
{
	//clear previous line
	lineGraphics.clear();
	
	//stroke style
	lineGraphics.setStrokeStyle(1);
	
	//stroke color
	lineGraphics.beginStroke(targetColor);
	
	//draw line from Mouse position to Drone position
	lineGraphics.moveTo(Mouse.x, Mouse.y);
	lineGraphics.lineTo(drone.x, drone.y);
}
```

lineGraphics is a EaselJS [Graphics][5] instance attached to a Shape instance on the overlay stage. 

The [Drone][6] instance on the main stage is also re-rendering itself on the tick event (as is the [Target][7] instance which tracks the mouse point).

Here we can see how nice it is to be able to share coordinates between canvases. First, we move the drawing point on the overlay canvas to the current mouse position. We then draw a line from that point, to the coordinates for the drone, which is attached the the main canvas.

You may be thinking that using multiple canvases and stages like this would be any easy way to manage the z-order between graphics rendered to the canvas. You can do this, but keep in mind that changing the z-order of the canvas elements in the DOM may cause page reflows, and thus could potentially be expensive. EaselJS allows you to manage the z-order of your display list using stage.addChildAt and stage.addChild (the same as in ActionScript 3). Which technique you should use will depend on your particular project, and how often individual "layers" need to be updated.

Of course, this is a simple example. Where this could really shine is in games with complex layers of graphics, where each layer may need to be updated at differing intervals.

Post any questions or comments below.

 [1]: http://www.mikechambers.com/blog/2011/01/24/easeljs-example-follow-drone/
 [2]: http://easeljs.com/docs/symbols/Stage.html
 [3]: https://github.com/mikechambers/ExamplesByMesh/tree/master/HTML5/EaselJS/follow
 [4]: http://jquery.com/
 [5]: http://easeljs.com/docs/symbols/Graphics.html
 [6]: https://github.com/mikechambers/ExamplesByMesh/blob/master/HTML5/EaselJS/follow/scripts/Drone.js
 [7]: https://github.com/mikechambers/ExamplesByMesh/blob/master/HTML5/EaselJS/follow/scripts/Target.js