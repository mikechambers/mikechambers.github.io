---
title: Parsing XML in JavaScript?
author: mikechambers
date: 2006-01-09 12:11:01 -0800
layout: post
permalink: /2006/01/09/parsing-xml-in-javascript/
categories:
  - General
---


I have been doing some work with JavaScript / Ajax lately, and found myself needing to parse some XML (something I do quite often when building apps). However, I have not had much luck successfully parsing XML with JavaScript cross browser.  
<!--more-->

  
[Firefox 1.5 has support for E4X][1], which makes parsing a breeze, but it is only supported in the latest version of Firefox. The XMLHttpRequest object parses loaded XML into a DOM, but my experience has been that the DOM is different depending on the browser you are running in (I tested on Firefox and Sarafi on Mac).

I know that I must be missing something pretty obvious, but just about every article I have read online about this suggests to NOT use XML, and use something like [JSON][2] where possible (which I can&#8217;t do in this case).

So, if you are doing JavaScript development, what are you using to do cross-browser XML parsing in JavaScript on the client side?

 [1]: http://developer.mozilla.org/en/docs/E4X
 [2]: http://www/json.org