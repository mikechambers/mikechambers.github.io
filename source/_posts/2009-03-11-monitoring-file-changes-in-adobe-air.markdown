---
title: Monitoring File Changes in Adobe AIR
author: mikechambers
date: 2009-03-11 12:04:01 -0800
layout: post
permalink: /2009/03/11/monitoring-file-changes-in-adobe-air/
categories:
  - General
---


I have just uploaded a new class to the [as3corelib library][1] that makes it easy to monitor files for changes.

The class is called [FileMonitor][2], and is in the com.adobe.air.filesystem package. Here is a simple example of it in use:  
<!--more-->

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">import</span> com.adobe.air.filesystem.FileMonitor<span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">import</span> flash.filesystem.File<span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">import</span> flash.events.Event<span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">import</span> com.adobe.air.filesystem.events.FileMonitorEvent<span style="color: #666666">;</span>


<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> monitor<span style="color: #666666">:</span>FileMonitor<span style="color: #666666">;</span>

<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onSelectButtonClick()<span style="color: #666666">:</span>void
{
	<span style="color: #008000; font-weight: bold">var</span> f<span style="color: #666666">:</span>File <span style="color: #666666">=</span> File.desktopDirectory<span style="color: #666666">;</span>
	f.addEventListener(Event.SELECT<span style="color: #666666">,</span> onFileSelect);
	f.browseForOpen(<span style="color: #BA2121">"Select a File to Watch."</span>);
}

<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onFileSelect(e<span style="color: #666666">:</span>Event)<span style="color: #666666">:</span>void
{
	<span style="color: #008000; font-weight: bold">var</span> file<span style="color: #666666">:</span>File <span style="color: #666666">=</span> File(e.target);
	
	<span style="color: #008000; font-weight: bold">if</span>(<span style="color: #666666">!</span>monitor)
	{
		monitor <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> FileMonitor();
		monitor.addEventListener(FileMonitorEvent.CHANGE<span style="color: #666666">,</span> onFileChange);
		monitor.addEventListener(FileMonitorEvent.MOVE<span style="color: #666666">,</span> onFileMove);
		monitor.addEventListener(FileMonitorEvent.CREATE<span style="color: #666666">,</span> onFileCreate);
	}
	
	monitor.file <span style="color: #666666">=</span> file<span style="color: #666666">;</span>
	monitor.watch();
}

<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onFileChange(e<span style="color: #666666">:</span>FileMonitorEvent)<span style="color: #666666">:</span>void
{
	<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"file was changed"</span>);
}

<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onFileMove(e<span style="color: #666666">:</span>FileMonitorEvent)<span style="color: #666666">:</span>void
{
	<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"file was moved"</span>);	
}

<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onFileCreate(e<span style="color: #666666">:</span>FileMonitorEvent)<span style="color: #666666">:</span>void
{
	<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"file was created"</span>);
}
</pre>
</div>

&nbsp;

Note that the class broadcasts three events:

*   **FileMonitorEvent.CHANGE** : Broadcast when the contents of a monitored file changes. This is currently based on the timestamp of the file.
*   **FileMonitorEvent.MOVE** : Broadcast when a monitored file is moved or deleted.
*   **FileMonitorEvent.CREATE** : Broadcast when a monitored file is created (since you can have a File instance that points to a file that does not exist).

The new classes are not yet in the as3corelib builds, but if you want to play with them, you can grab them from the [project source][3]. 

Note, that I am working on updating the unit tests for the library, so if you run the test runner from source, some of the tests will fail. This should be fixed in a couple of days.

 [1]: http://code.google.com/p/as3corelib/
 [2]: http://code.google.com/p/as3corelib/source/browse/trunk/src/com/adobe/air/filesystem/FileMonitor.as
 [3]: http://code.google.com/p/as3corelib/source/checkout