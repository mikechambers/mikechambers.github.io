---
title: markme.com update
author: mikechambers
date: 2005-04-26 12:49:01 -0800
layout: post
permalink: /2005/04/26/markmecom-update/
categories:
  - General
---


Well, as [many][1] of you [noticed][2] yesterday, the markme.com domain expired (doh!). Apparently Network Solutions had been sending me renewal notices for the past couple of weeks, but they were being sent to an old email address. Anyways, the domain has been renewed and should be working for everyone again. I am sorry for any hassle that it caused.  
<!--more-->

  
Since I am posting about markme.com, I figured I would give you an update on our plans for the domain and server. As you have probably noticed, the [new MXNA 2 beta][3] is running on a new machine and domain : [weblogs.macromedia.com][4]. The new domain and machine are managed and hosted by Macromedia, so we won&#8217;t have to worry about domains expiring in the future! We are in the process of transitioning all of the the content on markme.com over to weblogs.macromedia.com. 

For you information, here are the steps that we will be taking for the transition (not necessarily in order):

1. Begin redirecting traffic from the [old MXNA][5] to the [new MXNA][3] (in progress).  
2. Setup a new and updated weblog system on weblogs.macromedia.com  
3. Begin to migrate markme.com weblogs over to weblogs.macromedia.com  
4. Redirect old markme.com links to weblogs.macromedia.com  
5. Eventually point markme.com and weblogs.macromedia.com to the same machine.

Now, a lot of people use resources from markme.com (rss feeds, web services, etc...). In almost all cases, these should continue to work. We have set up go urls that will automatically update, but in cases where the actual URL is being referenced, we will try to make sure to have them automatically redirected to the new url. If we miss something, please let us know by emailing <mxna@macromedia.com>.

The one item that might be tricky is if you are using the old MXNA web service API. This API is now deprecated, and so you should look at upgrading your apps to the [new webservice API][6]. (The old API can still be found on the new MXNA [here][7]). But note, that API is still in beta, and we are tweaking and adding a ton of stuff. It should settle down sometime next week. If there is some API you would like to see added to the new web service API, [let us know][8] as soon as possible, and we will see about getting it in.

Also note that we have updated the go url for the data for the [Macromedia News Firefox Extension][9] to point to the [new version of MXNA][3]. You do not need to upgrade or change anything. However, it is possible that you might see a duplicate post for a little while. Once you restart your browser, everything will work fine.

 [1]: http://blog.andre-michelle.com/2005/macromedia-news-aggregator-gone/
 [2]: http://clearsoftware.net/client/index.cfm?mode=entry&entry=794E841B-E081-2BAC-69390947B5EC6987
 [3]: http://weblogs.macromedia.com/mxna/
 [4]: http://weblogs.macromedia.com/
 [5]: http://www.markme.com/mxna/
 [6]: http://weblogs.macromedia.com/mxna/Developers.cfm
 [7]: http://weblogs.macromedia.com/mxna/webservices/mxna.cfc?wsdl
 [8]: mailto:mxna@macromedia.com
 [9]: http://weblogs.macromedia.com/mxna/Downloads.cfm