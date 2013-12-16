---
title: Finding more info on the CF object in ServerSide ActionScript
author: mikechambers
date: 2002-05-10 12:00:01 -0800
layout: post
permalink: /2002/05/10/finding-more-info-on-the-cf-object-in-serverside-actionscript/
categories:
  - General
---


[Joey Lott][1] sent the following information to me.  
When using [ServerSide ActionScript][2] there is an object available called CF with includes methods to make database [queries][3] and [http][4] requests. However, it also contains a number of other properties and methods which are undocumented, but could prove to be useful. Remember though, use undocumented features at your own risk as they may be changed or removed in future versions of the product.  
Below is some code that shows how to find all of the properties and methods of the CF object on the server.  
First create a file called Names.asr in the <cfinstall>/wwwroot/com/test directory and add the following code:
<PRE>function getCF()<BR />{<BR />&nbsp;var cfStuff = &#8220;&#8221;;<BR />&nbsp;for(i in CF)<BR />&nbsp;{<BR />&nbsp;&nbsp;cfStuff += i + &#8220;\n&#8221;;<BR />&nbsp;}<BR />&nbsp;return cfStuff;<BR />}</PRE>

  
Next, create a new Flash movie and add the following code:
<PRE>#include &#8220;NetServices.as&#8221;</PRE>

<PRE>var o = new Object();<BR />o.onResult = function(data)<BR />{<BR />&nbsp;trace(data);<BR />}</PRE>

<PRE>var gwURL = &#8220;<A href="http://localhost:8500/flashservices/gateway">http://localhost:8500/flashservices/gateway</A>&#8220;;<BR />var gw = NetServices.createGatewayConnection(gwURL);<BR />var names = gw.getService(&#8220;com.test.Names&#8221;, this);<BR />names.getCF();</PRE>

  
Test your movie, and you should see the following output in your Output window:
<PRE>removeAttribute<BR />include<BR />getSession<BR />servletContext<BR />page<BR />setAttribute<BR />request<BR />response<BR />toString<BR />initialize<BR />wait<BR />getClass<BR />exception<BR />http<BR />hashCode<BR />popBody<BR />getAttributeNamesInScope<BR />pushBody<BR />getException<BR />class<BR />notify<BR />getRequest<BR />getAttributesScope<BR />release<BR />equals<BR />getPage<BR />getOut<BR />session<BR />getAttribute<BR />getServletConfig<BR />forward<BR />servletConfig<BR />out<BR />findAttribute<BR />notifyAll<BR />handlePageException<BR />getServletContext<BR />query<BR />getResponse</PRE>

  
Pretty cool, heh? If you find some good uses for some of the properties, post them in the comments. Thanks again to [Joey Lott][1] who figured this out.

 [1]: http://www.person13.com
 [2]: http://radio.weblogs.com/0106797/2002/04/30.html#a28
 [3]: http://radio.weblogs.com/0106797/categories/examples/2002/04/30.html#a27
 [4]: http://radio.weblogs.com/0106797/2002/05/07.html#a63