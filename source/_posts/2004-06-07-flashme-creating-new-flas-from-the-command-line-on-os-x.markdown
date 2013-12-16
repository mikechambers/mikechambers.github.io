---
title: 'flashme : Creating new FLAs from the command line on OS X'
author: mikechambers
date: 2004-06-07 12:51:01 -0800
layout: post
permalink: /2004/06/07/flashme-creating-new-flas-from-the-command-line-on-os-x/
categories:
  - General
---


I recently switched back to OS X from Windows, and one of the things I missed was the ability to easily create a new FLA directly on the file system. This is much easy than opening Flash, and then navigating to where I want the file and saving it.

So, I put together a simple bash shell script called &#8220;flashme&#8221;. This basically allows you to create new FLAs from the command line. It will also optionally launch the FLA in Flash after it has been created.  
<!--more-->

  
You can download the script from [here][1].

**Installation** :  
Place flashme somewhere in your PATH, and make sure to chmod it to be executable (usually 755).

Copy the include source.fla onto your computer, and place the path to it in the FLAPATH variable within the flashme file.

**Usage** :  
flashme [-o] newFLAName

-o : open the fla in Flash after it has been created. Optional.  
newFLAName : The name of the Flash that will be created. This can be a relative or absolute path to the file.

**Example** :  
flashme -o app.fla

Creates a new FLA named app.fla in the current directory and then opens it in Flash.

Note, this will work on any system with bash installed, including Linux and Windows (with [Cygwin][2]).

As usual, USE AT YOUR OWN RISK.

Post and bugs, improvements or suggestions in the comments.

 [1]: /mesh/files/flashme/flashme.zip
 [2]: http://www.cygwin.com/