---
title: Using Custom Pixel Bender Filter Classes in MXML
author: mikechambers
date: 2008-09-08 12:25:01 -0800
layout: post
permalink: /2008/09/08/using-custom-pixel-bender-filter-classes-in-mxml/
categories:
  - General
tags:
  - pixelbender
---


Ok. Last post on Pixel Bender for today (I promise). This one is simple, but ties together my previous posts.

Now, that we know how to load and use Pixel Bender filters in Flex, and know how encapsulte Pixel Bender filters in an ActionScript class, lets combine the two to leverage custom Pixel Bender filters in MXML.  
<!--more-->

  
First, again, we need our custom Pixel Bender class:

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

Once we have defined that, we can then treat the class like any other filter, and use it directly within MXML, like so:

<div class="highlight">
  <pre><span style="color: #BC7A00">&lt;?xml version="1.0" encoding="utf-8"?&gt;</span>
<span style="color: #008000; font-weight: bold">&lt;mx:Application</span> <span style="color: #7D9029">xmlns:mx=</span><span style="color: #BA2121">"http://www.adobe.com/2006/mxml"</span> <span style="color: #7D9029">layout=</span><span style="color: #BA2121">"absolute"</span>
	<span style="color: #7D9029">xmlns:local=</span><span style="color: #BA2121">"*"</span>
	<span style="color: #008000; font-weight: bold">&gt;</span>
	<span style="color: #008000; font-weight: bold">&lt;mx:Image</span> <span style="color: #7D9029">left=</span><span style="color: #BA2121">"10"</span> <span style="color: #7D9029">top=</span><span style="color: #BA2121">"10"</span> <span style="color: #7D9029">width=</span><span style="color: #BA2121">"375"</span> <span style="color: #7D9029">height=</span><span style="color: #BA2121">"500"</span> <span style="color: #7D9029">source=</span><span style="color: #BA2121">"@Embed(source=&#39;image.jpg&#39;)"</span><span style="color: #008000; font-weight: bold">&gt;</span>
    	<span style="color: #008000; font-weight: bold">&lt;mx:filters&gt;</span>
     		<span style="color: #008000; font-weight: bold">&lt;local:TestFilter</span> <span style="color: #7D9029">value=</span><span style="color: #BA2121">"25"</span> <span style="color: #008000; font-weight: bold">/&gt;</span>
    	<span style="color: #008000; font-weight: bold">&lt;/mx:filters&gt;</span>
	<span style="color: #008000; font-weight: bold">&lt;/mx:Image&gt;</span>	
<span style="color: #008000; font-weight: bold">&lt;/mx:Application&gt;</span>
</pre>
</div>

Note that the local namespace maps to the package that contains our custom filter (in this case, the root package).

Compiled using the [Flex 3.1.0.2710 SDK][1], and requires [Flash Player 10][2]. The Flex team is working on making this workflow even easier for Flex 4, so keep an eye on the [Flex 4 project page][3].

You can see an example of the filter [here][4].

You can find more information on Pixel Bender [here][5].

You can download the filter from [here][6]

 [1]: http://opensource.adobe.com/wiki/display/flexsdk/Download+Flex+3
 [2]: http://labs/technologies/flashplayer10/
 [3]: http://opensource.adobe.com/wiki/display/flexsdk/Gumbo
 [4]: http://flickr.com/photos/mikechambers/2840691963/
 [5]: www.adobe.com/go/pixelbender
 [6]: http://www.gotoandlearn.com/player.php?id=84