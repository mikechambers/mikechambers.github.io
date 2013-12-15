---
title: Getting Started with the Canvas Element and EaselJS
author: mikechambers
layout: post
permalink: /2011/01/19/getting-started-with-the-canvas-element-and-easeljs/
categories:
  - General
tags:
  - canvas
  - easeljs
  - html5
  - javascript
---
<div class="tweetmeme_button" style="float: right; margin-left: 10px;"><a class="tm_button" rel="&amp;source=mesh&amp;style=normal&amp;service=bit.ly&amp;b=2" href="http://www.mikechambers.com/blog/2011/01/19/getting-started-with-the-canvas-element-and-easeljs/"></a></div>
<p>One of the features of HTML5 that developers are most excited about is the <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#the-canvas-element">Canvas</a> element. The Canvas element essentials provides a bitmap canvas for dynamically rendering shapes and bitmap graphics. It is very similar to the Flash Player&#8217;s <a href="http://help.adobe.com/en_US/FlashPlatform/beta/reference/actionscript/3/flash/display/Bitmap.html">Bitmap</a> and <a href="http://help.adobe.com/en_US/FlashPlatform/beta/reference/actionscript/3/flash/display/BitmapData.html">BitmapData</a> classes.</p>
<p>However, working with the Canvas element can be difficult, especially if you need to manage, update and or / animate multiple shapes and bitmaps. Unlike the Flash Player, the Canvas element does not have a concept of a display list or individual items to render. Instead, it provides a single Canvas on which to draw, and it is up to the developer to determine what needs to be rendered and when.</p>
<p><a href="http://gskinner.com/">Grant Skinner</a> has release a JavaScript library named <a href="http://www.easeljs.com">EaselJS</a>, which attempts to provide a Flash like DisplayList API in order to make it easier to work with the Canvas element. The library is just an alpha release, but is surprisingly full featured at this early stage. If you are interested in experimenting with the Canvas API, this is a great way to get started.<br />
<!--more--><br />
In this post, I will show how to get started animating content in the Canvas element using the EaselJS JavaScript library.</p>
<p>Here is a list of the main classes in the library:</p>
<ul>
<li><strong>DisplayObject</strong> : Abstract base class for all display elements in EaselJS. Exposes all of the display properties (ex. x, y, rotation, scaleX, scaleY, alpha, shadow, etc) that are common to all display objects.</li>
<li><strong>Stage</strong> : The root level display container for display elements that wraps the Canvas element.</li>
<li><strong>Container</strong> : A nestable display container, which lets you aggregate display objects and manipulate them as a group.</li>
<li><strong>Text</strong> : Renders text in the context of the display list.</li>
<li><strong>Bitmap</strong> : Draws an image, video or canvas to the canvas according to its display properties.</li>
<li><strong>BitmapSequence</strong> : Displays animated or dynamic sprite sheets (images with multiple frames on a grid), and provides APIs for managing playback and sequencing.</li>
<li><strong>Graphics</strong> : Provides a simple but powerful API for dynamically drawing vector graphics.</li>
<li><strong>Shape</strong> : Renders vector art via the Graphics object within the context of the display list.</li>
</ul>
<p>You can view the complete api docs <a href="http://easeljs.com/docs/">here</a>.</p>
<p>Now, before we get started, lets look at where you can actually use the Canvas element (and thus EaselJS). Canvas is part of the HTML5 specification, and is supported in the latest version of most current browsers, including:</p>
<ul>
<li>Safari</li>
<li>Google Chrome</li>
<li>Opera</li>
<li>Firefox</li>
</ul>
<p>However, there is one exception, and it is a pretty big one. Internet Explorer does not currently support the Canvas element (although the next version of the Internet Explorer will). According to NetMarketShare, <a href="http://marketshare.hitslink.com/browser-market-share.aspx?qprid=2">Internet Explorer 6, 7 and 8 make up about 57% of the browser market</a>, which is a large segment of users. There is a project named <a href="http://excanvas.sourceforge.net/">ExplorerCanvas</a> that attempts to replicate Canvas support in Internet Explorer, but EaselJS has not been tested with it yet. Keep these points in mind when considering using the Canvas element.</p>
<p>Now that we have a good idea of where and when we can use the Canvas element, lets look at a simple example. In this example, we will use EaselJS to dynamically draw a circle and animate it across the Canvas. This will show us how to set up the library, introduce us to some basic concepts when working with the library, and show how to animate a graphic.</p>
<p>First, here is the working example:</p>
<div width="400" height="300" id="canvasWrapper">
	<canvas width="400" height="300" id="stageCanvas"></canvas>
</div>
<link rel="stylesheet" href="/blog/post_files/getting-started-with-the-canvas-element-and-easeljs/styles.css">
<script src="/scripts/easeljs.js"></script><br />
<script src="/blog/post_files/getting-started-with-the-canvas-element-and-easeljs/Main.js"></script></p>
<p>Now, lets look at the code, with comments:</p>

<div class="wp_syntax"><div class="code"><pre class="javascript" style="font-family:monospace;"><span style="color: #339933;">&lt;!</span>DOCTYPE html<span style="color: #339933;">&gt;</span>
<span style="color: #339933;">&lt;</span>html lang<span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;en&quot;</span><span style="color: #339933;">&gt;&lt;</span>head<span style="color: #339933;">&gt;</span>
	<span style="color: #339933;">&lt;</span>meta charset<span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;utf-8&quot;</span> <span style="color: #339933;">/&gt;</span>
&nbsp;
	<span style="color: #339933;">&lt;</span>meta <span style="color: #000066;">name</span><span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;author&quot;</span> content<span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;Mike Chambers&quot;</span> <span style="color: #339933;">/&gt;</span> 
	<span style="color: #339933;">&lt;</span>meta <span style="color: #000066;">name</span><span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;keywords&quot;</span> content<span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;&quot;</span> <span style="color: #339933;">/&gt;</span> 
	<span style="color: #339933;">&lt;</span>meta <span style="color: #000066;">name</span><span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;description&quot;</span> content<span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;&quot;</span> <span style="color: #339933;">/&gt;</span> 
	<span style="color: #339933;">&lt;</span>meta <span style="color: #000066;">name</span><span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;copyright&quot;</span> content<span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;Mike Chambers&quot;</span> <span style="color: #339933;">/&gt;</span> 
	<span style="color: #339933;">&lt;</span>meta <span style="color: #000066;">name</span><span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;robots&quot;</span> content<span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;index,follow&quot;</span> <span style="color: #339933;">/&gt;</span> 	
&nbsp;
	<span style="color: #339933;">&lt;</span>title<span style="color: #339933;">&gt;</span>TITLE<span style="color: #339933;">&lt;/</span>title<span style="color: #339933;">&gt;</span>
&nbsp;
	<span style="color: #339933;">&lt;</span>style<span style="color: #339933;">&gt;</span>
		#stageCanvas
		<span style="color: #009900;">&#123;</span>
			background<span style="color: #339933;">-</span>color<span style="color: #339933;">:</span>#<span style="color: #CC0000;">333333</span><span style="color: #339933;">;</span>
		<span style="color: #009900;">&#125;</span>
	<span style="color: #339933;">&lt;/</span>style<span style="color: #339933;">&gt;</span>
&nbsp;
	<span style="color: #339933;">&lt;!--</span> <span style="color: #003366; font-weight: bold;">import</span> the Easel library. <span style="color: #660066;">Downloaded</span> from<span style="color: #339933;">:</span>
		http<span style="color: #339933;">:</span><span style="color: #006600; font-style: italic;">//easeljs.com/</span>
	<span style="color: #339933;">--&gt;</span>
	<span style="color: #339933;">&lt;</span>script src<span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;scripts/easel.js&quot;</span><span style="color: #339933;">&gt;&lt;/</span>script<span style="color: #339933;">&gt;</span>
&nbsp;
	<span style="color: #339933;">&lt;</span>script<span style="color: #339933;">&gt;</span>
		<span style="color: #006600; font-style: italic;">//EaselJS Stage instance that wraps the Canvas element</span>
		<span style="color: #003366; font-weight: bold;">var</span> stage<span style="color: #339933;">;</span>
&nbsp;
		<span style="color: #006600; font-style: italic;">//EaselJS Shape instance that we will animate</span>
		<span style="color: #003366; font-weight: bold;">var</span> circle<span style="color: #339933;">;</span>
&nbsp;
		<span style="color: #006600; font-style: italic;">//radius of the circle Graphics that we will draw.</span>
		<span style="color: #003366; font-weight: bold;">var</span> CIRCLE_RADIUS <span style="color: #339933;">=</span> <span style="color: #CC0000;">10</span><span style="color: #339933;">;</span>
&nbsp;
		<span style="color: #006600; font-style: italic;">//x position that we will reset Shape to when it goes off</span>
		<span style="color: #006600; font-style: italic;">//screen</span>
		<span style="color: #003366; font-weight: bold;">var</span> circleXReset<span style="color: #339933;">;</span>
&nbsp;
		<span style="color: #006600; font-style: italic;">//EaselJS Rectangle instance we will use to store the bounds</span>
		<span style="color: #006600; font-style: italic;">//of the Canvas</span>
		<span style="color: #003366; font-weight: bold;">var</span> bounds<span style="color: #339933;">;</span>
&nbsp;
		<span style="color: #006600; font-style: italic;">//initialize function, called when page loads.</span>
		<span style="color: #003366; font-weight: bold;">function</span> init<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span>
		<span style="color: #009900;">&#123;</span>
			<span style="color: #006600; font-style: italic;">//check and see if the canvas element is supported in</span>
			<span style="color: #006600; font-style: italic;">//the current browser</span>
			<span style="color: #006600; font-style: italic;">//http://diveintohtml5.org/detect.html#canvas</span>
			<span style="color: #000066; font-weight: bold;">if</span><span style="color: #009900;">&#40;</span><span style="color: #339933;">!</span><span style="color: #009900;">&#40;</span><span style="color: #339933;">!!</span>document.<span style="color: #660066;">createElement</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'canvas'</span><span style="color: #009900;">&#41;</span>.<span style="color: #660066;">getContext</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span>
			<span style="color: #009900;">&#123;</span>
				<span style="color: #003366; font-weight: bold;">var</span> wrapper <span style="color: #339933;">=</span> document.<span style="color: #660066;">getElementById</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">&quot;canvasWrapper&quot;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
				wrapper.<span style="color: #660066;">innerHTML</span> <span style="color: #339933;">=</span> <span style="color: #3366CC;">&quot;Your browser does not appear to support &quot;</span> <span style="color: #339933;">+</span>
				<span style="color: #3366CC;">&quot;the HTML5 Canvas element&quot;</span><span style="color: #339933;">;</span>
				<span style="color: #000066; font-weight: bold;">return</span><span style="color: #339933;">;</span>
			<span style="color: #009900;">&#125;</span>
&nbsp;
			<span style="color: #006600; font-style: italic;">//get a reference to the canvas element</span>
			<span style="color: #003366; font-weight: bold;">var</span> canvas <span style="color: #339933;">=</span> document.<span style="color: #660066;">getElementById</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">&quot;stageCanvas&quot;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
			<span style="color: #006600; font-style: italic;">//copy the canvas bounds to the bounds instance.</span>
			<span style="color: #006600; font-style: italic;">//Note, if we resize the canvas, we need to reset</span>
			<span style="color: #006600; font-style: italic;">//these bounds.</span>
			bounds <span style="color: #339933;">=</span> <span style="color: #003366; font-weight: bold;">new</span> Rectangle<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
			bounds.<span style="color: #660066;">width</span> <span style="color: #339933;">=</span> canvas.<span style="color: #660066;">width</span><span style="color: #339933;">;</span>
			bounds.<span style="color: #660066;">height</span> <span style="color: #339933;">=</span> canvas.<span style="color: #660066;">height</span><span style="color: #339933;">;</span>
&nbsp;
			<span style="color: #006600; font-style: italic;">//pass the canvas element to the EaselJS Stage instance</span>
			<span style="color: #006600; font-style: italic;">//The Stage class abstracts away the Canvas element and</span>
			<span style="color: #006600; font-style: italic;">//is the root level display container for display elements.</span>
			stage <span style="color: #339933;">=</span> <span style="color: #003366; font-weight: bold;">new</span> Stage<span style="color: #009900;">&#40;</span>canvas<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
			<span style="color: #006600; font-style: italic;">//Create an EaselJS Graphics element to create the</span>
			<span style="color: #006600; font-style: italic;">//commands to draw a circle</span>
			<span style="color: #003366; font-weight: bold;">var</span> g <span style="color: #339933;">=</span> <span style="color: #003366; font-weight: bold;">new</span> Graphics<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
			<span style="color: #006600; font-style: italic;">//stroke of 1 px</span>
			g.<span style="color: #660066;">setStrokeStyle</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;">1</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
			<span style="color: #006600; font-style: italic;">//Set the stroke color, using the EaselJS </span>
			<span style="color: #006600; font-style: italic;">//Graphics.getRGB static method.</span>
			<span style="color: #006600; font-style: italic;">//This creates a white color, with an alpha</span>
			<span style="color: #006600; font-style: italic;">//of .7</span>
			g.<span style="color: #660066;">beginStroke</span><span style="color: #009900;">&#40;</span>Graphics.<span style="color: #660066;">getRGB</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;">255</span><span style="color: #339933;">,</span><span style="color: #CC0000;">255</span><span style="color: #339933;">,</span><span style="color: #CC0000;">255</span><span style="color: #339933;">,</span>.7<span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
			<span style="color: #006600; font-style: italic;">//draw the circle</span>
			g.<span style="color: #660066;">drawCircle</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;">0</span><span style="color: #339933;">,</span><span style="color: #CC0000;">0</span><span style="color: #339933;">,</span> CIRCLE_RADIUS<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
			<span style="color: #006600; font-style: italic;">//note that the circle has not been drawn yet. </span>
			<span style="color: #006600; font-style: italic;">//the Graphics instance just has the commands to</span>
			<span style="color: #006600; font-style: italic;">//draw the circle.</span>
			<span style="color: #006600; font-style: italic;">//It will be drawn when the stage needs to render it</span>
			<span style="color: #006600; font-style: italic;">//which is usually when we call stage.tick()</span>
&nbsp;
			<span style="color: #006600; font-style: italic;">//create a new Shape instance. This is a DisplayObject</span>
			<span style="color: #006600; font-style: italic;">//which can be added directly to the stage (and rendered).</span>
			<span style="color: #006600; font-style: italic;">//Pass in the Graphics instance that we created, and that</span>
			<span style="color: #006600; font-style: italic;">//we want the Shape to draw.</span>
			circle <span style="color: #339933;">=</span> <span style="color: #003366; font-weight: bold;">new</span> Shape<span style="color: #009900;">&#40;</span>g<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
			<span style="color: #006600; font-style: italic;">//set the initial x position, and the reset position</span>
			circle.<span style="color: #660066;">x</span> <span style="color: #339933;">=</span> circleXReset <span style="color: #339933;">=</span> <span style="color: #339933;">-</span>CIRCLE_RADIUS<span style="color: #339933;">;</span>
&nbsp;
			<span style="color: #006600; font-style: italic;">//set the y position</span>
			circle.<span style="color: #660066;">y</span> <span style="color: #339933;">=</span> canvas.<span style="color: #660066;">height</span> <span style="color: #339933;">/</span> <span style="color: #CC0000;">2</span><span style="color: #339933;">;</span>
&nbsp;
			<span style="color: #006600; font-style: italic;">//add the circle to the stage.</span>
			stage.<span style="color: #660066;">addChild</span><span style="color: #009900;">&#40;</span>circle<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
			<span style="color: #006600; font-style: italic;">//tell the stage to render to the canvas</span>
			stage.<span style="color: #660066;">update</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
			Ticker.<span style="color: #660066;">setFPS</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;">24</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
			<span style="color: #006600; font-style: italic;">//Subscribe to the Tick class. This will call the tick</span>
			<span style="color: #006600; font-style: italic;">//method at a set interval (similar to ENTER_FRAME with</span>
			<span style="color: #006600; font-style: italic;">//the Flash Player)</span>
			Ticker.<span style="color: #660066;">addListener</span><span style="color: #009900;">&#40;</span><span style="color: #000066; font-weight: bold;">this</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
		<span style="color: #009900;">&#125;</span>
&nbsp;
		<span style="color: #006600; font-style: italic;">//function called by the Tick instance at a set interval</span>
		<span style="color: #003366; font-weight: bold;">function</span> tick<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span>
		<span style="color: #009900;">&#123;</span>
			<span style="color: #006600; font-style: italic;">//check and see if the Shape has gone of the right</span>
			<span style="color: #006600; font-style: italic;">//of the stage.</span>
			<span style="color: #000066; font-weight: bold;">if</span><span style="color: #009900;">&#40;</span>circle.<span style="color: #660066;">x</span> <span style="color: #339933;">&gt;</span> bounds.<span style="color: #660066;">width</span><span style="color: #009900;">&#41;</span>
			<span style="color: #009900;">&#123;</span>
				<span style="color: #006600; font-style: italic;">//if it has, reset it.</span>
				circle.<span style="color: #660066;">x</span> <span style="color: #339933;">=</span> circleXReset<span style="color: #339933;">;</span>
			<span style="color: #009900;">&#125;</span>
&nbsp;
			<span style="color: #006600; font-style: italic;">//move the circle over 10 pixels</span>
			circle.<span style="color: #660066;">x</span> <span style="color: #339933;">+=</span> <span style="color: #CC0000;">8</span><span style="color: #339933;">;</span>
&nbsp;
			<span style="color: #006600; font-style: italic;">//re-render the stage</span>
			stage.<span style="color: #660066;">update</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
		<span style="color: #009900;">&#125;</span>
	<span style="color: #339933;">&lt;/</span>script<span style="color: #339933;">&gt;</span>
&nbsp;
&nbsp;
<span style="color: #339933;">&lt;/</span>head<span style="color: #339933;">&gt;</span>
<span style="color: #339933;">&lt;</span>body <span style="color: #000066;">onload</span><span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;init()&quot;</span><span style="color: #339933;">&gt;</span>
	<span style="color: #339933;">&lt;</span>div width<span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;400&quot;</span> height<span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;300&quot;</span> id<span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;canvasWrapper&quot;</span><span style="color: #339933;">&gt;</span>
		<span style="color: #339933;">&lt;</span>canvas width<span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;400&quot;</span> height<span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;300&quot;</span> id<span style="color: #339933;">=</span><span style="color: #3366CC;">&quot;stageCanvas&quot;</span><span style="color: #339933;">&gt;&lt;/</span>canvas<span style="color: #339933;">&gt;</span>
	<span style="color: #339933;">&lt;/</span>div<span style="color: #339933;">&gt;</span>
<span style="color: #339933;">&lt;/</span>body<span style="color: #339933;">&gt;</span>
<span style="color: #339933;">&lt;/</span>html<span style="color: #339933;">&gt;</span></pre></div></div>

<p>&nbsp;</p>
<p>You can download the code for the example from <a href="https://github.com/mikechambers/ExamplesByMesh/tree/master/HTML5/EaselJS/HelloWorld">here</a>.</p>
<p>As you can see, the code is pretty simple, and its structure is very similar to using the DisplayList API within the Flash Player.</p>
<p>There are a couple of things that are important to point out. </p>
<p>The EaselJS <a href="http://easeljs.com/docs/symbols/Stage.html">Stage</a> instance wraps the Canvas element, and handles when and how items are rendered. The stage is only rendered when you call <code>stage.update()</code>, and for performance reasons, you should only call this if something has changed and you need to update the canvas.</p>
<p>The <a href="http://easeljs.com/docs/symbols/Ticker.html">Ticker</a> class handles time management. It will call a tick event on any object that has subscribed to be notified. This is analogous to the <code>ENTER_FRAME</code> event in ActionScript.</p>
<p>If you resize the canvas, then its contents will be erased. However, using EaselJS, all you need to do is call <code>stage.update()</code> after resizing in order to re-render the graphics. </p>
<p>Given the lack of Canvas support in Internet Explorer, it is important that you detect for Canvas support in the browser, and provide an appropriate fall back for the user. I have some simple code in the example above, or you can use the <a href="http://www.modernizr.com/">Modernizr JavaScript Library</a> which provides an API for detecting support for HTML5 features.</p>
<p>Finally, this is an early release of the library, and thus APIs may (and probably will) change. In addition, some things which you might expect to work may not be supported yet. For example, there are currently no APIs to retrieve the height / width of a DisplayObject (you will have to figure it out yourself). However, in general, the library is very robust and has been used in some <a href="http://gskinner.com/blog/archives/2010/12/pirates-love-daisies-html5-game-launches.html">production projects</a>.</p>
<p>Here are some resources which are useful if you want to start playing around with the Canvas element via EaselJS:</p>
<ul>
<li><a href="http://www.easeljs.com">EaselJS Homepage<a></li>
<li><a href="http://easeljs.com/docs/">EaselJS API Docs<a></li>
<li><a href="http://www.modernizr.com/">Modernizr JavaScript Library<a> (for detecting support for HTML5 features).</li>
<li><a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#the-canvas-element">Canvas Element Draft Specification<a></li>
<li><a href="http://en.wikipedia.org/wiki/Canvas_element">Canvas Element<a> (Wikipedia)</li>
<li><a href="http://diveintohtml5.org/canvas.html">Let&#8217;s call it a draw(ing surface)</a> Good introduction to the low level Canvas API.</li>
<li><a href="http://html5test.com/">HTML5 Browser Support Matrix</a></li>
<li><a href="http://html5readiness.com/">HTML5 and CSS3 Readiness</a></li>
<li><a href="http://www.findmebyip.com/#target-selector">HTML5 Support in your Browser</a></li>
</ul>
<p>UPDATED : (02/15/2010) : Updated to work with EaselJS 0.3.1 release.</p>
<p>Post any questions / comments in the comments section below.</p>
