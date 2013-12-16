---
title: Using BitmapData.hitTest for Collision Detection
author: mikechambers
date: 2009-06-24 12:57:01 -0800
layout: post
permalink: /2009/06/24/using-bitmapdata-hittest-for-collision-detection/
categories:
  - General
tags:
  - collision_detection
---


The Flash Player contains a number of APIs for handling collision detection within Flash content. The [DisplayObject][1] class contains hitTest and hitTestPoint which can be useful if you need to detect bounding box collisions, or detect collisions between an individual point and bounding boxes or shapes.

However, BitmapData also contains a [hitTest][2] API, which can check collisions on BitmapData. Where the API really shines, is when you need to detect collisions between the visible areas of DisplayObjects (and not just of their bounding boxes). The API contains functionality for testing collisions between BitmapData and a Point, BitmapData and a Rectangle, and BitmapData and another BitmapData. It is the last item that I will focus on in this post.  
<!--more-->

  
Since you can get BitmapData from a DisplayObject the API can be used to detect very exact collisions between the visible areas of DisplayObjects, even if the DisplayObjects have irregular shapes.

Here is a simple example that uses the API to detect collisions between the visible areas of two MovieClips using BitmapData.hitTest.

<span>
<script type="text/javascript" src="/blog/scripts/swfobject/swfobject.js"></script>
<script type="text/javascript">
	var flashvars = {};
	var params = {};
	var attributes = {};
	attributes.id = "bitmaphittest_1";
	swfobject.embedSWF("/blog/files/collisiondetection/bitmaphittest_1.swf", "myAlternativeContent_1", "550", "400", "9.0.0", "expressInstall.swf", flashvars, params, attributes);
</script>

<div id="myAlternativeContent_1">
	<a href="http://www.adobe.com/go/getflashplayer">
		<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" />
	</a>
</div</span>

And here is the code

``` actionscript
var redRect:Rectangle = redClip.getBounds(this);
var redClipBmpData = new BitmapData(redRect.width, redRect.height, true, 0);
redClipBmpData.draw(redClip);

var blueRect:Rectangle = blueClip.getBounds(this);
var blueClipBmpData = new BitmapData(blueRect.width, blueRect.height, true, 0);
blueClipBmpData.draw(blueClip);

addEventListener(Event.ENTER_FRAME, enterFrame);

function enterFrame(e:Event):void
{
	blueClip.x = mouseX;
	blueClip.y = mouseY;
	
	if(redClipBmpData.hitTest(new Point(redClip.x, redClip.y),
								255,
								blueClipBmpData,
								new Point(blueClip.x, blueClip.y),
								255
						  
						  ))
	{
		trace("hit");
		redClip.filters = [new GlowFilter()];
	}
	else
	{
		redClip.filters = [];
	}
}
```

Basically, the content contains two MovieClips on the timeline. We draw the graphics for each MovieClip into a BitmapData instance, and then use the BitmapData.hitTest API to see if the visible parts of the MovieClip (non-transparent) instances collide.

Couple of notes on the example:

1. The initial fill for the BitmapData is transparent pixels. This is necessary to detect just the visible areas of the DisplayObject.

2. The Point instances passed to hitTest are used to align the BitmapData instances for the comparisons.

This example works regardless of the contents or shape of the DisplayObjects. However, if either of the DisplayObjects have had any transformations applied to them (such as rotation), then the collision detection wont work correctly.

In order to get it to work, you need to apply a Matrix when drawing the BitmapData to account for the transformation applied to one or both DisplayObjects. If you haven't worked with Matrices and DisplayObject transformations, this can be a little daunting at first (it was for me). If you are new to using Matrices, I suggest reading this [excellent article on Matrices in Flash over at senocular.com][3].

Luckily for me, Trevor McCauley, who runs [senocular.com][4], also happens to works for Adobe on the Flash Player team. He really helped me understand how how to get the hit detection to work when the DisplayObjects have had transformations applied to them.

Here is the example:

<span>
<script type="text/javascript">
	var flashvars = {};
	var params = {};
	var attributes = {};
	attributes.id = "bitmaphittest_2";
	swfobject.embedSWF("/blog/files/collisiondetection/bitmaphittest_2.swf", "myAlternativeContent_2", "550", "400", "9.0.0", "expressInstall.swf", flashvars, params, attributes);
</script>

<div id="myAlternativeContent_2">
	<a href="http://www.adobe.com/go/getflashplayer">
		<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" />
	</a>
</div></span>

and the code:

``` actionscript
addEventListener(Event.ENTER_FRAME, enterFrame);

function enterFrame(e:Event):void
{
	blueClip.x = mouseX;
	blueClip.y = mouseY;	
	
	redClip.rotation++;
	
	var blueRect:Rectangle = blueClip.getBounds(this);
	var blueOffset:Matrix = blueClip.transform.matrix;
	blueOffset.tx = blueClip.x - blueRect.x;
	blueOffset.ty = blueClip.y - blueRect.y;	
	
	var blueClipBmpData = new BitmapData(blueRect.width, blueRect.height, true, 0);
	blueClipBmpData.draw(blueClip, blueOffset);		
	
	
	var redRect:Rectangle = redClip.getBounds(this);
	var redClipBmpData = new BitmapData(redRect.width, redRect.height, true, 0);
	
	var redOffset:Matrix = redClip.transform.matrix;
	redOffset.tx = redClip.x - redRect.x;
	redOffset.ty = redClip.y - redRect.y;	
	
	redClipBmpData.draw(redClip, redOffset);	
	
	var rLoc:Point = new Point(redRect.x, redRect.y);
	var bLoc:Point = new Point(blueRect.x, blueRect.y);	
	
	
	if(redClipBmpData.hitTest(rLoc,
									255,
									blueClipBmpData,
									bLoc,
									255
						  		))
	{
		trace("hit");
		redClip.filters = [new GlowFilter()];
	}
	else
	{
		redClip.filters = [];
	}
	
	blueClipBmpData.dispose();
	redClipBmpData.dispose();
}
```

Note that we use the bounds of each DisplayObject to determine the BitmapData size and not the height / width of the DisplayObject. This is because the transformation will most likely modify the bounds, and we need to take this into account. In the first example, we could have just used the height and width of the DisplayObjects since they were the same as the bounds, but in general you should get in the habit of using the bounds. 

We also pass a Matrix to each BitmapData.draw call to account for any transformations that may have been applied to the DisplayObjects (in this case rotations). I could try and explain what the Matrix is doing, but to be honest, im still trying to get my head around it. Instead, Ill let Trevor explain it (from an email he sent to me):

> For this you need the transformation of the object as defined by DisplayObject.transform.matrix. Since everything is in the same container, we still won't have to worry about walking up hierarchies to get contcatenated/global matrices - we can just use that which is directly applied to the target object (transform.matrix). This gives you the full transform of that object. But for the purposes of capturing a bitmap, we only want the non-translation parts of that transform. This is because when a bitmap is captured, it's captured from the 0,0 location in the coordinate space of the captured object outward into positive space. The translation of the matrix of the desired object is its position in its parent coordinate space, not its own. HOWEVER, if that object's own 0,0 location is within the middle of its graphic elements, drawing it into a Bitmap directly from 0,0 could cause cropping. So in terms of that translation as it is to be used with BitmapData.draw(), it's still important to make sure everything in the target object is captured. And in doing that, it means shifting everything that would appear in negative coordinate space over into positive coordinate space.
> 
> Luckily, using getBounds (again) this is quite simple. We can use getBounds to determine the bounds of an object in its parent coordinate space - this includes its transformations. We also know the location of 0,0 within the parent coordinate space because that is the same location it places the target object using its x and y properties. With that, we can get the needed bitmap translation by simply subtracting the bounds x,y from the object's own x,y. In code that essentially becomes 
> 
> var b = t.getBounds(t.parent);  
> var m = t.transform.matrix;  
> m.tx = t.x- b.x;  
> m.ty = t.y - b.y;  
> var bmp = new BitmapData(b.width, b.height, true, 0);  
> bmp.draw(t, m);
> 
> where 't' is the target display object.

Now, I will be the first to admit that I am still wrapping my head around some of this stuff, especially with the use of the Matrices to offset the transformation. However, the second example above is generic and robust enough to be used for general pixel perfect collision detection on visible portions of DisplayObjects.

One note, is that the examples above assumes that the items being compared share the same parent. If they don't you need to make some additional adjustments (to take into consideration other transformations), but that is a post for another day.

Btw, if you don't already, you need to read [senocular.com][4]. This is one of the best resources on understanding ActionScript 3 and the Flash Player.

**Update** : One optimzation which you can make is to first check if the bounding boxes of the DisplayObjects overlap (using [DisplayObject.hitTestObject][5]), and only if they do, use BitmapData.hitTest to see if their visible areas are touching.

 [1]: http://livedocs.adobe.com/flex/3/langref/flash/display/DisplayObject.html
 [2]: http://livedocs.adobe.com/flex/3/langref/flash/display/BitmapData.html#hitTest()
 [3]: http://www.senocular.com/flash/tutorials/transformmatrix/
 [4]: http://www.senocular.com/
 [5]: http://livedocs.adobe.com/flex/3/langref/flash/display/DisplayObject.html#hitTestObject()