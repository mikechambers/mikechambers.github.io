---
title: Implementing Offline Web Content with Gears LocalServer API
author: mikechambers
layout: post
permalink: /2008/09/05/implimenting-offline-web-content-with-gears-localserver-api/
categories:
  - General
---


I spent the afternoon playing around with [Google Gears][1] in order to get a basic feel for how it works. Specifically, I wanted to see how much work it would take to add support for offline viewing for [tostring.org][2] (an online book site).

I used the [Gears LocalServer API][3] which &#8220;allows a web application to cache and serve its HTTP resources locally, without a network connection&#8221;. The implementation can be though of as a small web server that intercepts requests for remote resources and serves them (seamlessly) from a local cache. This has a couple of advantages:  
<!--more-->

*   Can access content offline
*   Even when online, content is pulled from cache, so access is very fast

The main disadvantages are related to #2. Since content is pulled from the local cache, even when online, users may view stale content. This can also make it a bit of a hassle to develop, as you have to remember to clear the Gears cache of the content when trying to view changes.

Gears will periodically check for updated content and sync anything that is updated. It also provides an API to allow developers to force checks for new content, as well as fine grained control over what content is cached / synced locally.

It took me most of the afternoon to implement the functionality, but the vast majority of that time was spent writing python and [Django][4] code (which I was a little rusty on), and learning some of the [jQuery JavaScript library][5] which I used to provide visual feedback while the syncing was occurring. The actual Gears implementation was pretty trivial and took maybe a total of 30 minutes (which included learning the APIs and implementing them).

Here is the complete JavaScript code (half of which provides feedback to the user while the pages are being synced).

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">function</span> hasGears()
{
	<span style="color: #008000; font-weight: bold">return</span> (<span style="color: #008000">window</span>.google <span style="color: #666666">&&</span> google.gears);
}

<span style="color: #008000; font-weight: bold">function</span> updateProgressField(msg)
{
	$(<span style="color: #BA2121">&#39;#progress&#39;</span>).text(msg);
}

<span style="color: #008000; font-weight: bold">function</span> onSyncProgress(event)
{
	updateProgressField(<span style="color: #008000">Math</span>.ceil(((event.filesComplete <span style="color: #666666">/</span> event.filesTotal) <span style="color: #666666">*</span> <span style="color: #666666">100</span>)) <span style="color: #666666">+</span> <span style="color: #BA2121">"%"</span>);
}

<span style="color: #008000; font-weight: bold">function</span> onSyncComplete()
{
	updateProgressField(<span style="color: #BA2121">"Sync Complete."</span>);
}

<span style="color: #008000; font-weight: bold">function</span> onSyncError(event)
{
	updateProgressField(<span style="color: #BA2121">"Error Syncing."</span>);
}

<span style="color: #008000; font-weight: bold">function</span> storeForOffline()
{
	<span style="color: #008000; font-weight: bold">var</span> localServer <span style="color: #666666">=</span> google.gears.factory.create(<span style="color: #BA2121">&#39;beta.localserver&#39;</span>);
	<span style="color: #008000; font-weight: bold">var</span> store <span style="color: #666666">=</span> localServer.createManagedStore(<span style="color: #BA2121">&#39;tostring-store&#39;</span>);
	store.manifestUrl <span style="color: #666666">=</span> <span style="color: #BA2121">&#39;/gearsmanifest&#39;</span><span style="color: #666666">;</span>
	store.onerror <span style="color: #666666">=</span> onSyncError<span style="color: #666666">;</span>
	store.oncomplete <span style="color: #666666">=</span> onSyncComplete<span style="color: #666666">;</span>
	store.onprogress <span style="color: #666666">=</span> onSyncProgress
	store.checkForUpdate();
}

<span style="color: #008000; font-weight: bold">function</span> onStoreClick(event)
{
	event.preventDefault();
	storeForOffline();
}

<span style="color: #008000; font-weight: bold">function</span> onReady()
{
	<span style="color: #008000; font-weight: bold">if</span>(hasGears())
	{
		$(<span style="color: #BA2121">"#offline_span"</span>).css(<span style="color: #BA2121">"visibility"</span><span style="color: #666666">,</span> <span style="color: #BA2121">"visible"</span>);
		$(<span style="color: #BA2121">"#offline_span"</span>).click(onStoreClick);
	}
}

$(<span style="color: #008000">document</span>).ready(onReady);
</pre>
</div>

When a user who has Gears installed visits the site they are be presented with a link titled &#8220;Save Offline&#8221; (top right). Users who do not have Gears will not see this link. If the user clicks the link, they are presented with a Gears dialog asking for permission (I can customize this, but did not). If they allow the action, then the Gears library loads a JSON based manifest file with information on how the site should be synced (including which specific resources should be included).

[<img src="http://farm4.static.flickr.com/3207/2830229344_fb97c0005a.jpg" width="398" height="242" alt="Gears permission prompt" border="0" />][6]

You can view the full manifest for tostring.org at:

<http://www.tostring.org/gearsmanifest>

Here is a snippet:

<div class="highlight">
  <pre>{<span style="color: #BA2121">"betaManifestVersion"</span><span style="color: #666666">:</span> <span style="color: #666666">1,</span>
<span style="color: #BA2121">"version"</span><span style="color: #666666">:</span> <span style="color: #BA2121">"2008-08-27 14:18:04"</span><span style="color: #666666">,</span>
<span style="color: #BA2121">"entries"</span><span style="color: #666666">:</span> [
	{<span style="color: #BA2121">"url"</span><span style="color: #666666">:</span><span style="color: #BA2121">"/"</span>}<span style="color: #666666">,</span>
	{<span style="color: #BA2121">"url"</span><span style="color: #666666">:</span><span style="color: #BA2121">"/translating/"</span>}<span style="color: #666666">,</span>
	{<span style="color: #BA2121">"url"</span><span style="color: #666666">:</span><span style="color: #BA2121">"/about/"</span>}<span style="color: #666666">,</span>
	{<span style="color: #BA2121">"url"</span><span style="color: #666666">:</span><span style="color: #BA2121">"/dmedia/books/scripts/grids-min.css"</span>}<span style="color: #666666">,</span>
	{<span style="color: #BA2121">"url"</span><span style="color: #666666">:</span><span style="color: #BA2121">"/dmedia/books/css/styles.css"</span>}<span style="color: #666666">,</span>
	{<span style="color: #BA2121">"url"</span><span style="color: #666666">:</span><span style="color: #BA2121">"/dmedia/books/scripts/jquery.min.js"</span>}<span style="color: #666666">,</span>
	{ <span style="color: #BA2121">"url"</span><span style="color: #666666">:</span> <span style="color: #BA2121">"/books/adobe-air-for-javascript-developers-pocketguide/1.0/sv/introduktion-till-adobe-air/"</span>}<span style="color: #666666">,</span>
]}
</pre>
</div>

Gears remembers the version string, and periodically checks to see if it has changed. If it has, it will resync the content (you can do some more advanced stuff with server responses to tell Gears that a particular piece of content has not been updated).

While the content is syncing, I present a small progress indicator to the user.

Once the sync is complete, the content is viewed from the cache, regardless of whether the user is online or offline. You can test this in Firefox via File > Work Offline.

All in all, it was very easy to implement and I am impressed with the results.

Couple of issues:

*   There does not appear to be a way to detect whether the page is running online or offline, and [it doesnt look like Google plans to add it][7]. It is definitely a tricky problem, but I think that Adobe AIR handles it well, and at least makes it easier for the develop.
*   There is not a way to detect whether content has already been cached (at least not without prompting another security dialog)
*   There is no indication or UI indicating whether you are viewing &#8220;live&#8221; content or cached content.
*   You can only cache / sync pages from the same domain that the web page originated from. This means is you are loading any remote libraries or resources (such as remote JavaScript libraries), you will need to start hosting them yourself if you want them to be synced with your content.

It seems that calling any of the APIs will result in a security / permission dialog being raised (even though some of the docs suggest otherwise). Which ist the best experience when using multiple APIs.

One interesting thing about the API is that it can be used for more than just making web content available offline. You could also use to to cache frequently used assets to:

*   Speed of loading of web pages and applications
*   Reduce load and bandwith on the server

Indeed, [WordPress is using Gears][8] to help make their admin application more responsive.

The next step will be to add a desktop shortcut for the application using the [Desktop API][9]. This also looks to be pretty trivial although I am concerned that the user might be presented with two permission dialogs.

If you have Gears installed, you can see this example in action at [tostring.org][2].

If you have any questions or suggestions, or find any errors in my code (likely), then post them in the comments.

 [1]: http://gears.google.com/
 [2]: http://www.tostring.org
 [3]: http://code.google.com/apis/gears/api_localserver.html
 [4]: http://www.djangoproject.org
 [5]: http://jquery.com/
 [6]: http://www.flickr.com/photos/mikechambers/2830229344/ "Gears permission prompt by mike.chambers, on Flickr"
 [7]: http://code.google.com/apis/gears/gears_faq.html#isOnlineFunction
 [8]: http://en.blog.wordpress.com/2008/07/02/gears/
 [9]: http://code.google.com/apis/gears/api_desktop.html