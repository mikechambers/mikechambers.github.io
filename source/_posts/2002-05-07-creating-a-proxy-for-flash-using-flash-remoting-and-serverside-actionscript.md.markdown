---
title: Creating a Proxy for Flash using Flash Remoting and ServerSide ActionScript
author: mikechambers
layout: post
permalink: /2002/05/07/creating-a-proxy-for-flash-using-flash-remoting-and-serverside-actionscript/
categories:
  - General
---


This is a simple example that shows how to make a proxy using Flash Remoting and ServerSide ActionScript. The proxy will allow you to load XML and other data into Flash from domains other that the one the Flash movie was loaded from.  
1. Download and install the ColdFusion MX [preview release][1].  
2. Download and install the [Flash Remoting add-ons][2] for Flash MX.  
Create a file called Proxy.asr in the:  
*<cfhome>/wwwroot/com/macromedia/proxy*  
directory.  
Add the following code the Proxy.asr file
<PRE>function getURL(url)<BR />{<BR />&nbsp;var stream = CF.http(url).get(&#8220;Filecontent&#8221;);<BR />&nbsp;return stream;<BR />}</PRE>

  
This takes a URL as a parameter and retrieves it using CF.http(). The remote data is retrieved by calling get(&#8220;Filecontent&#8221;) and stored in a variable named stream. The variable and its data is then returned to the Flash movie.  
Next, open Flash, and add the following code to the first frame of the movie:
<PRE>#include &#8220;NetServices.as&#8221;<BR />#include &#8220;NetDebug.as&#8221;</PRE>

<PRE>Result = function(){};</PRE>

<PRE>Result.prototype.onResult = function(data)<BR />{<BR />&nbsp;trace(&#8220;Data : &#8221; + data);<BR />}</PRE>

<PRE>Result.prototype.onStatus = function(error)<BR />{<BR />&nbsp;trace(&#8220;Error : &#8221; + error.description);<BR />}</PRE>

<PRE>var remoteURL = &#8220;<A href="http://www.macromedia.com/desdev/resources/macromedia_resources.xml">http://www.macromedia.com/desdev/resources/macromedia_resources.xml</A>&#8220;;</PRE>

<PRE>var gw = NetServices.createGatewayConnection(&#8220;<A href="http://localhost:8500/flashservices/gateway">http://localhost:8500/flashservices/gateway</A>&#8220;);<BR />var proxy = gw.getService(&#8220;com.macromedia.proxy.Proxy&#8221;, new Result());<BR />proxy.getURL(remoteURL);</PRE>

  
Test the Flash movie in the authoring environment. You should see the [Macromedia XML Resource feed][3] printed out in the debug window. If an error occurs, a description should be printed in the Debug window (or you can check the NetConnection Debugger Window > NetConnection Debugger).  
  
&nbsp;

 [1]: http://www.macromedia.com/software/trial_download/
 [2]: http://www.macromedia.com/software/flash/flashremoting/#200
 [3]: http://www.macromedia.com/desdev/articles/xml_resource_feed.html