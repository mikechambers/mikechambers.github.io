---
title: 'AIR Example : Native Drag and Drop'
author: mikechambers
date: 2007-11-07 12:16:01 -0800
layout: post
permalink: /2007/11/07/air-example-native-drag-and-drop/
categories:
  - air
---


Here is a simple example that shows how to enable your Adobe AIR application to accept native drag and drop operations.

This is a simple application that allows you to drag a text file into the application and then view its contents.  
<!--more-->

  
DragAndDropExample.mxml  
`
<pre><?xml version="1.0" encoding="utf-8"?>
<mx:WindowedApplication 
	creationComplete="onCreationComplete()"
	xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute">

	<mx:Script source="DragAndDropExampleClass.as" />

	<mx:TextArea top="10" right="10" bottom="10" left="251"
			id="outputField" />
	<mx:Text text="Drag a Text File into the Application" 
			width="233" height="148" top="11" left="10"/>
	
</mx:WindowedApplication>
</pre>
<p>`

DragAndDropExampleClass.as  
`
<pre>
import flash.desktop.ClipboardFormats;
import flash.desktop.DragManager;
import flash.events.NativeDragEvent;
import flash.filesystem.File;
import flash.filesystem.FileMode;
import flash.filesystem.FileStream;

//called when app has initialized and is about to display
private function onCreationComplete():void
{
	//register for the drag enter event
	addEventListener(NativeDragEvent.NATIVE_DRAG_ENTER, onDragIn);
	
	//register for the drag drop event
	addEventListener(NativeDragEvent.NATIVE_DRAG_DROP, onDragDrop);
}

//called when the user drags an item into the component area
private function onDragIn(e:NativeDragEvent):void
{
	//check and see if files are being drug in
	if(e.clipboard.hasFormat(ClipboardFormats.FILE_LIST_FORMAT))
	{
		//get the array of files
		var files:Array = e.clipboard.getData(ClipboardFormats.FILE_LIST_FORMAT) as Array;
		
		//make sure only one file is dragged in (i.e. this app doesn't
		//support dragging in multiple files)
		if(files.length == 1)
		{
			//accept the drag action
			DragManager.acceptDragDrop(this);
		}
	}
}

//called when the user drops an item over the component
private function onDragDrop(e:NativeDragEvent):void
{
	//get the array of files being drug into the app
	var arr:Array = e.clipboard.getData(ClipboardFormats.FILE_LIST_FORMAT) as Array;
	
	//grab the files file
	var f:File = File(arr[0]);
	
	//create a FileStream to work with the file
	var fs:FileStream = new FileStream();
	
		//open the file for reading
		fs.open(f, FileMode.READ);
		
	//read the file as a string
	var data:String = fs.readUTFBytes(fs.bytesAvailable);
		
		//close the file
		fs.close();
	
	//display the contents of the file		
	outputField.text = data;
}
</pre>
<p>`

One of the cool things about the API, is that you can have specific components within your application accept native drag and drop operations (and not just your entire app).

Note, right now, the app is not doing any checking to confirm that the file is a text file. If you try and drag a binary file into the app you will get weird results. (Im looking into how to check that the file is text based).