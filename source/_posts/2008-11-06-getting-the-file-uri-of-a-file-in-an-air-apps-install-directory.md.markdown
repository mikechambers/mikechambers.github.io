---
title: 'Getting the File URI of a File in an AIR app&#8217;s install directory'
author: mikechambers
layout: post
permalink: /2008/11/06/getting-the-file-uri-of-a-file-in-an-air-apps-install-directory/
categories:
  - General
---


I am currently working on some code that runs in Adobe AIR where I need to access the File URL (file:/) of a file located in the AIR app&#8217;s install directory.

Normally, you could get the URI, by accessing the url property of the File object which will return a well formed, absolute file:/ URL. However, this doesn&#8217;t work for files located in the AIR app&#8217;s install directory.  
<!--more-->

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">var</span> f<span style="color: #666666">:</span>File <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> File(<span style="color: #BA2121">"app:/icon.png"</span>);
<span style="color: #0000FF">trace</span>(f.url); <span style="color: #408080; font-style: italic">//app:/icon.png</span>
</pre>
</div>

&nbsp;

While the app:/ URI will work within your AIR application, it will not work if you need to pass that URI to a non AIR application.

Here is the workaround for how to get the File URL of a file in the application install directory:

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">var</span> fPath<span style="color: #666666">:</span><span style="color: #008000">String</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> File(<span style="color: #008000; font-weight: bold">new</span> File(<span style="color: #BA2121">"app:/icon.png"</span>).nativePath).url<span style="color: #666666">;</span>
<span style="color: #0000FF">trace</span>(fPath);
</pre>
</div>

&nbsp;

This will give you an absolute file URI similar to:

`file:///Users/mesh/Documents/Flex%20Builder%203/AppName/bin-debug/icon.png`

&nbsp;

Of course, this is a bit of a hack, and not that efficient (requires two File instances), but it works.