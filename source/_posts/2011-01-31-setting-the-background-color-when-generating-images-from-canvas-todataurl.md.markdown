---
title: Setting the background color when generating images from Canvas.toDataURL
author: mikechambers
layout: post
permalink: /2011/01/31/setting-the-background-color-when-generating-images-from-canvas-todataurl/
categories:
  - General
tags:
  - canvas
  - example
  - html5
  - javascript
---


One of the cool features of the HTML5 canvas element is the [toDataURL][1] method. This returns a Base64 encoded image in the form of a data url string. Among other things, this can be displayed directly within an IMG element on the page, or sent to the server so the image can be saved.

However, one thing that I found out this weekend is that there is no background color for the image returned from toDataURL. Looking at the actual canvas draft specification, I found this:  
<!--more-->

> For image types that do not support an alpha channel, the image must be composited onto a solid black background using the source-over operator, and the resulting image must be the one used to create the data: URL.

Basically, if you are create an image type that supports transparency (such as PNG), the background will be transparent, otherwise, it will be black. When you think about it, it makes sense, as the canvas is a blank canvas, and only contains what is actually drawn to it. However, for an example I am working on right now, I needed to be able to specify a white background.

After some Googling failed turn up any solutions, I came up with my own solution which I thought I would share.

First, here is a simple demo:

<div style="text-align:center;">
</div>

&nbsp;

Basically, click in the canvas on the left to draw some rectangles. When you click on one of the links, a PNG is generated from the canvas and displayed in the IMG element on the right. Each link creates an image with a different background color (none, solid red, red with 50% alpha).

You can [view all of the code for the example][2] in my GitHub repository, but here is the relevant snippet:

<div class="wp_syntax">
  <div class="code">
    <pre class="javascript" style="font-family:monospace;"><span style="color: #006600; font-style: italic;">//Returns contents of a canvas as a png based data url, with the specified</span>
<span style="color: #006600; font-style: italic;">//background color</span>
<span style="color: #003366; font-weight: bold;">function</span> canvasToImage<span style="color: #009900;">&#40;</span>backgroundColor<span style="color: #009900;">&#41;</span>
<span style="color: #009900;">&#123;</span>
	<span style="color: #006600; font-style: italic;">//cache height and width		</span>
	<span style="color: #003366; font-weight: bold;">var</span> w <span style="color: #339933;">=</span> canvas.<span style="color: #660066;">width</span><span style="color: #339933;">;</span>
	<span style="color: #003366; font-weight: bold;">var</span> h <span style="color: #339933;">=</span> canvas.<span style="color: #660066;">height</span><span style="color: #339933;">;</span>
&nbsp;
	<span style="color: #003366; font-weight: bold;">var</span> data<span style="color: #339933;">;</span>		
&nbsp;
	<span style="color: #000066; font-weight: bold;">if</span><span style="color: #009900;">&#40;</span>backgroundColor<span style="color: #009900;">&#41;</span>
	<span style="color: #009900;">&#123;</span>
		<span style="color: #006600; font-style: italic;">//get the current ImageData for the canvas.</span>
		data <span style="color: #339933;">=</span> context.<span style="color: #660066;">getImageData</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;"></span><span style="color: #339933;">,</span> <span style="color: #CC0000;"></span><span style="color: #339933;">,</span> w<span style="color: #339933;">,</span> h<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
		<span style="color: #006600; font-style: italic;">//store the current globalCompositeOperation</span>
		<span style="color: #003366; font-weight: bold;">var</span> compositeOperation <span style="color: #339933;">=</span> context.<span style="color: #660066;">globalCompositeOperation</span><span style="color: #339933;">;</span>
&nbsp;
		<span style="color: #006600; font-style: italic;">//set to draw behind current content</span>
		context.<span style="color: #660066;">globalCompositeOperation</span> <span style="color: #339933;">=</span> <span style="color: #3366CC;">"destination-over"</span><span style="color: #339933;">;</span>
&nbsp;
		<span style="color: #006600; font-style: italic;">//set background color</span>
		context.<span style="color: #660066;">fillStyle</span> <span style="color: #339933;">=</span> backgroundColor<span style="color: #339933;">;</span>
&nbsp;
		<span style="color: #006600; font-style: italic;">//draw background / rect on entire canvas</span>
		context.<span style="color: #660066;">fillRect</span><span style="color: #009900;">&#40;</span><span style="color: #CC0000;"></span><span style="color: #339933;">,</span><span style="color: #CC0000;"></span><span style="color: #339933;">,</span>w<span style="color: #339933;">,</span>h<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	<span style="color: #009900;">&#125;</span>
&nbsp;
	<span style="color: #006600; font-style: italic;">//get the image data from the canvas</span>
	<span style="color: #003366; font-weight: bold;">var</span> imageData <span style="color: #339933;">=</span> <span style="color: #000066; font-weight: bold;">this</span>.<span style="color: #660066;">canvas</span>.<span style="color: #660066;">toDataURL</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"image/png"</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
	<span style="color: #000066; font-weight: bold;">if</span><span style="color: #009900;">&#40;</span>backgroundColor<span style="color: #009900;">&#41;</span>
	<span style="color: #009900;">&#123;</span>
		<span style="color: #006600; font-style: italic;">//clear the canvas</span>
		context.<span style="color: #660066;">clearRect</span> <span style="color: #009900;">&#40;</span><span style="color: #CC0000;"></span><span style="color: #339933;">,</span><span style="color: #CC0000;"></span><span style="color: #339933;">,</span>w<span style="color: #339933;">,</span>h<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
		<span style="color: #006600; font-style: italic;">//restore it with original / cached ImageData</span>
		context.<span style="color: #660066;">putImageData</span><span style="color: #009900;">&#40;</span>data<span style="color: #339933;">,</span> <span style="color: #CC0000;"></span><span style="color: #339933;">,</span><span style="color: #CC0000;"></span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>		
&nbsp;
		<span style="color: #006600; font-style: italic;">//reset the globalCompositeOperation to what it was</span>
		context.<span style="color: #660066;">globalCompositeOperation</span> <span style="color: #339933;">=</span> compositeOperation<span style="color: #339933;">;</span>
	<span style="color: #009900;">&#125;</span>
&nbsp;
	<span style="color: #006600; font-style: italic;">//return the Base64 encoded data url string</span>
	<span style="color: #000066; font-weight: bold;">return</span> imageData<span style="color: #339933;">;</span>
<span style="color: #009900;">&#125;</span></pre>
  </div>
</div>

Basically, here is what is going on:

1.  Get the ImageData from the canvas
2.  Set the `globalCompositeOperation` to `destination-over`. This will make it where new drawing to the canvas will go UNDER existing graphics.
3.  Draw a rectangle the size of the entire canvas with a fillStyle set to the background color we want to use (can be any valid HTML color format).
4.  Generate the data url for the canvas.
5.  Clear the entire canvas (including background).
6.  Copy the original drawing data back into the canvas.
7.  Reset the globalCompositeOperation value to what it was when we started.

The key is the [globalCompositeOperation][3], which allows you to control how new graphics are composited with existing graphics.

Now, this technique does require a number of full canvas writes, so be mindful of performance when using it (especially on mobile devices). However, in my testing, it performs well on both desktop and the iPad when running once in response to a user action.

I have added support for this to [EaselJS][4] in the form of a new `Stage.toImage(mimeType, backgroundColor)` method, which will be available in the next release of the library.

Post any comments, questions or suggestions below.

 [1]: http://www.w3.org/TR/html5/the-canvas-element.html
 [2]: https://github.com/mikechambers/ExamplesByMesh/tree/master/HTML5/canvas/exportWithBackgroundColor
 [3]: https://developer.mozilla.org/en/Canvas_tutorial/Compositing
 [4]: http://www.easeljs.com