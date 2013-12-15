---
title: Mozilla Prism and the disingenuous web
author: mikechambers
layout: post
permalink: /2007/10/25/mozilla-prism-and-the-disingenuous-web/
categories:
  - General
---


I just noticed this article posted about [Mozilla Prism][1] over at Mozilla Labs. Prism is essentially the idea of a desktop runtime built on top of Firefox that allows web apps to run on the desktop (Im not sure how it related to XUL Runner).

Anyways, it is cool to see some acknowledgment from Mozilla that some apps may provide better experiences if they run outside of the browser, and closer to the desktop.

However, the tone of the article and some of the comments threw me off:  
<!--more-->

> Unlike Adobe AIR and Microsoft Silverlight, weâ€™re not building a proprietary platform to replace the web.

First, Silverlight and [Adobe AIR][2] really are not related at all, and don&#8217;t target the same things. As I have said a million times before, if anything, the comparison is between the Flash Player and Silverlight. However, that is not what jumped out at me.

> Prism isnâ€™t a new platform, itâ€™s simply the web platform integrated into the desktop experience. Web developers donâ€™t have to target it separately, because any application that can run in a modern standards-compliant web browser can run in Prism. Prism is built on Firefox, so it supports rich internet technologies like HTML, JavaScript, CSS, and <canvas> and runs on Windows, Mac OS X, and Linux.  
> And while Prism focuses on how web apps can integrate into the desktop experience, weâ€™re also working to increase the capabilities of those apps by adding functionality to the Web itself, such as providing support for offline data storage and access to 3D graphics hardware.

Do you see where I am going with this? You could describe Adobe AIR in exactly the same way (just replace Prism with Adobe AIR and Firefox with Webkit). 

So, I guess the thing I found odd was Mozilla appears to be building something very similar to Adobe AIR (which is fine and cool), but somehow it is inherently good when Mozilla does it, and inherently evil when Adobe does it.

Adobe AIR is built on top of web standards and can run existing web applications and content. It runs on Windows and Mac (and soon Linux), and it also provides additional desktop functionality. So, is the main difference between something like Prism and Adobe AIR, that Adobe AIR is being primarily developed by a company (Adobe), and that Prism is being developed by Mozilla?

Come on Mozilla, the web development community deserves better than that. Adobe has been an active supporter of the web development community, of open source, of web standards and of Mozilla (donating the ActionScript virtual machine from the Flash Player ([Tamarin][3])). Adobe AIR leverages a number of open source technologies (including Tamarin, SQLite and WebKit) and we actively participate in both of those development communities, and we have been open with our development process for some time.

Adobe AIR is not meant to &#8220;replace the web&#8221;, and I don&#8217;t believe there is any indication from Adobe that it is. However, as the Mozilla Prism article and project acknowledges, there are some apps that may provide a better experience if they are running out of the browser, and closer to the desktop.

 [1]: http://labs.mozilla.com/2007/10/prism/
 [2]: http://www.adobe.com/go/air
 [3]: http://www.mozilla.org/projects/tamarin/