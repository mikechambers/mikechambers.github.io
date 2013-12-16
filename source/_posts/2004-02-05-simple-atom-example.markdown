---
title: Simple Atom Example
author: mikechambers
date: 2004-02-05 12:13:01 -0800
layout: post
permalink: /2004/02/05/simple-atom-example/
categories:
  - General
---


I have put together a very simple example that uses the [Atom ActionScript API Alpha][1] that I am working on.

This lists the all of the entries contained within [my Atom.xml feed][2].

<!--more-->

  


Here is the code:

`
<pre>import com.macromedia.data.Atom;

var a:Atom = new Atom();

a.addEventListener("onAtomLoad", this);

//event broadcast once the Atom feed has been loaded
function onAtomLoad(eventObj:Object):Void
{	
	var  entries:Array = a.entries;
	var len:Number = entries.length;
	
	//build the XML nodes for the Tree component
	var treeXML:String = "<node label=\"Entries\">";
	for(var i:Number = 0; i < len; i++)
	{
		treeXML += "<node label=\""+entries[i].title.value+"\" isBranch=\"\"/>";
	}
	treeXML += "</node>";
	
	entryTree.dataProvider = treeXML;
	entryTree.setIsOpen(entryTree.getTreeNodeAt(0), true);
}

a.load("http://www.markme.com/mesh/atom.xml");</pre>
<p>`

 [1]: /mesh/archives/004355.cfm
 [2]: /mesh/atom.xml