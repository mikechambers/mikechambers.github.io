---
title: initializing for loop counter outside of loop in ActionScript
author: mikechambers
layout: post
permalink: /2007/10/23/initializing-for-loop-counter-outside-of-loop-in-actionscript/
categories:
  - ActionScript
---


Continuing my series of posts of interesting, but not too useful ActionScript tips (which I learned from studying Objective-C), did you know that you dont have to initialize your counter variable within a for loop.

For example, this is perfectly valid:  
<!--more-->

  
`
<pre>package {
	import flash.display.Sprite;

	public class LoopTest extends Sprite
	{
		public function LoopTest()
		{
			var i:int = 0;
			for(; i < 5; i++)
			{
				trace(i);
			}
			
		}
	}
}</pre>
<p>`

As you can see, the variable is initialized outside of the loop.

You also don't have to include the test condition in the loop:

`
<pre>package {
	import flash.display.Sprite;

	public class LoopTest extends Sprite
	{
		public function LoopTest()
		{
			var i:int = 0;
			for(; ; i++)
			{
				trace(i);
				
				if(i > 5)
				{
					break;
				}
			}
			
		}
	}
}</pre>
<p>`

However, if you do this (which you probably shouldn't) you have to have code in the loop to exit, or else you will freeze up the player with an infinite loop.

And what the heck, lets get rid of incrementing the variable in the loop definition:

`
<pre>package {
	import flash.display.Sprite;

	public class LoopTest extends Sprite
	{
		public function LoopTest()
		{
			var i:int = 0;
			for(; ; )
			{
				trace(i);
				
				if(i > 5)
				{
					break;
				}
				
				i++;
			}
			
		}
	}
}</pre>
<p>`

I can't think of any reasons off the top of my head why this would be useful, but if you have any thoughts / uses, post them in the comments.