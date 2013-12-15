---
title: Flash / JavaScript Integration Kit Update / Bug Fix
author: mikechambers
layout: post
permalink: /2005/06/16/flash-javascript-integration-kit-update-bug-fix/
categories:
  - General
---


Last night on the [Flash / JavaScript Integration Kit][1] mailing list, a couple of people were [reporting][2] that data sent from JavaScript to Flash was not being serialized correctly (coming through as undefined).  
<!--more-->

  
After some sleuthing, I discovered that the JavaScriptFlashGateway.swf had been compiled incorrectly (apparently it could not find the JavaScriptSerialization class, but did not give a compile error). I then checked the release zip and realized this the JavaScriptFlashGateway.swf in it was also not compiled correctly.

So, I have updated the release with a fixed JavaScriptFlashGateway.swf. You can either recompile the SWF yourself from the source, or [download][1] the new one in the zip.

Sorry for the mixup and any hassle.

Btw, we are not versioning releases yet, but we will start doing so soon.

 [1]: http://weblogs.macromedia.com/flashjavascript/
 [2]: http://osflash.org/pipermail/flashjs_osflash.org/2005-June/000027.html