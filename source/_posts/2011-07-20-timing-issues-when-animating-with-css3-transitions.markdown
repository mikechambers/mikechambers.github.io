---
title: Timing issues when animating with CSS3 Transitions
author: mikechambers
date: 2011-07-20 12:10:01 -0800
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

``` css
.box
{
	/*...*/
	-webkit-transition: all 0.7s ease;
	-moz-transition: all 0.7s ease;
	-o-transition: all 0.7s ease;
	transition: all 0.7s ease;
}
```

<iframe src="http://mikechambers.com/html5/css/CSS3TransitionsTiming/index.html" width="520" height="300"></iframe>

Notice how when you click the example the cirlce just appears on the right, instead of appearing on the left, and then animating to the right as it should.

Here is the relevant code that creates the div and updates it position:

``` javascript
function onMouseClick()
{
	if(box)
	{
		//remove existing box from dom
		document.body.removeChild(box);
	}
	
	//create the div
	box = document.createElement("div");
	box.className = "box";
	
	//add to dom
	document.body.appendChild(box);
	
	//position in middle / left of screen
	box.style.left = "10px";
	box.style.top = (window.innerHeight / 2) + "px";

	//set position we want div to animate to (using the CSS Transition)
	//NOTE : This will not animate, but will instead just be moved / drawn
	//in the final position
	//need to delay this call by 20 ms
	box.style.left = (window.innerWidth - 100) + "px";
}
```

[View / Download Code][2]

The solution, is to delay changing the properties that you want to animate by a short time interval. I have found that for most browsers a delay of as little as one second is enough to allow the CSS transition to take effect. However, for Firefox, the first time an element is added, I had to add a delay of 20ms in order to ensure the element animated correctly. However, subsequent animations could use a 1 ms delay. I am not sure if the delay interval is browser specific, or is related to how fast the users CPU is. 

Setting the delay can be done using setTimeout.

Here is the update example, and code:

<iframe src="http://mikechambers.com/html5/css/CSS3TransitionsTiming/index_b.html" width="520" height="300"></iframe>

``` javascript
function onMouseClick()
{
	if(box)
	{
		//remove existing div from dom
		document.body.removeChild(box);
	}
	
	//create the div
	box = document.createElement("div");
	box.className = "box";
	
	//add to dom
	document.body.appendChild(box);
	
	//position in middle / left of screen
	box.style.left = "10px";
	box.style.top = (window.innerHeight / 2) + "px";

	//delay updating position so it will animate correctly
	setTimeout(moveBox, 20, box);
}

function moveBox(box)
{
	box.style.left = (window.innerWidth - 100) + "px";
}
```

[View / Download Code][2]

The only change, is that we moved the code to update the divs position to its own function. This allows us to then use setTimeout to delay the code from being called for 1 ms. By doing this, the div will be added to the dom, and positioned in the correct initial position, and then animate to its new position.

Here is another example that uses setTimeout to animate newly created DIVs.

<iframe src="http://mikechambers.com/html5/css/CSS3TransitionsAnimation/" width="520" height="400"></iframe>

[View / Download Code][3]

Post in the comments if you have any questions or suggestions.

 [1]: http://www.w3.org/TR/css3-transitions/
 [2]: https://github.com/mikechambers/ExamplesByMesh/tree/master/CSS/CSS3TransitionsTiming
 [3]: https://github.com/mikechambers/ExamplesByMesh/tree/master/CSS/CSS3TransitionsAnimation