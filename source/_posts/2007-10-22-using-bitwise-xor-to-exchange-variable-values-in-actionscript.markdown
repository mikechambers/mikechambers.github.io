---
title: Using Bitwise XOR to exchange variable values in ActionScript
author: mikechambers
date: 2007-10-22 12:22:01 -0800
layout: post
permalink: /2007/10/22/using-bitwise-xor-to-exchange-variable-values-in-actionscript/
categories:
  - ActionScript
---


I have been [studying some Objective-C][1] in my spare time, and was reading up on Bitwise operators tonight. I came across a simple way to exchange the value of two variables using the [Exclusive-OR (XOR)][2] operator that doesn&#8217;t require creating a temporary variable.

Normally, if you wanted to exchange the value of two variables, you would have to create a temp variable to store values temporarily (which uses additional memory). For example:  
<!--more-->

  
`
<pre>package
{
	import flash.display.Sprite;
	import flash.system.System;

	public class SwitchVariables extends Sprite
	{
		public function SwitchVariables()
		{
			var a:int = 5;
			var b:int = 6;
			var temp:int;
			
			trace("a = " + a + " : b = " + b);
			
			
			temp = a;
			a = b;
			b = temp;
			
			trace("a = " + a + " : b = " + b);
		}
	}
}</pre>
<p>`

Notice that you have to create an additional variable, named `temp` to temporarily store the value while it is switched.

However, you can use the Bitwise XOR Operator to switch the values without having to create the temporary variable. For example:

`
<pre>package
{
	import flash.display.Sprite;
	import flash.system.System;

	public class SwitchVariables extends Sprite
	{
		public function SwitchVariables()
		{
			var a:int = 5;
			var b:int = 6;
			
			trace("a = " + a + " : b = " + b);
			
			a ^= b;
			b ^= a;
			a ^= b;
			
			trace("a = " + a + " : b = " + b);
		}
	}
}</pre>
<p>`

You can find a good explanation of what the Exclusive OR operator does [here][2] and a discussion of the XOR swap algorithm [here][3].

This is probably not needed in most cases (it can make the code a little harder to read), but if you are exchanging the value of variables in a loop and running into memory issues, this might come in handy.

Have any other bitwise operator tips? Post them in the comments.

 [1]: http://www.amazon.com/Programming-Objective-C-Stephen-Kochan/dp/0672325861
 [2]: http://en.wikipedia.org/wiki/Bitwise_XOR#XOR
 [3]: http://en.wikipedia.org/wiki/Xor_swap_algorithm