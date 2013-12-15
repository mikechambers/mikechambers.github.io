---
title: Base64 Encoding and Decoding in JavaScript in Adobe AIR
author: mikechambers
layout: post
permalink: /2008/06/12/base64-encoding-and-decoding-in-javascript-in-adobe-air/
categories:
  - General
---


I have been working on a JavaScript AIR app for the past week or so while on the on AIR Tour in Europe, and ran into the need to Base64 encode some data. I knew that there were some JavaScript libraries that did this, and I could also create a SWF library that used the [Flex Base64Encoder class][1]. However, I didnt like either of these solutions as I was concerned about performance with using a JavaScript implementation, and didnt want to hassle with creating a SWF library to link into JavaScript.

Well, after some searching on Google, I discovered that webkit has native Base64 encoding and decoding functions, respectively named `btoa` and `atob`.  
<!--more-->

  
Here is how you can use them from JavaScript:

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">var</span> s <span style="color: #666666">=</span> <span style="color: #BA2121">"foo"</span><span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">var</span> encoded <span style="color: #666666">=</span> btoa(s);
<span style="color: #008000; font-weight: bold">var</span> decoded <span style="color: #666666">=</span> atob(encoded);
<span style="color: #008000">window</span>.runtime.trace(s);
<span style="color: #008000">window</span>.runtime.trace(encoded);
<span style="color: #008000">window</span>.runtime.trace(decoded);
</pre>
</div>

This outputs:

<pre>foo
Zm9v
foo
</pre>

Among other things, this can come in handy if you need to create custom HTTP authentication headers.

You can find more information on the apis [here][2].

 [1]: http://livedocs.adobe.com/flex/3/langref/mx/utils/Base64Encoder.html
 [2]: http://javascript.royh.cn/global/atob-4-0-5-2-0-btoa-4-0-5-.html