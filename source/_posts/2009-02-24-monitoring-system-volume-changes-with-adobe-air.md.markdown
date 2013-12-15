---
title: Monitoring System Volume changes with Adobe AIR
author: mikechambers
layout: post
permalink: /2009/02/24/monitoring-system-volume-changes-with-adobe-air/
categories:
  - General
tags:
  - air
  - as3corelib
---


I am at FITC Amsterdam this week, where I had a talk on Desktop Development with Adobe AIR. One of the things I showed was how to get notifications when new volumes / drives are added / removed to a machine. This could be useful if for example, you application needs to know when a new CD Rom or USB drive has been added or removed to the user&#8217;s system.  
<!--more-->

  
Anyways, I create a reusable class called [VolumeMonitor][1] that makes it very easy to monitor volume changes. I have checked in the code into the [as3corelib library][2] under the AIR package. Its not in the build yet, but once I write some docs and unit tests, and check for some bugs, Ill add it to the next build.

Here is an example of the code in use:

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">import</span> com.adobe.air.filesystem.events.FileMonitorEvent<span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">import</span> com.adobe.air.filesystem.VolumeMonitor<span style="color: #666666">;</span>

<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> monitor<span style="color: #666666">:</span>com.adobe.air.filesystem.VolumeMonitor<span style="color: #666666">;</span>

<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onApplicationComplete()<span style="color: #666666">:</span>void
{
	monitor <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> com.adobe.air.filesystem.VolumeMonitor();
	monitor.addEventListener(FileMonitorEvent.ADD_VOLUME<span style="color: #666666">,</span> onAddVolume);
	monitor.addEventListener(FileMonitorEvent.REMOVE_VOLUME<span style="color: #666666">,</span> onRemoveVolume);
	monitor.watch();
}

<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onAddVolume(e<span style="color: #666666">:</span>FileMonitorEvent)<span style="color: #666666">:</span>void
{
	<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"Volume added : "</span> <span style="color: #666666">+</span> e.file.url);
}

<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onRemoveVolume(e<span style="color: #666666">:</span>FileMonitorEvent)<span style="color: #666666">:</span>void
{
	<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"Volume removed : "</span> <span style="color: #666666">+</span> e.file.url);
}
</pre>
</div>

&nbsp;

You can check out the class by grabbing the [as3corelib source][3]. If you poke around you will notice some other classes that I have added to the air package, but Ill post about those later.

 [1]: http://code.google.com/p/as3corelib/source/browse/trunk/src/com/adobe/air/filesystem/VolumeMonitor.as
 [2]: http://code.google.com/p/as3corelib/
 [3]: http://code.google.com/p/as3corelib/source/checkout