---
title: 'Brainstorming : Standard XML format to list resources?'
author: mikechambers
layout: post
permalink: /2003/01/17/brainstorming-standard-xml-format-to-list-resources/
categories:
  - General
---


I was thinking about easier ways that I might be able to keep my resource links up to date and fresh, and I realized that it might be useful to have them stored in a single place and in a standardized format. Kind of an RSS of resource links.

So what do people think about coming up with an XML format that describes and lists online resources?  
<!--more-->

  
So, in the case of Flash Weblogs, there could be one XML source which listed all of the Flash Weblogs, and information about them (URL, description, language, xml feed url, etc&#8230;). 

Then you could write code that periodically checked the list and automatically generated the links for your weblog, or maybe you have a Flash based news feed reader that just reads the resource file and then loads the individual feeds to be read.

The advantage is that there would be one place where this information could be stored and maintained, but anyone could use it.

Just thinking out loud, the feed could look something like this:

`
<pre><xml>
	<resource name="mesh on mx">
		<url>http://www.macromedia.com/go/blog_mchambers</url>
		<xmlFeed type="RSS 1.0">http://www.markme.com/mesh/index.rdf</xmlFeed>
		<description>News, resources, info and links on Macromedia MX,
 with a focus on Macromedia Flash MX from the Macromedia Flash
 Community Manager.</description>
		<category name="Flash">
		<category name="Cold Fusion">
		<contact>
			<name>Mike Chambers</name>
			<email>mesh@macromedia.com</email>
		</contact>
	</resource>
</xml>
</pre>
<p>`

Of course, it could be generic enough to work with any type of resource.

So would something like this be useful? Would people use it?

Thoughts? comments? suggestions? post them in the comments.