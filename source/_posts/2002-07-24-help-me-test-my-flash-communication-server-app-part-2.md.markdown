---
title: Help me test my Flash Communication Server App Part 2
author: mikechambers
layout: post
permalink: /2002/07/24/help-me-test-my-flash-communication-server-app-part-2/
categories:
  - General
---


Here is the link to the application test that I am running today:  
Thanks to everyone who helped with the test. We ended up with a max of 44 users. I apoligize to everyone who could not join. The Flash Com server i was serving from has a 2 mb / s limit, and we ran into that. We will be doing some more tests in the future, with a higher bandwidth limit on the server.  
Basically, I was streaming&nbsp;a live video feed from my house (over a 256 kbs up cable modem). Everyone connected could see the video.  
  
*   up to 25 users : video quality acceptable (3 &#8211; 5 fps). Audio good.  
    *   25 &#8211; 35 users&nbsp;: audio and video began to degrade.  
        *   35 -44 users : audio and video breaking up / poor.</UL>
          
        The problem was that the Flash Communication Server I was hosting this on had a 2 mb / sec up limit, which we were hitting. This is why users had trouble logging in, and why the video got worse.  
        I think that i am going to write an article for this on the [Macromedia Designer and Developer center][1], to help users measure how much bandwidth their project will require.</p>

 [1]: http://www.macromedia.com/desdev/