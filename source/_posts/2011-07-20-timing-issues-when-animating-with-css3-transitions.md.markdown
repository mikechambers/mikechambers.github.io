---
title: Timing issues when animating with CSS3 Transitions
author: mikechambers
layout: post
permalink: /2011/07/20/timing-issues-when-animating-with-css3-transitions/
categories:
  - General
tags:
  - css
  - csstransitions
  - example
  - html5
  - javascript
---


I have been playing around a lot lately with motion graphics created using HTML5 and / or CSS3. One of my favorite new features is [CSS Transitions][1], which makes it super simple to animate element properties between two states.

However, I ran into a gotcha the other day, and wanted to make a quick blog post in case anyone else runs into it in the future. Basically, if you change a property that a CSS Transition is monitoring in the same script loop that you add the element to the DOM, the CSS Transition will not take affect. Instead, the element will be drawn with the new properties, and will not animate to those properties.

Here is an example that shows the issue, as well as how to fix it.  
<!--more-->

  
First the relevant styles for the CSS Transition:

<div class="wp_syntax">
  <div class="code">
    <pre class="css" style="font-family:monospace;"><span style="color: #6666ff;">.box</span>
<span style="color: #00AA00;">&#123;</span>
	<span style="color: #808080; font-style: italic;">/*...*/</span>
	-webkit-transition<span style="color: #00AA00;">:</span> all 0.7s ease<span style="color: #00AA00;">;</span>
	-moz-transition<span style="color: #00AA00;">:</span> all 0.7s ease<span style="color: #00AA00;">;</span>
	-o-transition<span style="color: #00AA00;">:</span> all 0.7s ease<span style="color: #00AA00;">;</span>
	transition<span style="color: #00AA00;">:</span> all 0.7s ease<span style="color: #00AA00;">;</span>
<span style="color: #00AA00;">&#125;</span></pre>
  </div>
</div>

<div style="text-align:center;">
</div>

&nbsp;

Notice how when you click the example the cirlce just appears on the right, instead of appearing on the left, and then animating to the right as it should.

Here is the relevant code that creates the div and updates it position:

<div class="wp_syntax">
  <div class="code">
    <pre class="javascript" style="font-family:monospace;"><span style="color: #003366; font-weight: bold;">function</span> onMouseClick<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span>
<span style="color: #009900;">&#123;</span>
	<span style="color: #000066; font-weight: bold;">if</span><span style="color: #009900;">&#40;</span>box<span style="color: #009900;">&#41;</span>
	<span style="color: #009900;">&#123;</span>
		<span style="color: #006600; font-style: italic;">//remove existing box from dom</span>
		document.<span style="color: #660066;">body</span>.<span style="color: #660066;">removeChild</span><span style="color: #009900;">&#40;</span>box<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	<span style="color: #009900;">&#125;</span>
&nbsp;
	<span style="color: #006600; font-style: italic;">//create the div</span>
	box <span style="color: #339933;">=</span> document.<span style="color: #660066;">createElement</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"div"</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	box.<span style="color: #660066;">className</span> <span style="color: #339933;">=</span> <span style="color: #3366CC;">"box"</span><span style="color: #339933;">;</span>
&nbsp;
	<span style="color: #006600; font-style: italic;">//add to dom</span>
	document.<span style="color: #660066;">body</span>.<span style="color: #660066;">appendChild</span><span style="color: #009900;">&#40;</span>box<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
	<span style="color: #006600; font-style: italic;">//position in middle / left of screen</span>
	box.<span style="color: #660066;">style</span>.<span style="color: #660066;">left</span> <span style="color: #339933;">=</span> <span style="color: #3366CC;">"10px"</span><span style="color: #339933;">;</span>
	box.<span style="color: #660066;">style</span>.<span style="color: #660066;">top</span> <span style="color: #339933;">=</span> <span style="color: #009900;">&#40;</span>window.<span style="color: #660066;">innerHeight</span> <span style="color: #339933;">/</span> <span style="color: #CC0000;">2</span><span style="color: #009900;">&#41;</span> <span style="color: #339933;">+</span> <span style="color: #3366CC;">"px"</span><span style="color: #339933;">;</span>
&nbsp;
	<span style="color: #006600; font-style: italic;">//set position we want div to animate to (using the CSS Transition)</span>
	<span style="color: #006600; font-style: italic;">//NOTE : This will not animate, but will instead just be moved / drawn</span>
	<span style="color: #006600; font-style: italic;">//in the final position</span>
	<span style="color: #006600; font-style: italic;">//need to delay this call by 20 ms</span>
	box.<span style="color: #660066;">style</span>.<span style="color: #660066;">left</span> <span style="color: #339933;">=</span> <span style="color: #009900;">&#40;</span>window.<span style="color: #660066;">innerWidth</span> <span style="color: #339933;">-</span> <span style="color: #CC0000;">100</span><span style="color: #009900;">&#41;</span> <span style="color: #339933;">+</span> <span style="color: #3366CC;">"px"</span><span style="color: #339933;">;</span>
<span style="color: #009900;">&#125;</span></pre>
  </div>
</div>

[View / Download Code][2]

The solution, is to delay changing the properties that you want to animate by a short time interval. I have found that for most browsers a delay of as little as one second is enough to allow the CSS transition to take effect. However, for Firefox, the first time an element is added, I had to add a delay of 20ms in order to ensure the element animated correctly. However, subsequent animations could use a 1 ms delay. I am not sure if the delay interval is browser specific, or is related to how fast the users CPU is. 

Setting the delay can be done using setTimeout.

Here is the update example, and code:

<div style="text-align:center;">
</div>

&nbsp;

<div class="wp_syntax">
  <div class="code">
    <pre class="javascript" style="font-family:monospace;"><span style="color: #003366; font-weight: bold;">function</span> onMouseClick<span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span>
<span style="color: #009900;">&#123;</span>
	<span style="color: #000066; font-weight: bold;">if</span><span style="color: #009900;">&#40;</span>box<span style="color: #009900;">&#41;</span>
	<span style="color: #009900;">&#123;</span>
		<span style="color: #006600; font-style: italic;">//remove existing div from dom</span>
		document.<span style="color: #660066;">body</span>.<span style="color: #660066;">removeChild</span><span style="color: #009900;">&#40;</span>box<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	<span style="color: #009900;">&#125;</span>
&nbsp;
	<span style="color: #006600; font-style: italic;">//create the div</span>
	box <span style="color: #339933;">=</span> document.<span style="color: #660066;">createElement</span><span style="color: #009900;">&#40;</span><span style="color: #3366CC;">"div"</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
	box.<span style="color: #660066;">className</span> <span style="color: #339933;">=</span> <span style="color: #3366CC;">"box"</span><span style="color: #339933;">;</span>
&nbsp;
	<span style="color: #006600; font-style: italic;">//add to dom</span>
	document.<span style="color: #660066;">body</span>.<span style="color: #660066;">appendChild</span><span style="color: #009900;">&#40;</span>box<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
	<span style="color: #006600; font-style: italic;">//position in middle / left of screen</span>
	box.<span style="color: #660066;">style</span>.<span style="color: #660066;">left</span> <span style="color: #339933;">=</span> <span style="color: #3366CC;">"10px"</span><span style="color: #339933;">;</span>
	box.<span style="color: #660066;">style</span>.<span style="color: #660066;">top</span> <span style="color: #339933;">=</span> <span style="color: #009900;">&#40;</span>window.<span style="color: #660066;">innerHeight</span> <span style="color: #339933;">/</span> <span style="color: #CC0000;">2</span><span style="color: #009900;">&#41;</span> <span style="color: #339933;">+</span> <span style="color: #3366CC;">"px"</span><span style="color: #339933;">;</span>
&nbsp;
	<span style="color: #006600; font-style: italic;">//delay updating position so it will animate correctly</span>
	setTimeout<span style="color: #009900;">&#40;</span>moveBox<span style="color: #339933;">,</span> <span style="color: #CC0000;">20</span><span style="color: #339933;">,</span> box<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #009900;">&#125;</span>
&nbsp;
<span style="color: #003366; font-weight: bold;">function</span> moveBox<span style="color: #009900;">&#40;</span>box<span style="color: #009900;">&#41;</span>
<span style="color: #009900;">&#123;</span>
	box.<span style="color: #660066;">style</span>.<span style="color: #660066;">left</span> <span style="color: #339933;">=</span> <span style="color: #009900;">&#40;</span>window.<span style="color: #660066;">innerWidth</span> <span style="color: #339933;">-</span> <span style="color: #CC0000;">100</span><span style="color: #009900;">&#41;</span> <span style="color: #339933;">+</span> <span style="color: #3366CC;">"px"</span><span style="color: #339933;">;</span>
<span style="color: #009900;">&#125;</span></pre>
  </div>
</div>

[View / Download Code][2]

The only change, is that we moved the code to update the divs position to its own function. This allows us to then use setTimeout to delay the code from being called for 1 ms. By doing this, the div will be added to the dom, and positioned in the correct initial position, and then animate to its new position.

Here is another example that uses setTimeout to animate newly created DIVs.

<div style="text-align:center;">
</div>

&nbsp;

[View / Download Code][3]

Post in the comments if you have any questions or suggestions.

 [1]: http://www.w3.org/TR/css3-transitions/
 [2]: https://github.com/mikechambers/ExamplesByMesh/tree/master/CSS/CSS3TransitionsTiming
 [3]: https://github.com/mikechambers/ExamplesByMesh/tree/master/CSS/CSS3TransitionsAnimation