---
title: Atom Feed ActionScript 2 Class Alpha
author: mikechambers
date: 2004-02-05 12:34:01 -0800
layout: post
permalink: /2004/02/05/atom-feed-actionscript-2-class-alpha/
categories:
  - ActionScript
---


I am putting together an ActionScript 2 class to represent and parse [Atom feeds][1]. I have put together an early alpha version of the class, but wanted to get some feedback on it before I continue work on it.

<!--more-->

Alpha .22: (Feb.12 2004)

*   Refactored to make it easier to extend and add support for custom namespaces
*   User cannot add nodes
*   tag attributes are now placed in attributes object for element.
*   TODO: check case sensitivity in switch statements
*   TODO: check if namespace is added tags : atom:element
*   TODO: optimize parse functions
*   TODO: document api
*   TODO: wrap in MXP file for distribution

Alpha .20:

*   Should parse all elements and attributes described in the Atom .03 spec.
*   Does not currently support non-atom namespaces.
*   Utilizes the [W3CDateTime class][2]

Alpha .10:

*   Does not parse all Atom elements.
*   Only parses elements included in default Movable Type atom feed. Specifically, [my Atom feed][3].
*   Cannot yet add nodes
*   Dates are not supported yet. Need to make a date class for the date types used by Atom
*   This is a super early version, and the code will probably drastically change.

Before I finish up adding support for all of Atom, I wanted to get some input on the class, and how I make the Atom dom avaliable. Please post any suggestions in the comments.

One quick comment (and my personal opinion), thus far, Atom has been a pure joy to work with. It is so nice have a structured format to work with. I love what RSS enables, but with all of the [different versions, and permutations][4], it is a huge hassle to work with.

Anyways, here is the class (v .20):

`
<pre>/*
	Atom.as
	
	Mike Chambers
	mesh@macromedia.com
	
	Class that represents an Atom XML document.
	
	You can find more information on Atom at:

http://www.atomenabled.org

	Version Alpha .22	
		-user cannot yet add nodes
		-check case sensitivity in switch statements
		-check if namespace is added tags : atom:element
		-optimize parse functions	
*/

import mx.events.EventDispatcher;
import com.macromedia.date.W3CDateTime;

class com.macromedia.data.Atom extends XML
{
	private var dispatchEvent:Function;
	public var addEventListener:Function;
	public var removeEventListener:Function;
	
	private var feed:Object;
	private var entriesArray:Array;
	
	private var ignoreWhite:Boolean = true;
	
	public function Atom(xmlSource:String)
	{	
		super(xmlSource);
		
		mx.events.EventDispatcher.initialize(this);
	}
	
	private function onLoad(success:Boolean):Void
	{
		if(!success)
		{
			//throw error
			trace("xml did not load");
			return;
		}
		parseFeedTags();
		
		dispatchEvent({type:"onAtomLoad", target:this});
	}	
	
	//need a way to reparse if user manually adds nodes
	private function parseFeedTags(Void):Void
	{	
		feed = parseFeedElement();
		
		//should this be in info, or in feed		
		//feed.info = parseFeedElement();
			
		var nodes:Array = firstChild.childNodes;
		
		var len:Number = nodes.length;
		
		var node:XMLNode;
		for(var i:Number = 0; i< len; i++)
		{
			node = nodes[i];

			//do we need to worry about case sensitivity?
			switch(node.nodeName)
			{
				case "entry":
				{
					break;
				}
				case "title":
				{
					feed.title = parseFeedTitle(node);
					break;
				}
				case "author":
				{
					feed.author = parseFeedAuthor(node);
					break;
				}	
				case "contributor":
				{
					feed.contributor = parseFeedContributor(node);
					break;
				}					
				case "tagline":
				{
					feed.tagline = parseFeedTagline(node);
					break;
				}		
				case "copyright":
				{
					feed.copyright = parseFeedCopyright(node);
					break;
				}	
				case "generator":
				{
					
					feed.generator = parseFeedGenerator(node);

					break;
				}	
				case "info":
				{
					feed.info = parseFeedInfo(node);
					break;
				}				
				case "id":
				{
					feed.id = parseFeedId(node);
					break;
				}	
				case "link":
				{					
					feed.link = parseFeedLink(node);
					 
					break;
				}					
				case "modified":
				{
					feed.modified = parseFeedModified(node);
					break;
				}	
				default:
				{
					parseFeedDefault(node);
					break;
				}
			}	
		}
	}
	
	
	private function parseFeedTitle(node:XMLNode):Object
	{
		var obj:Object = new Object();
			obj.value = node.firstChild.nodeValue;
			
		return obj;
	}

	private function parseFeedAuthor(node:XMLNode):Object
	{
		var obj:Object = parsePersonConstruct(node);
		
		return obj;
	}
	
	private function parseFeedContributor(node:XMLNode):Object
	{
		var obj:Object = parsePersonConstruct(node);
		
		return obj;
	}
	
	private function parseFeedTagline(node:XMLNode):Object
	{
		var obj:Object = new Object();
			obj.value = node.firstChild.nodeValue;
		
		return obj;
	}

	private function parseFeedCopyright(node:XMLNode):Object
	{
		var obj:Object = new Object();
			obj.value = node.firstChild.nodeValue;
			
		return;		
	}

	private function parseFeedGenerator(node:XMLNode):Object
	{
		var obj:Object = new Object();
			obj.value = node.firstChild.nodeValue;
					
			var genAtts:Object = node.attributes;
					
			obj.url = genAtts.url;
			obj.version = genAtts.version;
			
		return obj;
	}

	private function parseFeedInfo(node:XMLNode):Object
	{
		var obj:Object = new Object();
			obj.value = node.firstChild.nodeValue;
			
			return obj;
	}

	private function parseFeedId(node:XMLNode):Object
	{
		var obj:Object = new Object();
			obj.value = node.firstChild.nodeValue;
			
		return;
	}

	private function parseFeedLink(node:XMLNode):Object
	{
		var obj:Object = parseLinkConstruct(node);
		
		return obj;
	}

	private function parseFeedModified(node:XMLNode):Object
	{
		var obj:Object = new Object();
			obj.value = W3CDateTime.parseString(node.firstChild.nodeValue);
			
		return obj;
	}

	private function parseFeedDefault(node:XMLNode):Object
	{
		return undefined;
	}	
	
	private function parseLinkConstruct(node:XMLNode):Object
	{
		var feedAtts:Object = node.attributes;
		var link:Object = new Object();
			link.attributes = new Object();
					
		link.attributes.rel = feedAtts.rel;
		link.attributes.type = feedAtts.type;
		link.attributes.href = feedAtts.href;
		link.attributes.title = feedAtts.title;

		return link;		
	}
	
	private function parseFeedElement(Void):Object
	{
		var feedInfo:Object = new Object();
			feedInfo.attributes = new Object();
			
		var feedAttributes:Object = firstChild.attributes;
					
		feedInfo.attributes.version = feedAttributes.version;
		feedInfo.attributes["xml:lang"] = feedAttributes["xml:lang"];
		
		return feedInfo;
	}	
	
	//need a way to reparse if user manually adds nodes
	private function parseEntries(Void):Void
	{				
		entriesArray = new Array();
				
		var nodes:Array = firstChild.childNodes;
		
		var len:Number = nodes.length;
		
		var node:XMLNode;
		var tempEntry:Object;
		
		for(var i:Number = 0; i< len; i++)
		{
			node = nodes[i];
			
			if(node.nodeName == "entry")
			{
				tempEntry = parseEntry(node);
				entriesArray.push(tempEntry);
			}
		}
	}	
	
	private function parseEntry(node:XMLNode):Object
	{
		if(node == undefined)
		{
			return;
		}
	
		var entryElements:Array = node.childNodes;
		var elementLen:Number = entryElements.length;
	
		var entry:Object = new Object();
		var entryElement:XMLNode;
		
		for(var k:Number = 0; k < elementLen; k++)
		{
			entryElement = entryElements[k];		

			switch(entryElement.nodeName)
			{
				case "title":
				{		
					entry.title = parseEntryTitle(entryElement);
					break;
				}
				case "link":
				{
					entry.link = parseEntryLink(entryElement);
					break;
				}
				case "modified":
				{
					entry.modified = parseEntryModified(entryElement);						
					break;
				}
				case "issued":
				{
					entry.issued = parseEntryIssued(entryElement);							
					break;
				}
				case "id":
				{
					entry.id = parseEntryId(entryElement);						
					break;
				}	
				case "created":
				{
					entry.created = parseEntryCreated(entryElement);						
					break;
				}
				case "summary":
				{
					entry.summary = parseEntrySummary(entryElement);				
					break;
				}
				case "author":
				{
					entry.author = parseEntryAuthor(entryElement);
					break;
				}
				case "contributor":
				{
					entry.contributor = parseEntryContributor(entryElement);
					break;
				}						
				case "content":
				{
		
					entry.content = parseEntryContent(entryElement);
					break;
				}	
				default:
				{
					//pass this to a parse default function
					break;
				}				
			}
		}	
		return entry;
	}

	
	private function parseEntryTitle(node:XMLNode):Object
	{
		var obj:Object = new Object();
			obj.value = node.firstChild.nodeValue;

		return obj;
	}
	
	private function parseEntryLink(node:XMLNode):Object
	{
		var obj:Object = parseLinkConstruct(node);
		return obj;
	}

	private function parseEntryModified(node:XMLNode):Object
	{
		var obj:Object = new Object();
			obj.value = W3CDateTime.parseString(node.firstChild.nodeValue);
		
		return obj;
	}

	private function parseEntryIssued(node:XMLNode):Object
	{	
		var obj:Object = new Object();
			obj.value = W3CDateTime.parseString(node.firstChild.nodeValue);
		
		return obj;		
	}
	
	private function parseEntryId(node:XMLNode):Object
	{
		var obj:Object = new Object();
			obj.value = node.firstChild.nodeValue;
		
		return obj;			
	}

	private function parseEntryCreated(node:XMLNode):Object
	{
		var obj:Object = new Object();
			obj.value = W3CDateTime.parseString(node.firstChild.nodeValue);
		
		return obj;			
	}

	private function parseEntrySummary(node:XMLNode):Object
	{
		var obj:Object = new Object();		
		
		obj.value = node.firstChild.nodeValue;
		obj.type = node.attributes.type;	
		
		var childNodes:Array = node.childNodes;
		var childNodesLen:Number = childNodes.length;
		
		var childNode:XMLNode;
//TODO: test this with a summary tag											
		//find out if there is a created node
		for(var z:Number = 0; z < childNodesLen; z++)
		{
			childNode = childNodes[z];

			if(childNode.nodeName == "created")
			{
				obj.created = new Object();
				obj.created.value = 
						W3CDateTime.parseString(childNode.firstChild.nodeValue);	
				
				break;
			}								
		}	
		
		return obj;
	}
	

	private function parseEntryAuthor(node:XMLNode):Object
	{
		var obj:Object = parsePersonConstruct(node);
		return obj;
	}
	

	private function parseEntryContributor(node:XMLNode):Object
	{
		var obj:Object = parsePersonConstruct(node);
		return obj;
	}

	private function parseEntryContent(node:XMLNode):Object
	{
		var obj:Object = new Object();
			obj.attributes = new Object();
		
		var atts:Object = node.attributes;
					
		obj.attributes.mode = atts.mode;
		obj.attributes.type = atts.type;
		obj.value = node.firstChild.nodeValue;
		
		return obj;
	}		
	
	private function parsePersonConstruct(node:XMLNode):Object
	{	
		var author:Object = new Object();
		
		var children:Array = node.childNodes;
		var len:Number = children.length;

		var tempNode:Object;
		var tempName:String;
		
		for(var i:Number = 0; i < len; i++)
		{
			tempNode = children[i];
			tempName = tempNode.nodeName;
			
			switch(tempName)
			{
				case "name":
				{
					//fall through
				}
				case "url":
				{
					//fall through
				}
				case "email":
				{
					author[tempName] = new Object();
					author[tempName].value = tempNode.firstChild.nodeValue;
					break;
				}
			}
			
		}
		
		return author;
	}
	
	/**************** Public API / Getters *******************/
	
//TODO: make sure we have getters for all of the top level feed elements
	
	public function getFeedTitle(Void):String
	{
		return feed.title.value;
	}
	
	public function getFeedModified(Void):Date
	{
		return feed.modified.value;
	}	
	
	public function getFeedLink(Void):Object
	{
		return feed.link;
	}
	
	public function getFeedId(Void):String
	{
		return feed.id.value;
	}
	
	public function getFeedGenerator(Void):String
	{
		return feed.generator.value;
	}
	
	public function getFeedCopyright(Void):String
	{
		return feed.copyright.value;
	}
	
	public function getFeedTagline(Void):String
	{	
		return feed.tagline.value;
	}	
	
	//TODO : should this be a property?
	public function getFeed(Void):Object
	{
		return feed;
	}
	
	public function get entries ():Array
	{
		if(entriesArray == undefined)
		{
			parseEntries();
		}
		
		return entriesArray;
	}
	
}</pre>
<p>`

 [1]: http://www.atomenabled.org
 [2]: /mesh/archives/004376.cfm
 [3]: http://www.markme.com/mesh/atom.xml
 [4]: http://diveintomark.org/archives/2004/02/04/incompatible-rss