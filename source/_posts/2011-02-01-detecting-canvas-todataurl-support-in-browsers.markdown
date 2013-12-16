---
title: Detecting Canvas.toDataURL Support in Browsers
author: mikechambers
layout: post
permalink: /2011/02/01/detecting-canvas-todataurl-support-in-browsers/
categories:
  - General
tags:
  - canvas
  - example
  - javascript
---


I am wrapping up a code example that uses the [Canvas.toDataURL][1] API to save canvas data to an image. I am almost done, and was doing a final round of browser testing when I noticed that my example wasnt working on my Android based Google Nexus One Device (2.2.2). After some debugging, and then Googling, I discovered that the Canvas.toDataURL API is not implemented on Android (you can view the bug report [here][2]).

Well, after some cursing, I put together a simple method for detecting whether the API is supported on any particular device. I wanted to share it in case anyone else might run into a need for it. So, here it is:  
<!--more-->

``` javascript
function supportsToDataURL()
{
	var c = document.createElement("canvas");
	var data = c.toDataURL("image/png");
	return (data.indexOf("data:image/png") == 0);
}
```

The code assumes that you are already checking for Canvas support.

Here is the script in action:

<div><strong><script>function supports_canvas(){return!!document.createElement("canvas").getContext}function supportsToDataURL(){if(!supports_canvas())return false;var c=document.createElement("canvas");var data=c.toDataURL("image/png");return data.indexOf("data:image/png")==0}var results="";if(supportsToDataURL())results="You browser is cool and supports Canvas.toDataURL();";else results="You browser is lame and does NOT support Canvas.toDataURL();";document.write(results);</script></strong></div>


and the code:

``` javascript
function supports_canvas()
{
	return !!document.createElement('canvas').getContext;
}

function supportsToDataURL()
{
	if(!supports_canvas())
	{
		return false;
	}
	
	var c = document.createElement("canvas");
	var data = c.toDataURL("image/png");
	return (data.indexOf("data:image/png") == 0);
}

var results = "";

if(supportsToDataURL())
{
	results="You browser is cool and supports Canvas.toDataURL();"
}
else
{
	results="You browser is lame and does NOT support Canvas.toDataURL();"
}
document.write(results);
```

If you have any fixes or suggestions for the detection, post them in the comments.

 [1]: http://www.w3.org/TR/html5/the-canvas-element.html
 [2]: http://code.google.com/p/android/issues/detail?id=7901