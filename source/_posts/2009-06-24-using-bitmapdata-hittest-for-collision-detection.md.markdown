---
title: Using BitmapData.hitTest for Collision Detection
author: mikechambers
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

  


<div id="myAlternativeContent_1">
  <a href="http://www.adobe.com/go/getflashplayer"><br /> <img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /><br /> </a>
</div>

&nbsp;

And here is the code

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">var</span> redRect<span style="color: #666666">:</span><span style="color: #008000">Rectangle</span> <span style="color: #666666">=</span> redClip.getBounds(<span style="color: #008000; font-weight: bold">this</span>);
<span style="color: #008000; font-weight: bold">var</span> redClipBmpData <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">BitmapData</span>(redRect.width<span style="color: #666666">,</span> redRect.height<span style="color: #666666">,</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">,</span> <span style="color: #666666"></span>);
redClipBmpData.draw(redClip);

<span style="color: #008000; font-weight: bold">var</span> blueRect<span style="color: #666666">:</span><span style="color: #008000">Rectangle</span> <span style="color: #666666">=</span> blueClip.getBounds(<span style="color: #008000; font-weight: bold">this</span>);
<span style="color: #008000; font-weight: bold">var</span> blueClipBmpData <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">BitmapData</span>(blueRect.width<span style="color: #666666">,</span> blueRect.height<span style="color: #666666">,</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">,</span> <span style="color: #666666"></span>);
blueClipBmpData.draw(blueClip);

addEventListener(Event.ENTER_FRAME<span style="color: #666666">,</span> enterFrame);

<span style="color: #008000; font-weight: bold">function</span> enterFrame(e<span style="color: #666666">:</span>Event)<span style="color: #666666">:</span>void
{
	blueClip.x <span style="color: #666666">=</span> mouseX<span style="color: #666666">;</span>
	blueClip.y <span style="color: #666666">=</span> mouseY<span style="color: #666666">;</span>
	
	<span style="color: #008000; font-weight: bold">if</span>(redClipBmpData.hitTest(<span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Point</span>(redClip.x<span style="color: #666666">,</span> redClip.y)<span style="color: #666666">,</span>
								<span style="color: #666666">255,</span>
								blueClipBmpData<span style="color: #666666">,</span>
								<span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Point</span>(blueClip.x<span style="color: #666666">,</span> blueClip.y)<span style="color: #666666">,</span>
								<span style="color: #666666">255</span>
						  
						  ))
	{
		<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"hit"</span>);
		redClip.filters <span style="color: #666666">=</span> [<span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">GlowFilter</span>()];
	}
	<span style="color: #008000; font-weight: bold">else</span>
	{
		redClip.filters <span style="color: #666666">=</span> [];
	}
}
</pre>
</div>

&nbsp;

Basically, the content contains two MovieClips on the timeline. We draw the graphics for each MovieClip into a BitmapData instance, and then use the BitmapData.hitTest API to see if the visible parts of the MovieClip (non-transparent) instances collide.

Couple of notes on the example:

1. The initial fill for the BitmapData is transparent pixels. This is necessary to detect just the visible areas of the DisplayObject.

2. The Point instances passed to hitTest are used to align the BitmapData instances for the comparisons.

This example works regardless of the contents or shape of the DisplayObjects. However, if either of the DisplayObjects have had any transformations applied to them (such as rotation), then the collision detection wont work correctly.

In order to get it to work, you need to apply a Matrix when drawing the BitmapData to account for the transformation applied to one or both DisplayObjects. If you haven&#8217;t worked with Matrices and DisplayObject transformations, this can be a little daunting at first (it was for me). If you are new to using Matrices, I suggest reading this [excellent article on Matrices in Flash over at senocular.com][3].

Luckily for me, Trevor McCauley, who runs [senocular.com][4], also happens to works for Adobe on the Flash Player team. He really helped me understand how how to get the hit detection to work when the DisplayObjects have had transformations applied to them.

Here is the example:



<div id="myAlternativeContent_2">
  <a href="http://www.adobe.com/go/getflashplayer"><br /> <img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /><br /> </a>
</div>

&nbsp;

and the code:

<div class="highlight">
  <pre>addEventListener(Event.ENTER_FRAME<span style="color: #666666">,</span> enterFrame);

<span style="color: #008000; font-weight: bold">function</span> enterFrame(e<span style="color: #666666">:</span>Event)<span style="color: #666666">:</span>void
{
	blueClip.x <span style="color: #666666">=</span> mouseX<span style="color: #666666">;</span>
	blueClip.y <span style="color: #666666">=</span> mouseY<span style="color: #666666">;</span>	
	
	redClip.rotation<span style="color: #666666">++;</span>
	
	<span style="color: #008000; font-weight: bold">var</span> blueRect<span style="color: #666666">:</span><span style="color: #008000">Rectangle</span> <span style="color: #666666">=</span> blueClip.getBounds(<span style="color: #008000; font-weight: bold">this</span>);
	<span style="color: #008000; font-weight: bold">var</span> blueOffset<span style="color: #666666">:</span><span style="color: #008000">Matrix</span> <span style="color: #666666">=</span> blueClip.transform.matrix<span style="color: #666666">;</span>
	blueOffset.tx <span style="color: #666666">=</span> blueClip.x <span style="color: #666666">-</span> blueRect.x<span style="color: #666666">;</span>
	blueOffset.ty <span style="color: #666666">=</span> blueClip.y <span style="color: #666666">-</span> blueRect.y<span style="color: #666666">;</span>	
	
	<span style="color: #008000; font-weight: bold">var</span> blueClipBmpData <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">BitmapData</span>(blueRect.width<span style="color: #666666">,</span> blueRect.height<span style="color: #666666">,</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">,</span> <span style="color: #666666"></span>);
	blueClipBmpData.draw(blueClip<span style="color: #666666">,</span> blueOffset);		
	
	
	<span style="color: #008000; font-weight: bold">var</span> redRect<span style="color: #666666">:</span><span style="color: #008000">Rectangle</span> <span style="color: #666666">=</span> redClip.getBounds(<span style="color: #008000; font-weight: bold">this</span>);
	<span style="color: #008000; font-weight: bold">var</span> redClipBmpData <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">BitmapData</span>(redRect.width<span style="color: #666666">,</span> redRect.height<span style="color: #666666">,</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">,</span> <span style="color: #666666"></span>);
	
	<span style="color: #008000; font-weight: bold">var</span> redOffset<span style="color: #666666">:</span><span style="color: #008000">Matrix</span> <span style="color: #666666">=</span> redClip.transform.matrix<span style="color: #666666">;</span>
	redOffset.tx <span style="color: #666666">=</span> redClip.x <span style="color: #666666">-</span> redRect.x<span style="color: #666666">;</span>
	redOffset.ty <span style="color: #666666">=</span> redClip.y <span style="color: #666666">-</span> redRect.y<span style="color: #666666">;</span>	
	
	redClipBmpData.draw(redClip<span style="color: #666666">,</span> redOffset);	
	
	<span style="color: #008000; font-weight: bold">var</span> rLoc<span style="color: #666666">:</span><span style="color: #008000">Point</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Point</span>(redRect.x<span style="color: #666666">,</span> redRect.y);
	<span style="color: #008000; font-weight: bold">var</span> bLoc<span style="color: #666666">:</span><span style="color: #008000">Point</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Point</span>(blueRect.x<span style="color: #666666">,</span> blueRect.y);	
	
	
	<span style="color: #008000; font-weight: bold">if</span>(redClipBmpData.hitTest(rLoc<span style="color: #666666">,</span>
									<span style="color: #666666">255,</span>
									blueClipBmpData<span style="color: #666666">,</span>
									bLoc<span style="color: #666666">,</span>
									<span style="color: #666666">255</span>
						  		))
	{
		<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"hit"</span>);
		redClip.filters <span style="color: #666666">=</span> [<span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">GlowFilter</span>()];
	}
	<span style="color: #008000; font-weight: bold">else</span>
	{
		redClip.filters <span style="color: #666666">=</span> [];
	}
	
	blueClipBmpData.dispose();
	redClipBmpData.dispose();
}
</pre>
</div>

&nbsp;

Note that we use the bounds of each DisplayObject to determine the BitmapData size and not the height / width of the DisplayObject. This is because the transformation will most likely modify the bounds, and we need to take this into account. In the first example, we could have just used the height and width of the DisplayObjects since they were the same as the bounds, but in general you should get in the habit of using the bounds. 

We also pass a Matrix to each BitmapData.draw call to account for any transformations that may have been applied to the DisplayObjects (in this case rotations). I could try and explain what the Matrix is doing, but to be honest, im still trying to get my head around it. Instead, Ill let Trevor explain it (from an email he sent to me):

> For this you need the transformation of the object as defined by DisplayObject.transform.matrix. Since everything is in the same container, we still won&#8217;t have to worry about walking up hierarchies to get contcatenated/global matrices &#8211; we can just use that which is directly applied to the target object (transform.matrix). This gives you the full transform of that object. But for the purposes of capturing a bitmap, we only want the non-translation parts of that transform. This is because when a bitmap is captured, it&#8217;s captured from the 0,0 location in the coordinate space of the captured object outward into positive space. The translation of the matrix of the desired object is its position in its parent coordinate space, not its own. HOWEVER, if that object&#8217;s own 0,0 location is within the middle of its graphic elements, drawing it into a Bitmap directly from 0,0 could cause cropping. So in terms of that translation as it is to be used with BitmapData.draw(), it&#8217;s still important to make sure everything in the target object is captured. And in doing that, it means shifting everything that would appear in negative coordinate space over into positive coordinate space.
> 
> Luckily, using getBounds (again) this is quite simple. We can use getBounds to determine the bounds of an object in its parent coordinate space &#8211; this includes its transformations. We also know the location of 0,0 within the parent coordinate space because that is the same location it places the target object using its x and y properties. With that, we can get the needed bitmap translation by simply subtracting the bounds x,y from the object&#8217;s own x,y. In code that essentially becomes 
> 
> var b = t.getBounds(t.parent);  
> var m = t.transform.matrix;  
> m.tx = t.x &#8211; b.x;  
> m.ty = t.y &#8211; b.y;  
> var bmp = new BitmapData(b.width, b.height, true, 0);  
> bmp.draw(t, m);
> 
> where &#8216;t&#8217; is the target display object.

Now, I will be the first to admit that I am still wrapping my head around some of this stuff, especially with the use of the Matrices to offset the transformation. However, the second example above is generic and robust enough to be used for general pixel perfect collision detection on visible portions of DisplayObjects.

One note, is that the examples above assumes that the items being compared share the same parent. If they don&#8217;t you need to make some additional adjustments (to take into consideration other transformations), but that is a post for another day.

Btw, if you don&#8217;t already, you need to read [senocular.com][4]. This is one of the best resources on understanding ActionScript 3 and the Flash Player.

**Update** : One optimzation which you can make is to first check if the bounding boxes of the DisplayObjects overlap (using [DisplayObject.hitTestObject][5]), and only if they do, use BitmapData.hitTest to see if their visible areas are touching.

 [1]: http://livedocs.adobe.com/flex/3/langref/flash/display/DisplayObject.html
 [2]: http://livedocs.adobe.com/flex/3/langref/flash/display/BitmapData.html#hitTest()
 [3]: http://www.senocular.com/flash/tutorials/transformmatrix/
 [4]: http://www.senocular.com/
 [5]: http://livedocs.adobe.com/flex/3/langref/flash/display/DisplayObject.html#hitTestObject()