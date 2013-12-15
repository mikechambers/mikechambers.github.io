---
title: 'turl &#8211; Mac Command Line tool for creating smaller URLs'
author: mikechambers
layout: post
permalink: /2007/10/26/turl-mac-command-line-tool-for-creating-smaller-urls/
categories:
  - General
---


I have just released a simple Mac OS X app named &#8220;turl&#8221;, that provides a command line / shell interface to online URL shortening services (including [urltea.com][1] and [tinyurl.com][2]).

Usage is pretty simple:

`turl URL`  
<!--more-->

  
For example:

`turl http://www.mikechambers.com/blog/`

will create:

`http://urltea.com/g88`

There are a number of other options, including the ability to specify which URL service is used.

Source is written in Objective-C and released under an [MIT License][3].

You can find more information, as well as download the app and source code from the [turl google code project page][4].

 [1]: http://www.urltea.com
 [2]: http://www.tinyurl.com
 [3]: http://www.opensource.org/licenses/mit-license.php
 [4]: http://code.google.com/p/turl/