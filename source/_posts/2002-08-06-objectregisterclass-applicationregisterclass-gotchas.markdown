---
title: 'Object.registerClass / application.registerClass Gotcha&#8217;s'
author: mikechambers
layout: post
permalink: /2002/08/06/objectregisterclass-applicationregisterclass-gotchas/
categories:
  - General
---


Greg Burch has made a [post][1] on some things to watch out for when using Object.registerClass to set the type of an object to a custom class.  
The same thing applies on the Flash Communication Server when using application.registerClass. The constructor for your class must be in this form:
<PRE>function MyClass(){};</PRE>

  
Doing this on the client and server allows you to send custom classes between the client and server and have them automatically serialized and deserialized. This is a very cool feature.

 [1]: http://radio.weblogs.com/0107886/2002/08/06.html#a37