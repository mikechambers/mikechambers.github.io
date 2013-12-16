---
title: ActionScript 3 Libs and Beta 2
author: mikechambers
date: 2006-03-23 12:06:01 -0800
layout: post
permalink: /2006/03/23/actionscript-3-libs-and-beta-2/
categories:
  - General
---


Just a quick note, but we have not yet released beta 2 compatible ZIPs of the [ActionScript 3 libraries][1] that we released with beta 1. We need to track down a couple of issues before we can rebuild the zips.  
<!--more-->

  
This means that you cannot use the library SWCs in the beta 2 builds of MXMLC or Flex Builder. However, the actual [source][1] for the libraries have been updated to beta 2 (Flickr still has one or two issues), and thus you can [grab the source][2], and link against that (just add to your classpath).

The libraries include:

*   RSS / ATOM
*   General Utilities / security hashes / JSON
*   Mappr
*   Flickr
*   Odeo
*   YouTube
*   FlexUnit

I will post here once the new zips are online (I am also putting a note up on the libraries page).

You can find more information on the libraries [here][1].

You can get the library source from [here][2].

 [1]: http://labs.macromedia.com/wiki/index.php/ActionScript_3:resources:apis:libraries
 [2]: http://labs.macromedia.com/wiki/index.php/Source:get