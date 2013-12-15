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

<div class="wp_syntax">
  <div class="code">
    <pre class="javascript" style="font-family:monospace;"><span style="color: #003366; font-weight: bold;">function</span> supportsToDataURL<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span>
<span style="color: #009900;">&#123;</span>
	<span style="color: #003366; font-weight: bold;">var</span> c <span style="color: #339933;">=</span> document.<span style="color: #660066;">createElement</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"canvas"</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	<span style="color: #003366; font-weight: bold;">var</span> data <span style="color: #339933;">=</span> c.<span style="color: #660066;">toDataURL</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"image/png"</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	<span style="color: #000066; font-weight: bold;">return</span> <span style="color: #009900;">&#40;</span>data.<span style="color: #660066;">indexOf</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"data:image/png"</span><span style="color: #009900;">&#41;</span> <span style="color: #339933;">==</span> <span style="color: #CC0000;"></span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #009900;">&#125;</span></pre>
  </div>
</div>

The code assumes that you are already checking for Canvas support.

Here is the script in action:

<div>
  <strong></strong>
</div>

&nbsp;

and the code:

<div class="wp_syntax">
  <div class="code">
    <pre class="javascript" style="font-family:monospace;"><span style="color: #003366; font-weight: bold;">function</span> supports_canvas<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span>
<span style="color: #009900;">&#123;</span>
	<span style="color: #000066; font-weight: bold;">return</span> <span style="color: #339933;">!!</span>document.<span style="color: #660066;">createElement</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">'canvas'</span><span style="color: #009900;">&#41;</span>.<span style="color: #660066;">getContext</span><span style="color: #339933;">;</span>
<span style="color: #009900;">&#125;</span>
&nbsp;
<span style="color: #003366; font-weight: bold;">function</span> supportsToDataURL<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span>
<span style="color: #009900;">&#123;</span>
	<span style="color: #000066; font-weight: bold;">if</span><span style="color: #009900;">&#40;</span><span style="color: #339933;">!</span>supports_canvas<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span>
	<span style="color: #009900;">&#123;</span>
		<span style="color: #000066; font-weight: bold;">return</span> <span style="color: #003366; font-weight: bold;">false</span><span style="color: #339933;">;</span>
	<span style="color: #009900;">&#125;</span>
&nbsp;
	<span style="color: #003366; font-weight: bold;">var</span> c <span style="color: #339933;">=</span> document.<span style="color: #660066;">createElement</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"canvas"</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	<span style="color: #003366; font-weight: bold;">var</span> data <span style="color: #339933;">=</span> c.<span style="color: #660066;">toDataURL</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"image/png"</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	<span style="color: #000066; font-weight: bold;">return</span> <span style="color: #009900;">&#40;</span>data.<span style="color: #660066;">indexOf</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"data:image/png"</span><span style="color: #009900;">&#41;</span> <span style="color: #339933;">==</span> <span style="color: #CC0000;"></span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #009900;">&#125;</span>
&nbsp;
<span style="color: #003366; font-weight: bold;">var</span> results <span style="color: #339933;">=</span> <span style="color: #3366CC;">""</span><span style="color: #339933;">;</span>
&nbsp;
<span style="color: #000066; font-weight: bold;">if</span><span style="color: #009900;">&#40;</span>supportsToDataURL<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span>
<span style="color: #009900;">&#123;</span>
	results<span style="color: #339933;">=</span><span style="color: #3366CC;">"You browser is cool and supports Canvas.toDataURL();"</span>
<span style="color: #009900;">&#125;</span>
<span style="color: #000066; font-weight: bold;">else</span>
<span style="color: #009900;">&#123;</span>
	results<span style="color: #339933;">=</span><span style="color: #3366CC;">"You browser is lame and does NOT support Canvas.toDataURL();"</span>
<span style="color: #009900;">&#125;</span>
document.<span style="color: #000066; font-weight: bold;">write</span><span style="color: #009900;">&#40;</span>results<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre>
  </div>
</div>

If you have any fixes or suggestions for the detection, post them in the comments.

 [1]: http://www.w3.org/TR/html5/the-canvas-element.html
 [2]: http://code.google.com/p/android/issues/detail?id=7901