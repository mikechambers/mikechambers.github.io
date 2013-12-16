---
title: 'Flex 2 : Clearing the content of an Image Component'
author: mikechambers
date: 2006-04-18 12:40:01 -0800
layout: post
permalink: /2006/04/18/flex-2-clearing-the-content-of-an-image-component/
categories:
  - General
---


Just a quick tip, but if you need to clear the content of a Flex 2 Image component, just set the source to null:

Here is a simple example  
<!--more-->

  
`
<pre>
<?xml version="1.0" encoding="utf-8"?>
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" xmlns="*" layout="absolute">
	
	<mx:Image height="500" width="500"
		id="imageLoader"
		source="http://images.amazon.com/images/P/B0007NFMDK.01.LZZZZZZZ.jpg"
		completeEffect="Fade"  horizontalCenter="0"/>
		
	<mx:Button label="Clear Image" horizontalCenter="0" top="508" 
		click="imageLoader.source = null"/>
	
</mx:Application>
</pre>
<p>`

It is simple, but took me a while to figure out.