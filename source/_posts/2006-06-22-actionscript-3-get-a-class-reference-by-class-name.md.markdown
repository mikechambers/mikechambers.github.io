---
title: 'ActionScript 3 : Get a Class Reference by Class Name'
author: mikechambers
layout: post
permalink: /2006/06/22/actionscript-3-get-a-class-reference-by-class-name/
categories:
  - General
---


If you need to get a reference to a class in ActionScript 3, but only know the class name, then you can use the flash.utils.getDefinitionByName to create an instance of the class.

For example:

`
<pre>package
{
	import flash.display.Sprite;
	import flash.utils.getDefinitionByName;

	public class DynamicCall extends Sprite
	{
		public function DynamicCall()
		{
            var ClassReference:Class = getDefinitionByName("String") as Class;
            var s:String = (new ClassReference("foo=") as String);
            trace(s);
		}
	}
}</pre>
<p>`

This basically creates an instance of the String class, from the class name &#8220;String&#8221;. getDefinitionByName takes the entire class path, so if you wanted to create an instance of MovieClip, you would provide the entire path:

`
<pre>            var ClassReference:Class = getDefinitionByName("flash.display.MovieClip") as Class;</pre>
<p>`

Anyways, pretty simple stuff, but can come in useful.