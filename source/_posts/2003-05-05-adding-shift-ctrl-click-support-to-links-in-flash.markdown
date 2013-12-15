---
title: Adding SHIFT / CTRL Click support to links in Flash
author: mikechambers
layout: post
permalink: /2003/05/05/adding-shift-ctrl-click-support-to-links-in-flash/
categories:
  - General
---


One of the requests that I got for the [Google search application][1] that [Josh Dura][2] and I have been working on, is to give the user the option to open links in a new window. This makes sense, since if you leave the page, the Flash application looses its state. Well, I added an option in the settings panel to always open links in a new window, but I decided to also add support for SHIFT or CTRL clicking a link to open it in a new window (since a lot of people do this out of habit now.)

<!--more-->

It was actually pretty simple. First of all, all of the links to outside URLs go end up going through one function. That function takes a URL, and then does a getURL action to open the link. Adding support for SHIFT and CTRL clicking only requires that you check to see if those keys are being pressed when you do the getURL action:

`
<pre>
onURLClick = function(url)
{
	var target = "_self";

	if(Key.isDown(Key.CONTROL) || Key.isDown(Key.SHIFT))
	{
		target = "_blank";
	}
	

	getURL(url, target);
}
</pre>
<p>`

To call this from a textfield link, use asfunction:

`
<pre><a href="asfunction:onURLClick, http://www.macromedia.com/go/blog_mchambers">Click Me!</a></pre>
<p>`

Pretty simple stuff really. You should be able to do some much more advanced stuff by calling javascript functions via getURL, but that would require that you know which browser you are running within.

 [1]: http://www.markme.com/mesh/archives/002389.cfm
 [2]: http://www.joshdura.com