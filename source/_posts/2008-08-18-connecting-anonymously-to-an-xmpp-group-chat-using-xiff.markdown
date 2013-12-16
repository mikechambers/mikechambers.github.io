---
title: Connecting Anonymously to an XMPP Group Chat using XIFF
author: mikechambers
date: 2008-08-18 12:11:01 -0800
layout: post
permalink: /2008/08/18/connecting-anonymously-to-an-xmpp-group-chat-using-xiff/
categories:
  - General
---


I posted some code the other day that showed [how to use the XIFF AS3 Library to connect to an XMPP server and join a group chat room][1].

Below is an slightly modified example that shows how to login anonymously, and connect to a room.  
<!--more-->

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">import</span> org.jivesoftware.xiff.conference.Room<span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">import</span> org.jivesoftware.xiff.core.JID<span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">import</span> org.jivesoftware.xiff.core.XMPPSocketConnection<span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">import</span> org.jivesoftware.xiff.events.LoginEvent<span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">import</span> org.jivesoftware.xiff.events.RoomEvent<span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">import</span> org.jivesoftware.xiff.events.XIFFErrorEvent<span style="color: #666666">;</span>

<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> connection<span style="color: #666666">:</span>XMPPSocketConnection<span style="color: #666666">;</span>

<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onCreationComplete()<span style="color: #666666">:</span>void
{
	connection <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> XMPPSocketConnection();
	connection.useAnonymousLogin <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">;</span>
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
	room.nickname <span style="color: #666666">=</span> <span style="color: #BA2121">"frank"</span><span style="color: #666666">;</span>
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

The two differences are that you set:

<div class="highlight">
  <pre>connection.useAnonymousLogin <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">true</span><span style="color: #666666">;</span>
</pre>
</div>

and dont send a username and password. Once you join the room, you can then set your nick like so:

<div class="highlight">
  <pre>room.nickname <span style="color: #666666">=</span> <span style="color: #BA2121">"frank"</span><span style="color: #666666">;</span>
</pre>
</div>

I have set up a [test chat room on my server][2] if you want to play around with the code.

 [1]: http://www.mikechambers.com/blog/2008/08/14/connecting-to-an-xmpp-jabber-server-with-the-xiff-as3-library/
 [2]: http://www.mikechambers.com/blog/2008/08/18/community-test-xmpp-jabber-room/