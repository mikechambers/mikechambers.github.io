---
title: Relative performance for collision detection techniques in ActionScript 3
author: mikechambers
date: 2009-06-26 12:20:01 -0800
layout: post
permalink: /2009/06/26/relative-performance-for-collision-detection-techniques-in-actionscript-3/
categories:
  - General
tags:
  - as3
  - collision_detection
---


If you have read my blog any [this][1] [week][2], you have probably noticed that I have been doing some basic research on collision detection within the Flash Player. As part of this, I have put together a simple test suite, showing the performance of a couple of different techniques for checking for collision. This is by no means meant to be exhaustive (and currently tilts towards boundary collision). However, I wanted to post the results as the current information is useful (if nothing more than to confirm existing assumptions), and perhaps generate more tests an ideas around collision detection.  
<!--more-->

  
First, the test code (uses Flash Pro). clip1 and clip2 reference two overlapping MovieClips on the stage (clip2 is about 1/2 the size of clip1).

``` actionscript
package
{
	import flash.display.MovieClip;
	import flash.geom.Point;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.geom.Rectangle;
	
	import com.gskinner.utils.PerformanceTest;

	public class CollisionDetectionTests extends MovieClip
	{
		public var clip1:MovieClip;
		public var clip2:MovieClip;
	
		private var dynamicClip1:MovieClip;
		private var dynamicClip2:MovieClip;	
	
		var point1:Point = new Point();
		var point2:Point = new Point();
	
		private var clip1Rect:Rectangle;
		private var clip1ClipBmpData:BitmapData;
		private var clip2Rect:Rectangle;
		private var clip2ClipBmpData:BitmapData;
		
		public function CollisionDetectionTests()
		{
			super();
			
			init();
			checkCollisions();
			runTests();
		}
		
		private function init():void
		{
	
			clip1Rect = clip1.getBounds(this);
			clip1ClipBmpData = new BitmapData(clip1Rect.width, clip1Rect.height, true, 0);
			clip1ClipBmpData.draw(clip1);

			clip2Rect = clip2.getBounds(this);
			clip2ClipBmpData = new BitmapData(clip2Rect.width, clip2Rect.height, true, 0);
			clip2ClipBmpData.draw(clip2);

			dynamicClip1 = new MovieClip();

			dynamicClip1.graphics.beginFill(0xFF0000);
			dynamicClip1.graphics.drawEllipse(0,0, 100,100);
			dynamicClip1.cacheAsBitmap = true;

			dynamicClip1.x = 300;
			dynamicClip1.y = 300;

			addChild(dynamicClip1);

			dynamicClip2 = new MovieClip();

			dynamicClip2.graphics.beginFill(0x0000FF);
			dynamicClip2.graphics.moveTo(0, 0);
			dynamicClip2.graphics.lineTo(100, 0);
			dynamicClip2.graphics.lineTo(100, 100);
			dynamicClip2.graphics.lineTo(0, 100);
			dynamicClip2.graphics.lineTo(0, 0);
			dynamicClip2.cacheAsBitmap = true;

			dynamicClip2.x = 250;
			dynamicClip2.y = 250;

			addChild(dynamicClip2);
		}

		

		private function checkCollisions():void
		{
			//make sure everything is working and returns true
			trace(checkHitTest());
			trace(boundsIntersection());
			trace(checkHitTestReverse());
			trace(checkBoundsManually());
			trace(hitTestCircle());
			trace(checkBitmapDataHit());
			trace(checkBitmapDataHitReverse());
			trace(checkBitmapDataHitInternal());
			trace(checkBitmapDataHitDynamic());
		}

		private function runTests():void
		{
			var perfTest:PerformanceTest = PerformanceTest.getInstance();
			perfTest.out = out;

			//this is to work around bug in test lib
			perfTest.testSuite({});

			perfTest.testFunction(checkHitTest, 10000, "checkHitTest", "Uses DisplayObject.hitTest");
			perfTest.testFunction(checkHitTestReverse, 10000, "checkHitTestReverse", "Uses DisplayObject.hitTest with clips reversed");
			perfTest.testFunction(boundsIntersection, 10000, "boundsIntersection", "Uses Rectangle.intersects()");
			perfTest.testFunction(checkBoundsManually, 10000, "checkBoundsManually", "manually checks if bounds intersect.");
			perfTest.testFunction(hitTestCircle, 10000, "hitTestCircle", "Check if bounding circles intersect.");
			perfTest.testFunction(checkBitmapDataHit, 10000, "checkBitmapDataHit", "Uses BitmapData.hitTest to check for collision.");
			perfTest.testFunction(checkBitmapDataHitReverse, 10000, "checkBitmapDataHitReverse", "Uses BitmapData.hitTest to check for collision. Instances reversed.");
			perfTest.testFunction(checkBitmapDataHitInternal, 10000, "checkBitmapDataHitInternal", "Uses BitmapData.hitTest to check for collision. BitmapData not cached.");
			perfTest.testFunction(checkBitmapDataHitDynamic, 10000, "checkBitmapDataHitDynamic", "Uses BitmapData.hitTest to check for collision. BitmapData not cached. MovieClips dynamic.");
		}

		private function checkHitTest():Boolean
		{
			return clip1.hitTestObject(clip2);
		}

		private function checkHitTestReverse():Boolean
		{
			return clip2.hitTestObject(clip1);
		}

		private function boundsIntersection():Boolean
		{	
			return clip1.getBounds(this).intersects(clip2.getBounds(this));
		}


		private function hitTestCircle():Boolean
		{
			var dx:Number = (clip2.x + clip2.width / 2) - (clip1.x + clip1.width / 2);
			var dy:Number = (clip2.y + clip2.height / 2) - (clip1.y + clip1.height / 2);
			var dist:Number = Math.sqrt(dx * dx + dy * dy);

			return (dist < ((clip1.width / 2) + (clip2.width / 2)));
		}

		private function checkBoundsManually():Boolean
		{
			if(clip1.x < clip2.x + clip2.width &&
			   clip2.x < clip1.x + clip1.width &&
			   clip1.y < clip2.y + clip2.height &&
			   clip2.y < clip1.y + clip1.height
			   )
			{
				return true;
			}

			return false;
		}

		private function checkBitmapDataHit():Boolean
		{
			point1.x = clip1.x;
			point1.y = clip1.y;

			point2.x = clip2.x;
			point2.y = clip2.y;
			if(clip1ClipBmpData.hitTest(point1,
										255,
										clip2ClipBmpData,
										point2,
										255

								  ))
			{
				return true;
			}

			return false;
		}


		private function checkBitmapDataHitInternal():Boolean
		{
			var _clip1Rect:Rectangle = clip1.getBounds(this);
			var _clip1ClipBmpData:BitmapData = new BitmapData(_clip1Rect.width, _clip1Rect.height, true, 0);
			_clip1ClipBmpData.draw(clip1);

			var _clip2Rect:Rectangle = clip2.getBounds(this);
			var _clip2ClipBmpData:BitmapData = new BitmapData(_clip2Rect.width, _clip2Rect.height, true, 0);
			_clip2ClipBmpData.draw(clip2);	

			point1.x = clip1.x;
			point1.y = clip1.y;

			point2.x = clip2.x;
			point2.y = clip2.y;

			var hits:Boolean = false;
			if(_clip1ClipBmpData.hitTest(point1,
										255,
										_clip2ClipBmpData,
										point2,
										255
								  ))
			{
				hits = true;
			}

			_clip1ClipBmpData.dispose();
			_clip2ClipBmpData.dispose();

			return hits;
		}

		private function checkBitmapDataHitDynamic():Boolean
		{
			var dynamicClip1Rect:Rectangle = dynamicClip1.getBounds(this);
			var dynamicClip1ClipBmpData:BitmapData = new BitmapData(dynamicClip1Rect.width, 
																	dynamicClip1Rect.height, true, 0);
			dynamicClip1ClipBmpData.draw(dynamicClip1);

			var dynamicClip2Rect:Rectangle = dynamicClip2.getBounds(this);
			var dynamicClip2ClipBmpData:BitmapData = new BitmapData(dynamicClip2Rect.width, 
																	dynamicClip2Rect.height, true, 0);
			dynamicClip2ClipBmpData.draw(dynamicClip2);	

			point1.x = dynamicClip1.x;
			point1.y = dynamicClip1.y;

			point2.x = dynamicClip2.x;
			point2.y = dynamicClip2.y;	

			var hits:Boolean = false;
			if(dynamicClip1ClipBmpData.hitTest(point1,
										255,
										dynamicClip2ClipBmpData,
										point2,
										255
								  ))
			{
				hits = true;
			}

			dynamicClip1ClipBmpData.dispose();
			dynamicClip2ClipBmpData.dispose();

			return hits;
		}

		private function checkBitmapDataHitReverse():Boolean
		{
			point1.x = clip1.x;
			point1.y = clip1.y;

			point2.x = clip2.x;
			point2.y = clip2.y;	

			if(clip2ClipBmpData.hitTest(point2,
										255,
										clip1ClipBmpData,
										point1,
										255

								  ))
			{
				return true;
			}

			return false;
		}

		private function out(str:*):void
		{
			trace(str);
		}
	}
}
```

You can download the code from [here][3] (requires Flash Pro and [Grant Skinner's Performance Testing Harness][4]).

And here are the raw results:

<pre>––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
checkHitTest (10000 iterations)
Uses DisplayObject.hitTest                                              
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
method...................................................ttl ms...avg ms
[function]                                                    8     0.00
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
checkHitTestReverse (10000 iterations)
Uses DisplayObject.hitTest with clips reversed                          
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
method...................................................ttl ms...avg ms
[function]                                                    7     0.00
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
boundsIntersection (10000 iterations)
Uses Rectangle.intersects()                                             
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
method...................................................ttl ms...avg ms
[function]                                                   33     0.00
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
checkBoundsManually (10000 iterations)
manually checks if bounds intersect.                                    
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
method...................................................ttl ms...avg ms
[function]                                                   18     0.00
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
hitTestCircle (10000 iterations)
Check if bounding circles intersect.                                    
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
method...................................................ttl ms...avg ms
[function]                                                   22     0.00
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
checkBitmapDataHit (10000 iterations)
Uses BitmapData.hitTest to check for collision.                         
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
method...................................................ttl ms...avg ms
[function]                                                    7     0.00
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
checkBitmapDataHitReverse (10000 iterations)
Uses BitmapData.hitTest to check for collision. Instances reversed.     
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
method...................................................ttl ms...avg ms
[function]                                                    7     0.00
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
checkBitmapDataHitInternal (10000 iterations)
Uses BitmapData.hitTest to check for collision. BitmapData not cached.  
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
method...................................................ttl ms...avg ms
[function]                                                 6332     0.63
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
checkBitmapDataHitDynamic (10000 iterations)
Uses BitmapData.hitTest to check for collision. BitmapData not cached.
Dynamic MovieClips
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
method...................................................ttl ms...avg ms
[function]                                                 1892     0.19
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––</pre>

Most of the results are as expected, although there is one surprise. 

Doing a BitmapData.hitTest on a MovieClip placed onto the stage at author time (in Flash Pro) is 3 times slower than testing against a MovieClip generated and drawn at runtime. The only thing I can think that is happening is that perhaps for some reason the garbage collector is being triggered in the *checkBitmapDataHitInternal* and not the checkBitmapDataHitDynamic test. I have asked around internally what might be causing it, but I would be curious if anyone else is seeing the same results.

So, some quick conclusions from this:

1.  DisplayObject.hitTest is a fast way to do a quick boundaries check.
2.  Having to dynamically generate BitmapData for BitmapData.hitTest leads to a big performance hit.
3.  If you can cache the BitmapData being compared, then BitmapData.hitTest performance is on par with the other techniques / APIs tested. However, performance degrades as the dimensions of the clips increase (see [here][5]).
4.  Getting the BitmapData from a MovieClip that has cacheAsBitmap = false is 3 times slower than getting it from a MovieClip with the property set to true (Thanks to Renaun Erickson who figured out the performance discrepancy).

I will update the post and results as I learn more techniques and get more information.

If you find any bugs with the test, or would like to add some more tests (such as a test using [BitmapData.getColorBoundsRect][6]), just post them in the comments.

**Updated : July 6, 2009 : Added info on cacheAsBitmap property impact on performance.** (See this [comment][7]).

**Updated : November 6, 2009 : Added optimized circle test in [comments][8]** : Approaches performance of hitTest.

 [1]: http://www.mikechambers.com/blog/2009/06/24/using-bitmapdata-hittest-for-collision-detection/
 [2]: http://www.mikechambers.com/blog/2009/06/25/strategies-for-optimizing-collision-detection-with-bitmapdata-hittest/
 [3]: http://www.mikechambers.com/blog/files/collisiondetection/CollisionDetectionTests.zip
 [4]: http://www.gskinner.com/blog/archives/2009/04/as3_performance.html
 [5]: http://www.mikechambers.com/blog/2009/06/26/relative-performance-for-collision-detection-techniques-in-actionscript-3/comment-page-1/#comment-16495
 [6]: http://livedocs.adobe.com/flex/3/langref/flash/display/BitmapData.html#getColorBoundsRect()
 [7]: http://www.mikechambers.com/blog/2009/06/26/relative-performance-for-collision-detection-techniques-in-actionscript-3/#comment-16494
 [8]: #comment-17507