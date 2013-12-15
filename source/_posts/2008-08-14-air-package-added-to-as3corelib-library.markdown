---
title: AIR package added to as3corelib library
author: mikechambers
layout: post
permalink: /2008/08/14/air-package-added-to-as3corelib-library/
categories:
  - General
---


We have been discussing the need for an AIR specific version of the [as3corelib library][1], which would contain useful APIs for working with Adobe AIR. However, instead of creating a new library, I have added [an AIR package to as3corelib][2] which will contain AIR specific APIs.

Right now, there is only one class added, a [FileTarget][3] for the Flex Log framework, but I expect we will be adding more over time. 

If you have any suggestions, post them in the comments.

 [1]: http://code.google.com/p/as3corelib/
 [2]: http://code.google.com/p/as3corelib/source/browse/#svn/trunk/src/com/adobe/air
 [3]: http://code.google.com/p/as3corelib/source/browse/trunk/src/com/adobe/air/logging/FileTarget.as