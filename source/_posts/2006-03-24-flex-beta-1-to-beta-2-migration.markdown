---
title: Flex beta 1 to beta 2 Migration
author: mikechambers
date: 2006-03-24 12:13:01 -0800
layout: post
permalink: /2006/03/24/flex-beta-1-to-beta-2-migration/
categories:
  - General
---


If you haven&#8217;t already started playing with the Flex 2 public beta, make sure that you first check out the [beta 1 to beta 2 changes / migration document][1].

We did an API scrub between beta 1 and beta 2 so the names of a lot of the APIs changed.

Also, make sure that you type all method returns, or else you will end up with a ton of warnings. If your method does not return any values, then type the return as void, like so:

`
<pre>
public function foo():void
{
     //dont return anything
}

</pre>
<p>`

You can view the document [here][1].

You can download the Flex 2 beta bits (Flex Builder 2, Flex Framework 2, ActionScript 3, FlashPlayer 8.5) from [here][1].

 [1]: http://labs.macromedia.com/wiki/index.php/Flex:Beta_1_to_Beta_2_Changes