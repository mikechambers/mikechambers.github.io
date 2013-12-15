---
title: Defining and Reusing Symbols in Flex 4 FXG
author: mikechambers
layout: post
permalink: /2008/08/29/defining-and-reusing-symbols-in-flex-4-fxg/
categories:
  - Flex
tags:
  - flex flex4 fxg
---


If you have done Flash development using the Flash Authoring tool, or have done any low level work with the SWF format, then you should be familiar with the concept of symbols. Basically a symbol is a reusable object (graphics, buttons, MovieClip) that can be included in the SWF once, but referenced and used many times.

Flex 4 [FXG][1] has a similar concept of symbol, although the actual underlying implimentation is different. Using the `Library` and `Definition` elements, you can define a graphic symbol, which can then be reused multiple times within the FXG or MXML document.  
<!--more-->

  
For example, here is our [HelloWorld example from yesterday][2], which uses a symbol to display the content, as opposed to just generating it inline:

<div class="highlight">
  <pre><span style="color: #BC7A00">&lt;?xml version="1.0" encoding="utf-8"?&gt;</span>
<span style="color: #008000; font-weight: bold">&lt;Application</span> 
	<span style="color: #7D9029">xmlns:mx=</span><span style="color: #BA2121">"library:adobe/flex/halo"</span>
	<span style="color: #7D9029">xmlns=</span><span style="color: #BA2121">"http://ns.adobe.com/mxml/2009"</span>
	<span style="color: #7D9029">xmlns:gumbo=</span><span style="color: #BA2121">"library:adobe/flex/gumbo"</span><span style="color: #008000; font-weight: bold">&gt;</span>

	<span style="color: #008000; font-weight: bold">&lt;Library&gt;</span>
		<span style="color: #008000; font-weight: bold">&lt;Definition</span> <span style="color: #7D9029">name=</span><span style="color: #BA2121">"HelloWorldText"</span><span style="color: #008000; font-weight: bold">&gt;</span>
			<span style="color: #008000; font-weight: bold">&lt;gumbo:Group&gt;</span>
				<span style="color: #008000; font-weight: bold">&lt;TextGraphic</span> <span style="color: #7D9029">fontFamily=</span><span style="color: #BA2121">"Verdana"</span> <span style="color: #7D9029">fontWeight=</span><span style="color: #BA2121">"bold"</span><span style="color: #008000; font-weight: bold">&gt;</span>
					<span style="color: #008000; font-weight: bold">&lt;content&gt;</span>Hello, World<span style="color: #008000; font-weight: bold">&lt;/content&gt;</span>
				<span style="color: #008000; font-weight: bold">&lt;/TextGraphic&gt;</span>
			<span style="color: #008000; font-weight: bold">&lt;/gumbo:Group&gt;</span>
		<span style="color: #008000; font-weight: bold">&lt;/Definition&gt;</span>
	<span style="color: #008000; font-weight: bold">&lt;/Library&gt;</span>

	<span style="color: #408080; font-style: italic">&lt;!-- Flex 4 Hello World with FXG --&gt;</span>
	<span style="color: #008000; font-weight: bold">&lt;mx:Canvas</span> <span style="color: #7D9029">top=</span><span style="color: #BA2121">"0"</span> <span style="color: #7D9029">bottom=</span><span style="color: #BA2121">"0"</span> <span style="color: #7D9029">left=</span><span style="color: #BA2121">"0"</span> <span style="color: #7D9029">right=</span><span style="color: #BA2121">"0"</span><span style="color: #008000; font-weight: bold">&gt;</span>
		<span style="color: #008000; font-weight: bold">&lt;gumbo:Group</span> <span style="color: #7D9029">verticalCenter=</span><span style="color: #BA2121">"0"</span> <span style="color: #7D9029">horizontalCenter=</span><span style="color: #BA2121">"0"</span><span style="color: #008000; font-weight: bold">&gt;</span>
			<span style="color: #008000; font-weight: bold">&lt;HelloWorldText</span> <span style="color: #008000; font-weight: bold">/&gt;</span>
		<span style="color: #008000; font-weight: bold">&lt;/gumbo:Group&gt;</span>
	<span style="color: #008000; font-weight: bold">&lt;/mx:Canvas&gt;</span>
	
	<span style="color: #408080; font-style: italic">&lt;!-- reference the symbol again --&gt;</span>
	<span style="color: #008000; font-weight: bold">&lt;gumbo:Group</span> <span style="color: #7D9029">left=</span><span style="color: #BA2121">"5"</span> <span style="color: #7D9029">bottom=</span><span style="color: #BA2121">"5"</span><span style="color: #008000; font-weight: bold">&gt;</span>
		<span style="color: #008000; font-weight: bold">&lt;HelloWorldText</span> <span style="color: #008000; font-weight: bold">/&gt;</span>
	<span style="color: #008000; font-weight: bold">&lt;/gumbo:Group&gt;</span>
<span style="color: #008000; font-weight: bold">&lt;/Application&gt;</span>
</pre>
</div>

Pay attention to the namespace usage as right now, it can be a little tricky.

Notice that once we define a symbol, we can then reuse it multiple times by referencing its name attribute as if it was a native FXG element.

A `Library` element must contain one of more `Definition` elements. A `Definition` element must have a `name` attribute and contain one `Group` element.

One thing to keep in mind, is that currently, this is code that is executed at runtime, and thus underneath the hood, FXG is not creating actual SWF symbols at compile time. However, that is something that we are looking at to optimize working with static assets.

You can of course, read more details on this in the [FXG 1.0 Specification][1].

I also have a post on how to [get started with Flex 4 FXG in Flex Builder 3][2].

 [1]: http://opensource.adobe.com/wiki/display/flexsdk/FXG+1.0+Specification
 [2]: http://www.mikechambers.com/blog/2008/08/28/getting-started-with-flex-4-fxg-and-flex-builder-3/