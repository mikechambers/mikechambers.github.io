---
title: Flash and Web 2.0
author: mikechambers
layout: post
permalink: /2005/08/30/flash-and-web-20/
categories:
  - General
---


I have been following the discussions on Web 2.0 over the past couple of months, and have been intrigued with the attempts to come up with an agreed upon definition of what exactly Web 2.0 is. One of the interesting things has been watching individuals / groups jockey to define Web 2.0 in a way that explicitly includes their technologies, and implicitly excludes others.  
<!--more-->

  
Jonathon Boutelle highlights the attempt by some in the Ajax community to [equate Ajax with Web 2.0][1]. Indeed, if you look through the history of the [Wikipedia entry on Web 2.0][2], you can see attempts to define Web 2.0 to include:

> Unobtrusive Ajax Techniques

and to exclude

> Non-standard browser plug-ins and enhancements are generally eschewed.

The neutrality of the entry is disputed, but it gives an example of how groups are trying to steer the direction of the discussion to benefit one technology over another (in this case Ajax over Flash). I saw similar attempts during Web 2.0 conversations at [O&#8217;Reilly&#8217;s Foo camp][3] a couple of weeks ago (although in those cases it seemed to be driven more by a lack of knowledge about Flash, verses an evangelism for Ajax).

For the sake of this post, I am going to define Web 2.0 as &#8220;the web as a platform&#8221;. i.e. Web 1.0 (Today&#8217;s web) primarily consists of closed APIs and services whose use is defined by the creator. Web 2.0 consists of documented APIs and open services (HTML, RSS, REST, Web Services, etc&#8230;), whose use is determined by the users and / or third party developers.

Jason Kottke has an [excellent write up on his thoughts on Web 2.0][4] and what he terms the WebOS, which he defines as an &#8220;Operating System based on the web&#8221;. This describes the types of applications that will be built on top of Web 2.0 and how they will be constructed.

As Kottke notes, one of the primary advantages of such a WebOS is that it is largely platform agnostic:

> Aside from the browser and the Web server, applications will be written for the WebOS and won&#8217;t be specific to Windows, OS X, or Linux.

and

> For application developers, the main advantage is that instead of writing two or more programs for multiple platforms (one for the Web, one for Windows, etc.), they can write one app that will run on any machine with the WebOS using the same code base.

This brings me back to the attempt to define Ajax as an integral part of Web 2.0. Ajax applications often appear to be cross browser / platform to the end user, but developers often have to do a significant amount of work to make those applications work cross-platform / browser. Indeed, the initial release of Google&#8217;s gmail did not include support for Safari on the Mac. Is a technology really cross-platform if you have to do a significant amount of extra work to make it that way? (that is not a rhetorical question).

I do not mean to suggest that Ajax applications cannot be used to develop Web 2.0 applications, but I do believe that there can be significant disadvantages to doing so.

It is this cross browser development complexity, along with the inherent limitations of developing applications based on a model originally designed for document centric display, that can and often does limit the robustness of browser based apps.

Kottke seems to acknowledge this when he notes that WebOS clients may not be as robust as traditional desktop applications, but that they might be good enough:

> There are also disadvantages to WebOS applications, not the least of which is that HTTP+JavaScript+XHTML+CSS+Flash is not as robust in providing functionality and user interaction as true desktop applications written in Cocoa or Visual Basic. But as Paul Graham points out, Web applications may be good enough.

Kottke seems to be resigned to a WebOS with applications that are just &#8220;good enough&#8221;. However, I disagree with his lumping Flash with the other technologies when it comes to how robust they are for these types of apps, as while Flash applications are not always as robust as desktop applications, in many cases they are, and in other areas are quickly closing the gap.

Indeed, Flash is uniquely positioned as a client interface to Web 2.0 / WebOS applications. It is capable of providing a robust and rich application experience, while loading data across domains (essential to Web 2.0?) with true cross platform development and deployment capabilities.

One of the primary issues in the past with Flash application development has been that is was missing a robust and consistent programming model, and has not had a developer centric IDE. This has made it difficult for developers to view Flash as an application development platform (Flash&#8217;s origins as an animation platform hasn&#8217;t helped either). However, the Flex framework (an XML based application framework) along with ActionScript (which, like JavaScript, is an ECMA based language) provides a complete programming model with a full component set (we are [working][5] to ensure that any developer who wants to leverage the Flex Framework will be able to). Furthermore, our work on [Zorn][6] (an IDE built on top of Eclipse), as well as current efforts in the [Open Source community][7] to bring Flash development to Eclipse, are removing the IDE limitations.

Web 2.0 gets really interesting when one can build clients that composite not just multiple data sources, but multiple rich data types, and start to build applications that really leverage the web as a platform in a much richer way with things like streaming media, VOIP, messaging and real-time data.

I think that the biggest secret on the web today is that Flash is a application platform with a virtual machine and a robust programming model and application development framework.

This brings us back to the title of the post. While web 2.0 applications will not be limited to any single technology (including Flash), I think that the Flash Platform is uniquely suited to create next generation applications based on distributed APIs and effective user interfaces, all in a way that does not require end users to settle for a sub-optimal user experience.

 [1]: http://www.jonathanboutelle.com/mt/archives/2005/07/Ajax_web_20.html
 [2]: http://en.wikipedia.org/w/index.php?title=Web_2.0&oldid=19071980
 [3]: http://wiki.oreillynet.com/foocamp05/index.cgi
 [4]: LINK:http://www.kottke.org/05/08/googleos-webos
 [5]: http://weblogs.macromedia.com/mesh/archives/2005/08/will_zorn_requi.cfm
 [6]: http://www.macromedia.com/software/flex/zorn/
 [7]: http://www.osflash.org