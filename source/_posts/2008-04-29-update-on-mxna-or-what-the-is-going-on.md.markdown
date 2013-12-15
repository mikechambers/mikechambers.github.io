---
title: 'Update on MXNA (or what the %@#! is going on!)'
author: mikechambers
layout: post
permalink: /2008/04/29/update-on-mxna-or-what-the-is-going-on/
categories:
  - General
---


Well, as you probably know, [MXNA][1] (a feed aggregator for Adobe related communities and technologies) has had some stability issues for some time, and has recently been down for the past couple of days.

Update : MXNA is back up at its new url : <http://feeds.adobe.com>

I wanted to make a quick post giving an update on what is going on, and what we are doing to fix it.  
<!--more-->

  
First, what is going on?

Sometime last week, our Java JRE on weblogs.macromedia.com became corrupted, which prevented ColdFusion (7) from running. Updating the JRE did not fix this issue. This has resulted in MXNA being offline, as well as any weblogs running on the server that rely on ColdFusion (which is just about all of them).

At the same time, we have been in the process of updating and upgrading MXNA. This includes (but is not limited to) moving MXNA to new server cluster, updating the server to ColdFusion 8, and moving the aggregation engine to its own server. This should dramatically improve stability as well as improve performance. This process is going well, but still requires some work. We have been focusing our efforts on this in order to get MXNA live on the new infrastructure as soon as possible.

In the meantime, we are now looking at making some temporary updates to the weblogs server to try and get it back up until we have the new infrastructure set up. You might see it go up and down while we work on this, but we don&#8217;t have a definitive ETA on it other than soon.

Some quick background on MXNA. MXNA was a project that Christian Cantrell and I put together (Christian did almost all of the development) to provide a resource for following conversations around Macromedia (now Adobe) resources. It was [launched almost exactly 5 years ago][2] and originally focused on Flash and ColdFusion and aggregated around 50 weblogs. It was originally hosted on our own server (markme.com), and has since moved to a dedicated Adobe server (weblogs.macromedia) which was not part of the main Adobe cluster. Since then it has expanded way beyond its original scope, and now aggregates over 1800 weblogs across multiple communities and categories. The aggregation process itself takes nearly an hour.

Clearly MXNA has outgrown its original architecture and server. We are working on rectifying both of those issues.

I have uploaded opml files for all of the blogs in MXNA, in case you want to aggregate them yourselves until MXNA is back online. You can grab them from [here][3].

I will update this weblog post whenever there is new information.

If you have any questions, comments, words of encouragement, or you just want to rant, post them below.

 [1]: http://weblogs.macromedia.com
 [2]: http://www.mikechambers.com/blog/2003/05/28/macromedia-xml-rss-news-aggregator-mxna/
 [3]: /blog/files/mxna/opml/