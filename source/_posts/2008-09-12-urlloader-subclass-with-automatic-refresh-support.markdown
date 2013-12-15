---
title: URLLoader subclass with automatic refresh support
author: mikechambers
layout: post
permalink: /2008/09/12/urlloader-subclass-with-automatic-refresh-support/
categories:
  - General
---


[Chris Hayen twittered][1] to me this morning expressing his wish that the ActionScript 3 [URLLoader][2] class had a `refreshInterval` property. I [responded][3] that this should be pretty simple to add by extending the class. Well, I had a little time while I download some internal software builds, so I put together a class that adds a `refreshInterval` property.

This has not been tested very much. In fact, I have only tested when the data loads successfully from the server. However, I wanted to post an early / rough version here with the hope that I get feedback on it. If the consensus is that this could be useful, then I will look at making it more solid, and adding it to the [as3corelib library][4].

The class adds two new public APIs:  
<!--more-->

*   **refreshInterval** Number is milliseconds on how often the data should be loaded.
*   **callIsActive** Boolean that indicates whether the instances is currently in the process of loading data from the server.

Here is the class:

<div class="highlight">
  <pre>package
{
	<span style="color: #008000; font-weight: bold">import</span> flash.events.Event<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.events.IOErrorEvent<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.events.SecurityErrorEvent<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.events.TimerEvent<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.net.URLLoader<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.net.URLRequest<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.utils.Timer<span style="color: #666666">;</span>

	<span style="color: #408080; font-style: italic">/*</span>
<span style="color: #408080; font-style: italic">	 *	Class that adds an option to automatically have the data reloaded at</span>
<span style="color: #408080; font-style: italic">	 *	specified intervals.</span>
<span style="color: #408080; font-style: italic">	 */</span>
	<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">class</span> URLLoader2 <span style="color: #008000; font-weight: bold">extends</span> URLLoader
	{
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> _refreshInterval<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> <span style="color: #666666">0;</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> timer<span style="color: #666666">:</span>Timer<span style="color: #666666">;</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> lastRequest<span style="color: #666666">:</span>URLRequest<span style="color: #666666">;</span>
		
		<span style="color: #408080; font-style: italic">//make this public</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> _callIsActive<span style="color: #666666">:</span><span style="color: #008000">Boolean</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">false</span><span style="color: #666666">;</span>
		
		<span style="color: #408080; font-style: italic">/*</span>
<span style="color: #408080; font-style: italic">			Constructor</span>
<span style="color: #408080; font-style: italic">		*/</span>
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> URLLoader2(request<span style="color: #666666">:</span>URLRequest<span style="color: #666666">=</span><span style="color: #008000; font-weight: bold">null</span>)
		{			
			<span style="color: #408080; font-style: italic">//store last request used</span>
			lastRequest <span style="color: #666666">=</span> request<span style="color: #666666">;</span>
			
			<span style="color: #408080; font-style: italic">//register for events </span>
			addListeners();
			
			<span style="color: #408080; font-style: italic">//call base class constructor</span>
			<span style="color: #008000; font-weight: bold">super</span>(request);
		}
		
		<span style="color: #408080; font-style: italic">/********** public setters / getters **************/</span>
		
		<span style="color: #408080; font-style: italic">/*</span>
<span style="color: #408080; font-style: italic">			Refresh interval in milliseconds.</span>
<span style="color: #408080; font-style: italic">			</span>
<span style="color: #408080; font-style: italic">			If equal to or less than 0, data will not be reloaded.</span>
<span style="color: #408080; font-style: italic">			</span>
<span style="color: #408080; font-style: italic">			note: currently refresh timer starts from the time that the request</span>
<span style="color: #408080; font-style: italic">			goes to the server, not from when the request changes. Should this </span>
<span style="color: #408080; font-style: italic">			change?</span>
<span style="color: #408080; font-style: italic">		*/</span>
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> set refreshInterval(value<span style="color: #666666">:</span><span style="color: #008000">Number</span>)<span style="color: #666666">:</span>void
		{
			_refreshInterval <span style="color: #666666">=</span> value<span style="color: #666666">;</span>
		}
		
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> get refreshInterval()<span style="color: #666666">:</span><span style="color: #008000">Number</span>
		{
			<span style="color: #008000; font-weight: bold">return</span> _refreshInterval<span style="color: #666666">;</span>	
		}
		
		<span style="color: #408080; font-style: italic">//read only, whether the class is currently in process of loading data</span>
		<span style="color: #408080; font-style: italic">//from server</span>
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> get callIsActive()<span style="color: #666666">:</span><span style="color: #008000">Boolean</span>
		{
			<span style="color: #008000; font-weight: bold">return</span> _callIsActive<span style="color: #666666">;</span>
		}
		
		<span style="color: #408080; font-style: italic">/************* public methods ***************/</span>
		
		<span style="color: #408080; font-style: italic">//overriden load method</span>
		<span style="color: #008000; font-weight: bold">public</span> override <span style="color: #008000; font-weight: bold">function</span> load(request<span style="color: #666666">:</span>URLRequest)<span style="color: #666666">:</span>void
		{
			<span style="color: #408080; font-style: italic">//might need to listen for some of the status codes</span>
			stopTimer();
			
			<span style="color: #408080; font-style: italic">//store the last request so we can reuse it</span>
			lastRequest <span style="color: #666666">=</span> request<span style="color: #666666">;</span>
			
			<span style="color: #408080; font-style: italic">//call load to make the request</span>
			<span style="color: #008000; font-weight: bold">super</span>.load(request);
			
			<span style="color: #408080; font-style: italic">//start the timer for the reload</span>
			startTimer();
			
			<span style="color: #408080; font-style: italic">//set that the class is in the process of communicating with the server</span>
			_callIsActive <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">;</span>
		}
		
		<span style="color: #408080; font-style: italic">//overriden close method</span>
		<span style="color: #008000; font-weight: bold">public</span> override <span style="color: #008000; font-weight: bold">function</span> close()<span style="color: #666666">:</span>void
		{
			stopTimer();
			_callIsActive <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">false</span><span style="color: #666666">;</span>
			<span style="color: #008000; font-weight: bold">super</span>.close();
		}
		
		<span style="color: #408080; font-style: italic">//private api to stop the timer</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> stopTimer()<span style="color: #666666">:</span>void
		{
			<span style="color: #008000; font-weight: bold">if</span>(timer <span style="color: #666666">!=</span> <span style="color: #008000; font-weight: bold">null</span>)
			{
				<span style="color: #408080; font-style: italic">//clear the timer. We need to do this instead of reuse it</span>
				<span style="color: #408080; font-style: italic">//in case the refreshInterval  changes the next time we use it.</span>
				<span style="color: #408080; font-style: italic">//although we could potentially check that when we start the</span>
				<span style="color: #408080; font-style: italic">//timer</span>
				timer.stop();
				timer <span style="color: #666666">==</span> <span style="color: #008000; font-weight: bold">null</span><span style="color: #666666">;</span>
			}
		}
		
		<span style="color: #408080; font-style: italic">//private api to start the timer</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> startTimer()<span style="color: #666666">:</span>void
		{
			<span style="color: #408080; font-style: italic">//make sure the timer is stopped firest</span>
			stopTimer();
			
			<span style="color: #408080; font-style: italic">//if call to server is active, then dont refresh</span>
			<span style="color: #408080; font-style: italic">//should we queue this up?</span>
			<span style="color: #408080; font-style: italic">//if refresh interval is less than or equal to zero dont refresh</span>
			<span style="color: #008000; font-weight: bold">if</span>(_refreshInterval <span style="color: #666666">&lt;=</span> <span style="color: #666666"></span> <span style="color: #666666">||</span> _callIsActive)
			{
				<span style="color: #008000; font-weight: bold">return</span><span style="color: #666666">;</span>
			}
			
			
			<span style="color: #408080; font-style: italic">//create new timer instance</span>
			<span style="color: #408080; font-style: italic">//note, we could check if the existing timer instance can be used</span>
			timer <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Timer(_refreshInterval);
			timer.addEventListener(TimerEvent.TIMER<span style="color: #666666">,</span> onTimer);
			
			<span style="color: #408080; font-style: italic">//start the timer</span>
			timer.start();
		}
		
		<span style="color: #408080; font-style: italic">//adds listeners for loading events</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> addListeners()<span style="color: #666666">:</span>void
		{
			addEventListener(Event.COMPLETE<span style="color: #666666">,</span> onComplete);
			addEventListener(IOErrorEvent.IO_ERROR<span style="color: #666666">,</span> onIOError);
			addEventListener(SecurityErrorEvent.SECURITY_ERROR<span style="color: #666666">,</span> onSecurityError);
		}
		
		<span style="color: #408080; font-style: italic">/*********** private event handlers ******************/</span>
		
		
		<span style="color: #408080; font-style: italic">//event hander when timer interval is fired</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onTimer(e<span style="color: #666666">:</span>TimerEvent)<span style="color: #666666">:</span>void
		{
			<span style="color: #408080; font-style: italic">//callIsActive should never be true here, but should we check it</span>
			<span style="color: #408080; font-style: italic">//anyways?</span>
			
			<span style="color: #408080; font-style: italic">//load the last request</span>
			load(lastRequest);
		}
		
		<span style="color: #408080; font-style: italic">//called when data is succesfully loaded</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onComplete(e<span style="color: #666666">:</span>Event)<span style="color: #666666">:</span>void
		{
			_callIsActive <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">false</span><span style="color: #666666">;</span>
			startTimer();
		}
		
		<span style="color: #408080; font-style: italic">//called if there is an error loading data</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onIOError(e<span style="color: #666666">:</span>IOErrorEvent)<span style="color: #666666">:</span>void
		{
			_callIsActive <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">false</span><span style="color: #666666">;</span>
			startTimer();
		}
		
		<span style="color: #408080; font-style: italic">//called if there is a security error loading data</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onSecurityError(e<span style="color: #666666">:</span>SecurityErrorEvent)<span style="color: #666666">:</span>void
		{
			_callIsActive <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">false</span><span style="color: #666666">;</span>
			startTimer();
		}
	}
}
</pre>
</div>

Here is a simple example of using the class (it is pretty much the same as using `URLLoader`):

<div class="highlight">
  <pre>package {
	<span style="color: #008000; font-weight: bold">import</span> flash.display.Sprite<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.events.Event<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.events.IOErrorEvent<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.events.SecurityErrorEvent<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.net.URLRequest<span style="color: #666666">;</span>

	<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">class</span> URLLoaderRefreshTest <span style="color: #008000; font-weight: bold">extends</span> Sprite
	{
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> URLLoaderRefreshTest()
		{
			<span style="color: #008000; font-weight: bold">var</span> r<span style="color: #666666">:</span>URLRequest <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> URLRequest(<span style="color: #BA2121">"http://feeds.feedburner.com/MikeChambers/"</span>);
			
			<span style="color: #008000; font-weight: bold">var</span> u<span style="color: #666666">:</span>URLLoader2 <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> URLLoader2();
				u.addEventListener(Event.COMPLETE<span style="color: #666666">,</span> onComplete);
				u.addEventListener(IOErrorEvent.IO_ERROR<span style="color: #666666">,</span> onIOError);
				u.addEventListener(SecurityErrorEvent.SECURITY_ERROR<span style="color: #666666">,</span> onSecurityError);
				
				u.refreshInterval <span style="color: #666666">=</span> <span style="color: #666666">3000;</span>
				
				u.load(r);
		}
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onComplete(e<span style="color: #666666">:</span>Event)<span style="color: #666666">:</span>void
		{
			<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"oncomplete"</span>);
		}
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onIOError(e<span style="color: #666666">:</span>IOErrorEvent)<span style="color: #666666">:</span>void
		{
			<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"onioerror"</span>);
		}
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onSecurityError(e<span style="color: #666666">:</span>SecurityErrorEvent)<span style="color: #666666">:</span>void
		{
			<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"onsecurityerror"</span>);
		}
		
	}
}
</pre>
</div>

Couple of notes:

*   The class needs a better name. Any suggestions?
*   Class is currently in default package
*   Currently, the refresh countdown starts at the beginning of the data load, and not the end. Thoughts?
*   Even if `refreshInterval` is 0 and refreshing not being used, I keep references to data loading events. This is small bit of extra overhead (in cases where data is not being refreshed), but simplifies the code.
*   If a refresh interval is reached and the instance is still communicating with the server, the refresh will be skipped.
*   Class has had very little testing, especially in cases where an error occurs from loading the data (so there are probably some bugs and logic errors).

So, if you have any suggestions for improvements, find any bugs, or think it is (or isnt) useful, post them in the comments.

 [1]: http://twitter.com/chayen/statuses/918906248
 [2]: http://livedocs.adobe.com/flex/3/langref/flash/net/URLLoader.html
 [3]: http://twitter.com/mesh/statuses/919232933
 [4]: http://code.google.com/p/as3corelib/