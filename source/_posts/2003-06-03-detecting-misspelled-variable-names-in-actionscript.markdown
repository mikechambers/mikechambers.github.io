---
title: Detecting misspelled variable names in ActionScript
author: mikechambers
date: 2003-06-03 12:42:01 -0800
layout: post
permalink: /2003/06/03/detecting-misspelled-variable-names-in-actionscript/
categories:
  - General
---


One of the big hassles of developing with ActionScript is that when trying to access properties and functions that do not exist, the Flash IDE does not throw an error. This can make it very difficult to debug code that is not working due to something as simple as a misspelled variable name.

Below is some simple code that shows how to trace errors when your code tries to access properties / functions that do not exist.

<!--more-->

  
`
<pre>function Foo()
{
}

Foo.prototype.__resolve = function(name)
{
	trace("[" + name + "] property / function does not exist");
}

var f = new Foo();

f.barProp;
f.barFunc();</pre>
<p>`

In order to use this, just add the __resolve function to the class / object / timeline that you want to watch.

It would also be very simple to write some code that loops through your code and attaches the function to all of the objects in your movie. Then when you are done developing, you just remove that code. Of course, you would have to watch out for objects that already use __resolve:

`
<pre>if((obj["__resolve"] == undefined))
{
	//ok to add function
}</pre>
<p>`

Post any improvements or suggestions in the comments.