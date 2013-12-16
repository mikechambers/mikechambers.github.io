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

``` actionscript
import com.adobe.air.filesystem.FileMonitor;
import flash.filesystem.File;
import flash.events.Event;
import com.adobe.air.filesystem.events.FileMonitorEvent;


private var monitor:FileMonitor;

private function onSelectButtonClick():void
{
	var f:File = File.desktopDirectory;
	f.addEventListener(Event.SELECT, onFileSelect);
	f.browseForOpen("Select a File to Watch.");
}

private function onFileSelect(e:Event):void
{
	var file:File = File(e.target);
	
	if(!monitor)
	{
		monitor = new FileMonitor();
		monitor.addEventListener(FileMonitorEvent.CHANGE, onFileChange);
		monitor.addEventListener(FileMonitorEvent.MOVE, onFileMove);
		monitor.addEventListener(FileMonitorEvent.CREATE, onFileCreate);
	}
	
	monitor.file = file;
	monitor.watch();
}

private function onFileChange(e:FileMonitorEvent):void
{
	trace("file was changed");
}

private function onFileMove(e:FileMonitorEvent):void
{
	trace("file was moved");	
}

private function onFileCreate(e:FileMonitorEvent):void
{
	trace("file was created");
}
```

Note that the class broadcasts three events:

*   **FileMonitorEvent.CHANGE** : Broadcast when the contents of a monitored file changes. This is currently based on the timestamp of the file.
*   **FileMonitorEvent.MOVE** : Broadcast when a monitored file is moved or deleted.
*   **FileMonitorEvent.CREATE** : Broadcast when a monitored file is created (since you can have a File instance that points to a file that does not exist).

The new classes are not yet in the as3corelib builds, but if you want to play with them, you can grab them from the [project source][3]. 

Note, that I am working on updating the unit tests for the library, so if you run the test runner from source, some of the tests will fail. This should be fixed in a couple of days.

 [1]: http://code.google.com/p/as3corelib/
 [2]: http://code.google.com/p/as3corelib/source/browse/trunk/src/com/adobe/air/filesystem/FileMonitor.as
 [3]: http://code.google.com/p/as3corelib/source/checkout