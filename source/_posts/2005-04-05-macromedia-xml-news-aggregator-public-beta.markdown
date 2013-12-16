---
title: Macromedia XML News Aggregator Public Beta
author: mikechambers
date: 2005-04-05 12:53:01 -0800
layout: post
permalink: /2005/04/05/macromedia-xml-news-aggregator-public-beta/
categories:
  - Weblog
---


As Christian Cantrell [posted][1] earlier, we have just released a public beta of the next version of the [Macromedia XML News Aggregator][2] (MXNA 2). 

This version was re-written from the group up with performance and extensibility in mind. While there are already a ton of cool new features, the thing I am most excited about is that we now have a solid platform that we can quickly build on top of and add new features.  
<!--more-->

  
First thing to note is the new URL:

<http://weblogs.macromedia.com/mxna/>

If you have links pointing to MXNA on markme.com, you should update them to use the new URL.

We updated the [web service API][3]. It now has a cleaner interface, and provides a lot more information. You can find more information on it a [here][3]. The old web service API still works, but has been deprecated. If you have an application that relies on it, you should consider updating it to use the new API. 

We also have added the ability to [generate custom RSS feeds][4] that you can aggregate or use to build your own applications. This is actually pretty powerful and essentially creates an alternative to the web service API. You can find more information on generating RSS feeds from MXNA [here][4].

If you would like to have your weblog and / or feed added to MXNA, you can submit it [here][5]. Note, that MXNA now supports all languages. If your language is not listed, just send us an email at [mxna@macromedia.com][6]

Finally, if you have a weblog and have a ping url for MXNA, you should change the domain in the url from www.markme.com to weblogs.macromedia.com. We will eventually automatically redirect URLs, but we are not doing that yet.

We have created a temporary [smart category for MXNA][7], which you can use to see what everyone is saying about the new version of MXNA. You can view it [here][7].

I will post some more information on some of the new features later today. In the meantime, you can check out the new version of MXNA [here][2].

 [1]: http://www.markme.com/cantrell/archives/007405.cfm
 [2]: http://weblogs.macromedia.com/mxna/
 [3]: http://weblogs.macromedia.com/mxna/Developers.cfm
 [4]: http://weblogs.macromedia.com/mxna/RSSMachine.cfm
 [5]: http://weblogs.macromedia.com/mxna/SubmitFeed.cfm?init=true
 [6]: mailto:mxna@macromedia.com?subject=Add%20My%20Language
 [7]: http://weblogs.macromedia.com/mxna/index.cfm?query=bySmartCategory&smartCategoryId=10&smartCategoryName=MXNA&smartCategoryKey=131E8DDD-E7CA-89DB-830C2D24B3E36663