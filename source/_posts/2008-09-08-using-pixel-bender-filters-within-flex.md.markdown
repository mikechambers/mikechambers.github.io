---
title: Using Pixel Bender Filters within Flex
author: mikechambers
layout: post
permalink: /2008/09/08/using-pixel-bender-filters-within-flex/
categories:
  - General
tags:
  - Flex
  - pixelbender
---


Following up on my earlier post on [how to embed Pixel Bender filters within a SWF][1], here is a super simple example that show how to use a Pixel Bender filter within a Flex application.

Compiled using the [Flex 3.1.0.2710 SDK][2], and requires [Flash Player 10][3].  
<!--more-->

<div class="highlight">
  <pre><span style="color: #666666">&lt;?</span>xml version<span style="color: #666666">=</span><span style="color: #BA2121">"1.0"</span> encoding<span style="color: #666666">=</span><span style="color: #BA2121">"utf-8"</span><span style="color: #666666">?&gt;</span>
<span style="color: #666666">&lt;</span>mx<span style="color: #666666">:</span>Application xmlns<span style="color: #666666">:</span>mx<span style="color: #666666">=</span><span style="color: #BA2121">"http://www.adobe.com/2006/mxml"</span> layout<span style="color: #666666">=</span><span style="color: #BA2121">"absolute"</span>
	applicationComplete<span style="color: #666666">=</span><span style="color: #BA2121">"onApplicationComplete()"</span><span style="color: #666666">&gt;</span>
	
	<span style="color: #666666">&lt;</span>mx<span style="color: #666666">:</span>Script<span style="color: #666666">&gt;</span>
		<span style="color: #666666">&lt;!</span>[CDATA[
			<span style="color: #008000; font-weight: bold">import</span> flash.filters.<span style="color: #666666">*;</span>
			<span style="color: #008000; font-weight: bold">import</span> flash.utils.ByteArray<span style="color: #666666">;</span>		
		
			<span style="color: #408080; font-style: italic">//the file that contains the binary bytes of the PixelBender filter</span>
			[Embed(<span style="color: #BA2121">"testfilter.pbj"</span><span style="color: #666666">,</span> mimeType<span style="color: #666666">=</span><span style="color: #BA2121">"application/octet-stream"</span>)]
			<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> TestFilter<span style="color: #666666">:</span>Class<span style="color: #666666">;</span>		
			
			<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onApplicationComplete()<span style="color: #666666">:</span>void
			{
				<span style="color: #408080; font-style: italic">//Pass the loaded filter to the Shader as a ByteArray</span>
				<span style="color: #008000; font-weight: bold">var</span> shader<span style="color: #666666">:</span>Shader <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Shader(<span style="color: #008000; font-weight: bold">new</span> TestFilter() as ByteArray);
			
				shader.data.amount.value <span style="color: #666666">=</span> [<span style="color: #666666">100</span>];
				<span style="color: #008000; font-weight: bold">var</span> filter<span style="color: #666666">:</span>ShaderFilter <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> ShaderFilter(shader);
			
				<span style="color: #408080; font-style: italic">//add the filter to the image</span>
				im.filters <span style="color: #666666">=</span> [filter];
			}
		]]<span style="color: #666666">&gt;</span>
	<span style="color: #666666">&lt;/</span>mx<span style="color: #666666">:</span>Script<span style="color: #666666">&gt;</span>
	
	<span style="color: #666666">&lt;</span>mx<span style="color: #666666">:</span>Image right<span style="color: #666666">=</span><span style="color: #BA2121">"288"</span> left<span style="color: #666666">=</span><span style="color: #BA2121">"40"</span> top<span style="color: #666666">=</span><span style="color: #BA2121">"26"</span> bottom<span style="color: #666666">=</span><span style="color: #BA2121">"108"</span> id<span style="color: #666666">=</span><span style="color: #BA2121">"im"</span> source<span style="color: #666666">=</span><span style="color: #BA2121">"@Embed(source=&#39;image.jpg&#39;)"</span><span style="color: #666666">/&gt;</span>
<span style="color: #666666">&lt;/</span>mx<span style="color: #666666">:</span>Application<span style="color: #666666">&gt;</span>
</pre>
</div>

You can see an example of the filter [here][4].

You can find more information on Pixel Bender [here][5]. 

You can download the filter from [here][6].

 [1]: http://www.mikechambers.com/blog/2008/09/08/embedding-pixel-bender-filters-within-a-swf/
 [2]: http://opensource.adobe.com/wiki/display/flexsdk/Download+Flex+3
 [3]: http://labs/technologies/flashplayer10/
 [4]: http://flickr.com/photos/mikechambers/2840691963/
 [5]: www.adobe.com/go/pixelbender
 [6]: http://www.gotoandlearn.com/player.php?id=84