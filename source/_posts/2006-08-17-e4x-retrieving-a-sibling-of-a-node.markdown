---
title: 'E4X : Retrieving a sibling of a node'
author: mikechambers
date: 2006-08-17 12:26:01 -0800
layout: post
permalink: /2006/08/17/e4x-retrieving-a-sibling-of-a-node/
categories:
  - General
---


One of the advantages of XML is that you can easily represent related information with a parent / child relationship. This makes it easy to parse, and understand. However, some XML formats (such as [Apple&#8217;s plist format][1]), represent relationships via proximity on the same level.

For example, one way to represent name / value pairs in XML could be:  
<!--more-->

  
`
<pre>
	<Artist>Interpol</Artist>
</pre>
<p>`

However, the plist format does this with key / value structure, so the above would be represented in XML as:

`
<pre>
	<key>Artist</key><string>Interpol</string>
</pre>
<p>`

The relationship between key / value is dependent on proximity, and not hierarchy as in the first example. I won&#8217;t go into why Apple did this (I don&#8217;t know) or whether it is good or bad, but it does present some difficulties in parsing.

In order to reliably parse this, you must first retrieve the key node with the appropriate value, and then get the next node, which will contain the value for the preceding key. Thus, you must be able to retrieve the key node&#8217;s next sibling, in relation to its parent.

Here is an example:

`
<pre>
package {
	import flash.display.Sprite;

	public class XMLTest extends Sprite
	{
		public function XMLTest()
		{
			var xml:XML = 
				<xml>
					<songs>
						<song>
							<key>Artist</key><string>Interpol</string>
							<key>Track Number</key><int>7</int>
						</song>
						<song>
							<key>Artist</key><string>Bloc Party</string>
							<key>Track Number</key><int>3</int>
						</song>						
					</songs>
				</xml>
				
			var temp:XML;
			var artistName:String;	
			
			//loop through all of the songs
			for each (var song:XML in xml.songs.song)
			{
				//get the node for key in the first song that has the Artist value
				temp = song.key.(text() == "Artist")[0];
				
				//get the next node (i.e. the key nodes next sibling). and save it as a Stirng
				artistName = String(temp.parent().children()[temp.childIndex() + 1]);
				
				trace(artistName);
			}	
		}
	}
}
</pre>
<p>`

The important part is this line:

`
<pre>temp.parent().children()[temp.childIndex() + 1]</pre>
<p>`

Basically, this gets the temp node&#8217;s next sibling. To get the previous sibling, just subtract 1 like so:

`
<pre>
temp.parent().children()[temp.childIndex() - 1]
</pre>
<p>`

Anyways, took me some trial and error to figure out. I [added some APIs to the XMLUtil class in corelib][2], that encapsulate this. They are already included in source, and will be compiled into the SWC at the next release. You can view the class and APIs [here][2]. You can find more information on the corelib API [here][3].

 [1]: http://www.google.com/search?q=apple%20plist%20xml
 [2]: http://labs.adobe.com/svn/flashplatform/?/projects/corelib/trunk/src/actionscript3/com/adobe/utils/XMLUtil.as
 [3]: http://labs.adobe.com/wiki/index.php/ActionScript_3:resources:apis:libraries#corelib