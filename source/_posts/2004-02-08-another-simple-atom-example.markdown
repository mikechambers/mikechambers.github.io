---
title: Another Simple Atom Example
author: mikechambers
date: 2004-02-08 12:13:01 -0800
layout: post
permalink: /2004/02/08/another-simple-atom-example/
categories:
  - General
---


I am getting ready to release a beta of an [ActionScript class][1] to load, parse and manipulate [Atom feeds][2].

Here is another simple example that I put together, to help test some of the APIs.

<!--more-->

  


Here is the code:

`
<pre>import com.macromedia.data.Atom;

var a:Atom = new Atom();

a.addEventListener("onAtomLoad", this);
entryTree.addEventListener("change", this);

entryField.html = true;
titleField.setStyle("borderStyle", "none");
titleField.setStyle("fontSize", 20);
descriptionField.setStyle("borderStyle", "none");

var entries:Array;

//event broadcast once the Atom feed has been loaded
function onAtomLoad(eventObj:Object):Void
{	
	titleField.text = a.getFeedTitle()["value"];
	descriptionField.text = a.getFeedTagline()["value"];

	entries = a.entries;
	var len:Number = entries.length;
	
	//build the XML nodes for the Tree component
	var treeXML:String = "<node label=\"Entries\">";
	for(var i:Number = 0; i < len; i++)
	{
		treeXML += "<node label=\""+entries[i].title.value+"\"  index=\""+i+"\" isBranch=\"true\"/>";
	}
	treeXML += "</node>";
	
	entryTree.dataProvider = treeXML;
	entryTree.setIsOpen(entryTree.getTreeNodeAt(0), true);
	
	entryTree.selectedNode = entryTree.getTreeNodeAt(0).getTreeNodeAt(0);
	change({target:entryTree, type:"change"});
}

function change(eventObj:Object):Void
{
	var index:Number = Number(eventObj.target.selectedItem.attributes.index);
	
	entryField.text = entries[index].content.value;
}

a.load("http://www.markme.com/mesh/atom.xml");</pre>
<p>`

 [1]: /mesh/archives/004355.cfm
 [2]: http://www.atomenabled.com