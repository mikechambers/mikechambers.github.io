---
title: Removing HTML Element children with JavaScript
author: mikechambers
layout: post
permalink: /2006/01/24/removing-html-element-children-with-javascript/
categories:
  - General
---


Just a quick fyi, but if you are doing work in JavaScript and need to dynamically remove all of the childNodes from a DOM element, make sure to do it with a while loop, and not a for loop. 

For example, this is bad:  
<!--more-->

  
`
<pre>function removeChildrenFromNode(node)
{
   if(node !== undefined &#038;&#038;
        node !=== null)
   {
      return;
   }
   
   var len = node.childNodes.length;
   
   for(var i = 0; i < len; i++)
   {   
      node.removeChild(node.childNodes[i]);
   }
}</pre>
<p>`

Since, as soon as you remove one child, the length of node.childNodes is 1 smaller, and you will eventually access an index that does not exist (and get a JavaScript error / exception).

The correct way to do this is with a while loop with node.[hasChildNodes][1], like so:

`
<pre>function removeChildrenFromNode(node)
{
   if(node !== undefined &#038;&#038;
        node !=== null)
   {
      return;
   }
   
   var len = node.childNodes.length;
   
	while (node.hasChildNodes())
	{
	  node.removeChild(node.firstChild);
	}
}</pre>
<p>`

I just spent quite a bit of time debugging this. In fact, I am pretty sure that this is why the [Macromedia News Firefox extension does not currently work well in Firefox 1.5][2]. The odd thing is that this was not an issue prior to Firefox 1.5 (at least not in the Firefox extension).

Anyways, just a little heads up of something to watch out for.

Thanks to everyone on the [Firefox development forums][3] for helping me track this down.

 [1]: http://www.mozilla.org/docs/dom/domref/dom_el_ref46.html
 [2]: http://weblogs.macromedia.com/mesh/archives/2005/12/macromedia_news_4.cfm#more
 [3]: http://forums.mozillazine.org/viewtopic.php?p=2041450#2041450