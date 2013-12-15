---
title: Open Source ActionScript 3 Libraries Updated
author: mikechambers
layout: post
permalink: /2006/05/09/open-source-actionscript-3-libraries-updated/
categories:
  - General
---


In addition to [new beta builds of Flash Player 9, Flex Builder 2, and Flex 2][1], we have also posted updated versions of the [open source ActionScript 3 libraries][2] to labs.

These libraries include a number of changes:

*   Updated to work with beta 3
*   Some API renaming (mostly in corelibs : com.adobe.utils)
*   Removed some redundant APIs (mostly in com.adobe.utils)
*   Fixed bug where events where not being documented in docs

<!--more-->

  
In regards to removing some APIs. We removed a couple of APIs that had equivalent APIs in the Player of Flex Framework. So, if you can&#8217;t find an API you were using, just check the [Player and Framework docs][3].

The libraries include:

*   Complete Source
*   Complete API docs
*   Compiled SWCs

and are released under [an open source license][4].

We have the following libraries available:

*   corelib
*   FlexUnit
*   Flickr
*   Mappr
*   RSS and Atom libraries
*   Odeo
*   YouTube

which you can download from the labs wiki, as well as browse the source in the [labs subversion source repository][5]. (You can find info on how to check out the source from [here][6].)

You can find more information, as well as view the complete docs, and download all of the libraries from [here][2].

 [1]: http://weblogs.macromedia.com/mesh/archives/2006/05/flash_player_9.html
 [2]: http://labs.adobe.com/wiki/index.php/ActionScript_3:resources:apis:libraries
 [3]: http://livedocs.macromedia.com/labs/1/flex/langref/index.html
 [4]: http://labs.adobe.com/wiki/index.php/Source:license
 [5]: http://labs.adobe.com/svn/flashplatform/?/projects/
 [6]: http://labs.adobe.com/wiki/index.php/Source:get