---
title: 'ANN : New Flash Player : 6.0.47.0'
author: mikechambers
layout: post
permalink: /2002/08/08/ann-new-flash-player-60470/
categories:
  - General
---


We have released a new Flash Player, version 6.0.47.0. This fixes a few issues mentioned in the:  
  
*   [Flash 6 Player Release Notes][1]

  
but more importantly, addresses a number of security issues described in the following security bulletins.  
  
*   [MPSB02-09 &#8211; Macromedia Flash Malformed Header Vulnerability Issue][2]  
    *   [MPSB02-10 &#8211; Macromedia Flash URL Modification Issue][3]</UL>
      
    This Flash Player will no longer follow redirects. This will break some existing Flash content that loads data from a third domain through a server side redirect. However, there is a simple server side solution, which is describe in this technote:  
      
    *   [Loading Data Across Domains][4]
      
    You can download the new player [here][5].  
    Note, I will be hanging out in the [chat][6] today to answer any questions.  
    Update, we will be releasing updated standalone, authoring and debug players in the next couple of days.</p>

 [1]: http://www.macromedia.com/support/flash/releasenotes/player/rn_6.html
 [2]: http://www.macromedia.com/v1/handlers/index.cfm?ID=23293
 [3]: http://www.macromedia.com/v1/handlers/index.cfm?ID=23294
 [4]: http://www.macromedia.com/support/flash/ts/documents/load_xdomain.htm
 [5]: http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash
 [6]: /mesh/chat/index.html