---
title: Detecting whether an AIR application has run before
author: mikechambers
layout: post
permalink: /2007/11/07/detecting-whether-an-air-application-has-run-before/
categories:
  - air
---


One of the things that you might need to do when building your application is detecting whether your application has run before. This can be useful if you need to initialize settings, or perhaps prompt the user with some information.

Below is a simple example that shows how to detect whether the application has run before. Basically, it checks for the existence of a file. If it doesn&#8217;t exist, then the app hasn&#8217;t run before, if it does exist, then it means that app has run.  
<!--more-->

  
`
<pre><?xml version="1.0" encoding="utf-8"?>
<mx:WindowedApplication 
	xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute"
		creationComplete="onCreationComplete()">
	
	<mx:Script>
		<![CDATA[
			private const FIRST_RUN_TOKEN_FILE:File = 
					File.applicationStorageDirectory.resolvePath("firstrun");
		
			private function onCreationComplete():void
			{
				if(FIRST_RUN_TOKEN_FILE.exists)
				{
					outputField.text = "This application HAS been run before";
				}
				else
				{
					var fs:FileStream = new FileStream();
						fs.open(FIRST_RUN_TOKEN_FILE, FileMode.WRITE);
						fs.close();
						
						outputField.text = "This application HAS NOT been run before";
				}
			}
			
			private function onResetClick():void
			{
				if(FIRST_RUN_TOKEN_FILE.exists)
				{
					FIRST_RUN_TOKEN_FILE.deleteFile();
				}
			}
		]]>
	</mx:Script>
	<mx:Text top="10" left="10" right="10" id="outputField" 
					textAlign="center" fontSize="20"/>
	<mx:Button label="Reset First Run Status" 
			id="resetButton" click="onResetClick()" 
				horizontalCenter="0" width="153" bottom="10"/>
	
</mx:WindowedApplication></pre>
<p>`

If you need to know how many times the app has been run, then you could just write a number to the file and then increment it every-time the app runs.

One thing to keep in mind is that this is not 100% fool proof, as the user could manually delete the file. Thus you should not use this for security, serialization or trial tracking purposes.