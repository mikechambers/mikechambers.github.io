---
title: Embedding Pixel Bender Filters within a SWF
author: mikechambers
layout: post
permalink: /2008/09/08/embedding-pixel-bender-filters-within-a-swf/
categories:
  - General
tags:
  - pixelbender
---


I was just watching Lee Brimelow&#8217;s excellent video introductions to [creating and using Pixel Bender filters in Flash Player 10][1].

In his second video, he shows [how to use a custom Pixel Bender filter within Flash Player 10][1]. One issue that Lee had was that you have to load the filter at runtime in order to use it. 

I have modified Lee&#8217;s example to allow the filter to be embedded within the SWF, and not require it to be dynamically loaded at runtime.  
<!--more-->

<div class="highlight">
  <pre>package
{
	<span style="color: #008000; font-weight: bold">import</span> flash.display.<span style="color: #666666">*;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.events.<span style="color: #666666">*;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.filters.<span style="color: #666666">*;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.net.<span style="color: #666666">*;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.utils.ByteArray<span style="color: #666666">;</span>
	
	<span style="color: #408080; font-style: italic">// SWF Metadata</span>
	[SWF(width<span style="color: #666666">=</span><span style="color: #BA2121">"600"</span><span style="color: #666666">,</span> height<span style="color: #666666">=</span><span style="color: #BA2121">"400"</span><span style="color: #666666">,</span> backgroundColor<span style="color: #666666">=</span><span style="color: #BA2121">"#000000"</span><span style="color: #666666">,</span> framerate<span style="color: #666666">=</span><span style="color: #BA2121">"30"</span>)]

	<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">class</span> PB <span style="color: #008000; font-weight: bold">extends</span> Sprite
	{
		<span style="color: #408080; font-style: italic">//the file that contains the binary bytes of the PixelBender filter</span>
		[Embed(<span style="color: #BA2121">"testfilter.pbj"</span><span style="color: #666666">,</span> mimeType<span style="color: #666666">=</span><span style="color: #BA2121">"application/octet-stream"</span>)]
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> TestFilter<span style="color: #666666">:</span>Class<span style="color: #666666">;</span>		
		
		<span style="color: #408080; font-style: italic">//The image to display the filter on</span>
		[Embed(source<span style="color: #666666">=</span><span style="color: #BA2121">"image.jpg"</span>)]
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> image<span style="color: #666666">:</span>Class<span style="color: #666666">;</span>
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> im<span style="color: #666666">:</span>Bitmap<span style="color: #666666">;</span>
		
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> PB()<span style="color: #666666">:</span>void
		{
			im <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> image() as Bitmap<span style="color: #666666">;</span>
			addChild(im);

			<span style="color: #408080; font-style: italic">//Pass the loaded filter to the Shader as a ByteArray</span>
			<span style="color: #008000; font-weight: bold">var</span> shader<span style="color: #666666">:</span>Shader <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Shader(<span style="color: #008000; font-weight: bold">new</span> TestFilter() as ByteArray);
			
			shader.data.amount.value <span style="color: #666666">=</span> [<span style="color: #666666">100</span>];
			<span style="color: #008000; font-weight: bold">var</span> filter<span style="color: #666666">:</span>ShaderFilter <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> ShaderFilter(shader);
			
			<span style="color: #408080; font-style: italic">//add the filter to the image</span>
			im.filters <span style="color: #666666">=</span> [filter];
		}

	}
}
</pre>
</div>

Check out the Flex Cookbook for some good information on [How to embed any type of data within a SWF.][2]

Make sure to check out Lee&#8217;s video tutorial on [using Pixel Bender filters in Flash Player 10][1].

You can see an example of the filter [here][3].

You can find more information on [Pixel Bender on Labs][4].

 [1]: http://theflashblog.com/?p=435
 [2]: http://www.adobe.com/cfusion/communityengine/index.cfm?event=showdetails&productId=2&postId=8046
 [3]: http://flickr.com/photos/mikechambers/2840691963/
 [4]: http://labs.adobe.com/wiki/index.php/Pixel_Bender_Toolkit