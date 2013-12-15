---
title: More info on ActionScript Optimizations in Beta Player
author: mikechambers
layout: post
permalink: /2002/10/21/more-info-on-actionscript-optimizations-in-beta-player/
categories:
  - General
---


There have a been a couple of questions about what parts of ActionScript have been optimized in the new player. I talked to the Flash Player team and they passed the following info to me:  
*Movies which make lots of function calls (something recursive, such as a QuickSort algorithm on an array of 10,000 items) will be faster (provided they don&#8217;t access the arguments array).*  
If anyone gets some benchmarks together, make sure to post a&nbsp; link to them in the comments.