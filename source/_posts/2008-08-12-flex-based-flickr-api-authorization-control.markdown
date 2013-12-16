---
title: Flex based Flickr API Authorization control
author: mikechambers
date: 2008-08-12 12:18:01 -0800
layout: post
permalink: /2008/08/12/flex-based-flickr-api-authorization-control/
categories:
  - General
---


I just checked in some updates to the [ActionScript 3 Flickr library][1]. The biggest change is that I checked in a Flex control that will provide a UI and handle all of the communication to authorize an application with Flickr.

There is no documentation on it, and as I have built it for projects I am using, there are probably some API gaps, but it seems to be pretty solid.

[<img src="http://farm4.static.flickr.com/3150/2759026262_d26bd78437.jpg" width="460" height="289" alt="Flickr API Auth Flex Component" />][2]

Here is a simple example of how to use it:  
<!--more-->

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">import</span> com.adobe.webapis.flickr.authorization.events.AuthorizationEvent<span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">import</span> com.adobe.webapis.flickr.authorization.AuthorizationView<span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">import</span> mx.core.IFlexDisplayObject<span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">import</span> mx.managers.PopUpManager<span style="color: #666666">;</span>

<span style="color: #408080; font-style: italic">//open the authorization panel</span>
<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> openAuthorization()<span style="color: #666666">:</span>void
{
	<span style="color: #008000; font-weight: bold">var</span> p<span style="color: #666666">:</span>IFlexDisplayObject <span style="color: #666666">=</span> PopUpManager.createPopUp(<span style="color: #008000; font-weight: bold">this</span><span style="color: #666666">,</span> AuthorizationView<span style="color: #666666">,</span> <span style="color: #008000; font-weight: bold">true</span>);
	
	<span style="color: #008000; font-weight: bold">var</span> auth<span style="color: #666666">:</span>AuthorizationView <span style="color: #666666">=</span> AuthorizationView(p);
	
	<span style="color: #408080; font-style: italic">//get this from flickr</span>
	auth.flickrAPIKey <span style="color: #666666">=</span> <span style="color: #BA2121">"XXXXXXXXXXXXXXXXXXXXX"</span><span style="color: #666666">;</span>
	
	<span style="color: #408080; font-style: italic">//get from flickr</span>
	auth.flickrAPISecret <span style="color: #666666">=</span> <span style="color: #BA2121">"XXXXXXXXXXXXXXXXXXXX"</span><span style="color: #666666">;</span>
	auth.isPopUp <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">false</span><span style="color: #666666">;</span>
	
	p.addEventListener(Event.CLOSE<span style="color: #666666">,</span> onAuthorizationClose);
	p.addEventListener(AuthorizationEvent.AUTHORIZATION_COMPLETE<span style="color: #666666">,</span> onAuthorizationComplete);

	PopUpManager.centerPopUp(p);	
}

<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onAuthorizationClose(e<span style="color: #666666">:</span>Event)<span style="color: #666666">:</span>void
{
	PopUpManager.removePopUp(IFlexDisplayObject(e.target));
}

<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onAuthorizationComplete(e<span style="color: #666666">:</span>AuthorizationEvent)<span style="color: #666666">:</span>void
{
	<span style="color: #0000FF">trace</span>(e.authToken);
	<span style="color: #0000FF">trace</span>(e.user.username);
}
</pre>
</div>

Basically, this will open a panel that walks the user through the authorization steps (which requires a visit to the Flickr site in the user&#8217;s browser). Once the authorization is complete, an event is thrown with the authorization token (which should then be saved between app sessions).

[<img src="http://farm4.static.flickr.com/3287/2759026402_4e30f87285.jpg" width="460" height="289" alt="Flickr API Auth Flex Component" />][3]

The api requires that your app have an api key and secret key, both of which you can grab from flickr at:  
<http://www.flickr.com/services/api/keys/apply/>

[<img src="http://farm4.static.flickr.com/3021/2759026440_a25956e583.jpg" width="460" height="289" alt="Flickr API Auth Flex Component" />][4]

If you run into any issues, or have any suggestions either log a bug on the [flickr lib project site][5], or post a comment here. Plus, if anyone thinks that can make the UI look prettier, just ping me.

 [1]: http://code.google.com/p/as3flickrlib/
 [2]: http://www.flickr.com/photos/mikechambers/2759026262/ "Flickr API Auth Flex Component by mike.chambers, on Flickr"
 [3]: http://www.flickr.com/photos/mikechambers/2759026402/ "Flickr API Auth Flex Component by mike.chambers, on Flickr"
 [4]: http://www.flickr.com/photos/mikechambers/2759026440/ "Flickr API Auth Flex Component by mike.chambers, on Flickr"
 [5]: http://code.google.com/p/as3flickrlib/issues/list