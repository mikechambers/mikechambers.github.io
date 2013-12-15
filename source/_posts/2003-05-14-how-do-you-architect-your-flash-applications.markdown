---
title: How do you Architect your Flash Applications?
author: mikechambers
layout: post
permalink: /2003/05/14/how-do-you-architect-your-flash-applications/
categories:
  - General
---


I have once again been doing a lot of application development with Flash, and have begun to create some more advanced apps / functionality. Previously, I would follow a few simple rules to organize my applications:  
<!--more-->

*   Use only one frame of main timeline.
*   All code on main timeline
*   Classes and function libraries moved to external ActionScript files
*   UI Event handlers included in FLA

This actually worked well for applications which only had one state (such as the [Stock Services app][1]), but did not work well for more complex applications which had multiple states / screens.

When I started working on the [GoogleSearch application][2] I knew that it would have multiple screens (one for search, one for settings, and one for about information). I looked at the [RSSify application][3] (created by [Greg Burch][4]) included on [DRK 3][5] which has a similar structure (although much more complex functionality).

I ended up doing the following:

*   Create a base class contained within a symbol. All events and data flow through this class.
*   Create Screen Classes and symbols for each screen. They communicate by broadcasting events.
*   Virtually everything is contained within a class, and thus all ActionScript is externalized in external ActionScript files.
*   There is no code on the main timeline.
*   There is code in multiple symbols

This has actually worked out very well. I was worried that I would have trouble finding where the code was located, but I found that structuring my library made it even easier to work on and find the code:

<img alt="google_library.gif" src="/mesh/images/google_library.gif" width="267" height="449" border="0" />

My library basically became an ActionScript class browser.

All of my ActionScript classes are in external files (based on classes), so it is very easy for me to find and move between code.

<img alt="google_class.gif" src="/mesh/images/google_class.gif" width="514" height="286" border="0" />

The main issue I ran into was loading order (init clip). I ran into a couple of problems where I would try to access code that was not loaded yet. I solved this by having my screens broadcast onLoad events, that the main app class would listen for.

Anyways, how do you architect your movies? Have you run into limits with placing all of your code in one place? What do you think the [best practice][6] should be?

 [1]: http://www.markme.com/mesh/archives/000775.cfm
 [2]: http://www.markme.com/mesh/archives/002351.cfm
 [3]: http://www.macromedia.com/software/drk/productinfo/product_overview/volume3/sample_apps.html
 [4]: http://www.gregburch.com
 [5]: http://www.macromedia.com/software/drk/productinfo/product_overview/volume3/
 [6]: http://www.macromedia.com/devnet/mx/flash/whitepapers/actionscript_standards.pdf