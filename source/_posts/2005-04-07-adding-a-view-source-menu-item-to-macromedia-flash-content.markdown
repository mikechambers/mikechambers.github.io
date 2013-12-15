---
title: Adding a View Source Menu item to Macromedia Flash Content
author: mikechambers
layout: post
permalink: /2005/04/07/adding-a-view-source-menu-item-to-macromedia-flash-content/
categories:
  - General
---


Yesterday [Lawrence Lessig][1] gave a talk at the FlashForward conference titled *[The Cost of Copyright][2]*. In it, he stressed the importance and necessity of a culture of sharing. Of course, the Flash community has grown up on this culture (i.e. [FlashKit][3], [layer 51][4]). However, all of the sharing usually goes on on a developer to developer level, as you cannot easily get the source from Flash content.

So, during the FlashForward keynote this morning, I put together a simple library that allows you to add a view source Menu item to your Flash content. This makes it easy to allow other developers and designers to view the source for your content (if you want them to be able to).

Updated : I have updated the code and examples to allow allow you to specify a link to the license for the Flash content.

Here is an example:  
<!--more-->

  


Just right click on the Flash movie and select the View Source Menu item. This will allow you to download the source code.

In this case I have Zipped up all of the files including the FLA, but I could also link directly to an ActionScript text file, or another HTML page that links to the source.

Usage :

Place the viewFlashSource.as file in the same directory as your Flash source file (FLA), and add the following line to the main timeline of your source file:

`
<pre>#include viewFlashSource.as</pre>
<p>`

You can then specify the source URL through the flashParams  
HTML tag / attribute.  
There are two values you can specify:

flashSource : Points to a URL to download the source for the contnet.  
contentLicense : Points to the distribution / re-use license for the content.

`
<pre><embed src="example.swf"
    quality="high"
    bgcolor="#ffffff"
    width="550" 
    height="400" 
    name="example" 
    align="middle" 
    allowScriptAccess="sameDomain"
    type="application/x-shockwave-flash" 
    pluginspage="http://www.macromedia.com/go/getflashplayer"
    flashVars="flashSource=example%2Efla&#038;contentLicense=http%3A%2F%2Fcreativecommons%2Eorg%2Flicenses%2Fby%2F2%2E0%2F"/></pre>
<p>`

You can download the source and example [here][5].

I put this together pretty quckly so I am sure there are tons of ways it can be improved. I am sure that the Flash Community will be able to make this a lot better, so I am releasing this under a [creative commons][6] license.

I know that the CC licenses are normally not code oriented, but they are so clear and easy to understand, I decided to use it anyways.

<!-- Creative Commons License -->

  
<a rel="license" href="http://creativecommons.org/licenses/by/2.0/"><img alt="Creative Commons License" border="0" src="http://creativecommons.org/images/public/somerights20.gif" /></a>  
This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/2.0/">Creative Commons License</a>.  
<!-- /Creative Commons License -->

<!--</p>

<rdf:RDF xmlns="http://web.resource.org/cc/"  
xmlns:dc="http://purl.org/dc/elements/1.1/"  
xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">  
<Work rdf:about=""><license rdf:resource="http://creativecommons.org/licenses/by/2.0/" /> </Work>

<License rdf:about="http://creativecommons.org/licenses/by/2.0/"><permits rdf:resource="http://web.resource.org/cc/Reproduction" /> <permits rdf:resource="http://web.resource.org/cc/Distribution" /> <requires rdf:resource="http://web.resource.org/cc/Notice" />

  
<requires rdf:resource="http://web.resource.org/cc/Attribution" /></p> <permits rdf:resource="http://web.resource.org/cc/DerivativeWorks" /> </License></p> 
</rdf:RDF>

&#8211;>

 [1]: http://www.lessig.org/blog/
 [2]: http://www.flashforwardconference.com/default.asp?Location=15,120,673,849&ItemID=422&SessionID={8E315B32-F643-4AE6-A921-FC012688B9AF}
 [3]: http://www.flashkit.com
 [4]: http://proto.layer51.com/default.aspx
 [5]: /mesh/files/viewflashsource/viewFlashSource.zip
 [6]: http://www.creativecommons.org