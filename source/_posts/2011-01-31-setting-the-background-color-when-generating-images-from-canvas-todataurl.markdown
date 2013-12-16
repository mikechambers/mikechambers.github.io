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

<iframe src="/html5/canvas/exportWithBackgroundColor/" width="500" height="280"></iframe>

Basically, click in the canvas on the left to draw some rectangles. When you click on one of the links, a PNG is generated from the canvas and displayed in the IMG element on the right. Each link creates an image with a different background color (none, solid red, red with 50% alpha).

You can [view all of the code for the example][2] in my GitHub repository, but here is the relevant snippet:

``` javascript
//Returns contents of a canvas as a png based data url, with the specified
//background color
function canvasToImage(backgroundColor)
{
	//cache height and width		
	var w = canvas.width;
	var h = canvas.height;

	var data;		

	if(backgroundColor)
	{
		//get the current ImageData for the canvas.
		data = context.getImageData(0, 0, w, h);
		
		//store the current globalCompositeOperation
		var compositeOperation = context.globalCompositeOperation;

		//set to draw behind current content
		context.globalCompositeOperation = "destination-over";

		//set background color
		context.fillStyle = backgroundColor;

		//draw background / rect on entire canvas
		context.fillRect(0,0,w,h);
	}

	//get the image data from the canvas
	var imageData = this.canvas.toDataURL("image/png");

	if(backgroundColor)
	{
		//clear the canvas
		context.clearRect (0,0,w,h);

		//restore it with original / cached ImageData
		context.putImageData(data, 0,0);		

		//reset the globalCompositeOperation to what it was
		context.globalCompositeOperation = compositeOperation;
	}

	//return the Base64 encoded data url string
	return imageData;
}
```

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