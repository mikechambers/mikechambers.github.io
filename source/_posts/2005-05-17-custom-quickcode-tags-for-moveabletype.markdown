---
title: Custom Quickcode Tags for MoveableType
author: mikechambers
date: 2005-05-17 12:17:01 -0800
layout: post
permalink: /2005/05/17/custom-quickcode-tags-for-moveabletype/
categories:
  - Weblog
---


One of the new plugins we installed on the new weblog server is the [Quickcode plugin][1] for [Moveabletype][2] This is a simple plugin that uses bracketed tags to make it easy to mark up posts.  
<!--more-->

  
Instead of typing:

` `

<pre>&lt;a href="mailto:mesh@macromedia.com"&gt;mesh@macromedia.com&lt;/a&gt;</pre>

I can type:

<pre>[email]mesh@macromedia.com[/email]</pre>

The syntax is easy to use, which is the main reason I installed it.

Once I began using it, I realized it would be useful to create a number of other tags, so I opened up the plugin file (written in Perl) and hacked around until I got some new tags working. I wanted to post them here in case anyone else found them useful.

Here are the new tags:

<pre>[mxna]TERM[/mxna] - Links the term for a search at the Macromedia XML News Aggregator (MXNA)

[google]TERM[/google] - Links the term for a search at Google

[wikipedia]TERM[/wikipedia] - Links the term for a search / link at wikipedia

[url2]TERM[/url2] - Links the included URL, with the URL as the link.</pre>

Here are some examples:

This searches for [mxna]mesh[/mxna] at MXNA.  
This searches for [google]Mike Chambers[/google] at Google.  
This search for [wikipedia]Macromedia Flash[/wikipedia] at wikipedia.org.  
This creates a link to my new weblog at [url2]http://weblogs.macromedia.com/mesh/[/url2]

To install these, [url=http://mt-stuff.fanworks.net/plugin/quick\_code\_version_10.phtml]download and install[/url] the quickcode.pl file. Open the file in a text editor, and search for the following lines inside of the maincode sub:

` `

<pre>$s =~ s![email](.*?)[/email]!&lt;a href="mailto:$1"&gt;$1&lt;/a&gt;!gis;</pre>

Insert the following lines after the line above:

` `

<pre>$s =~ s![mxna](.*?)[/mxna]!&lt;a href="http://weblogs.macromedia.com/mxna/index.cfm?searchterms=$1"&gt;$1&lt;/a&gt;!gis;

$s =~ s![google](.*?)[/google]!&lt;a href="http://www.google.com/search?q=$1"&gt;$1&lt;/a&gt;!gis;

$s =~ s![wikipedia](.*?)[/wikipedia]!&lt;a href="http://en.wikipedia.org/wiki/Special:Search?search=$1"&gt;$1&lt;/a&gt;!gis;

$s =~ s![url2](.*?)[/url2]!&lt;a href="$1"&gt;$1&lt;/a&gt;!gis;</pre>

Save the file. Now when you make a post using Quickcode formatting, you can use the new tags.

If you can think of any useful tags to create, post them in the comments.

 [1]: http://mt-stuff.fanworks.net/plugin/quick_code_version_10.phtml
 [2]: http://www.moveabletype.org