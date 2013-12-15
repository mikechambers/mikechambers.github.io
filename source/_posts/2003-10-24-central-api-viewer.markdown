---
title: Central API Viewer
author: mikechambers
layout: post
permalink: /2003/10/24/central-api-viewer/
categories:
  - Central
---


I was playing around with Flash MX Pro 2004 last night, and created this simple Central API viewer.

<!--more-->

  


How much code did this take?

`
<pre>
var myTreeDP = new XML();
myTreeDP.ignoreWhite = true;
myTreeDP.load("central.xml");

pBar.indeterminate = true;

myTreeDP.onLoad = function()
{ 
  myTree.dataProvider = myTreeDP;
 	pBar.indeterminate = false;
	pBar._visible = false;
}

handleTreeEvent = function(evt)
{
	var node = myTree.selectedNode;

	XML.prototype.ignoreWhite = true;
	var x = new XML("<xml>"+node.toString()+"</xml>");
	var n = x.firstChild.firstChild.attributes;
	
	var des;
	var fSig;
	
	if(n.isBranch == "true")
	{
		des = "";
		fSig = "";		
	}
	else
	{
		des = n.tiptext;
		fSig = n.object + n.text;
	}
	
	description.text = n.tiptext;
	sig.text = n.object + n.text;
	
}
myTree.addEventListener("change", handleTreeEvent);
</pre>
<p>`

Pretty simple stuff.