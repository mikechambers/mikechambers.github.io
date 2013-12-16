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

<div class="highlight">
  <pre>package
{
	<span style="color: #008000; font-weight: bold">import</span> flash.display.<span style="color: #008000">MovieClip</span><span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.geom.<span style="color: #008000">Point</span><span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.display.Bitmap<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.display.<span style="color: #008000">BitmapData</span><span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.geom.<span style="color: #008000">Rectangle</span><span style="color: #666666">;</span>
	
	<span style="color: #008000; font-weight: bold">import</span> com.gskinner.utils.PerformanceTest<span style="color: #666666">;</span>

	<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">class</span> CollisionDetectionTests <span style="color: #008000; font-weight: bold">extends</span> <span style="color: #008000">MovieClip</span>
	{
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">var</span> clip1<span style="color: #666666">:</span><span style="color: #008000">MovieClip</span><span style="color: #666666">;</span>
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">var</span> clip2<span style="color: #666666">:</span><span style="color: #008000">MovieClip</span><span style="color: #666666">;</span>
	
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> dynamicClip1<span style="color: #666666">:</span><span style="color: #008000">MovieClip</span><span style="color: #666666">;</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> dynamicClip2<span style="color: #666666">:</span><span style="color: #008000">MovieClip</span><span style="color: #666666">;</span>	
	
		<span style="color: #008000; font-weight: bold">var</span> point1<span style="color: #666666">:</span><span style="color: #008000">Point</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Point</span>();
		<span style="color: #008000; font-weight: bold">var</span> point2<span style="color: #666666">:</span><span style="color: #008000">Point</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Point</span>();
	
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> clip1Rect<span style="color: #666666">:</span><span style="color: #008000">Rectangle</span><span style="color: #666666">;</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> clip1ClipBmpData<span style="color: #666666">:</span><span style="color: #008000">BitmapData</span><span style="color: #666666">;</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> clip2Rect<span style="color: #666666">:</span><span style="color: #008000">Rectangle</span><span style="color: #666666">;</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> clip2ClipBmpData<span style="color: #666666">:</span><span style="color: #008000">BitmapData</span><span style="color: #666666">;</span>
		
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> CollisionDetectionTests()
		{
			<span style="color: #008000; font-weight: bold">super</span>();
			
			init();
			checkCollisions();
			runTests();
		}
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> init()<span style="color: #666666">:</span>void
		{
	
			clip1Rect <span style="color: #666666">=</span> clip1.getBounds(<span style="color: #008000; font-weight: bold">this</span>);
			clip1ClipBmpData <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">BitmapData</span>(clip1Rect.width<span style="color: #666666">,</span> clip1Rect.height<span style="color: #666666">,</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">,</span> <span style="color: #666666"></span>);
			clip1ClipBmpData.draw(clip1);

			clip2Rect <span style="color: #666666">=</span> clip2.getBounds(<span style="color: #008000; font-weight: bold">this</span>);
			clip2ClipBmpData <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">BitmapData</span>(clip2Rect.width<span style="color: #666666">,</span> clip2Rect.height<span style="color: #666666">,</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">,</span> <span style="color: #666666"></span>);
			clip2ClipBmpData.draw(clip2);

			dynamicClip1 <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">MovieClip</span>();

			dynamicClip1.graphics.beginFill(<span style="color: #666666"></span>xFF0000);
			dynamicClip1.graphics.drawEllipse(<span style="color: #666666">0,0,</span> <span style="color: #666666">100,100</span>);
			dynamicClip1.cacheAsBitmap <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">;</span>

			dynamicClip1.x <span style="color: #666666">=</span> <span style="color: #666666">300;</span>
			dynamicClip1.y <span style="color: #666666">=</span> <span style="color: #666666">300;</span>

			addChild(dynamicClip1);

			dynamicClip2 <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">MovieClip</span>();

			dynamicClip2.graphics.beginFill(<span style="color: #666666">0x0000</span>FF);
			dynamicClip2.graphics.moveTo(<span style="color: #666666">0,</span> <span style="color: #666666"></span>);
			dynamicClip2.graphics.lineTo(<span style="color: #666666">100,</span> <span style="color: #666666"></span>);
			dynamicClip2.graphics.lineTo(<span style="color: #666666">100,</span> <span style="color: #666666">100</span>);
			dynamicClip2.graphics.lineTo(<span style="color: #666666">0,</span> <span style="color: #666666">100</span>);
			dynamicClip2.graphics.lineTo(<span style="color: #666666">0,</span> <span style="color: #666666"></span>);
			dynamicClip2.cacheAsBitmap <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">;</span>

			dynamicClip2.x <span style="color: #666666">=</span> <span style="color: #666666">250;</span>
			dynamicClip2.y <span style="color: #666666">=</span> <span style="color: #666666">250;</span>

			addChild(dynamicClip2);
		}

		

		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> checkCollisions()<span style="color: #666666">:</span>void
		{
			<span style="color: #408080; font-style: italic">//make sure everything is working and returns true</span>
			<span style="color: #0000FF">trace</span>(checkHitTest());
			<span style="color: #0000FF">trace</span>(boundsIntersection());
			<span style="color: #0000FF">trace</span>(checkHitTestReverse());
			<span style="color: #0000FF">trace</span>(checkBoundsManually());
			<span style="color: #0000FF">trace</span>(hitTestCircle());
			<span style="color: #0000FF">trace</span>(checkBitmapDataHit());
			<span style="color: #0000FF">trace</span>(checkBitmapDataHitReverse());
			<span style="color: #0000FF">trace</span>(checkBitmapDataHitInternal());
			<span style="color: #0000FF">trace</span>(checkBitmapDataHitDynamic());
		}

		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> runTests()<span style="color: #666666">:</span>void
		{
			<span style="color: #008000; font-weight: bold">var</span> perfTest<span style="color: #666666">:</span>PerformanceTest <span style="color: #666666">=</span> PerformanceTest.getInstance();
			perfTest.out <span style="color: #666666">=</span> out<span style="color: #666666">;</span>

			<span style="color: #408080; font-style: italic">//this is to work around bug in test lib</span>
			perfTest.testSuite({});

			perfTest.testFunction(checkHitTest<span style="color: #666666">,</span> <span style="color: #666666">10000,</span> <span style="color: #BA2121">"checkHitTest"</span><span style="color: #666666">,</span> <span style="color: #BA2121">"Uses DisplayObject.hitTest"</span>);
			perfTest.testFunction(checkHitTestReverse<span style="color: #666666">,</span> <span style="color: #666666">10000,</span> <span style="color: #BA2121">"checkHitTestReverse"</span><span style="color: #666666">,</span> <span style="color: #BA2121">"Uses DisplayObject.hitTest with clips reversed"</span>);
			perfTest.testFunction(boundsIntersection<span style="color: #666666">,</span> <span style="color: #666666">10000,</span> <span style="color: #BA2121">"boundsIntersection"</span><span style="color: #666666">,</span> <span style="color: #BA2121">"Uses Rectangle.intersects()"</span>);
			perfTest.testFunction(checkBoundsManually<span style="color: #666666">,</span> <span style="color: #666666">10000,</span> <span style="color: #BA2121">"checkBoundsManually"</span><span style="color: #666666">,</span> <span style="color: #BA2121">"manually checks if bounds intersect."</span>);
			perfTest.testFunction(hitTestCircle<span style="color: #666666">,</span> <span style="color: #666666">10000,</span> <span style="color: #BA2121">"hitTestCircle"</span><span style="color: #666666">,</span> <span style="color: #BA2121">"Check if bounding circles intersect."</span>);
			perfTest.testFunction(checkBitmapDataHit<span style="color: #666666">,</span> <span style="color: #666666">10000,</span> <span style="color: #BA2121">"checkBitmapDataHit"</span><span style="color: #666666">,</span> <span style="color: #BA2121">"Uses BitmapData.hitTest to check for collision."</span>);
			perfTest.testFunction(checkBitmapDataHitReverse<span style="color: #666666">,</span> <span style="color: #666666">10000,</span> <span style="color: #BA2121">"checkBitmapDataHitReverse"</span><span style="color: #666666">,</span> <span style="color: #BA2121">"Uses BitmapData.hitTest to check for collision. Instances reversed."</span>);
			perfTest.testFunction(checkBitmapDataHitInternal<span style="color: #666666">,</span> <span style="color: #666666">10000,</span> <span style="color: #BA2121">"checkBitmapDataHitInternal"</span><span style="color: #666666">,</span> <span style="color: #BA2121">"Uses BitmapData.hitTest to check for collision. BitmapData not cached."</span>);
			perfTest.testFunction(checkBitmapDataHitDynamic<span style="color: #666666">,</span> <span style="color: #666666">10000,</span> <span style="color: #BA2121">"checkBitmapDataHitDynamic"</span><span style="color: #666666">,</span> <span style="color: #BA2121">"Uses BitmapData.hitTest to check for collision. BitmapData not cached. MovieClips dynamic."</span>);
		}

		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> checkHitTest()<span style="color: #666666">:</span><span style="color: #008000">Boolean</span>
		{
			<span style="color: #008000; font-weight: bold">return</span> clip1.hitTestObject(clip2);
		}

		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> checkHitTestReverse()<span style="color: #666666">:</span><span style="color: #008000">Boolean</span>
		{
			<span style="color: #008000; font-weight: bold">return</span> clip2.hitTestObject(clip1);
		}

		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> boundsIntersection()<span style="color: #666666">:</span><span style="color: #008000">Boolean</span>
		{	
			<span style="color: #008000; font-weight: bold">return</span> clip1.getBounds(<span style="color: #008000; font-weight: bold">this</span>).intersects(clip2.getBounds(<span style="color: #008000; font-weight: bold">this</span>));
		}


		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> hitTestCircle()<span style="color: #666666">:</span><span style="color: #008000">Boolean</span>
		{
			<span style="color: #008000; font-weight: bold">var</span> dx<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> (clip2.x <span style="color: #666666">+</span> clip2.width <span style="color: #BB6688">/ 2) - (clip1.x + clip1.width /</span> <span style="color: #666666">2</span>);
			<span style="color: #008000; font-weight: bold">var</span> dy<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> (clip2.y <span style="color: #666666">+</span> clip2.height <span style="color: #BB6688">/ 2) - (clip1.y + clip1.height /</span> <span style="color: #666666">2</span>);
			<span style="color: #008000; font-weight: bold">var</span> dist<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> <span style="color: #008000">Math</span>.sqrt(dx <span style="color: #666666">*</span> dx <span style="color: #666666">+</span> dy <span style="color: #666666">*</span> dy);

			<span style="color: #008000; font-weight: bold">return</span> (dist <span style="color: #666666">&lt;</span> ((clip1.width <span style="color: #BB6688">/ 2) + (clip2.width /</span> <span style="color: #666666">2</span>)));
		}

		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> checkBoundsManually()<span style="color: #666666">:</span><span style="color: #008000">Boolean</span>
		{
			<span style="color: #008000; font-weight: bold">if</span>(clip1.x <span style="color: #666666">&lt;</span> clip2.x <span style="color: #666666">+</span> clip2.width <span style="color: #666666">&&</span>
			   clip2.x <span style="color: #666666">&lt;</span> clip1.x <span style="color: #666666">+</span> clip1.width <span style="color: #666666">&&</span>
			   clip1.y <span style="color: #666666">&lt;</span> clip2.y <span style="color: #666666">+</span> clip2.height <span style="color: #666666">&&</span>
			   clip2.y <span style="color: #666666">&lt;</span> clip1.y <span style="color: #666666">+</span> clip1.height
			   )
			{
				<span style="color: #008000; font-weight: bold">return</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">;</span>
			}

			<span style="color: #008000; font-weight: bold">return</span> <span style="color: #008000; font-weight: bold">false</span><span style="color: #666666">;</span>
		}

		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> checkBitmapDataHit()<span style="color: #666666">:</span><span style="color: #008000">Boolean</span>
		{
			point1.x <span style="color: #666666">=</span> clip1.x<span style="color: #666666">;</span>
			point1.y <span style="color: #666666">=</span> clip1.y<span style="color: #666666">;</span>

			point2.x <span style="color: #666666">=</span> clip2.x<span style="color: #666666">;</span>
			point2.y <span style="color: #666666">=</span> clip2.y<span style="color: #666666">;</span>
			<span style="color: #008000; font-weight: bold">if</span>(clip1ClipBmpData.hitTest(point1<span style="color: #666666">,</span>
										<span style="color: #666666">255,</span>
										clip2ClipBmpData<span style="color: #666666">,</span>
										point2<span style="color: #666666">,</span>
										<span style="color: #666666">255</span>

								  ))
			{
				<span style="color: #008000; font-weight: bold">return</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">;</span>
			}

			<span style="color: #008000; font-weight: bold">return</span> <span style="color: #008000; font-weight: bold">false</span><span style="color: #666666">;</span>
		}


		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> checkBitmapDataHitInternal()<span style="color: #666666">:</span><span style="color: #008000">Boolean</span>
		{
			<span style="color: #008000; font-weight: bold">var</span> _clip1Rect<span style="color: #666666">:</span><span style="color: #008000">Rectangle</span> <span style="color: #666666">=</span> clip1.getBounds(<span style="color: #008000; font-weight: bold">this</span>);
			<span style="color: #008000; font-weight: bold">var</span> _clip1ClipBmpData<span style="color: #666666">:</span><span style="color: #008000">BitmapData</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">BitmapData</span>(_clip1Rect.width<span style="color: #666666">,</span> _clip1Rect.height<span style="color: #666666">,</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">,</span> <span style="color: #666666"></span>);
			_clip1ClipBmpData.draw(clip1);

			<span style="color: #008000; font-weight: bold">var</span> _clip2Rect<span style="color: #666666">:</span><span style="color: #008000">Rectangle</span> <span style="color: #666666">=</span> clip2.getBounds(<span style="color: #008000; font-weight: bold">this</span>);
			<span style="color: #008000; font-weight: bold">var</span> _clip2ClipBmpData<span style="color: #666666">:</span><span style="color: #008000">BitmapData</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">BitmapData</span>(_clip2Rect.width<span style="color: #666666">,</span> _clip2Rect.height<span style="color: #666666">,</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">,</span> <span style="color: #666666"></span>);
			_clip2ClipBmpData.draw(clip2);	

			point1.x <span style="color: #666666">=</span> clip1.x<span style="color: #666666">;</span>
			point1.y <span style="color: #666666">=</span> clip1.y<span style="color: #666666">;</span>

			point2.x <span style="color: #666666">=</span> clip2.x<span style="color: #666666">;</span>
			point2.y <span style="color: #666666">=</span> clip2.y<span style="color: #666666">;</span>

			<span style="color: #008000; font-weight: bold">var</span> hits<span style="color: #666666">:</span><span style="color: #008000">Boolean</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">false</span><span style="color: #666666">;</span>
			<span style="color: #008000; font-weight: bold">if</span>(_clip1ClipBmpData.hitTest(point1<span style="color: #666666">,</span>
										<span style="color: #666666">255,</span>
										_clip2ClipBmpData<span style="color: #666666">,</span>
										point2<span style="color: #666666">,</span>
										<span style="color: #666666">255</span>
								  ))
			{
				hits <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">;</span>
			}

			_clip1ClipBmpData.dispose();
			_clip2ClipBmpData.dispose();

			<span style="color: #008000; font-weight: bold">return</span> hits<span style="color: #666666">;</span>
		}

		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> checkBitmapDataHitDynamic()<span style="color: #666666">:</span><span style="color: #008000">Boolean</span>
		{
			<span style="color: #008000; font-weight: bold">var</span> dynamicClip1Rect<span style="color: #666666">:</span><span style="color: #008000">Rectangle</span> <span style="color: #666666">=</span> dynamicClip1.getBounds(<span style="color: #008000; font-weight: bold">this</span>);
			<span style="color: #008000; font-weight: bold">var</span> dynamicClip1ClipBmpData<span style="color: #666666">:</span><span style="color: #008000">BitmapData</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">BitmapData</span>(dynamicClip1Rect.width<span style="color: #666666">,</span> 
																	dynamicClip1Rect.height<span style="color: #666666">,</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">,</span> <span style="color: #666666"></span>);
			dynamicClip1ClipBmpData.draw(dynamicClip1);

			<span style="color: #008000; font-weight: bold">var</span> dynamicClip2Rect<span style="color: #666666">:</span><span style="color: #008000">Rectangle</span> <span style="color: #666666">=</span> dynamicClip2.getBounds(<span style="color: #008000; font-weight: bold">this</span>);
			<span style="color: #008000; font-weight: bold">var</span> dynamicClip2ClipBmpData<span style="color: #666666">:</span><span style="color: #008000">BitmapData</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">BitmapData</span>(dynamicClip2Rect.width<span style="color: #666666">,</span> 
																	dynamicClip2Rect.height<span style="color: #666666">,</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">,</span> <span style="color: #666666"></span>);
			dynamicClip2ClipBmpData.draw(dynamicClip2);	

			point1.x <span style="color: #666666">=</span> dynamicClip1.x<span style="color: #666666">;</span>
			point1.y <span style="color: #666666">=</span> dynamicClip1.y<span style="color: #666666">;</span>

			point2.x <span style="color: #666666">=</span> dynamicClip2.x<span style="color: #666666">;</span>
			point2.y <span style="color: #666666">=</span> dynamicClip2.y<span style="color: #666666">;</span>	

			<span style="color: #008000; font-weight: bold">var</span> hits<span style="color: #666666">:</span><span style="color: #008000">Boolean</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">false</span><span style="color: #666666">;</span>
			<span style="color: #008000; font-weight: bold">if</span>(dynamicClip1ClipBmpData.hitTest(point1<span style="color: #666666">,</span>
										<span style="color: #666666">255,</span>
										dynamicClip2ClipBmpData<span style="color: #666666">,</span>
										point2<span style="color: #666666">,</span>
										<span style="color: #666666">255</span>
								  ))
			{
				hits <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">;</span>
			}

			dynamicClip1ClipBmpData.dispose();
			dynamicClip2ClipBmpData.dispose();

			<span style="color: #008000; font-weight: bold">return</span> hits<span style="color: #666666">;</span>
		}

		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> checkBitmapDataHitReverse()<span style="color: #666666">:</span><span style="color: #008000">Boolean</span>
		{
			point1.x <span style="color: #666666">=</span> clip1.x<span style="color: #666666">;</span>
			point1.y <span style="color: #666666">=</span> clip1.y<span style="color: #666666">;</span>

			point2.x <span style="color: #666666">=</span> clip2.x<span style="color: #666666">;</span>
			point2.y <span style="color: #666666">=</span> clip2.y<span style="color: #666666">;</span>	

			<span style="color: #008000; font-weight: bold">if</span>(clip2ClipBmpData.hitTest(point2<span style="color: #666666">,</span>
										<span style="color: #666666">255,</span>
										clip1ClipBmpData<span style="color: #666666">,</span>
										point1<span style="color: #666666">,</span>
										<span style="color: #666666">255</span>

								  ))
			{
				<span style="color: #008000; font-weight: bold">return</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">;</span>
			}

			<span style="color: #008000; font-weight: bold">return</span> <span style="color: #008000; font-weight: bold">false</span><span style="color: #666666">;</span>
		}

		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> out(str<span style="color: #666666">:*</span>)<span style="color: #666666">:</span>void
		{
			<span style="color: #0000FF">trace</span>(str);
		}
	}
}
</pre>
</div>

&nbsp;

You can download the code from [here][3] (requires Flash Pro and [Grant Skinner&#8217;s Performance Testing Harness][4]).

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

&nbsp;

Most of the results are as expected, although there is one surprise. 

Doing a BitmapData.hitTest on a MovieClip placed onto the stage at author time (in Flash Pro) is 3 times slower than testing against a MovieClip generated and drawn at runtime. The only thing I can think that is happening is that perhaps for some reason the garbage collector is being triggered in the checkBitmapDataHitInternal and not the checkBitmapDataHitDynamic test. I have asked around internally what might be causing it, but I would be curious if anyone else is seeing the same results.

So, some quick conclusions from this:

1.  DisplayObject.hitTest is a fast way to do a quick boundaries check.
2.  Having to dynamically generate BitmapData for BitmapData.hitTest leads to a big performance hit.
3.  If you can cache the BitmapData being compared, then BitmapData.hitTest performance is on par with the other techniques / APIs tested. However, performance degrades as the dimensions of the clips increase (see [here][5]).
4.  Getting the BitmapData from a MovieClip that has cacheAsBitmap = false is 3 times slower than getting it from a MovieClip with the property set to true (Thanks to Renaun Erickson who figured out the performance discrepancy).

I will update the post and results as I learn more techniques and get more information.

If you find any bugs with the test, or would like to add some more tests (such as a test using [BitmapData.getColorBoundsRect][6]), just post them in the comments.

**Updated : July 6, 2009 : Added info on cacheAsBitmap property impact on performance.** (See this [comment][7]).

**Updated : November 6, 2009 : Added optimized circle test in[ comments][8]** : Approaches performance of hitTest.

 [1]: http://www.mikechambers.com/blog/2009/06/24/using-bitmapdata-hittest-for-collision-detection/
 [2]: http://www.mikechambers.com/blog/2009/06/25/strategies-for-optimizing-collision-detection-with-bitmapdata-hittest/
 [3]: http://www.mikechambers.com/blog/files/collisiondetection/CollisionDetectionTests.zip
 [4]: http://www.gskinner.com/blog/archives/2009/04/as3_performance.html
 [5]: http://www.mikechambers.com/blog/2009/06/26/relative-performance-for-collision-detection-techniques-in-actionscript-3/comment-page-1/#comment-16495
 [6]: http://livedocs.adobe.com/flex/3/langref/flash/display/BitmapData.html#getColorBoundsRect()
 [7]: http://www.mikechambers.com/blog/2009/06/26/relative-performance-for-collision-detection-techniques-in-actionscript-3/#comment-16494
 [8]: #comment-17507