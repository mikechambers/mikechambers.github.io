---
title: 'AIR Example : HTML Editor with live preview'
author: mikechambers
date: 2007-11-06 12:16:01 -0800
layout: post
permalink: /2007/11/06/air-example-html-editor-with-live-preview/
categories:
  - air
---


As part of my [Flash on the Beach][1] Intro to AIR Session, I built a simple HTML Editor with a live preview. I have added comments to the code, and uploaded it to the [on AIR tour google repository][2].

This example demonstrates:

*   Using the File API to write a string to a file
*   Using the HTML Control within an application to render a string of HTML
*   Using the File.browseForSave API to open a native save dialog.

Here is the code if you just want to glance at it:  
<!--more-->

  
HTMLEditor.mxml  
`
<pre><?xml version="1.0" encoding="utf-8"?>
<mx:WindowedApplication 
	xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute"
	 viewSourceURL="srcview/index.html">
	<!-- include the code for the main app class -->
	<mx:Script source="HTMLEditorClass.as" />
	
	<!-- TextArea used to type in HTML -->
	<mx:TextArea height="172" top="10" left="10" right="10" 
		change="onTextChange()"
		id="inputField" />
		
	<!-- HTML Control which we use for live preview of HTML -->
	<mx:HTML top="190" left="10" right="10" bottom="41" id="htmlField"/>
	
	<!-- Save button to save the HTML to a file -->
	<mx:Button label="Save" right="10" bottom="10" click="onSaveClick()"/>

</mx:WindowedApplication></pre>
<p>`

HTMLEditorClass.as  
`
<pre>import flash.events.Event;
import flash.filesystem.File;

//called when the text / html is changed
private function onTextChange():void
{
	htmlField.htmlText = inputField.text;
}

//Called when the user selects a file to save
//html in.
private function onBrowseForSave(e:Event):void
{
	//get a file reference to the file the user selected
	var f:File = File(e.target);
	
	//create a file stream to write to the file
	var fs:FileStream = new FileStream();
	
		//open the file for writing
		fs.open(f, FileMode.WRITE);
		
		//write string of html to file
		fs.writeUTFBytes(inputField.text);
		
		//close the file
		fs.close();  
}

//called when user presses save button
private function onSaveClick():void
{
	//get a reference to the desktop dir
	//this will be used as the default dir that the dialog
	//will open at
	var f:File = File.desktopDirectory;
	
		//listen for the select event for when the user selects
		//a file to save the html in
		f.addEventListener(Event.SELECT, onBrowseForSave);
		
		//open the browse for save native dialog, and pass in a title
		//for the dialog
		f.browseForSave("Save HTML File");
}</pre>
<p>`

You can grab the code from the [on AIR Tour code repository][3].

 [1]: http://www.flashonthebeach.com/
 [2]: http://code.google.com/p/onairbustour/
 [3]: http://onairbustour.googlecode.com/svn/trunk/projects/HTMLEditor/