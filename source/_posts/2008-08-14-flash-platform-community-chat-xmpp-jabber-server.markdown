---
title: Flash Platform Community Chat XMPP / Jabber Server
author: mikechambers
date: 2008-08-14 12:10:01 -0800
layout: post
permalink: /2008/08/14/flash-platform-community-chat-xmpp-jabber-server/
categories:
  - General
---


If you have been in the Flash community for a while, then you may remember a chat app that I worked on for Macromedia Central, named &#8220;Central Dev Chat&#8221;. This was a decent chat client, but the thing I liked about it the most, was that it provided an easy way for the community to hang out and chat about the Flash community and development.

Since then, I have tried a couple of solutions to bring a persistent chat back (including IRC) but haven&#8217;t found anything that is easy enough to use and administer. I spent the past week thinking about building a new chat system using AIR and Python, and then remembered that this problem has already been solved with with XMPP / Jabber.

So, I have setup an XMPP / Jabber server on my server and am going to experiment with using it as a community server, especially to host a chat room to talk about the Flash Platform.  
<!--more-->

  
Right now you need to access the room via an IM client with XMPP / Jabber support (I use [Adium][1]), although if there is interest, then I may build an AIR app to connect to the chat (which would make it super easy for anyone to join).

So, here is the server info:

**Server** : mikechambers.com  
**Port** : 5222

The server allows registration of new account via your IM client.

Here is the info for the chat room:

**Room name**: flashplatform_chat  
**Server** : conference.mikechambers.com

Note : You may get a warning that the certificate cannot be verified. Just ignore it (I am looking into how to fix it).

If your IM client supports it, then you can just click the link below:

<xmpp:flashplatform_chat@conference.mikechambers.com?join>

You can find a list of IM client which support XMPP / Jabber [here][2].

This is an experiment, so especially at first, the server may go up and down, and accounts may get reset. However, if it proves useful, then I would like to keep it as a resource for the community (including adding additional chat rooms).

I am also hoping to weekly scheduled chats with members of AIR, Flash Player and Flex teams.

## Connecting

Below is information on how to connect to the chat with different IM clients.

### [Adium][1]

If you have an existing Jabber / XMPP account, such as a GTalk account, then you can connect without having to register with my server.

File > Join Group Chat

Select the GTalk server.

Enter these settings:

Chat Room Name: flashplatform_chat  
Server : conference.mikechambers.com  
Handle : You name / handle  
Password : leave blank

Click Join

If you want to create an account on my server then:

File > Add Account > Jabber > Register New Account

When the dialog opens asking for the server, enter *mikechambers.com*

This will enter a dialog where you can add your account info.

Once you have the account, then you need to connect to the room:

File > Join Group Chat

Select mikechambers.com server.

Enter these settings:

Chat Room Name: flashplatform_chat  
Server : conference.mikechambers.com  
Handle : YOUR\_SERVER\_USERNAME  
Password : YOUR\_SERVER\_PASSWORD

### iChat

Cliff Rowley has [posted instructions for iChat in this comment][3].

## Rules

Keep things civil and act as if you were actually talking to everyone else in person. If anyone is being disruptive or abusive, then I reserve the right to temporarily or permanently ban then from the server.

If you have info on how to connect to the chat with a particular IM client, please post it in the comments to help others figure it out. If you run into any issues, or have problems, please post in the comments, and I will try and help out.

 [1]: http://www.adiumx.com/
 [2]: http://www.jabber.org/clients
 [3]: http://www.mikechambers.com/blog/2008/08/14/flash-platform-community-chat-xmpp-jabber-server/#comment-13278