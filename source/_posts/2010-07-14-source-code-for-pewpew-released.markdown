---
title: Source code for PewPew Released
author: mikechambers
layout: post
permalink: /2010/07/14/source-code-for-pewpew-released/
categories:
  - General
---


I have finally released the [source code for my PewPew game][1]. PewPew is a game I started working on over a year ago to help me understand what optimizations would be required to convert a web based Flash game to run on the iPhone. I had planned to release the code earlier, but a little [hiccup][2] around iPhone support delayed that. Now that [Adobe AIR for Android is in public pre-release][3], and I have had time to comment all of the code, it is ready to be released.  
<!--more-->

  
[Download PewPew Source from GitHub][4]

First, a couple of notes about the code and game.

This is not a complete, ready to ship game. The game engine is pretty solid, but some more work needs to be done on adding more complexity / new enemies at high levels. In general, the menus and UI needs a lot of polish, and support added for high scores, profiles, etc&#8230;

This was the first game I have written in ActionScript 3 (my last game was written in Flash 4), and to be honest, I think it is a bit over engineered. I wrote the entire game from scratch, not using any existing frameworks. I did spin off some of the reusable code in my own [Simple Game Framework][5], but that is really only useful as sample code, or for putting together some quick ideas. For my next game I build, I will be using an existing framework, and will probably not rely so heavily on inheritance (it really adds to the complexity of the code as the game is developed).

In addition, this code has been worked on and optimized (and re-optimized) during the entire development cycle of AIR for iPhone (started before engineering work had even begin on the project). Most of the code has been updated and optimized to work on the release runtimes, but there may be some weird code in there left over from obsolete optimizations. Again, the code is fully commented, and I have put notes where there are optimizations, or why I may have done something in a weird way.

The game was originally developed for a desktop web browser, with mouse input. However, I eventually changed game input to work better on touch devices (the original mouse input worked, but wasn&#8217;t optimal for touch screens). Most of the code for mouse optimized input is still in the code base, but is commented out or not used.

Currently, the game assets are compiled via Flash CS5 (in an FLA). It would not be too much work to make this an ActionScript only project, although having it in FLA / CS5 makes it pretty easy to work with the graphics and layout.

The current version is sized for running on a Nexus One Android device (I need to add dynamic layout support to run better on multiple devices). The code also has full support for hardware acceleration on the iPhone and AIR for Android (although i need to test it again on Android).

The source code for PewPew is released under an [MIT license][6]. The current version is set to run on AIR 2.0. I am working on an issue that is preventing it from running on AIR 2.5 for Android and as soon as it is resolved, I will update the source to target AIR 2.5. 

Again, the code is released under an MIT license, so you are free to do whatever you want with it, including building and releasing your own games. I am open to taking changes / patches / submissions directly into the project, so if you want to make some changes, then read the information on [how to fork a project and submit changes on GitHub][7]. 

I plan on doing a separate post talking about the optimization and changes that I had to make over the development cycle of PewPew, first to convert it from browser based content, to mobile, and then to ensure that I got good performance on the generally slower mobile devices.

Anyways, have fun with the code, and I hope that people find it useful (even if it is just as a learning tool). Feel free to post any comments, suggestions in the comments here, and if you find any bugs, then [log an issue on the project&#8217;s github page][8].

 [1]: https://github.com/mikechambers/pewpew
 [2]: http://www.mikechambers.com/blog/2010/04/20/on-adobe-flash-cs5-and-iphone-applications/
 [3]: http://labs.adobe.com/technologies/air2/android/
 [4]: http://github.com/mikechambers/pewpew
 [5]: http://github.com/mikechambers/Simple-Game-Framework
 [6]: http://www.opensource.org/licenses/mit-license.php
 [7]: http://help.github.com/forking/
 [8]: https://github.com/mikechambers/pewpew/issues