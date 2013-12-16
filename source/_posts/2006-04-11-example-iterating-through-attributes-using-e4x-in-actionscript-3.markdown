---
title: 'Example : Iterating through Attributes using E4X in ActionScript 3'
author: mikechambers
date: 2006-04-11 12:44:01 -0800
layout: post
permalink: /2006/04/11/example-iterating-through-attributes-using-e4x-in-actionscript-3/
categories:
  - General
---


Werner Sharp (one of the Flash Player engineers responsible for E4X in the player) posted an example on the [FlexCoders list][1] showing how to dynamically iterate over XML attributes and their values using E4X in ActionScript 3. I wanted to post it here as it is useful to know, and to store for future reference.  
<!--more-->

This code below actually shows two ways to do this. The first using a for each in loop, and the second using a for loop.

`
<pre>package
{
	import flash.display.Sprite;

	public class XMLAttributeExample extends Sprite
	{
		public function XMLAttributeExample()
		{
			var xml1:XML = <Node1 a='b' c='d' e='f' g='h'/>


			trace("---Example 1 : for each in---");
			for each(var a:XML in xml1.@*) 
			{
				trace (a.name() + " : " + a.toXMLString());
			}		
			
			trace("---Example 2 : for---");
			var atts:XMLList = xml1.attributes();
			for (var i:int = 0; i < atts.length(); i++)
			{
				trace (String(atts[i].name()) + " : " + atts[i].toXMLString());
			}			
		}
	}
}
</pre>
<p>`

I have uploaded this example into our subversion repository. You can view it [here][2].

You can compile this using the mxmlc or Flex Builder 2 betas which you can grab from [labs][3].

 [1]: http://groups.yahoo.com/group/flexcoders/
 [2]: http://labs.macromedia.com/svn/flashplatform/?/projects/actionscriptsamples/trunk/src/actionscript3/e4x/AttributeLoopingExample/
 [3]: http://www.macromedia.com/go/labs_flex2_downloads