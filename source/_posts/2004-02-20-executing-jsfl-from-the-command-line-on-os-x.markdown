---
title: Executing JSFL from the Command Line on OS X
author: mikechambers
date: 2004-02-20 12:24:01 -0800
layout: post
permalink: /2004/02/20/executing-jsfl-from-the-command-line-on-os-x/
categories:
  - General
---


I am working on an OS X version of my [FlashCommand command line compiler][1], and I ran into a problem of how to tell Flash to run a JSFL file from the command line. Gary Grossman came to the rescue with the answer.

You have to use AppleScript to tell Flash to load the file. Here is an example:

osascript -e &#8216;tell application &#8220;Flash&#8221; to open alias &#8220;Mac OS X:tmp:myTestFile.jsfl&#8221;&#8216;

If you are calling this from a script that uses Unix file paths, then you can use the following command:

osascript -e &#8216;tell application &#8220;Flash&#8221; to open posix file &#8220;/tmp/myTestFile.jsfl&#8221;&#8216;

This will open Flash and have it execute the specified JSFL file.

 [1]: http://www.markme.com/mesh/archives/003656.cfm