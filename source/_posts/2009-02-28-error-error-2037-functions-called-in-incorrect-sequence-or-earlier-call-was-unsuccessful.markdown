---
title: 'Error: Error #2037: Functions called in incorrect sequence, or earlier call was unsuccessful'
author: mikechambers
date: 2009-02-28 12:04:01 -0800
layout: post
permalink: /2009/02/28/error-error-2037-functions-called-in-incorrect-sequence-or-earlier-call-was-unsuccessful/
categories:
  - General
---

I am doing some work on writing [FlexUnit][1] test cases for the [FileMonitor][2] class which I have added to [as3corelib][3]. Once I wrote the test, I got the following error, which didnt make a lot of sense to me at first:  
<!--more-->

<pre>[SWF] FileWatcher2.swf - 1,040,015 bytes after decompression
Error: Error #2037: Functions called in incorrect sequence, or earlier  
call was unsuccessful.
	at flash.filesystem::File/_exists()
	at flash.filesystem::File/get exists()
	at com.adobe.air.filesystem::FileMonitor/set file()[/Users/mesh/src/ 
as3corelib/src/com/adobe/air/filesystem/FileMonitor.as:138]
	at com.adobe.air.filesystem::FileMonitor()[/Users/mesh/src/as3corelib/ 
src/com/adobe/air/filesystem/FileMonitor.as:94]
	at FileWatcher2/onFileSelect()[/Users/mesh/Documents/Flex Builder 3/ 
FileWatcher2/src/FileWatcher2Class.as:32]&lt;/code></pre>

The error is thrown when trying to access a property of the File class (as well as FileReference) before the class has been initialized with a file path. Specifically, the File and FileReference classes must be initialized to reference a file path, before their properties can be accessed. 

For example, this will cause the error:

``` actionscript
var f:File = new File();
trace(f.exists());
```

This will not cause an error:

``` actionscript
var f:File = File.desktopDirectory;
trace(f.exists());
```

Anyway, just wanted to post it here in case anyone else runs into the issue.

 [1]: http://opensource.adobe.com/wiki/display/flexunit/FlexUnit
 [2]: http://code.google.com/p/as3corelib/source/browse/trunk/src/com/adobe/air/filesystem/FileMonitor.as
 [3]: http://code.google.com/p/as3corelib/