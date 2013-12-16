---
title: Using AppleScript to connect to a Jabber Chat Room with Adium
author: mikechambers
date: 2008-08-18 12:56:01 -0800
layout: post
permalink: /2008/08/18/using-applescript-to-connect-to-a-jabber-chat-room-with-adium/
categories:
  - General
---


I have been having a lot of fun hanging out in the [Flash Platform Chat room][1] I set up last week. However, it can be a little bit of a hassle to connect to the room depending on which Jabber / XMPP client you are using. I am working on an AIR app for the chat that will make it super simple, but until then you will have to use your own client.

I use [Adium][2] on Mac OS X to connect and it works really well, except that it can be a bit of a hassle to connect to the room every time. The latest [beta][3] allows you to bookmark the room to make it easier to connect (Contact > Add Group Chat Bookmark), but at least for me works inconsistently.

So, I put together a simple AppleScript that you can save that will open the chat room in Adium.  
<!--more-->

  
First, type the following script in Script Editor on OS X:

`
<pre>tell application "Adium"
	set rn to (current date) - (date "Friday, January 1, 1904 12:00:00 AM")
	GetURL ("xmpp:flashplatform_chat@conference.mikechambers.com?join&#038;" &#038; rn)
end tell</pre>
<p>`

Update : Added random name / value pair to fix problem with script only working once per Adium instance (thanks to Nicolas Noben who suggested the fix).

You can test it from within the Script editor by pressing the run button. 

Note that it will use the first Jabber account it finds in your account list (File > Preference > Accounts), so make sure to move the one you want to use to the top.

Right now, it looks like you have to have Adium running in order for it to work (I think this has something to do with the certificate dialog warnings that come up). Anyways, I suspect once the next release of Adium is out, you wont need this, but until then, it might prove useful.

In order to save it to make it reusable, just select File > Save As, set the File type to &#8220;Application Bundle&#8221; and then save the file to the directory of your choice. 

To use it, launch Adium, and the run the Script by double clicking it (or any other way you launch an application).

<strike>The script seems to still have some issues, and will only work the first time you try to use it. After that, you have to restart Adium.</strike> If anyone know what is going on (Im an AppleScript noob), or has any suggestions, just post them in the comments.

 [1]: http://www.mikechambers.com/blog/2008/08/14/flash-platform-community-chat-xmpp-jabber-server/
 [2]: http://www.adiumx.com/
 [3]: http://www.adiumx.com/beta/