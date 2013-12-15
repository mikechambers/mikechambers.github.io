---
title: Capturing Command Line Arguments in an Apollo Application
author: mikechambers
excerpt: Here is a simple example that shows how to capture command line arguments passed to a Flex based Apollo application.
layout: post
permalink: /2007/05/13/capturing-command-line-arguments-in-an-apollo-application/
categories:
  - air
---


Here is a simple example that shows how to capture command line arguments passed to a Flex based Apollo application.  
<!--more-->

  
`
<pre>
<?xml version="1.0" encoding="utf-8"?>
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute"
	creationComplete="onCreationComplete()">

	<mx:Script>
		<![CDATA[
			private function onCreationComplete():void
			{
				//register for the Invoke Event, called whenever
				//the app is launched or called from the command line
				Shell.shell.addEventListener(InvokeEvent.INVOKE, onInvoke);
			}
			
			private function onInvoke(event:InvokeEvent):void
			{
				//arguments passed to app are stored as array in event.arguments
				outputField.text += "Invoke : " + event.arguments + "\n";
			}
		]]>
	</mx:Script>

	<mx:TextArea right="10" left="10" top="10" bottom="10" id="outputField"/>
	
</mx:Application>
</pre>
<p>`

Basically, an InvokeEvent is broadcast whenever the app is launched, either by clicking the icon, or calling it from the command line. Any arguments passed on the command line will be contained as an array of strings in event.arguments.

Note, in Flex Builder 2.0.1, there is no way to test passing command line arguments (there will be in the next version of Flex Builder). You have to use adl to launch the application, passing arguments to it like so:

`
<pre>adl InvokeExample-app.xml -- foo bar "bim bam"</pre>
<p>`

Basically, everything after &#8220;&#8211;&#8221; will be passed to the application as command line arguments.

Another thing to remember, is that you can only have one instance of an Apollo application running at a time. If you need to have multiple instances of the application running, then listen for the InvokeEvent, and when it is fired, you can open a new NativeWindow with you main application UI in it. This may require you to rethink a little how your application is structured, but will essentially allow you to present multiple app UIs to the user. Ill post more on this later.

Finally, you can also listen for InvokeEvents from an HTML based application. I had hoped to post an example here, but ran into what looks like a bug. Ill post more info in another post once I figure out what is going on.

You can find more information on this in the [docs][1].

 [1]: http://labs.adobe.com/wiki/index.php/Apollo:Documentation:Capturing_command-line_arguments