---
title: Using ObjectUtil.toString() to trace properties of an Object
author: mikechambers
layout: post
permalink: /2006/04/12/using-objectutiltostring-to-trace-properties-of-an-object/
categories:
  - General
---


If you need to get a quick view into an Object or class instance, you can use the [mx.utils.ObjectUtil.toString()][1] API included in the Flex 2 Framework.  
<!--more-->

  
`
<pre>package
{
	import flash.display.Sprite;
	
	public class ViewType extends Sprite
	{
		import mx.utils.ObjectUtil;
		import flash.util.trace;
		
		public function ViewType()
		{
			
			var o:Object = new Object();
				o.foo = "bar";
				o.arr = [{name:"Homer"}, {name:"Bart"}];

			trace(ObjectUtil.toString(o));
		}
	}
}</pre>
<p>`

This will output the object in a more human readable format like so:

`
<pre>(Object)#0
  arr = (Array)#1
    [0] (Object)#2
      name = "Homer"
    [1] (Object)#3
      name = "Bart"
  foo = "bar"
</pre>
<p>`

You can view the docs for the api [here][1].

You can download the Flex 2 beta from [labs][2].

 [1]: http://livedocs.macromedia.com/labs/1/flex/langref/mx/utils/ObjectUtil.html#toString()
 [2]: http://www.macromedia.com/go/labs_flex2_downloads