---
title: Catching server timeout errors when using Flash Remoting
author: mikechambers
date: 2002-04-29 12:22:01 -0800
layout: post
permalink: /2002/04/29/catching-server-timeout-errors-when-using-flash-remoting/
categories:
  - General
---


When calling remote services / methods via [Flash Remoting][1], any errors that occur will trigger the onStatus method to be called:
<PRE>onStatus = function(error)<BR />{<BR />&nbsp;&nbsp;&nbsp;&nbsp; trace(&#8220;Error : &#8221; + error.description);<BR />}</PRE>

  
However, if Flash cannot connect to the server (network or server is down) onStatus will not be called. Using XML and LoadVars you have to manually keep a timer in order to time out the connection, however you do not have to do this using Flash Remoting. Just create a method like the following:
<PRE>_global.System.onStatus = function(info)<BR />{<BR /> trace(&#8220;details : &#8221; + info.details);<BR /> trace(&#8220;description : &#8221; + info.description);<BR /> trace(&#8220;code : &#8221; + info.code);<BR /> trace(&#8220;level : &#8221; + info.level);<BR />}</PRE>

  
This method will be called if Flash MX cannot connect to the [Flash Remoting][1] server.  
Here is an example output (when the server is not running):
<PRE>details: <A href="http://localhost:8500/flashservices/gateway/">http://localhost:8500/flashservices/gateway/</A><BR />description: HTTP: Failed<BR />code: NetConnection.Call.Failed<BR />level: error</PRE>

  
Couple of notes :  
  
*   The exact messages may depend on the browser.  
    *   This will only works when connecting to the server via Flash Remoting. It will not work when using the XML or LoadVars object.</UL></p>

 [1]: http://www.macromedia.com/software/flash/flashremoting/