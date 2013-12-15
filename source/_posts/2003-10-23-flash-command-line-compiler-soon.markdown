---
title: Flash Command line compiler soon
author: mikechambers
layout: post
permalink: /2003/10/23/flash-command-line-compiler-soon/
categories:
  - General
---


I am going to release a Flash Command line compiler that I built a while ago. It works with Flash MX 2004, and uses the extensibility layer. I just need to test a few things and make sure it still works. Assuming no major issues, I will release it in a couple of days.

Couple of notes:

*   Written in C#, which means it is Windows only.</li> 
Written by me on my own time, which means that it is use at your own risk.</li> </ul> 
Here is the usage information:  
<!--more-->

  
FlashCommand.exe -e | -c \[-q] \[-v\] \[-x\] [-q\] (-s <sourcefile>) ([-l] [<logfile>]) ([-o] <exportpath>) ([-f] <flashpath>) ([-t] <timeout>)

-version : Prints out information about the program.  
-help | Prints out usage information.

-e : Specifies export action.  
-c : Specifies save and compact action.

-l : Specifies whether output should be logged to a file. Optional. Takes an optional param specifying the path to the log file. If not specified, log files will be place in <installdirectory>\log  
-q : Specifies quite mode. Optional. If specified, no output will be written to console (although it may still be logged).  
-v : Specifies verbose mode.  
-d : Specifies temp directory that will be used for temporary file.  
-s : Specifies source files. Required.  
-o : Specifies the output file if -e flag is also set. Optional. If not specifies, file will be output to same directory as source.  
-x : Specifies whether Flash should be closed after it is done processing. Optional.  
-k : Specifies whether the temp jsfl file should be deleted. Optional.

-f : Specifies Flash executable path. Optional.  
-t : Specifies timeout value. Optional  
-d : Specifies temp directory. Optional.