---
title: Getting started with Flex 4 FXG and Flex Builder 3
author: mikechambers
date: 2008-08-28 12:18:01 -0800
layout: post
permalink: /2008/08/28/getting-started-with-flex-4-fxg-and-flex-builder-3/
categories:
  - General
---


As I [mentioned the other day][1], the Flex team has released [a ton of information on Flex 4][1]. One of the new features which I am most excited about is the [FXG graphic format][2] being developed.  
<!--more-->

  
What is FXG? From the [spec][2]:

> FXG 1.0 describes an XML-based graphics interchange format for the Flash Platform. FXG contains high-level graphical and text primitives that can be used to create, group, transform and visually modify basic vector and bitmap shapes. The FXG rendering model follows very closely the Flash Player 10 rendering model and exposes all graphics capabilities of the Flash platform as well as offering expandable support to accommodate future capabilities of the Flash Player. The specification below dives into the technical details governing every element of FXG 1.0.

One of the major benefits of FXG is that it will make it much easier to build visual tooling around working with and designing Flex applications (such as [Thermo][3] and all of the Adobe CS tools).

This post is not going to go over all of the elements within FXG as you can find all of that in the [spec][2]. However, it is going to show how to start playing with FXG today using Flex Builder 3, and a nightly Flex 4 build.

Update : James Polanco just posted much more [detailed instructions on how to setup Flex 4 in Flex Builder][4].

First, you need to setup Flex Builder 3 to work with a [nightly Flex 4 SDK build][5] (im using the Flex 4 4.0.0.3009 build). Once you have downloaded and unzipped the SDK, following the instructions in the Flex Builder docs on how to [add a new Flex SDK to Flex Builder][6].

Once you do that, create a new Flex Project, making sure to set it to use the Flex 4 SDK which you just installed (Project > Properties > Flex Compiler > Use a specific SDK > Flex 4).

On the same screen, make sure to also set the &#8220;Require Flash Player Version&#8221; to 10.0.0.

[<img src="http://farm4.static.flickr.com/3013/2807183380_47bdc0463d.jpg" width="500" height="381" alt="Flex Builder Properties" border="0" />][7]

Once you have configured the project, add the following MXML and FXG:

<div class="highlight">
  <pre><span style="color: #BC7A00">&lt;?xml version="1.0" encoding="utf-8"?&gt;</span>
<span style="color: #008000; font-weight: bold">&lt;Application</span> 
	<span style="color: #7D9029">xmlns:mx=</span><span style="color: #BA2121">"library:adobe/flex/halo"</span>
	<span style="color: #7D9029">xmlns=</span><span style="color: #BA2121">"http://ns.adobe.com/mxml/2009"</span><span style="color: #008000; font-weight: bold">&gt;</span>

	<span style="color: #408080; font-style: italic">&lt;!-- Flex 4 Hello World with FXG --&gt;</span>
	<span style="color: #008000; font-weight: bold">&lt;mx:Canvas</span> <span style="color: #7D9029">top=</span><span style="color: #BA2121">"0"</span> <span style="color: #7D9029">bottom=</span><span style="color: #BA2121">"0"</span> <span style="color: #7D9029">left=</span><span style="color: #BA2121">"0"</span> <span style="color: #7D9029">right=</span><span style="color: #BA2121">"0"</span><span style="color: #008000; font-weight: bold">&gt;</span>
		<span style="color: #008000; font-weight: bold">&lt;Group</span> <span style="color: #7D9029">verticalCenter=</span><span style="color: #BA2121">"0"</span> <span style="color: #7D9029">horizontalCenter=</span><span style="color: #BA2121">"0"</span><span style="color: #008000; font-weight: bold">&gt;</span>
			<span style="color: #008000; font-weight: bold">&lt;TextGraphic</span> <span style="color: #7D9029">fontFamily=</span><span style="color: #BA2121">"Verdana"</span> <span style="color: #7D9029">fontWeight=</span><span style="color: #BA2121">"bold"</span><span style="color: #008000; font-weight: bold">&gt;</span>
				<span style="color: #008000; font-weight: bold">&lt;content&gt;</span>Hello, World<span style="color: #008000; font-weight: bold">&lt;/content&gt;</span>
			<span style="color: #008000; font-weight: bold">&lt;/TextGraphic&gt;</span>
		<span style="color: #008000; font-weight: bold">&lt;/Group&gt;</span>
	<span style="color: #008000; font-weight: bold">&lt;/mx:Canvas&gt;</span>
	
<span style="color: #008000; font-weight: bold">&lt;/Application&gt;</span>
</pre>
</div>

This will create a simple piece of content with Hello World centered on the screen.

A couple of notes on the markup.

First, notice the use of namespaces in the `Application` tag. `http://ns.adobe.com/mxml/2009` is the new namespace used for Flex 4 components and classes. In order to using existing component, we need to map the mx namespace to `library:adobe/flex/halo`. (You can read more on the new namespacing stuff in the [MXML 2009 Spec][8].)

Update : James Polanco [points out][4] that if you use the `gumbo` namespace, instead of the default namespace, you will get code hinting for the `gumbo` elements (such as `Group`).

Also, note that we placed the FXG code inside of a `Group` tag, and not directly inside of the `Canvas` element. This is because visual children of `Canvas` (and other containers) must implement `mx.core.IUIElement`, which the FXG elements (being a little lower level and focused on drawing) do not. The `Group` element does, and also allows FXG to be nested within it.

At this stage, you are all set up to begin playing with and experimenting with the full range of FXG support.

 [1]: http://www.mikechambers.com/blog/2008/08/27/everything-there-is-to-know-about-flex-4-gumbo/
 [2]: http://opensource.adobe.com/wiki/display/flexsdk/FXG+1.0+Specification
 [3]: http://labs.adobe.com/wiki/index.php/Thermo
 [4]: http://blog.vivisectingmedia.com/2008/08/binding-source-for-flex-4-in-flex-builder-3/
 [5]: http://opensource.adobe.com/wiki/display/flexsdk/Download+Flex+4
 [6]: http://livedocs.adobe.com/flex/3/html/help.html?content=build_6.html#162812
 [7]: http://www.flickr.com/photos/mikechambers/2807183380/ "Flex Builder Properties by mike.chambers, on Flickr"
 [8]: http://opensource.adobe.com/wiki/display/flexsdk/MXML+2009