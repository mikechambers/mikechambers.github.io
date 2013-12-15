---
title: Adding custome query argument support to jQuery Autocomplete plugin
author: mikechambers
layout: post
permalink: /2008/09/03/adding-custome-query-argument-support-to-jquery-autocomplete-plugin/
categories:
  - General
---


I have been playing around with the [jQuery][1] [Autocomplete plugin][2] to get it working with the [ActionScript 3 documentation API][3] that I posted about earlier today.

The Autocomplete API is really nice, and pretty flexible, but one issue I ran into is that the query argument containing the user input that is passed to the server is hard coded to &#8220;q&#8221;. For my api, I needed this argument to be &#8220;api&#8221;.  
<!--more-->

  
The fix is actually pretty simple, although it does require a slight modification to the *jquery.autocomplete.js* file.

Here is a diff that shows the change for the AutoComplete library version 1.0.2:

`
<pre>340a341,343
> 			var o = {limit:options.max};
> 			o[(options.queryArgument)?options.queryArgument:"q"] = lastWord(term);			
> 			
348,351c351
< 				data: $.extend({
< 					q: lastWord(term),
< 					limit: options.max
< 				}, extraParams),
---
> 				data: $.extend(o, extraParams),
`</pre> 
You can then pass in the value that should be use for the query term like so:

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">var</span> url <span style="color: #666666">=</span> <span style="color: #BA2121">"http://as3reference.appspot.com/getapi?version=flex3"</span><span style="color: #666666">;</span>
$(<span style="color: #BA2121">"#example"</span>).autocomplete(url<span style="color: #666666">,</span> {
	 	matchCase<span style="color: #666666">:</span><span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">,</span>
		formatItem<span style="color: #666666">:</span>formatItem<span style="color: #666666">,</span>
		parse<span style="color: #666666">:</span>parse<span style="color: #666666">,</span>
		queryArgument<span style="color: #666666">:</span><span style="color: #BA2121">"api"</span>
	});
</pre>
</div>

If the queryArgument is not specified, then it defaults back to "q".

It looks like this [feature will be added in the next release][4].

Ill post the complete example working with the API shortly.

 [1]: http://jquery.com/
 [2]: http://bassistance.de/jquery-plugins/jquery-plugin-autocomplete/
 [3]: http://www.mikechambers.com/blog/2008/09/03/actionscript-3-api-service-on-google-app-engine/
 [4]: http://groups.google.com/group/jquery-en/browse_thread/thread/77da50f112fcfbb5/1448caf5592fff99?lnk=gst&q=autocomplete+q+#1448caf5592fff99