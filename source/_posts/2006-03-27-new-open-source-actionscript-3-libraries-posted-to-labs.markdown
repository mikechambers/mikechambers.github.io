---
title: New Open Source ActionScript 3 Libraries Posted to Labs
author: mikechambers
layout: post
permalink: /2006/03/27/new-open-source-actionscript-3-libraries-posted-to-labs/
categories:
  - General
---


I just updated new builds of the [open source ActionScript 3 API libraries][1] that we released. The new builds have been updated to work with the [beta 2 release of Flex (Flex Builder 2.0 and MXMLC)][2]. Each zip includes the following:

*   library swc
*   API documentation
*   complete source
*   complete FlexUnit test suites

The libraries available include:  
<!--more-->

*   corelib &#8211; General utility libraries as well as security hash (MD5, SHA1) and serialization (JSON) classes.
*   FlexUnit &#8211; Flex and ActionScript 3 unit testing framework
*   Flickr &#8211; Library for [flickr][3] web api.
*   Mappr &#8211; Library for [Mappr][4] web api
*   RSS and Atom libraries &#8211; RSS (all versions) and Atom APIs. Also includes generic parsers for RSS and Atom.
*   Odeo &#8211; API for searching for podcasts on [Odeo][5].
*   YouTube &#8211; API for searching for videos on [YouTube][6].

All of the libraries have also been released under the following [open source license][7].

I don&#8217;t think there are many new API or API changes. We did add an SHA1 class to corelibs (created by [Darron Schall][8]), and we fixed a bug with the docs so that they now correct show events.

If you have any issues with the zips or files, or suggestions for new libraries and APIs just post in the comments. Ill post more on individual libraries in separate posts.

You can find more information, as well as grab all of the libraries from [here][1].

 [1]: http://labs.macromedia.com/wiki/index.php/ActionScript_3:resources:apis:libraries
 [2]: http://labs.macromedia.com/flexproductline/
 [3]: http://www.flickr.com/services/api/
 [4]: http://mappr.com/about/api.phtml
 [5]: http://www.odeo.com
 [6]: http://www.youtube.com/dev
 [7]: http://weblogs.macromedia.com/as_libraries/license.txt
 [8]: http://www.darronschall.com/