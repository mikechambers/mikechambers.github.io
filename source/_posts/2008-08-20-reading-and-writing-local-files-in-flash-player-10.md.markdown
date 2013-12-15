---
title: Reading and Writing Local Files in Flash Player 10
author: mikechambers
layout: post
permalink: /2008/08/20/reading-and-writing-local-files-in-flash-player-10/
categories:
  - General
---


One of the new features in [Flash Player 10][1] are new ActionScript FileReference APIs that allow Flash content to directly read and write data to the user&#8217;s system.

Prior to Flash Player 10, in order to read or write a file to the user&#8217;s system, Flash content would first have to bounce it off of a server, and then load it back to the users system before it could be accessed. This was not only a hassle to program, but added additional application latency and resource usage.

The new functionality is achieved through the addition of two new APIs on the FileReference class:  
<!--more-->

  
**FileReference.load()** : Loads data from a file selected by the user.  
**FileReference.save()** : Saves data to a file location selected by the user.

A couple of points to keep in mind:

*   The load() and save() APIs can only be called in response to user interaction (such as a button click).
*   The locations of the loaded and save files are not exposed to ActionScript.
*   The APIs are asynchronous (non-blocking).

Below are two examples that show how to use the APIs. The examples use Flex for the UI, but the ActionScript is the same regardless of whether you are using Flex or not. The examples are fully commented.

**Read a file from the users system:**

<div class="highlight">
  <pre><span style="color: #666666">&lt;?</span>xml version<span style="color: #666666">=</span><span style="color: #BA2121">"1.0"</span> encoding<span style="color: #666666">=</span><span style="color: #BA2121">"utf-8"</span><span style="color: #666666">?&gt;</span>
<span style="color: #666666">&lt;</span>mx<span style="color: #666666">:</span>Application xmlns<span style="color: #666666">:</span>mx<span style="color: #666666">=</span><span style="color: #BA2121">"http://www.adobe.com/2006/mxml"</span> layout<span style="color: #666666">=</span><span style="color: #BA2121">"absolute"</span><span style="color: #666666">&gt;</span>

	<span style="color: #666666">&lt;</span>mx<span style="color: #666666">:</span>Script<span style="color: #666666">&gt;</span>
		<span style="color: #666666">&lt;!</span>[CDATA[
			<span style="color: #008000; font-weight: bold">import</span> flash.net.<span style="color: #008000">FileReference</span><span style="color: #666666">;</span>
			<span style="color: #008000; font-weight: bold">import</span> flash.net.FileFilter<span style="color: #666666">;</span>
			
			<span style="color: #008000; font-weight: bold">import</span> flash.events.IOErrorEvent<span style="color: #666666">;</span>
			<span style="color: #008000; font-weight: bold">import</span> flash.events.Event<span style="color: #666666">;</span>
			
			<span style="color: #008000; font-weight: bold">import</span> flash.utils.ByteArray<span style="color: #666666">;</span>
		
			<span style="color: #408080; font-style: italic">//FileReference Class well will use to load data</span>
			<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> fr<span style="color: #666666">:</span><span style="color: #008000">FileReference</span><span style="color: #666666">;</span>
			
			<span style="color: #408080; font-style: italic">//File types which we want the user to open</span>
			<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">static</span> const FILE_TYPES<span style="color: #666666">:</span><span style="color: #008000">Array</span> <span style="color: #666666">=</span> [<span style="color: #008000; font-weight: bold">new</span> FileFilter(<span style="color: #BA2121">"Text File"</span><span style="color: #666666">,</span> <span style="color: #BA2121">"*.txt;*.text"</span>)];
		
			<span style="color: #408080; font-style: italic">//called when the user clicks the load file button</span>
			<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onLoadFileClick()<span style="color: #666666">:</span>void
			{
				<span style="color: #408080; font-style: italic">//create the FileReference instance</span>
				fr <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">FileReference</span>();
				
				<span style="color: #408080; font-style: italic">//listen for when they select a file</span>
				fr.addEventListener(Event.SELECT<span style="color: #666666">,</span> onFileSelect);
				
				<span style="color: #408080; font-style: italic">//listen for when then cancel out of the browse dialog</span>
				fr.addEventListener(Event.CANCEL<span style="color: #666666">,</span>onCancel);
				
				<span style="color: #408080; font-style: italic">//open a native browse dialog that filters for text files</span>
				fr.browse(FILE_TYPES);
			}
			
			<span style="color: #408080; font-style: italic">/************ Browse Event Handlers **************/</span>
			
			<span style="color: #408080; font-style: italic">//called when the user selects a file from the browse dialog</span>
			<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onFileSelect(e<span style="color: #666666">:</span>Event)<span style="color: #666666">:</span>void
			{
				<span style="color: #408080; font-style: italic">//listen for when the file has loaded</span>
				fr.addEventListener(Event.COMPLETE<span style="color: #666666">,</span> onLoadComplete);
				
				<span style="color: #408080; font-style: italic">//listen for any errors reading the file</span>
				fr.addEventListener(IOErrorEvent.IO_ERROR<span style="color: #666666">,</span> onLoadError);
				
				<span style="color: #408080; font-style: italic">//load the content of the file</span>
				fr.load();
			}
			
			<span style="color: #408080; font-style: italic">//called when the user cancels out of the browser dialog</span>
			<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onCancel(e<span style="color: #666666">:</span>Event)<span style="color: #666666">:</span>void
			{
				<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"File Browse Canceled"</span>);
				fr <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">null</span><span style="color: #666666">;</span>
			}
			
			<span style="color: #408080; font-style: italic">/************ Select Event Handlers **************/</span>
			
			<span style="color: #408080; font-style: italic">//called when the file has completed loading</span>
			<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onLoadComplete(e<span style="color: #666666">:</span>Event)<span style="color: #666666">:</span>void
			{
				<span style="color: #408080; font-style: italic">//get the data from the file as a ByteArray</span>
				<span style="color: #008000; font-weight: bold">var</span> data<span style="color: #666666">:</span>ByteArray <span style="color: #666666">=</span> fr.data<span style="color: #666666">;</span>
				
				<span style="color: #408080; font-style: italic">//read the bytes of the file as a string and put it in the</span>
				<span style="color: #408080; font-style: italic">//textarea</span>
				outputField.text <span style="color: #666666">=</span> data.readUTFBytes(data.bytesAvailable);
				
				<span style="color: #408080; font-style: italic">//clean up the FileReference instance</span>
				
				fr <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">null</span><span style="color: #666666">;</span>
			}
			
			<span style="color: #408080; font-style: italic">//called if an error occurs while loading the file contents</span>
			<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onLoadError(e<span style="color: #666666">:</span>IOErrorEvent)<span style="color: #666666">:</span>void
			{
				<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"Error loading file : "</span> <span style="color: #666666">+</span> e.text);
			}
			
		]]<span style="color: #666666">&gt;</span>
	<span style="color: #666666">&lt;/</span>mx<span style="color: #666666">:</span>Script<span style="color: #666666">&gt;</span>


	<span style="color: #666666">&lt;</span>mx<span style="color: #666666">:</span>Button label<span style="color: #666666">=</span><span style="color: #BA2121">"Load Text File"</span> right<span style="color: #666666">=</span><span style="color: #BA2121">"10"</span> bottom<span style="color: #666666">=</span><span style="color: #BA2121">"10"</span> click<span style="color: #666666">=</span><span style="color: #BA2121">"onLoadFileClick()"</span><span style="color: #666666">/&gt;</span>
	<span style="color: #666666">&lt;</span>mx<span style="color: #666666">:</span>TextArea right<span style="color: #666666">=</span><span style="color: #BA2121">"10"</span> left<span style="color: #666666">=</span><span style="color: #BA2121">"10"</span> top<span style="color: #666666">=</span><span style="color: #BA2121">"10"</span> bottom<span style="color: #666666">=</span><span style="color: #BA2121">"40"</span> id<span style="color: #666666">=</span><span style="color: #BA2121">"outputField"</span><span style="color: #666666">/&gt;</span>
	
<span style="color: #666666">&lt;/</span>mx<span style="color: #666666">:</span>Application<span style="color: #666666">&gt;</span>
</pre>
</div>

**Write a file to the users system:**

<div class="highlight">
  <pre><span style="color: #666666">&lt;?</span>xml version<span style="color: #666666">=</span><span style="color: #BA2121">"1.0"</span> encoding<span style="color: #666666">=</span><span style="color: #BA2121">"utf-8"</span><span style="color: #666666">?&gt;</span>
<span style="color: #666666">&lt;</span>mx<span style="color: #666666">:</span>Application xmlns<span style="color: #666666">:</span>mx<span style="color: #666666">=</span><span style="color: #BA2121">"http://www.adobe.com/2006/mxml"</span> layout<span style="color: #666666">=</span><span style="color: #BA2121">"absolute"</span><span style="color: #666666">&gt;</span>

	<span style="color: #666666">&lt;</span>mx<span style="color: #666666">:</span>Script<span style="color: #666666">&gt;</span>
		<span style="color: #666666">&lt;!</span>[CDATA[
			
			<span style="color: #008000; font-weight: bold">import</span> flash.net.<span style="color: #008000">FileReference</span><span style="color: #666666">;</span>
			
			<span style="color: #008000; font-weight: bold">import</span> flash.events.IOErrorEvent<span style="color: #666666">;</span>
			<span style="color: #008000; font-weight: bold">import</span> flash.events.Event<span style="color: #666666">;</span>
		
			<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">static</span> const DEFAULT_FILE_NAME<span style="color: #666666">:</span><span style="color: #008000">String</span> <span style="color: #666666">=</span> <span style="color: #BA2121">"example.txt"</span><span style="color: #666666">;</span>
		
			<span style="color: #408080; font-style: italic">//FileReference Class well will use to save data</span>
			<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> fr<span style="color: #666666">:</span><span style="color: #008000">FileReference</span><span style="color: #666666">;</span>
						
			
			<span style="color: #408080; font-style: italic">/********** UI Event Handlers **************/</span>
			
			<span style="color: #408080; font-style: italic">//called when the users types in the textarea</span>
			<span style="color: #408080; font-style: italic">//note valueCommit should be used, but is broken in the flex build </span>
			<span style="color: #408080; font-style: italic">//I am using</span>
			<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onInputChange()<span style="color: #666666">:</span>void
			{
				<span style="color: #408080; font-style: italic">//enable button if there is any text to save</span>
				saveButton.enabled <span style="color: #666666">=</span> (inputField.text.length <span style="color: #666666">&gt;</span> <span style="color: #666666"></span>);
			}
			
			<span style="color: #408080; font-style: italic">//called when the user clicks the load file button</span>
			<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onSaveClick()<span style="color: #666666">:</span>void
			{
				<span style="color: #408080; font-style: italic">//create the FileReference instance</span>
				fr <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">FileReference</span>();
				
				<span style="color: #408080; font-style: italic">//listen for the file has been saved</span>
				fr.addEventListener(Event.COMPLETE<span style="color: #666666">,</span> onFileSave);
				
				<span style="color: #408080; font-style: italic">//listen for when then cancel out of the save dialog</span>
				fr.addEventListener(Event.CANCEL<span style="color: #666666">,</span>onCancel);
				
				<span style="color: #408080; font-style: italic">//listen for any errors that occur while writing the file</span>
				fr.addEventListener(IOErrorEvent.IO_ERROR<span style="color: #666666">,</span> onSaveError);
				
				<span style="color: #408080; font-style: italic">//open a native save file dialog, using the default file name</span>
				fr.save(inputField.text<span style="color: #666666">,</span> DEFAULT_FILE_NAME);
			}
			
			<span style="color: #408080; font-style: italic">/***** File Save Event Handlers ******/</span>
			
			<span style="color: #408080; font-style: italic">//called once the file has been saved</span>
			<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onFileSave(e<span style="color: #666666">:</span>Event)<span style="color: #666666">:</span>void
			{
				<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"File Saved"</span>);
				fr <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">null</span><span style="color: #666666">;</span>
			}
			
			<span style="color: #408080; font-style: italic">//called if the user cancels out of the file save dialog</span>
			<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onCancel(e<span style="color: #666666">:</span>Event)<span style="color: #666666">:</span>void
			{
				<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"File save select canceled."</span>);
				fr <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">null</span><span style="color: #666666">;</span>
			}
			
			<span style="color: #408080; font-style: italic">//called if an error occurs while saving the file</span>
			<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onSaveError(e<span style="color: #666666">:</span>IOErrorEvent)<span style="color: #666666">:</span>void
			{
				<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"Error Saving File : "</span> <span style="color: #666666">+</span> e.text);
				fr <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">null</span><span style="color: #666666">;</span>
			}
		]]<span style="color: #666666">&gt;</span>
	<span style="color: #666666">&lt;/</span>mx<span style="color: #666666">:</span>Script<span style="color: #666666">&gt;</span>


	<span style="color: #666666">&lt;</span>mx<span style="color: #666666">:</span>Button label<span style="color: #666666">=</span><span style="color: #BA2121">"Save File"</span> right<span style="color: #666666">=</span><span style="color: #BA2121">"10"</span> bottom<span style="color: #666666">=</span><span style="color: #BA2121">"10"</span> id<span style="color: #666666">=</span><span style="color: #BA2121">"saveButton"</span> 
											click<span style="color: #666666">=</span><span style="color: #BA2121">"onSaveClick()"</span> enabled<span style="color: #666666">=</span><span style="color: #BA2121">"false"</span><span style="color: #666666">/&gt;</span>
	<span style="color: #666666">&lt;</span>mx<span style="color: #666666">:</span>TextArea right<span style="color: #666666">=</span><span style="color: #BA2121">"10"</span> left<span style="color: #666666">=</span><span style="color: #BA2121">"10"</span> top<span style="color: #666666">=</span><span style="color: #BA2121">"36"</span> bottom<span style="color: #666666">=</span><span style="color: #BA2121">"40"</span> id<span style="color: #666666">=</span><span style="color: #BA2121">"inputField"</span> 
									editable<span style="color: #666666">=</span><span style="color: #BA2121">"true"</span> change<span style="color: #666666">=</span><span style="color: #BA2121">"onInputChange()"</span><span style="color: #666666">/&gt;</span>
	<span style="color: #666666">&lt;</span>mx<span style="color: #666666">:</span>Label text<span style="color: #666666">=</span><span style="color: #BA2121">"Enter text to save"</span> left<span style="color: #666666">=</span><span style="color: #BA2121">"10"</span> top<span style="color: #666666">=</span><span style="color: #BA2121">"10"</span> fontWeight<span style="color: #666666">=</span><span style="color: #BA2121">"bold"</span><span style="color: #666666">/&gt;</span>
	
<span style="color: #666666">&lt;/</span>mx<span style="color: #666666">:</span>Application<span style="color: #666666">&gt;</span>
</pre>
</div>

In addition to the events shown in the examples above, the following events are also broadcast by the APIS:  
**  
ProgressEvent.PROGRESS** : Gives progress on the reading or writing of the file  
**Event.OPEN** : Broadcast when the file is opened for reading or writing.

While it will also be possible to use these APIs in [Adobe AIR][2], in general, you will want to use the AIR File APIs as they provide more functionality and flexibility.

You can download the Flash Player 10 ActionScript APIs docs from [here][3].

You can find more information on [Flash Player 10 on labs][1].

 [1]: http://labs.adobe.com/technologies/flashplayer10/
 [2]: http://www.adobe.com/go/air
 [3]: http://download.macromedia.com/pub/labs/flashplayer10/flashplayer10_as3langref_070208.zip