---
title: Data Binding with FXG in Flex 4
author: mikechambers
layout: post
permalink: /2008/08/29/data-binding-with-fxg-in-flex-4/
categories:
  - Flex
tags:
  - flex flex4 fxg
---


One of the cool things about [FXG][1] is that it works with Flex data-binding just as your would expect it to.

Below is a simple example (which requires [Flash Player 10 RC][2]), followed the code, that shows data-binding with FXG and [Flex 4][3]:  
<!--more-->

  


As you can see, there are still some bugs in the rendering, but that is to be expected as these are very early Flex 4 builds.

Source

<div class="highlight">
  <pre><span style="color: #BC7A00">&lt;?xml version="1.0" encoding="utf-8"?&gt;</span>
<span style="color: #008000; font-weight: bold">&lt;mx:Application</span> 
	<span style="color: #7D9029">xmlns:mx=</span><span style="color: #BA2121">"library:adobe/flex/halo"</span>
	<span style="color: #7D9029">xmlns=</span><span style="color: #BA2121">"http://ns.adobe.com/mxml/2009"</span>
	<span style="color: #7D9029">xmlns:gumbo=</span><span style="color: #BA2121">"library:adobe/flex/gumbo"</span> 
	<span style="color: #7D9029">verticalCenter=</span><span style="color: #BA2121">"0"</span> <span style="color: #7D9029">horizontalCenter=</span><span style="color: #BA2121">"0"</span>
	<span style="color: #7D9029">layout=</span><span style="color: #BA2121">"vertical"</span><span style="color: #008000; font-weight: bold">&gt;</span>

	<span style="color: #008000; font-weight: bold">&lt;gumbo:Group</span> <span style="color: #7D9029">verticalCenter=</span><span style="color: #BA2121">"0"</span> <span style="color: #7D9029">horizontalCenter=</span><span style="color: #BA2121">"0"</span><span style="color: #008000; font-weight: bold">&gt;</span>
		<span style="color: #008000; font-weight: bold">&lt;Rect</span> <span style="color: #7D9029">width=</span><span style="color: #BA2121">"300"</span> <span style="color: #7D9029">height=</span><span style="color: #BA2121">"200"</span> <span style="color: #7D9029">radiusX=</span><span style="color: #BA2121">"{radiusSlider.value}"</span> 
			<span style="color: #7D9029">radiusY=</span><span style="color: #BA2121">"{radiusSlider.value}"</span><span style="color: #008000; font-weight: bold">&gt;</span>
			<span style="color: #008000; font-weight: bold">&lt;fill&gt;</span>
				<span style="color: #008000; font-weight: bold">&lt;SolidColor</span> <span style="color: #7D9029">color=</span><span style="color: #BA2121">"{fillColor.selectedColor}"</span> <span style="color: #008000; font-weight: bold">/&gt;</span>
			<span style="color: #008000; font-weight: bold">&lt;/fill&gt;</span>
			<span style="color: #008000; font-weight: bold">&lt;stroke&gt;</span>
				<span style="color: #008000; font-weight: bold">&lt;SolidColorStroke</span> <span style="color: #7D9029">weight=</span><span style="color: #BA2121">"{strokeSlider.value}"</span> 
					<span style="color: #7D9029">color=</span><span style="color: #BA2121">"{strokeColor.selectedColor}"</span> <span style="color: #7D9029">alpha=</span><span style="color: #BA2121">"1"</span> <span style="color: #008000; font-weight: bold">/&gt;</span>
			<span style="color: #008000; font-weight: bold">&lt;/stroke&gt;</span>
		<span style="color: #008000; font-weight: bold">&lt;/Rect&gt;</span>
	<span style="color: #008000; font-weight: bold">&lt;/gumbo:Group&gt;</span>
	
	<span style="color: #008000; font-weight: bold">&lt;mx:Label</span> <span style="color: #7D9029">text=</span><span style="color: #BA2121">"Corner Radius"</span> <span style="color: #008000; font-weight: bold">/&gt;</span>
	<span style="color: #008000; font-weight: bold">&lt;mx:HSlider</span> <span style="color: #7D9029">minimum=</span><span style="color: #BA2121">"0"</span> <span style="color: #7D9029">maximum=</span><span style="color: #BA2121">"100"</span> <span style="color: #7D9029">id=</span><span style="color: #BA2121">"radiusSlider"</span> <span style="color: #7D9029">liveDragging=</span><span style="color: #BA2121">"true"</span><span style="color: #008000; font-weight: bold">/&gt;</span>
	<span style="color: #008000; font-weight: bold">&lt;mx:Label</span> <span style="color: #7D9029">text=</span><span style="color: #BA2121">"Stroke Weight"</span> <span style="color: #008000; font-weight: bold">/&gt;</span>
	<span style="color: #008000; font-weight: bold">&lt;mx:HSlider</span> <span style="color: #7D9029">minimum=</span><span style="color: #BA2121">"0"</span> <span style="color: #7D9029">maximum=</span><span style="color: #BA2121">"20"</span> <span style="color: #7D9029">value=</span><span style="color: #BA2121">"5"</span> <span style="color: #7D9029">id=</span><span style="color: #BA2121">"strokeSlider"</span> <span style="color: #7D9029">liveDragging=</span><span style="color: #BA2121">"true"</span><span style="color: #008000; font-weight: bold">/&gt;</span>
	<span style="color: #008000; font-weight: bold">&lt;mx:Label</span> <span style="color: #7D9029">text=</span><span style="color: #BA2121">"Stroke Color"</span> <span style="color: #008000; font-weight: bold">/&gt;</span>
	<span style="color: #008000; font-weight: bold">&lt;mx:ColorPicker</span> <span style="color: #7D9029">id=</span><span style="color: #BA2121">"strokeColor"</span> <span style="color: #7D9029">selectedColor=</span><span style="color: #BA2121">"0x333333"</span> <span style="color: #008000; font-weight: bold">/&gt;</span>
	<span style="color: #008000; font-weight: bold">&lt;mx:Label</span> <span style="color: #7D9029">text=</span><span style="color: #BA2121">"Fill Color"</span> <span style="color: #008000; font-weight: bold">/&gt;</span>
	<span style="color: #008000; font-weight: bold">&lt;mx:ColorPicker</span> <span style="color: #7D9029">id=</span><span style="color: #BA2121">"fillColor"</span> <span style="color: #7D9029">selectedColor=</span><span style="color: #BA2121">"0x999999"</span> <span style="color: #008000; font-weight: bold">/&gt;</span>

<span style="color: #008000; font-weight: bold">&lt;/mx:Application&gt;</span>
</pre>
</div>

You can of course, read more details on this in the [FXG 1.0 Specification][1].

I also have a post on how to [get started with Flex 4 FXG in Flex Builder 3][4].

 [1]: http://opensource.adobe.com/wiki/display/flexsdk/FXG+1.0+Specification
 [2]: http://labs.adobe.com/technologies/flashplayer10/
 [3]: http://www.mikechambers.com/blog/2008/08/27/everything-there-is-to-know-about-flex-4-gumbo/
 [4]: http://www.mikechambers.com/blog/2008/08/28/getting-started-with-flex-4-fxg-and-flex-builder-3/