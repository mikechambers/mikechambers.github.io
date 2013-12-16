---
title: Using the HTMLControl Class in Adobe AIR to parse HTML as a data source
author: mikechambers
date: 2007-11-09 12:57:01 -0800
layout: post
permalink: /2007/11/09/using-the-htmlcontrol-in-adobe-air-to-parse-html-as-a-data-source/
categories:
  - air
---


One of the cool features of Adobe AIR (especially for Flash developers) is its ability to render full featured HTML within Flash content. The rendering is handled by the WebKit core, and the HTML content can be from both local and remote URLs as well as from a string of HTML text. 

HTML rendering within Flash content is handled by the ActionScript HTMLControl class (which is wrapped by the HTML component in Flex). The HTMLControl class is a DisplayObject instance (it directly inherits from Sprite) and thus renders its HTML directly to the display list.

However, it is possible to load HTML content into an HTMLControl instance, without placing it on the display list to be displayed. HTML content is still loaded and executed, and its DOM is exposed to the scripting environment. This means that you can essentially use the HTMLControl to load and parse HTML with the sole purpose of retrieving data from the HTML... i.e. using the HTMLControl you can treat HTML as a data source, as if it was XML.  
<!--more-->

  
This is done by leveraging the JavaScript APIs within HTML for manipulating the HTML DOM. 

Below is a simple example that loads some HTML, and then uses various JavaScript DOM APIs to extract data and information from the HTML. Note that the HTML is never displayed or rendered to the screen.

index.html  
`
<pre><html>
<head>
	<title>Example HTML Page</title>
</head>
<body>
	<h1>Title 1</h1>
	<p>This is some sample text for title 1</p>

	<p id="foo">This is the foo id</p>
	<p><a href="http://onair.adobe.com">onair</a></p>
	<p><a href="http://www.adobe.com/go/air">Adobe AIR</a></p>

	<ul>
		<li>List Item A</li>
		<li>List Item b</li>
	</ul>

</body>
</pre>
<p>`

HTMLParsingExample.mxml  
`
<pre><?xml version="1.0" encoding="utf-8"?>
<mx:WindowedApplication xmlns:mx="http://www.adobe.com/2006/mxml" 
	
	layout="absolute">

	<mx:Script>
		<![CDATA[
			private var html:HTMLControl;
			private function onLoadAndParseClick():void
			{
				html = new HTMLControl();
				html.addEventListener(Event.COMPLETE, onHTMLLoadComplete);
				html.load(new URLRequest("app-resource:/index.html"));	
			}
			
			private function onHTMLLoadComplete(e:Event):void
			{
				//get a reference to the top level html document
				var document:JavaScriptObject = html.window.document;
			
				/********** find number of links in html page ************/
			
				//grab all of the links in the document
				var a:JavaScriptObject = document.links;
				
				//get the length
				var len:int = a.length;
				
				trace(len + " links in html page.");
				
				/*********** Find element by ID and get its value ***********/
				var foo:JavaScriptObject = document.getElementById("foo");
				trace(foo.innerText);
			
				/*********** Use the document DOM parsing API to parse out LI items **********/
			
				//get all of the UL items
				var lists:JavaScriptObject = document.getElementsByTagName("ul");
				
				//make sure we found some
				if(lists.length > 0)
				{
					//grab the first one
					var ul:JavaScriptObject = lists[0];
					
					//get the child nodes
					var childNodes:JavaScriptObject = ul.childNodes;
					
					var childLen:int = childNodes.length;
					var tempNode:JavaScriptObject;
					
					//loop through the nodes looking for LI elements
					for(var j:int = 0; j < childLen; j++)
					{
						tempNode = childNodes[j];
						if(String(tempNode.nodeName).toLowerCase() == "li")
						{
							//print the value of the LI element
							trace("LI Found : " + tempNode.innerHTML);
						}
					}						
					
				}	
			}
			
		]]>
	</mx:Script>
	
	<mx:Button label="Load and Parse" right="10" bottom="10" click="onLoadAndParseClick()"/>
	
</mx:WindowedApplication>
</pre>
<p>`

One thing to remember is that when working with the JavaScript APIs from within ActionScript, most of the APIs return JavaScriptObject, JavaScriptArray, and JavaScriptFunction instances (and not ActionScript Objects, Arrays and Functions).

You can view the API docs for all of the AIR classes [here][1].

 [1]: http://livedocs.adobe.com/labs/flex3/langref/index.html