---
title: ServerSide ActionScript
author: mikechambers
layout: post
permalink: /2002/04/29/serverside-actionscript/
categories:
  - General
---


I have gotten a couple of questions about support for Server Side ActionScript in ColdFusion MX.  
  
*   Server Side ActionScript allows you to write server side code in ActionScript / ECMA script (it uses the [Rhino][1] parser).
  
*   You can only call this code from Flash MX via [Flash remoting][2] (you can&#8217;t use it like ASP or CFML).
  
*   There are some built in objects specific to ColdFusion available in the CF object.

  
I have posted an addendum to my:  
[Getting Started with ColdFusion MX and Flash Remoting article][3]  
that uses ServerSide ActionScript instead of a ColdFusion component.  
You can view it [here][4].

 [1]: http://www.mozilla.org/rhino/
 [2]: http://www.macromedia.com/software/flash/flashremoting/
 [3]: http://www.macromedia.com/desdev/mx/coldfusion/articles/startremoting.html
 [4]: http://radio.weblogs.com/0106797/categories/examples/2002/04/29.html