---
title: 'Flash Remoting : Passing responder object with remote function calls.'
author: mikechambers
date: 2002-07-09 12:49:01 -0800
layout: post
permalink: /2002/07/09/flash-remoting-passing-responder-object-with-remote-function-calls/
categories:
  - Conferences
---


Branden Hall and Christian Cantrell are on the same DC &#8211; NYC train that I am. Branden showed me some useful Flash Remoting stuff he figured out.  
You can pass a responder object for a remote method as the first argument to the method call. This allows you to pass a separate instance of an object when you are calling the same remote method multiple times. The only caveat is that the responder function must have an onResult method. It will not work if your use functionName_Result. Here is an example:
<PRE>var result = new Object();<br />
result.onResult = function(data)<br />
{<br />
     trace(&#8220;data received&#8221;);<br />
}</p>
<p>
  //netservices code snipped<br />
  service.functionName(result, &#8220;foo&#8221;);</PRE><br />
  Pretty cool stuff.
</p>