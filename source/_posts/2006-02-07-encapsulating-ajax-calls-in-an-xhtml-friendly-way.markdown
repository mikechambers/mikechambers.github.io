---
title: Encapsulating Ajax Calls in an XHTML Friendly Way
author: mikechambers
date: 2006-02-07 12:08:01 -0800
layout: post
permalink: /2006/02/07/encapsulating-ajax-calls-in-an-xhtml-friendly-way/
categories:
  - General
---


In the comments for my post from the other day titled &#8220;[Encapsulating Ajax XMLHTTPRequest Calls within JavaScript classes][1]&#8220;, Kevin F noted that using document.write was not allowed within an XHTML document.

Now, this isn&#8217;t directly related to Encapsulating Ajax calls, as you could have a non-visual class that doesn&#8217;t need to write visual content out to the browser. However, I wanted to post an update to the original example that shows how to do this that would be valid within an XHTML document.  
<!--more-->

  
First, why is document.write not allowed within XHTML documents? Well, once you think about it is actually pretty easy to understand. Basically, XHTML is XML, and as such, if you are dynamically writing elements into the container, and by-passing the parser, then there is really no easy way for the XML engine to be sure that you are going to be writing valid XML. Because of this, you have to use the DOM APIs to manipulate / insert nodes into an XHTML document. This makes it more likely that valid XML is going to be created, and also ensures that the DOM / XML engine will know about the changes.

The W3C has a good [FAQ item][2] that discusses this issue.

In the previous example, we were dynamically using document.write from within the JavaScript class to write out the DIV / container that the content would be added to. The advantage to this is that it makes the class completely self contained, but the (big) disadvantage is that it won&#8217;t work when writing to an XHTML document.

The work around is quite simple though, and just requires passing a reference to the XHTML node that will be written to into the class. This class will then use this node to dynamically generate its content.

Here is the modified example. First, the HTML.

`
<pre>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
	"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" version="-//W3C//DTD XHTML 1.1//EN" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

	<link href="styles/MessageLoader.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="scripts/MessageLoader.js"></script>

	<title>index</title>
	
</head>

<body>
	
<div id="container" style="width:100%">		
	<script language="javascript" type="text/javascript">
		var ml = new MessageLoader("container");
			ml.load();
	</script>
</div>


</body>
</html>
</pre>
<p>`

Two minor but significant changes here. First, we wrap the Script block that contains our class inside of a DIV. This is the DIV that the class will dynamically write its content to.

Next, we pass the ID of the DIV into the constructor of the JavaScript class. This is how we tell the class where it can writes its info.

Couple of notes. First, it is not necessary that the Script tags containing the class be nested within the DIV tag. I am doing it to make the code a little more organized and make it clear that these two elements are related.

Second, you could either pass a String with the name of the ID for the DIV, or a reference to the actual div. I choose a string because it is a little easier for the user (requires one less line of code), and I wanted to abstract away some of that complexity. 

Now, lets look at the (slightly) modified JavaScript class.

`
<pre>
/**
*	@fileoverview Simple example that shows how to encapsulate 
*	XMLHTTPRequestCalls
*
*	@author Mike Chambers (mesh@adobe.com)
*/



/**
*	Constructor for the class.
*
*	@param {String} dataURL The path to the data that the class
*	will load (OPTIONAL)
*
*	@constructor
*/
function MessageLoader(outerContainerID, dataURL)
{
	this._outerContainer = document.getElementById(outerContainerID);
	
	if(dataURL != undefined)
	{
		this._dataURL = dataURL;
	}
	
	this._writeContainer();
}

//where to load the data from
MessageLoader.prototype._dataURL = "data.txt";

//var to hold an instance of the XMLHTTPRequest object
MessageLoader.prototype._request = undefined;

MessageLoader.prototype._outerContainer = undefined;

//ID for the html div we will create to display the data
MessageLoader.prototype._containerID = "innerContainer";

//name of the css class for the HTML container
MessageLoader.prototype._containerClass = "ml_container";

/**************** Public APIs **********************/


/**
*	Tells the class to load its data and render the results.
*/
MessageLoader.prototype.load = function()
{
	//get a new XMLHTTPRequest and store it in an instance var.
	this._request = this._getXMLHTTPRequest();
	
	//set the var so we can scope the callback
	var _this = this;
	
	//callback will be an anonymous function that calls back into our class
	//this allows the call back in which we handle the response (_onData())
	// to have the correct scope.
	this._request.onreadystatechange = function(){_this._onData()};
	this._request.open("GET", this._generateDataUrl(), true);
	this._request.send(null);
}

/***************Private Rendering APIs ********************/

//writes the top level div for the class / widget
MessageLoader.prototype._writeContainer = function()
{
	//styles should be in external CSS
	//document.write("<div id='"+this._containerID+"' class='"+this._containerClass+"'></div>");
	var innerContainer = document.createElement("div");
		innerContainer.setAttribute("id", this._containerID);
		innerContainer.setAttribute("class", this._containerClass);
		
		//need this for IE
		innerContainer.setAttribute("className", this._containerClass);
		
	this._outerContainer.appendChild(innerContainer);
	
}

//renders the entire widget
MessageLoader.prototype._render = function(title)
{
	var content = document.getElementById(this._containerID);
		content.appendChild(document.createTextNode(title));
}

/***************Private Data Loading Handlers*******************/

//return the URL from which the data will be loaded
MessageLoader.prototype._generateDataUrl = function()
{
	return this._dataURL;
}


//callback for when the data is loaded from the server
MessageLoader.prototype._onData = function()
{
	if(this._request.readyState == 4)
	{
		if(this._request.status == "200")
		{
			this._render(this._request.responseText);
			
			//if the onDraw callback has been defined
			//call it to let the listener know
			//that we are done creating the list
			if(this.onDraw != undefined)
			{
				this.onDraw();
			}
		}
		else
		{	
			//check if an error callback handler has been defined
			if(this.onError != undefined)
			{
				//pass an object to the callback handler with info
				//about the error
				this.onError({status:this_request.status, 
						statusText:this._request.statusText});
			}
		}
		
		//clean up
		delete this._request;
	}
}

/***************Private Data Util Functions ********************/


//returns an XMLHTTPRequest instance (based on browser)
MessageLoader.prototype._getXMLHTTPRequest = function()
{
	var xmlHttp;
	try
	{
		xmlHttp = new ActiveXObject("Msxml2.XMLHttp");
	}
	catch(e)
	{
		try
		{
			xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
		}
		catch(e2)
		{
		}
	}
	
	if(xmlHttp == undefined &#038;&#038; (typeof XMLHttpRequest != 'undefined'))
	{
		xmlHttp = new XMLHttpRequest();
	}
	
	return xmlHttp;
}
</pre>
<p>`

There were really only two methods that have changes.

First, the constructor:

`
<pre>
function MessageLoader(outerContainerID, dataURL)
{
	this._outerContainer = document.getElementById(outerContainerID);
	
	if(dataURL != undefined)
	{
		this._dataURL = dataURL;
	}
	
	this._writeContainer();
}
</pre>
<p>`

It has been modified to take the ID name of the DIV it will write to as its first argument. We then use that ID to get a reference to the actual div using document.getElementById.

Next, the _writeContainer method has also been changed.

`
<pre>
MessageLoader.prototype._writeContainer = function()
{
	var innerContainer = document.createElement("div");
		innerContainer.setAttribute("id", this._containerID);
		innerContainer.setAttribute("class", this._containerClass);
		
		//need this for IE
		innerContainer.setAttribute("className", this._containerClass);
		
	this._outerContainer.appendChild(innerContainer);
}
</pre>
<p>`

Instead of using document.write to create the DIV that we will write to, we now use the DOM APIs to create the DIV, appending them to the DIV passed into the class.

Notice that I am actually appending an innerContainer div onto the one passed in. This is what the content will be built within, verses the container passed in. This is done so that we can completely encapsulate the class / code, and have complete control over the styling (i.e. we don&#8217;t have to have the outerContainer DIV implement specific CSS classes.

Those are the only two changes that we need to make. The code / class works exactly the same, only now it is compatible with XHTML documents.

Post any suggestions / corrections / improvements in the comments. In particular, does anyone know of a way to get access to the outer DIV in a DOM friendly way from within the JavaScript class without having the user pass in a reference to it?

 [1]: http://weblogs.macromedia.com/mesh/archives/2006/01/encapsulating_a.cfm
 [2]: http://www.w3.org/MarkUp/2004/xhtml-faq#docwrite