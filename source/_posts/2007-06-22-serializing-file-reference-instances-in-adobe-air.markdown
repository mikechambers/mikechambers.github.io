---
title: Serializing File Reference Instances in Adobe AIR
author: mikechambers
date: 2007-06-22 12:33:01 -0800
layout: post
permalink: /2007/06/22/serializing-file-reference-instances-in-adobe-air/
categories:
  - ActionScript
  - air
---


In one of the projects I am working one with the [Adobe AIR bus tour][1], I had a need to serialize instance of File class to the file system. Normally you can do this with File.writeObject(), but as the player serializer / de-serializer does not know about the File class, this would not work for me.

I came up with a simple solution that I wanted to share. Basically, you need to extend the File class and provide the meta data for it to tell the player how to serialize and de-serialize the class. This will then allow it to be serialized to the file system.

Here is the code:  
<!--more-->

`
<pre><?xml version="1.0" encoding="utf-8"?>
<mx:WindowedApplication xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute">

	<mx:Script>
		<![CDATA[
			import flash.filesystem.FileMode;
			import flash.filesystem.FileStream;
			import flash.filesystem.File;
			private function onSerialize():void
			{
				//file reference to serialize
				var f:MyFile = new MyFile("app-resource:/foo.txt");
				
				//file that we will write serialized object to
				var ser:File = new File("app-storage:/store.db");
				var fs:FileStream = new FileStream();
					fs.open(ser, FileMode.WRITE);
					fs.writeObject(f);
					fs.close();
				
			}
			
			private function onDeSerialize():void
			{
				var ser:File = new File("app-storage:/store.db");
				var fs:FileStream = new FileStream();
					fs.open(ser, FileMode.READ);
				var f:MyFile = fs.readObject() as MyFile;
					fs.close();			
			}
			
		]]>
	</mx:Script>

	<mx:Button label="Serialize" left="10" top="10" click="onSerialize()"/>
	<mx:Button label="De-Serialize" left="92" top="10" click="onDeSerialize()"/>
	
</mx:WindowedApplication>
</pre>
<p>`

and the MyFile.as class:

`
<pre>package
{
	import flash.filesystem.File;

	[RemoteClass(alias="MyFile")]
	public class MyFile extends File
	{
		public function MyFile(path:String = null)
		{
			super(path);
		}
	}
}</pre>
<p>`

The key line is the `[RemoteClass(alias="MyFile")]` which tells the player how to serialize the class.

Of course, this technique should work with any other built in class that you need to serialize.

 [1]: http://onair.adobe.com