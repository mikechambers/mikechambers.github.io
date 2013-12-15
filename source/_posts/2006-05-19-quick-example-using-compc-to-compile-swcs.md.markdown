---
title: 'Quick Example : Using COMPC to compile SWCs'
author: mikechambers
layout: post
permalink: /2006/05/19/quick-example-using-compc-to-compile-swcs/
categories:
  - General
---


I have been using the mxmlc and compc compilers a bunch this week (mxmlc and compc are ActionScript 3 / Flex 2 command line compilers included with the [Free Flex 2 SDK][1]). Whenever I start to use a command line compiler it can take me a while to figure out all of the correct arguments I need to pass it, but once I figure it out, it is pretty simple to use, as I just reuse a lot of the same args.

I went through this process this week trying to compile a SWC (containing a Flex Component) with COMPC. I wanted to make a quick post showing how I compiled it, along with a quick explanation, with the hopes of providing a good baseline reference for anyone else who needs to do something similar in the future.  
<!--more-->

  
So, here is the entire command:

`
<pre>compc -namespace http://www.adobe.com/2006/foo manifest.xml -source-path .
	-include-namespaces http://www.adobe.com/2006/foo -include-classes mx.containers.MyWindow
	-include-file MyWindow.png mx/containers/MyWindow.png 
	-output='MyWindow.swc'</pre>
<p>`

Here is the manifest.xml file:

`
<pre><?xml version="1.0"?>
<componentPackage>
	<component id="MyWindow" class="mx.containers.MyWindow"/>
</componentPackage></pre>
<p>`

Basically, this compiles a single class / component (mx.containers.MyWindow) places it into the http://www.adobe.com/2006/foo namespace, and puts it all inside of MyWindow.swc (along with an Icon that can be used to show the component in Flex Builder).

The SWC can now be easily distributed, making it easy for anyone to use the component and / or library.

Here are some useful links in livedocs:

[compc compiler options][2]  
[mxmlc compiler options][3]  
[manifest files][4]

 [1]: http://www.adobe.com/go/labs_flex2_downloads
 [2]: http://livedocs.macromedia.com/labs/1/flex20beta3/00001854.html#157219
 [3]: http://livedocs.macromedia.com/labs/1/flex20beta3/00001846.html#157203
 [4]: http://livedocs.adobe.com/flex/3/html/help.html?content=compilers_31.html