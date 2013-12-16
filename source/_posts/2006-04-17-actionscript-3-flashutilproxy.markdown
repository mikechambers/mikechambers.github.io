---
title: 'ActionScript 3 : flash.util.Proxy'
author: mikechambers
layout: post
permalink: /2006/04/17/actionscript-3-flashutilproxy/
categories:
  - General
---


Ted Patrick has a good [write-up][1] of the new ActionScript 3 flash.util.Proxy class. What is the Proxy class? From the [API docs][2]:

> The Proxy class lets you override the default behavior of ActionScript operations (such as retrieving and modifying properties) on an object.
> 
> ...
> 
> The Proxy class is a replacement for the Object.__resolve and Object.addProperty features of ActionScript 2.0, which are no longer available in ActionScript 3.0. The Object.addProperty() feature allowed you to dynamically create get and set methods in ActionScript 2.0. Although ActionScript 3.0 provides get and set methods at compile time, you cannot dynamically assign one to an object unless you use the Proxy class.

Basically, as one of the comments to Ted&#8217;s post put it, *&#8220;this class is like Object.__resolve on steroids&#8221;*.

You can read the entire post [here][1].

 [1]: http://www.powersdk.com/ted/2006/04/magic-with-flashutilproxy.php
 [2]: http://livedocs.macromedia.com/labs/1/flex/langref/flash/util/Proxy.html