---
title: Simple HTML Based Apollo Example
author: mikechambers
date: 2007-03-28 12:00:01 -0800
layout: post
permalink: /2007/03/28/simple-html-based-apollo-example/
categories:
  - General
---


Most of the docs and examples for the [Apollo alpha][1] are Flex / ActionScript focused (next beta will be more focused on HTML / JavaScript). However, you can build Apollo applications using just HTML and JavaScript.

Here is a simple example that shows how to build an HTML / JavaScript Apollo application, and how to access Apollo APIs from JavaScript. The application shows how to launch a file browser from the application, and access information about the selected file (you could then easily read in the contents of the file).  
<!--more-->

  
Note, that we are working on making it a little easier to access the Apollo apis from JavaScript. 

**application.xml**  
`
<pre><?xml version="1.0" encoding="UTF-8"?>
<application xmlns="http://ns.adobe.com/apollo/application/1.0.M3" 
	appId="com.adobe.mesh.HTMLFileExample" version=".4">   
	
      <properties>
            <name>HTMLFileExample</name>
            <description></description>
            <publisher>Mike Chambers</publisher>
            <copyright></copyright>
      </properties>

      <rootContent systemChrome="standard" transparent="false" visible="true">
      	fileexample.html
      </rootContent>

</application>
</pre>
<p>`

**fileexample.html**  
`
<pre><html>

<head>

	<script type="text/javascript" src="fileexample.js"></script>
</head>

<body onload="onLoad()">

<input type="button" value="Select a File" onClick="onFileClick();"><br />

<textarea rows="10" cols="40" id="output"></textarea>

</body></pre>
<p>`

**fileexample.js**  
`
<pre>
var apollo = window.runtime;

//called when page has loaded
function onLoad()
{
	//set initial size of app window
	window.resizeTo(400,300);
}

//called when button is pressed to select a file
function onFileClick()
{
	//this will trace out the string to the command line
	apollo.trace("hello");
	
	//get a reference to the desktop
	var f = apollo.flash.filesystem.File.desktopDirectory;
	
	//listen for the select event
	f.addEventListener(apollo.flash.events.Event.SELECT, onFileSelect);
	
	//open the browse dialog
	f.browse();
}


//called when user selects a file
function onFileSelect(e)
{
	//print the path of the selected file
	output.value = e.target.url;
}</pre>
<p>`

You can test this by using ADL (included in the [Apollo SDK][1]) from the command line like so:

`
<pre>adl application.xml</pre>
<p>`

You can download the code from [here][2].

Post any questions in the comments.

 [1]: http://www.adobe.com/go/apollo
 [2]: /mesh/files/apollo/htmlexample.zip