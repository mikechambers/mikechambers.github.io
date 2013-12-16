---
title: Encapsulating Custom Pixel Bender Filters in ActionScript 3
author: mikechambers
date: 2008-09-08 12:53:01 -0800
layout: post
permalink: /2008/09/08/encapsulating-custom-pixel-bender-filters-in-actionscript-3/
categories:
  - General
tags:
  - as3
  - pixelbender
---


If you read my blog regularly (or just today) you should have noticed that I have been playing around with some Pixel Bender filters and ActionScript / Flex (all inspired by [Lee Brimelow&#8217;s video screencast on creating and using Pixel Bender filters in Flash Player 10][1].)

Previously, I posted some code showing [how to embed a custom Pixel Bender filter within a SWF][2] and then apply the filter to an image. That works well, but the code is not that reusable since the filter loading code is mixed in with the main code.

Below is a simple example that shows how to encapsulate a custom filter inside of an ActionScript 3 class, which you can then use and re-use like any other built in filter.  
<!--more-->

  
**Document Class : PBFilter.as**

<div class="highlight">
  <pre>package
{
	<span style="color: #008000; font-weight: bold">import</span> flash.display.Bitmap<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.display.Sprite<span style="color: #666666">;</span>
	
	<span style="color: #408080; font-style: italic">// SWF Metadata</span>
	[SWF(width<span style="color: #666666">=</span><span style="color: #BA2121">"600"</span><span style="color: #666666">,</span> height<span style="color: #666666">=</span><span style="color: #BA2121">"400"</span><span style="color: #666666">,</span> backgroundColor<span style="color: #666666">=</span><span style="color: #BA2121">"#000000"</span><span style="color: #666666">,</span> framerate<span style="color: #666666">=</span><span style="color: #BA2121">"30"</span>)]

	<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">class</span> PBFilter <span style="color: #008000; font-weight: bold">extends</span> Sprite
	{		
		<span style="color: #408080; font-style: italic">//The image to display the filter on</span>
		[Embed(source<span style="color: #666666">=</span><span style="color: #BA2121">"image.jpg"</span>)]
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> image<span style="color: #666666">:</span>Class<span style="color: #666666">;</span>
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> im<span style="color: #666666">:</span>Bitmap<span style="color: #666666">;</span>
		
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> PBFilter()<span style="color: #666666">:</span>void
		{
			im <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> image() as Bitmap<span style="color: #666666">;</span>
			addChild(im);

			<span style="color: #008000; font-weight: bold">var</span> filter<span style="color: #666666">:</span>TestFilter <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> TestFilter();
				filter.value <span style="color: #666666">=</span> <span style="color: #666666">30;</span>

			<span style="color: #408080; font-style: italic">//add the filter to the image</span>
			im.filters <span style="color: #666666">=</span> [filter];
		}

	}
}
</pre>
</div>

**Filter Class : TestFilter.as**

<div class="highlight">
  <pre>package
{
	<span style="color: #008000; font-weight: bold">import</span> flash.display.Shader<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.filters.ShaderFilter<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.utils.ByteArray<span style="color: #666666">;</span>
		
	<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">class</span> TestFilter <span style="color: #008000; font-weight: bold">extends</span> ShaderFilter
	{
		<span style="color: #408080; font-style: italic">//the file that contains the binary bytes of the PixelBender filter</span>
		[Embed(<span style="color: #BA2121">"testfilter.pbj"</span><span style="color: #666666">,</span> mimeType<span style="color: #666666">=</span><span style="color: #BA2121">"application/octet-stream"</span>)]
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> Filter<span style="color: #666666">:</span>Class<span style="color: #666666">;</span>		
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> _shader<span style="color: #666666">:</span>Shader<span style="color: #666666">;</span>
		
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> TestFilter(value<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> <span style="color: #666666">50</span>)
		{
			<span style="color: #408080; font-style: italic">//initialize the ShaderFilter with the PixelBender filter we</span>
			<span style="color: #408080; font-style: italic">//embedded</span>
			_shader <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Shader(<span style="color: #008000; font-weight: bold">new</span> Filter() as ByteArray);
			
			<span style="color: #408080; font-style: italic">//set the default value</span>
			<span style="color: #008000; font-weight: bold">this</span>.value <span style="color: #666666">=</span> value<span style="color: #666666">;</span>
			<span style="color: #008000; font-weight: bold">super</span>(_shader);
		}
		
		
		<span style="color: #408080; font-style: italic">//This filter only has one value, named value</span>
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> get value()<span style="color: #666666">:</span><span style="color: #008000">Number</span>
		{
			<span style="color: #008000; font-weight: bold">return</span> _shader.data.amount.value[<span style="color: #666666"></span>];	
		}
		
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> set value(value<span style="color: #666666">:</span><span style="color: #008000">Number</span>)<span style="color: #666666">:</span>void
		{
			<span style="color: #408080; font-style: italic">//not that pixel bender filters take an array of values, even</span>
			<span style="color: #408080; font-style: italic">//though we only have one in our example</span>
			_shader.data.amount.value <span style="color: #666666">=</span> [value];
		}		

	}
}
</pre>
</div>

Compiled using the [Flex 3.1.0.2710 SDK][3] (although it does not use the Flex Framework), and requires [Flash Player 10][4].

You would of course, have to add the appropriate getters and setters depending on the values your custom Pixel Bender filter accepts.

Using this technique, you could then create a SWC (distributable ActionScript library) to package your custom filter(s) and re-use them in MXMLC, Flex Builder and / or Flash Authoring.

You can see an example of the filter [here][5].

You can find more information on Pixel Bender [here][6].

You can download the filter from [here][7].

 [1]: http://theflashblog.com/?p=435
 [2]: http://www.mikechambers.com/blog/2008/09/08/embedding-pixel-bender-filters-within-a-swf/
 [3]: http://opensource.adobe.com/wiki/display/flexsdk/Download+Flex+3
 [4]: http://labs/technologies/flashplayer10/
 [5]: http://flickr.com/photos/mikechambers/2840691963/
 [6]: www.adobe.com/go/pixelbender
 [7]: http://www.gotoandlearn.com/player.php?id=84