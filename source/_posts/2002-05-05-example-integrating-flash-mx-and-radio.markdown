---
title: 'Example : Integrating Flash MX and Radio'
author: mikechambers
date: 2002-05-05 12:12:01 -0800
layout: post
permalink: /2002/05/05/example-integrating-flash-mx-and-radio/
categories:
  - General
---


This tutorial demonstrates a simple example of integrating [Radio][1] with [Macromedia Flash MX][2].  
If you have visited this site before, you may or may not have noticed that the heading at the top of all of my pages is actually a Flash 6 movie. The movie displays the title (left), data from the [Macromedia XML Resource Feed][3] (right), and the date that the site was last updated (center). The last updated information actually comes from a Radio macro, and is a good example of a simple way to integrate data from Radio within a Macromedia Flash 6 movie.  
First, lets look at the basic HTML required to display a Flash movie within an HTML page:
<PRE>&lt;OBJECT classid=&#8221;clsid:D27CDB6E-AE6D-11cf-96B8-444553540000&#8243; <BR />&nbsp;codebase=<BR />&nbsp;&#8221;<A href="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0">http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0</A>&#8220;<BR />&nbsp;WIDTH=&#8221;100%&#8221; HEIGHT=&#8221;40&#8243;&gt;&nbsp;&nbsp;&nbsp;&nbsp; <BR />&nbsp;&lt;PARAM NAME=movie VALUE=&#8221;movie.swf&#8221;&gt;&nbsp;&nbsp;&nbsp;&nbsp; <BR />&nbsp;&lt;PARAM NAME=quality VALUE=high&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <BR />&nbsp;<BR />&nbsp;&lt;EMBED src=&#8221;movie.swf&#8221;&nbsp; WIDTH=&#8221;100%&#8221; HEIGHT=&#8221;40&#8243;&nbsp; <BR />&nbsp;&nbsp;TYPE=&#8221;application/x-shockwave-flash&#8221;&nbsp; <BR />&nbsp;&nbsp;PLUGINSPAGE=&#8221;<A href="http://www.macromedia.com/go/getflashplayer">http://www.macromedia.com/go/getflashplayer</A>&#8220;&gt;<BR />&nbsp;&lt;/EMBED&gt;<BR />&lt;/OBJECT&gt;</PRE>

  
Notice that there is EMBED tag within the Object tag. The OBJECT tag is used for browsers that use the ActiveX version of the Flash player, and the EMBED tag is used for all other browsers.  
The code should be pretty self explanatory. The Flash movie to be loaded is specified in the movie attribute of the PARAM tag, and the SRC attribute of the EMBED tag. Note that you can use either relative or absolute paths to specify the Flash movie (.swf).  
In Flash 5, you could pass name / value pairs to the Flash movie by appending them to the end of the path to the Flash movie, like so:
<PRE>&lt;PARAM NAME=movie VALUE=&#8221;movie.swf?foo=bar&#8221;&gt;</PRE>

  
This technique still works in Flash 6, but has the limitation that the amount of data you can send varies depending on the browser it is running in.  
Flash 6 offers a better solution, FlashVars, which allows you to send large amounts of data (i believe it is 64kb) into the Flash movie at runtime. The data is sent as a URL encoded query string of name / value pairs to the Flash movie.  
Here is an example:
<PRE>&lt;OBJECT classid=&#8221;clsid:D27CDB6E-AE6D-11cf-96B8-444553540000&#8243;<BR />&nbsp;codebase=<BR />&nbsp;&#8221;<A href="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0">http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0</A>&#8220;<BR />&nbsp;WIDTH=&#8221;100%&#8221; HEIGHT=&#8221;40&#8243;&gt;&nbsp;&nbsp;&nbsp;&nbsp; <BR />&nbsp;&lt;PARAM NAME=movie VALUE=&#8221;movie.swf&#8221;&gt;&nbsp;&nbsp;&nbsp;&nbsp; <BR />&nbsp;&lt;PARAM NAME=FlashVars VALUE=&#8221;foo=bar&bim=bam%20bam&#8221;&gt;&nbsp;&nbsp;&nbsp;&nbsp; <BR />&nbsp;&lt;PARAM NAME=quality VALUE=high&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <BR />&nbsp;<BR />&nbsp;&lt;EMBED src=&#8221;movie.swf&#8221;&nbsp; <BR />&nbsp;&nbsp;WIDTH=&#8221;100%&#8221; HEIGHT=&#8221;40&#8243;&nbsp; <BR />&nbsp;&nbsp;flashvars = &#8220;foo=bar&bim=bam%20bam&#8221; <BR />&nbsp;&nbsp;TYPE=&#8221;application/x-shockwave-flash&#8221;&nbsp; <BR />&nbsp;&nbsp;PLUGINSPAGE=&#8221;<A href="http://www.macromedia.com/go/getflashplayer">http://www.macromedia.com/go/getflashplayer</A>&#8220;&gt;<BR />&nbsp;&lt;/EMBED&gt;<BR />&lt;/OBJECT&gt;</PRE>

  
Notice that we have added a flashvars attributes to both the OBJECT and EMBED tags. When the Flash movie loads, the name / value pairs passed through the FLASHVARS attributes will then be available to the Flash movie on the main timeline.  
So, how do we get data from Radio to Flash? Remember that Radio macros are processed on the server side. If you look at the [main template][4] for Radio, you will see that the code that creates the HTML to display the last updated date is:  
<%if radioResponder.flStaticRendering {return (searchEngine.stripMarkup(now))} else {return (&#8220;&#8221;)}%>  
This will output the last date and time that the weblog was updated.  
In order to get that data into Flash, we need to specify it in the FlashVars attribute, and we need to URL Encode the data. Here is the code that displays the Flash movie at the top of my pages:
<PRE>&lt;OBJECT classid=&#8221;clsid:D27CDB6E-AE6D-11cf-96B8-444553540000&#8243;<BR />&nbsp;codebase=<BR />&nbsp;&#8221;<A href="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0">http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0</A>&#8220;<BR />&nbsp;WIDTH=&#8221;100%&#8221; HEIGHT=&#8221;40&#8243; <BR />&nbsp;id=&#8221;header&#8221; ALIGN=&#8221;"&gt;&nbsp;&nbsp;&nbsp;&nbsp; <BR />&nbsp;&lt;PARAM NAME=movie VALUE=&#8221;/0106797/images/header.swf&#8221;&gt;&nbsp;&nbsp;&nbsp;&nbsp; <BR />&nbsp;&lt;PARAM NAME=quality VALUE=high&gt;&nbsp;&nbsp;&nbsp;&nbsp; <BR />&nbsp;&lt;PARAM NAME=bgcolor VALUE=#002039&gt;&nbsp;&nbsp;&nbsp;&nbsp; <BR />&nbsp;&lt;param name=&#8221;flashvars&#8221; <BR />&nbsp;&nbsp;value=&#8221;u=&lt;%if radioResponder.flStaticRendering {<BR />&nbsp;&nbsp;&nbsp;return (string.urlencode(searchEngine.stripMarkup(now)))} <BR />&nbsp;&nbsp;&nbsp;else {return (&#8220;&#8221;)}%&gt;&#8221;&gt;<BR />&nbsp;&nbsp;&nbsp;<BR />&nbsp;&lt;EMBED src=&#8221;/0106797/images/header.swf&#8221;&nbsp; <BR />&nbsp;&nbsp;quality=high bgcolor=#002039&nbsp;&nbsp; <BR />&nbsp;&nbsp;WIDTH=&#8221;100%&#8221; HEIGHT=&#8221;40&#8243;&nbsp; <BR />&nbsp;&nbsp;NAME=&#8221;header&#8221;&nbsp; <BR />&nbsp;&nbsp;flashvars=&#8221;u=&lt;%if radioResponder.flStaticRendering { <BR />&nbsp;&nbsp;&nbsp;return (string.urlencode(searchEngine.stripMarkup(now)))} <BR />&nbsp;&nbsp;&nbsp;else {return (&#8220;&#8221;)}%&gt;&#8221;&nbsp; <BR />&nbsp;&nbsp;ALIGN=&#8221;" TYPE=&#8221;application/x-shockwave-flash&#8221;&nbsp; <BR />&nbsp;&nbsp;PLUGINSPAGE=&#8221;<A href="http://www.macromedia.com/go/getflashplayer">http://www.macromedia.com/go/getflashplayer</A>&#8220;&gt;<BR />&nbsp;&lt;/EMBED&gt;<BR />&lt;/OBJECT&gt;</PRE>

  
The code (for the OBJECT tag) that passes the data from Radio to Flash is:
<PRE>&lt;param name=&#8221;flashvars&#8221; <BR />&nbsp;value=&#8221;u=&lt;%if <BR />&nbsp;&nbsp;radioResponder.flStaticRendering {<BR />&nbsp;&nbsp;return (string.urlencode(searchEngine.stripMarkup(now)))} <BR />&nbsp;&nbsp;else {return (&#8220;&#8221;)}%&gt;&#8221;&gt;</PRE>

  
Notice that we embed a [Radio macro][5] within the HTML code.  
Two other things to note. First, we are storing the last updated string in a variable called u (which, btw is a bad naming convention on my part). Secondly, we URL encode the string using the radio string.urlencode function.  
There is one problem with the code above though. If there are any line returns with the OBJECT tags, Radio will place HTML formating, which will break the tags. Because of this, you must remove all line returns from the HTML code, which in essence places it all on one line.&nbsp;  
Update : [Dave Winer][6] sent along this [link][7], which shows how to workaround the issue of Radio inserting HTML markup into your code.
<PRE>&lt;param name=&#8221;flashvars&#8221; value=&#8221;u=5%2F5%2F2002;%209%3A21%3A42%20PM&#8221;&gt;</PRE>

  
which is a URL encoded string of the last updated date / time.  
Within our Flash movie, we have a text field with an instance name of &#8220;updated&#8221; that will be used to display the last updated time.  
Here is all of the code necessary to place the data in the field:
<PRE>updated.text = &#8220;Updated : &#8221; + u;</PRE>

  
This says that the text in the updated field should be the string &#8220;Updated &#8221; plus the value of the variable u (which was passed in through the flashvars tag).  
Pretty simple, heh? Of course, this is a very simple example, but using this technique, you could theoretically create an entire weblog in Flash that is&nbsp; managed by Radio (although I am not sure that you would want to).  
If you have any comments, corrections or suggestions, please post them in the comments section.  
Update : Thanks to Greg Burch for pointing out&nbsp;an error&nbsp;(its flashvars and not flashvar).

 [1]: http://radio.userland.com
 [2]: http://www.macromedia.com/flash/
 [3]: http://www.macromedia.com/desdev/articles/xml_resource_feed.html
 [4]: http://127.0.0.1:5335/system/pages/prefs?page=3.1
 [5]: http://127.0.0.1:5335/system/pages/help?page=13.1
 [6]: http://www.scriptingnews.com
 [7]: http://radio.userland.com/textEditingCheatSheet#automaticParagraphTags