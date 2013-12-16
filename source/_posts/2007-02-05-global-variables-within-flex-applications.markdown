---
title: Global Variables within Flex Applications
author: mikechambers
date: 2007-02-05 12:10:01 -0800
layout: post
permalink: /2007/02/05/global-variables-within-flex-applications/
categories:
  - General
---


The question of how to set up global variables in a Flex application came up on the [Flex Components][1] list recently, and as it comes up every so often, I figured I would blog one of the answers.

This is actually very easy. Just define a public variable within your main application class, like so:  
<!--more-->

  
`
<pre><?xml version="1.0" encoding="utf-8"?>
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute">
	<mx:Script>
		<![CDATA[
			public var foo:String = "bar";
		]]>
	</mx:Script>
</mx:Application></pre>
<p>`

You can then access that variable from anywhere within the Flex application via:

`
<pre>Application.application.foo</pre>
<p>`

If you need to, you can still make the variable bindable.

Post and questions or suggestions in the comments.

 [1]: http://tech.groups.yahoo.com/group/flexcomponents/