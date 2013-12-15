---
title: ActionScript 3 API Service on Google App Engine
author: mikechambers
layout: post
permalink: /2008/09/03/actionscript-3-api-service-on-google-app-engine/
categories:
  - General
---


I have just uploaded [a new ActionScript 3 reference / online documentation API][1] to Google App Engine. Basically, the service takes an ActionScript 3 class name (or a fragment of a class name) and returns the URL for the [online documentation][2] for the specified class.

For example:  
<!--more-->

  
<http://as3reference.appspot.com/getapi?version=flex3&api=String>

returns:

<div class="highlight">
  <pre>{<span style="color: #BA2121">"items"</span><span style="color: #666666">:</span> [
{<span style="color: #BA2121">"path"</span><span style="color: #666666">:</span> <span style="color: #BA2121">"String.html"</span><span style="color: #666666">,</span> <span style="color: #BA2121">"name"</span><span style="color: #666666">:</span> <span style="color: #BA2121">"String"</span>}<span style="color: #666666">,</span> 
{<span style="color: #BA2121">"path"</span><span style="color: #666666">:</span> <span style="color: #BA2121">"mx\/utils\/StringUtil.html"</span><span style="color: #666666">,</span> <span style="color: #BA2121">"name"</span><span style="color: #666666">:</span> <span style="color: #BA2121">"StringUtil"</span>}<span style="color: #666666">,</span> 
{<span style="color: #BA2121">"path"</span><span style="color: #666666">:</span> <span style="color: #BA2121">"mx\/validators\/StringValidator.html"</span><span style="color: #666666">,</span> <span style="color: #BA2121">"name"</span><span style="color: #666666">:</span> <span style="color: #BA2121">"StringValidator"</span>}
]<span style="color: #666666">,</span> 
<span style="color: #BA2121">"version"</span><span style="color: #666666">:</span> <span style="color: #BA2121">"flex3"</span><span style="color: #666666">,</span> <span style="color: #BA2121">"base_path"</span><span style="color: #666666">:</span> <span style="color: #BA2121">"http:\/\/livedocs.adobe.com\/flex\/3\/langref\/"</span>}
</pre>
</div>

All responses are returned as [JSON][3] encoded data.

Right now, it returns API information for Flash Player 9, Flex 3 and AIR 1.1. It is possible to add new API information.

You can read more information on the service page at:  
<http://as3reference.appspot.com/>

Post any comments, questions, suggestions or bugs in the comments.

 [1]: http://as3reference.appspot.com/
 [2]: http://livedocs.adobe.com/flex/3/langref/index.html
 [3]: http://www.json.org