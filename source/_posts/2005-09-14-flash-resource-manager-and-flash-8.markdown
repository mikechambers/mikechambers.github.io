---
title: Flash Resource Manager and Flash 8
author: mikechambers
layout: post
permalink: /2005/09/14/flash-resource-manager-and-flash-8/
categories:
  - Flash Resource Manager
---


As many of you have noticed, [Flash Resource Manager][1] does not work with Flash 8. This is because the path to the help files is hardcoded (at least for the first load) for Flash MX 2004.

I just played around with the source, and it was pretty easy for me to fix, so once I get the correct version of Visual Studio installed, I am going to try and update it so it will work with both Flash MX 2004 and Flash 8.

In the meantime, if you look in the install directory for the Flash Resource Manager, you should find a config directory with app.config file. This is an XML file that contains all of the settings for the app. You should be able to change the file paths here to get it to work correctly. I haven&#8217;t been able to get get this to work yet, but I wanted to post it here in case anyone wanted to try (post in the comments if you get it working).

UPDATE : Ritesh has confirmed in the comments that you can get it to work with Flash 8 by manually editing the config file.

UPDATE 2: I can&#8217;t get the app to work correct on the WIndows .NET 2.0 beta, so if you are having problems, that might be the issue.

 [1]: http://weblogs.macromedia.com/mesh/archives/2004/07/new_version_of_4.cfm