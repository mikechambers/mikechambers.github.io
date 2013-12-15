---
title: Encapsulating Ajax XMLHTTPRequest Calls within JavaScript classes
author: mikechambers
layout: post
permalink: /2006/01/31/encapsulating-ajax-xmlhttprequest-calls-within-javascript-classes/
categories:
  - General
---


The guys over at Fold [posted][1] an article on how to use multiple XMLHTTPRequest (XHR) calls within a single page. This is something that I have had to tackle in my own work, and though I would write up how I solve this issue.

This post describes a simple technique for encapsulating XMLHTTPRequest calls within JavaScript classes. In general, this makes code more maintainable, allows for the creation of easier to use APIs, and makes it much easier to create components / widgets that load data from the server.  
<!--more-->

  
Basically, the technique associates and encapsulates XMLHTTPRequest instances within individual JavaScript class instances.

For this post, we will create a simple widget that uses XHR and Ajax techniques to dynamically load some data from the server, and then render it in the page. Nothing super exciting, but it provides enough to get an idea of how everything works.

First, the examples contains the following files:

*   **index.html :** The main HTML page for the example.
*   **scripts/MessageLoader.js :** A JavaScript file that includes the JavaScript class used in the example.
*   **styles/MessageLoader.css :** A Simple Cascading StyleSheet that tries to make the end result look pretty.
*   **data.txt :** The data that will be loaded by the JavaScript class. It just contains raw text that will be displayed in the page.

You can download all of the files from [here][2].

First, lets look at what the final HTML file will look like:

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
	
<script language="javascript" type="text/javascript">
	var ml = new MessageLoader();
		ml.load();
</script>


</body>
</html>
</pre>
<p>`

Pretty simple. We link to the style sheet and MessageLoader.js file in the head tag. Then, we just have a simple script block in the body that will render the content.

The main work goes on in the scripts/MessageLoader.js file.

`
<pre>/**
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
function MessageLoader(dataURL)
{
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

//ID for the html div we will create to display the data
MessageLoader.prototype._containerID = "container";

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
	document.write("<div id='"+this._containerID+"' class='"+this._containerClass+"'></div>");
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
}</pre>
<p>`

I have tried to comment the code to make it self documenting, but lets do a quick overview of what it going on.

First, the class constructor does two main things:

`
<pre>function MessageLoader(dataURL)
{
	if(dataURL != undefined)
	{
		this._dataURL = dataURL;
	}
	
	this._writeContainer();
}</pre>
<p>`

It allows the developer to optionally specify the path to the data to be loaded, and it calls the this._writeContainer(); method. All this method does is write a small piece of content into the HTML page into which the dynamic data that will be loaded will be attached to.

Everything is set in motion when the load() method is called.

`
<pre>/**
*	Tells the class to load its data and render the results.
*/
MessageLoader.prototype.load = function()
{
	//get a new XMLHTTPRequest and store it in an isntance var.
	this._request = this._getXMLHTTPRequest();
	
	//set the var so we can scope the callback
	var _this = this;
	
	//callback will be an anonymous function that calls back into our class
	//this allows the call back in which we handle the response (_onData())
	// to have the correct scope.
	this._request.onreadystatechange = function(){_this._onData()};
	this._request.open("GET", this._generateDataUrl(), true);
	this._request.send(null);
}</pre>
<p>`

This is pretty standard XHR code, but there are two things worth calling out.

First, we store the XHR object within a local variable named _request. This will allow it to be accessed later within the class instance.

`
<pre>this._request = this._getXMLHTTPRequest();</pre>
<p>`

Second, we create a local variable named _this that points to the class instance, and then create an anonymouse function to use as the onreadystatechange callback handler.

`
<pre>	//set the var so we can scope the callback
	var _this = this;
	
	//callback will be an anonymous function that calls back into our class
	//this allows the call back in which we handle the response (_onData())
	// to have the correct scope.
	this._request.onreadystatechange = function(){_this._onData()};
</pre>
<p>`

This is necessary because of how scoping works within JavaScript. Basically, any functions created contain references to variables within their scope. Thus, when we define the anonymouse function here:

`
<pre>this._request.onreadystatechange = function(){_this._onData()};</pre>
<p>`

The _this variable is copied into the function. This allows us to essentially proxy the data handler call to data handler that is called within the scope of our class instance.

This makes it much, much easier to encapsulate the XHR call, as if we did not do this, then &#8220;this&#8221; within the callback would refer to the browser&#8217;s global window object, and NOT to our class instances. 

You can see this in the data handler which is called when the data is loaded from the server:

`
<pre>MessageLoader.prototype._onData = function()
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
}</pre>
<p>`

This handler is called within the scope of our class instance. This allows us to get a reference to the XHR instance through this._request, and to call isntance methods directly.

All this code does is check to make sure the data has completed loading. If it has, then it calls the _render method, which renders the content in the page. If an error occurs, then we throw an error event that the developer can listen for.

Once we have retrieved the data we no longer need the XHR instance hanging around within our class instance, so we delete it.

That is pretty much all there is to it. You could now instantiate multiple instances of the class, and each would contain its own XHR isntance. Furthermore, you can completely abstract away the XHR object, and provide a simple API specific to whatever you code / widget does.

Now, in this example, you can only really crete one instance of the widget in a page, since we don&#8217;t do anything to create unique IDs for the dynamically generated DIVs / HTML content. However, that is easy enough to solve, and I will update this example to do this in the next day or two.

Post any questions / corrections or suggestions in the comments.

 [1]: http://foldblog.blogspot.com/2006/01/ajax-handling-multiple-xmlhttprequests.html
 [2]: /mesh/files/XHREncapsulation.zip