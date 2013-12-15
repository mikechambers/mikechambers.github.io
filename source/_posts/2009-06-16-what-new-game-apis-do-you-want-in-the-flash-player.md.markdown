---
title: What new game APIs do you want in the Flash Player?
author: mikechambers
layout: post
permalink: /2009/06/16/what-new-game-apis-do-you-want-in-the-flash-player/
categories:
  - ActionScript
tags:
  - as3
  - flashplayer
  - games
---


I have been learning some game development lately, and building my first game (well, at least my first game since Flash 4). I think game development and deployment are some of the real strengths of the Flash player, but ones which we haven&#8217;t specifically focused on in a while.

While working on my game, there were a couple of things I needed to do where additional player APIs could have made the development easier (as well as likely speeding up execution). This got me to thinking about other APIs that would be useful for game development. So, what new Flash Player APIs would you like to see that would make game development easier?

Here are a couple from me:  
<!--more-->

  
Hit test that tests visible bounds of Sprites. Something like:

<div class="highlight">
  <pre>sprite.hitTestVisible(anotherSprite)<span style="color: #666666">:</span><span style="color: #008000">Boolean</span>
</pre>
</div>

&nbsp;

Basically, something similar the [API Grant Skinner created][1], but native to the player.

The next API I would like is one that would check for hits against multiple sprites, and return a vector of sprites that we colliding.

<div class="highlight">
  <pre>sprite.hitTestMultiple(sprites<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span>Sprite<span style="color: #666666">&gt;</span>)<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span>Sprite<span style="color: #666666">&gt;;</span>
</pre>
</div>

&nbsp;

This would make it easy to do collision detection for multiple items, and perhaps lead to a performance boost.

So, what APIs would you like to see that would make game development easier. Please be as specific as possible (i.e. don&#8217;t just say &#8220;Physics engine&#8221; or 3D support). Leave you suggestions in the comments.

 [1]: http://www.gskinner.com/blog/archives/2005/10/source_code_sha.html