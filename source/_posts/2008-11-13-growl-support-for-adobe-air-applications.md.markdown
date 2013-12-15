---
title: Growl support for Adobe AIR applications
author: mikechambers
layout: post
permalink: /2008/11/13/growl-support-for-adobe-air-applications/
categories:
  - General
tags:
  - as3
  - as3growl
  - growl
---


One of the top feature requests that end users have been asking for from AIR applications (on Mac) is the ability for those applications to leverage the [open source Growl notification framework][1] on Mac. However, this was not previously possible due to how applications are required to communicate with Growl.

I am really excited to announce that Adobe has been working with the Growl team to add support to Growl for Adobe AIR and Flash applications. Among other things, this will enable Adobe AIR applications to leverage the Growl notification framework on Mac. The best part, is that it is implemented in a way that is not just limited to use by Flash and AIR.  
<!--more-->

  
The new functionality is not yet in the release version of Growl, but if you are a developer you can download a nightly source build of Growl with the support. This will allow you to play around with the functionality and begin to add Growl support to your application.

In addition, I have put together a new open source ActionScript project, named [as3growl][2], which provides an API for working with the new Growl functionality. The [project is hosted at Google code][2] and already contains the complete API source, API docs, examples, documentation, unit tests and other information.

I have posted information on how to grab the correct Growl source and compile it. You can find it in the [Known Issues section of the as3growl Release Notes][3].

If you find any issues, or have any feature requests, you can log them [here][4].

You can find more info about Growl on their [site][1].

Update (November 17, 2008) : I created a mailing list for the project [here][5].

 [1]: http://growl.info/
 [2]: http://code.google.com/p/as3growl/
 [3]: http://code.google.com/p/as3growl/wiki/ReleaseNotes
 [4]: http://code.google.com/p/as3growl/issues/list
 [5]: http://groups.google.com/group/as3growl