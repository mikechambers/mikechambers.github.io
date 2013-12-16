---
title: 'Poor Man&#8217;s Log File Parser'
author: mikechambers
date: 2006-05-25 12:22:01 -0800
layout: post
permalink: /2006/05/25/poor-mans-log-file-parser/
categories:
  - General
---


I often have to manually parse through web logs to quickly get the number of times something has been downloaded.

This is pretty simple on unix based OS&#8217;s (Linux, OS-X, etc...), except that I always forget the exact command (and always have to bug [Christian][1] to remind me how to do it).

So, I figured I would post the here in case anyone might find it useful (and so I can easily find them in the future):  
<!--more-->

  
`
<pre>cat access.log | grep "myfile.txt" | awk '{print $1}' | sort | uniq | wc -l</pre>
<p>`

Just replace access.log with your log file, and myfile.txt with the file / regular expression you are searching for.

This will give you the number of unique downloads for the file.

If you want to omit certain terms from the match, then just pipe it through grep -v, like so:

`
<pre>cat access.log | grep "index.cfm" | grep -v "remove_this" | awk '{print $1}' | sort | uniq | wc -l</pre>
<p>`

If you don&#8217;t care about unique downloads, then it is even easier:

`
<pre>cat access.log | grep "myfile.txt" | wc -l</pre>
<p>`

Tons more stuff you can do with this. Post variants, suggestions or questions in the comments.

 [1]: http://weblogs.macromedia.com/cantrell/