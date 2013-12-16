---
title: Filtering Traces from Central with the Trace Panel
author: mikechambers
date: 2003-12-12 12:03:01 -0800
layout: post
permalink: /2003/12/12/filtering-traces-from-central-with-the-trace-panel/
categories:
  - Central
---


If you have used the Central trace panel, you may have noticed the &#8220;App Name Filter&#8221; text field in the bottom left of the panel. This is used to filter trace messages coming from Central so you only see messages coming from your application.

So, how do you use this? It is actually pretty simple.

<!--more-->

First, you need to set a global variable in your App / Agent / Pod that tells Central your application name. This is done using:

`
<pre>Central.tracer.appName</pre>
<p>`

So, for all of my apps, I place :

`
<pre>Central.tracer.appName = "mesh";</pre>
<p>`

at the root. This value will be passed by Central as the second argument to the trace panel.

Then, in the trace panel, you enter the appName in the App Name Filter textfield. That is all there is to it.

There are a couple of things to keep in mind:

*   Before releasing your application, you should publish it with Omit Trace Actions on.
*   Before releasing your application, you should comment out the Tracer.app name code.
*   If you have multiple Agents running from your domain, the last one laoded will set the Tracer.appName value.

Also, you can set Tracer.appName to be any value (a string, array, etc...) and it will be passed to the Tracer panel. The panel from Macromedia only recognizes strings for the appName value, but the complete source code for the panel is included on the SDK, so you can modify it accept other data types.

You can download the Central Trace panel as part of the [Central SDK][1]. You can also download standalone versions for [OS X][2] and [Win][3].

 [1]: http://www.macromedia.com/go/central_sdk
 [2]: /mesh/archives/003967.cfm
 [3]: /mesh/archives/003850.cfm