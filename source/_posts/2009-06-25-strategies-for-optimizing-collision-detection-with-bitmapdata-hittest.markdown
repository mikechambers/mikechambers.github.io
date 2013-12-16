---
title: Strategies for optimizing collision detection with BitmapData.hitTest
author: mikechambers
date: 2009-06-25 12:17:01 -0800
layout: post
permalink: /2009/06/25/strategies-for-optimizing-collision-detection-with-bitmapdata-hittest/
categories:
  - General
tags:
  - collision_detection
---


Yesterday I blogged about how you can use the [BitmapData.hitTest API to do collision detection][1] between the visible parts of multiple DisplayObject instances. This works very well, but as some of the BitmapData apis can be cpu intensive (particularly new BitmapData and BitmapData.draw) you have to take care to make sure that performance does not get out of hand.

This post will discuss a number of approaches for optimizing collision detection when using BitmapData.hitTest.  
<!--more-->

  
**Check boundary boxes first**

The first thing to do is to check whether you need to check for visible collision detection in the first place. You can do this by checking whether the bounding boxes of the two DisplayObjects overlap, and only if they do, then use [BitmapData.hitTest][2] to see if their visible areas also overlap.

To do this, just use the DisplayObject.hitTestObject API like so:

``` actionscript
if(displayObject1.hitTestObject(displayObject2))
{
	//do check with BitmapData.hitTest
}
```

When checking collisions against many items, this can dramatically improve performance, as it can remove most of the BitmapData api calls and comparisons.

**Cache BitmapData**

If one or more of your display objects will not have any transformations applied to them (such as rotation), then you can generate the BitmapData once, and cache it for future comparisons. Basically, you are trading improved CPU performance, for higher memory usage (since you keep the BitmapData in memory).

Here is a simple example:

``` actionscript
private var bmpData:BitmapData;

private function checkCollisions():void
{
    if(!bmpData)
    {
        var blueRect:Rectangle = blueClip.getBounds(this);
        bmpData = new BitmapData(blueRect.width, blueRect.height, true, );
        bmpData.draw(blueClip)
    }
    
    //use bmpData.hitTest to check collisions
}
```

Furthermore, if you use multiple instances of a DisplayObject, then you can store the BitmapData for one instance, and use it for all instances of the DisplayObject. One thing I do, is the store it by the class type, which allows me to easily cache and retrieve BitmapData for multiple DisplayObject classes (I have custom classes that extend DisplayObject).

``` actionscript
private var bmpDataLookup:Dictionary = new Dictionary();

private function checkCollisions():void
{
		var classRef:Class = blueClip["constructor"] as Class;

		bmpData = bmpDataLookup[classRef];
		
		if(!bmpData)
		{
			//run once per lifetime of app per DisplayObject subclass
			var blueRect:Rectangle = blueClip.getBounds(this);
			bmpData = new BitmapData(blueRect.width, blueRect.height, true, 0);
			bmpData.draw(blueClip)
		}
		
		//use bmpData.hitTest to check collisions
}
```

This example caches the BitmapData once for each Class type. i.e. if you have a lot of instances of a UFOClass (which extends DisplayObject), you would only have to cache one instance of BitmapData regardless of the number of instances of the UFOClass you had.

Again though, this only really works if your DisplayObjects will not have any transformations applied to them (since otherwise, their bounding boxes may change).

**Set Thresholds for Caching**

Even if your DisplayObjects will have transformations applied to them, you can still improve performance by only updating the BitmapData if the transformation has changed more than some threshold. Essentially, you can trade some hit detection accuracy, for better performance.

For example, in a game I am working on right now, I have a Ship that rotates based on the user input. I need to check if the ship collides with any enemies. Since the ship may rotate, I can't use the technique above to cache the BitmapData. However, after some testing and profiling, I realized that I could cache the BitmapData and only update it if the rotation changes by more than 5. This means that the hit detection is slightly less accurate, but I can use cached BitmapData for many of the checks. In my case, I was able to remove 2/3rds of the BitmapData calls (basically use cached data 2/3rds of the time), without any noticeable change in ht detection accuracy.

``` actionscript
private var shipBmpData:BitmapData;
private var oldShipHash:int = 0;

private function checkCollisions():void
{

	var shipBounds:Rectangle = ship.getBounds(this);	
	
	var shipBoundsHash:int = ship.rotation;
	
	//basically, we check the rotation to see if it has changed much
	//if it hasnt, we just use the bitmapdata from earlier frame(s)
	if(!shipBmpData || 
		shipBoundsHash < oldShipHash - 5 || 
		shipBoundsHash > oldShipHash + 5)
	{	
		shipBmpData = new BitmapData(shipBounds.width, shipBounds.height, true, 0);
		
		//this shouldnt work in some cases because of the x/y changes
		//but collision detection seems to be working ok
		var shipOffset:Matrix = ship.transform.matrix;
		shipOffset.tx = ship.x - shipBounds.x;
		shipOffset.ty = ship.y - shipBounds.y;			

		shipBmpData.draw(ship, shipOffset);
	}

	oldShipHash = shipBoundsHash;

	//do collision detection with BitmapData.hitTest
	
}
```

Depending on the accuracy needed, this can provide large performance improvements.

**Reuse Bitmap Data Instances**

Another option is to reuse BitmapData instances, and use fillRect to reinitialize them before drawing new data in them. This removes the need to create a completely new BitmapData instance, but only works if the dimensions of your bonding box wont change. I wont go into detail on this technique (you can find a good description here), but in most cases where this could be useful, its probably better to just cache the BitmapData as discussed above.

**Choose the right collision detection technique / API**

Finally, make sure you are choosing the correct collision detection technique. For example, do you really need pixel perfect collision detection? Could you get away with just checking distances between items, or using some of the other existing APIs?

For example, if the visible area of your DisplayObjects fill most of there bounding boxes, then you could probably get away with just using DisplayObject.hitTestObject. Again, you trade some accurate for performance, but in a lot of cases, the user will not notice.

Is the visible areas of your DisplayObject mostly round? If so, you maybe be able to just check the distances between objects to test for collision.

The main point is that maybe BitmapData.hitTest is overkill for your needs.

**Look at other collision detection optimizations**

There are a lot of other general techniques for optimizing collision detection, many of which focus on reducing the number of tests needed. For example, you can divide your stage into a grid, and only check items that are in adjacent grids.

Many of these more general optimization techniques also apply when using BitmapData.hitTest, and you should explore them when optimizing your content.

Please post any other optimization techniques or suggestions in the comments.

 [1]: /blog/2009/06/24/using-bitmapdata-hittest-for-collision-detection/
 [2]: http://livedocs.adobe.com/flex/3/langref/flash/display/BitmapData.html#hitTest()