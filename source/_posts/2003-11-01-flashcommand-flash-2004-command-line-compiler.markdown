---
title: 'FlashCommand Flash 2004  Command Line Compiler'
author: mikechambers
date: 2003-11-01 12:00:01 -0800
layout: post
permalink: /2003/11/01/flashcommand-flash-2004-command-line-compiler/
categories:
  - General
---


Well, I am finally releasing the first public version of FlashCommand. FlashCommand is a command line compiler for [Flash MX 2004 Pro][1].

<!--more-->

I am sorry it took so long to release, but I have been super swamped. I also ran into a bug where the installer no longer worked (it errors when trying to automatically set the path environment variable). This bug delayed the release, and I ended up just removing the installer. Hopefully, I will have time soon to track the issue down, and release an updated version with the installer.

**IMPORTANT : This is something that I did in my own time, and is not supported by Macromedia. Use at your own risk. If you run into any issues (and you will), please post them in the comments. This will make it easier for me to keep track of issues and suggestions.**

Here is a [screen shot][2] of ActionScript code being compiled from [EditPlus][3]. Notice that it catches the output (it will also catch compile errors if they occur). Btw, if anyone can figure out how to get this to work with [SciteFlash][4], post the info in the comments.

Note, this is Windows only and requires the [.NET framework][5]. Sorry about that. I will try to make a portable version in the future.

[Download FlashCommand][6]

[Download FlashCommand Source][7]

Here is the usage information (from the readme):

<pre>FlashCommand.exe -e | -c | -p [-q] [-v] [-x] [-q] (-s &lt;sourcefile&gt;) ([-l] [&lt;logfile&gt;])
	([-o] &lt;exportpath&gt;) ([-f] &lt;flashpath&gt;) ([-t] &lt;timeout&gt;)

-version : Prints out information about the program.
-help | Prints out usage information.

-e : Specifies export action.
-c : Specifies save and compact action. 
-p : Specifies publish action.

-l : Specifies whether output should be logged to a file. Optional. Takes an optional
	param specifying the path to the log file. If not specifies, log files will be
	place in &lt;installdirectory>\log
-q : Specifies quite mode. Optional. If specified, no output will be written to console
	(although it may still be logged).
-v : Specifies verbose mode.
-d : Specifies temp directory that will be used for temporary file.
-s : Specifies source files. Required.
-o : Specifies the output file if -e flag is also set. Optional. If not specifies,
	file will be output to same directory as source.
-x : Specifies whether Flash should be closed after it is done processing. Optional.
-k : Specifies whether the temp jsfl file should be deleted. Optional.

-f : Specifies Flash executable path. Optional.
-t : Specifies timeout value. Optional
-d : Specifies temp directory. Optional.
</pre>

Thanks for [Robin Debreuil][8], [Owen van Dijk][9] who provided valuable input and help.

[Download FlashCommand][10]

 [1]: http://www.macromedia.com/software/flash/
 [2]: /mesh/files/editplus_compile.gif
 [3]: http://www.editplus.com
 [4]: http://www.bomberstudios.com/sciteflash/
 [5]: http://msdn.microsoft.com/netframework/downloads/howtoget.aspx
 [6]: /mesh/files/flashcommand/FlashCommand_win.zip
 [7]: /mesh/files/flashcommand/FlashCommand_win_src.zip
 [8]: http://blog.debreuil.com/
 [9]: http://ohwhen.typepad.com/
 [10]: /mesh/files/FlashCommand.zip