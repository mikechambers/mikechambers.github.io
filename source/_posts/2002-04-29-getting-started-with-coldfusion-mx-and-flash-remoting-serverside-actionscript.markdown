---
title: 'Getting Started with ColdFusion MX and Flash Remoting : ServerSide ActionScript'
author: mikechambers
date: 2002-04-29 12:55:01 -0800
layout: post
permalink: /2002/04/29/getting-started-with-coldfusion-mx-and-flash-remoting-serverside-actionscript/
categories:
  - General
---


This is an addendum to the following article:  
[Getting Started with ColdFusion MX and Flash Remoting article][1]  
that uses ServerSide ActionScript instead of a ColdFusion component.  
1. open the above article in your web browser.  
2. download and install the [ColdFusion MX preview release][2].  
3. Download and install the [Flash Remoting Addons for Flash MX][3].  
4. create HelloWorld.asr (the tutorial will tell you where) and add the following code:
<PRE>function sayHello()<BR />{<BR />&nbsp;return &#8220;Hello World&#8221;;<BR />}</PRE>

  
open the example file in Flash MX and test your movie.  
Of course, this is a really simple example. Play around with passing more complex data such as Arrays and RecordSets. Ill post more information later on how to make database calls, and load remote and local files into ServerSide ActionScript.

 [1]: http://www.macromedia.com/desdev/mx/coldfusion/articles/startremoting.html
 [2]: http://www.macromedia.com/software/trial_download/
 [3]: http://www.macromedia.com/software/flash/flashremoting/