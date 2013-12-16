---
title: Connecting to an XMPP / Jabber Server with the XIFF AS3 Library
author: mikechambers
date: 2008-08-14 12:09:01 -0800
layout: post
permalink: /2008/08/14/connecting-to-an-xmpp-jabber-server-with-the-xiff-as3-library/
categories:
  - General
---


As I mentioned earlier, I am starting to build an XMPP chat client for the [XMPP / Jabber community server I set up today][1]. I am using the [XIFF ActionScript 3 library][2]. While the library seems to be pretty solid, there is not a ton of documentation for it right now.  
<!--more-->

  
Here is a simple example that shows how to connect to an XMPP / Jabber server, join a room, and send a message to the room. The example assumes that you already have a username and password on the server (I havent figured out how to get it to connect anonymously yet):

<div class="highlight">
  <pre><span style="color: #408080; font-style: italic">// ActionScript file</span>
<span style="color: #008000; font-weight: bold">import</span> org.jivesoftware.xiff.conference.Room<span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">import</span> org.jivesoftware.xiff.core.JID<span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">import</span> org.jivesoftware.xiff.core.XMPPSocketConnection<span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">import</span> org.jivesoftware.xiff.events.LoginEvent<span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">import</span> org.jivesoftware.xiff.events.RoomEvent<span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">import</span> org.jivesoftware.xiff.events.XIFFErrorEvent<span style="color: #666666">;</span>

<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> connection<span style="color: #666666">:</span>XMPPSocketConnection<span style="color: #666666">;</span>

<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onCreationComplete()<span style="color: #666666">:</span>void
{
	connection <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> XMPPSocketConnection();
	connection.username <span style="color: #666666">=</span> <span style="color: #BA2121">"test"</span><span style="color: #666666">;</span>
	connection.password <span style="color: #666666">=</span> <span style="color: #BA2121">"test"</span><span style="color: #666666">;</span>
	connection.server <span style="color: #666666">=</span> <span style="color: #BA2121">"mesh.local"</span><span style="color: #666666">;</span>
	connection.port <span style="color: #666666">=</span> <span style="color: #666666">5222;</span>
	
	connection.addEventListener(LoginEvent.LOGIN<span style="color: #666666">,</span> onLogin);
    connection.addEventListener(XIFFErrorEvent.XIFF_ERROR<span style="color: #666666">,</span> onError);	
	
	connection.connect(<span style="color: #BA2121">"standard"</span>);
}

<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onLogin(e<span style="color: #666666">:</span>LoginEvent)<span style="color: #666666">:</span>void
{
	<span style="color: #008000; font-weight: bold">var</span> room<span style="color: #666666">:</span>Room <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Room(connection);
	room.roomJID <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> JID(<span style="color: #BA2121">"test@conference.mesh.local"</span>);
	room.addEventListener(RoomEvent.ROOM_JOIN<span style="color: #666666">,</span> onRoomJoin);
	room.join();
}

<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onRoomJoin(e<span style="color: #666666">:</span>RoomEvent)<span style="color: #666666">:</span>void
{
	Room(e.target).sendMessage(<span style="color: #BA2121">"im here"</span>);
}

<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onError(e<span style="color: #666666">:</span>XIFFErrorEvent)<span style="color: #666666">:</span>void
{
	<span style="color: #0000FF">trace</span>(e.errorCode);
}
</pre>
</div>

Thanks go out to Mitchell Hashimoto who helped me figure this out over on the [XIFF forums][3].

 [1]: http://www.mikechambers.com/blog/2008/08/14/flash-platform-community-chat-xmpp-jabber-server/
 [2]: http://www.igniterealtime.org/projects/xiff/
 [3]: http://www.igniterealtime.org/community/message/177071