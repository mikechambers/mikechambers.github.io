---
title: Monitoring System Volume changes with Adobe AIR
author: mikechambers
date: 2009-02-24 12:58:01 -0800
layout: post
permalink: /2009/02/24/monitoring-system-volume-changes-with-adobe-air/
categories:
  - General
tags:
  - air
  - as3corelib
---


I am at FITC Amsterdam this week, where I had a talk on Desktop Development with Adobe AIR. One of the things I showed was how to get notifications when new volumes / drives are added / removed to a machine. This could be useful if for example, you application needs to know when a new CD Rom or USB drive has been added or removed to the user's system.  
<!--more-->

  
Anyways, I create a reusable class called [VolumeMonitor][1] that makes it very easy to monitor volume changes. I have checked in the code into the [as3corelib library][2] under the AIR package. Its not in the build yet, but once I write some docs and unit tests, and check for some bugs, Ill add it to the next build.

Here is an example of the code in use:

``` actionscript
import com.adobe.air.filesystem.events.FileMonitorEvent;
import com.adobe.air.filesystem.VolumeMonitor;

private var monitor:com.adobe.air.filesystem.VolumeMonitor;

private function onApplicationComplete():void
{
	monitor = new com.adobe.air.filesystem.VolumeMonitor();
	monitor.addEventListener(FileMonitorEvent.ADD_VOLUME, onAddVolume);
	monitor.addEventListener(FileMonitorEvent.REMOVE_VOLUME, onRemoveVolume);
	monitor.watch();
	}

private function onAddVolume(e:FileMonitorEvent):void
{
	trace("Volume added : " + e.file.url);
}

private function onRemoveVolume(e:FileMonitorEvent):void
{
	trace("Volume removed : " + e.file.url);
}
```

You can check out the class by grabbing the [as3corelib source][3]. If you poke around you will notice some other classes that I have added to the air package, but Ill post about those later.

 [1]: http://code.google.com/p/as3corelib/source/browse/trunk/src/com/adobe/air/filesystem/VolumeMonitor.as
 [2]: http://code.google.com/p/as3corelib/
 [3]: http://code.google.com/p/as3corelib/source/checkout