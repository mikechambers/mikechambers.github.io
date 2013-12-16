---
title: Setting up a namespace on the Client object on the Flash Communication Server
author: mikechambers
date: 2002-08-02 12:42:01 -0800
layout: post
permalink: /2002/08/02/setting-up-a-namespace-on-the-client-object-on-the-flash-communication-server/
categories:
  - General
---


I&nbsp;have been writing some Flash Communication Server code (on the server side), and had a need to connect methods and properties to the Client object. Normally, I would use \_resolve so i would not have to attach methods directly to the Client object, but doing that would mean that my code could not work with the Flash Communication Server components, which also define \_resolve.  
The solution, was to create a namespace on the Client object and store my data there.
<PRE>Client.prototype.MyNameSpace = new Object();</PRE>

<PRE>Client.prototype.MyNameSpace.foo = function()<BR />{<BR />&nbsp;trace(&#8220;foo&#8221;);<BR />}</PRE>

  
When calling the method from Flash, just remember to insert the namespace:
<PRE>nc.call(&#8220;MyNameSpace.foo&#8221;, null);</PRE>

  
While this is not the best solution (_resolve is), is does help ensure that you will not have namespace collisions with other server side code that may attach properties or functions to the Client object.