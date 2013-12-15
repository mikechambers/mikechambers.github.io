---
title: Macromedia News Firefox Extension for 1.5 Beta / Update
author: mikechambers
layout: post
permalink: /2005/12/05/macromedia-news-firefox-extension-for-15-beta-update/
categories:
  - General
---


I have uploaded a beta version of the soon to be renamed Macromedia News Firefox extension that (kind of) works with Firefox 1.5.

There are some significant known issues with this build, so I am not adding it to the main extension page. You can only download it from here.  
<!--more-->

  
[Download Macromedia News Firefox Extension Beta][1]

I had hoped to fix all of the issues before posting it, but decided to post it for two reasons:

1.  Tons of people have been asking me to update it
2.  I am having trouble fixing one of the issues, and maybe by releasing it, someone might have an idea of what is going on

Here is the main issue. Something in Firefox 1.5 changed, so that when I call [MenuPopup.childNodes][2], some of the nodes are now null, where as they used to contain the nodes of the menu. Because of this, the menu cannot clear itself (since I can&#8217;t remove the nodes that come through as null), before it is rebuilt. The odd thing is that the the childNodes length is correct, but that some of the node references within it are just null.

You can reproduce this with the following steps:

1.  Install the extension, and restart Firefox
2.  Open the preferences, and change the &#8220;View Items&#8221; setting to &#8220;Chronologically&#8221;
3.  Save the settings
4.  View the menu

Notice that the menu is all messed up. Basically, the clearMenu function was not able to remove some of the menu items because it could not get a reference to them.

If you restart Firefox, then everything will draw correctly with the new preferences.

If you are interested in looking at the code, simply rename the extension file to .zip and unzip it. The code is in:

<pre>chrome\macromedianews\content\macromedianews\macromediaNewsOverlay.js</pre>

You can also look at and modify the installed extension within the Firefox install by looking at 

<pre>\Mozilla\Firefox\Profiles\ACTIVEPROFILE\extensions\{1d6fc8a9-d399-4629-ade8-c4013c2e5c0f}</pre>

which on Windows is found in the Application Settings directory. Changes to this code will be run once you restart Firefox. Finally, you can find info on developing and debugging Firefox extensions [here][3].

The bug manifests itself in the clearMenu call, although that is not where it originates. Here is a modified clearMenu function that dumps / alerts the nodes and shows that some are null:

`
<pre>function clearMenu()
{	
	var cNodes = newsMenuPopup.childNodes;
	var cLen = cNodes.length;

	var node;
		
	var val;	
		
	for(var i = 0; i < cLen; i++)
	{		
		node = cNodes[i];
		dump("Node : " + i + " : " + node);
		alert("Node : " + i + " : " + node);

		if(node.getAttribute("isNewsItem") == "true")
		{
			val = node.getAttribute("value");
			
			if(val.length > 0)
			{
				oldMenuHash[val] = (node.getAttribute("isNew") == "true");
			}
			
			newsMenuPopup.removeChild(node);
		}
		else if(node.getAttribute("isNewsItemHeader") == "true")
		{
			newsMenuPopup.removeChild(node);
		}
		else if(node.getAttribute("isNewsItemSeperator") == "true")
		{
			newsMenuPopup.removeChild(node);
		}
	}	
}</pre>
<p>`

I am going to keep working on it and try to figure out what is going on (or what changed in Firefox 1.5 that broke this). If anyone has any ideas / thoughts about what is going on, or questions about the code, then post them in the comments.

 [1]: http://weblogs.macromedia.com/mesh/files/macromedianews/files/macromedianews_71a.xpi
 [2]: http://www.xulplanet.com/references/elemref/ref_menupopup.html
 [3]: http://kb.mozillazine.org/Dev_:_Extensions