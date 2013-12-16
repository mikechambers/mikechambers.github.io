---
title: Flash Communication Server and Bandwidth
author: mikechambers
layout: post
permalink: /2002/07/29/flash-communication-server-and-bandwidth/
categories:
  - General
---


Lots of discussion this weekend on the costs associated with the bandwidth required with some uses of the [Flash Communication Server][1].  
  
*   [Flash Comm Server and Bandwidth Costs...][2]  
    *   [John Dowdell&#8217;s comments][3]  
        *   [Would you like bandwidth with that Flash Communication Server?][4]  
            *   [Round 2: Flash Communication Server v. The Socket Servers][5]  
                *   [Flashcom and the Dedicated Bandwidth Option][6]  
                    *   [Total Cost of Flash Comm Server][7]  
                        *   [Flashcomm Bandwidth Explained][8]</UL>
                          
                        Unfortunately, broad conclusions are being drawn on Bandwidth requirements based on very specific scenarios (i.e. streaming video 24 hours a day).  
                        Some uses of the Flash Communication Server can be very bandwidth intensive. In particular, streaming audio and video takes a lot of bandwidth. This should not come as a surprise to anyone, and is not something unique to the Flash Communication Server. So, if you have to get your access from a hosting provider, and are using the Flash Communication Server for non-revenue generating projectors, then you need to be very careful about the amount of audio and video you stream.&nbsp; Btw, [Aral points out][6] that for Flash Communication Server projects that require a lot of bandwidth, dedicated bandwidth can be a much, much cheaper&nbsp;option than hosting.  
                        However, while streaming audio and video is the feature of the server that everyone is talking about, it is not necessarily the main feature. In fact, from a developer&#8217;s standpoint, I think the ability to easily (almost effortlessly) connect multiple Flash clients is the coolest feature of the Flash Communication Server. The problem is that this is something that the end product (connected flash movies) is something that can be done with XML today (and thus is not as sexy). However, it is much, much easier using the Flash Communication Server (no need to parse XML, send and receive ActionScript data types, etc...), as well as much more efficient. In fact, for large multiuser projects, you will probably save on bandwidth costs using the Flash Communication Server verses using XML (mostly because XML is so verbose).  
                        So, I think that the point that all of the articles are trying to raise, is that before embarking on a project, you need to consider all of your costs; development, resources, server and bandwidth. If you plan to stream large amounts of audio and video, then you need to pay particular attention to your bandwidth costs / estimates.  
                        Thoughts? Comments? Post them in the comments section.</p>

 [1]: http://www.macromedia.com/software/flashcom/
 [2]: http://www.debreuil.com/phpBB/viewtopic.php?t=148&start=0&postdays=0&postorder=asc&highlight=&sid=33aee1448770869b21ccb83b7c5799f4
 [3]: http://jdmx.blogspot.com/2002_07_21_jdmx_archive.html#79451598
 [4]: http://www.aralbalkan.com/blog/2002_07_01_clickwhere#79452426
 [5]: http://www.aralbalkan.com/blog/2002_07_01_clickwhere#79544272
 [6]: http://www.aralbalkan.com/blog/2002_07_01_clickwhere#79557197
 [7]: http://swfnews.com/articles/02/07/28/0236226.shtml
 [8]: http://www.flashguru.co.uk/000097.php#comments