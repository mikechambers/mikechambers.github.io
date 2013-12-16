---
title: As3CoreLib .92 Posted
author: mikechambers
date: 2008-11-07 12:39:01 -0800
layout: post
permalink: /2008/11/07/as3corelib-92-posted/
categories:
  - General
---


I have just posted a [new build and zip file of the ActionScript 3 CoreLib Library (as3corelib)][1]. This in an open source library that contains a number of classes and utilities for working with ActionScript 3.

This is release .92 and includes a number of bug and performance fixes, as well as some new functionality.  
<!--more-->

  
One thing to note is that we have added support for some AIR specific classes. Anything in the [com.adobe.air][2] package will only run within Adobe AIR. I am looking to do the same for Flex classes, which would make it much easier to determine which classes work where. The majority of the classes do not require Flex or AIR.

You can download the new build, which includes the SWC, source and api docs from the [project page][1].

If you find any issues, please make sure to log them on the [issues page][3]. If you would like to contribute to the project, we are always looking for people to help out.

 [1]: http://code.google.com/p/as3corelib/
 [2]: http://code.google.com/p/as3corelib/source/browse/trunk/src/com/adobe/air/
 [3]: http://code.google.com/p/as3corelib/issues/list