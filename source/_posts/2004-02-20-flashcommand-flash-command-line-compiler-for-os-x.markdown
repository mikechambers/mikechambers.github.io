---
title: flashcommand Flash command line compiler for OS X
author: mikechambers
date: 2004-02-20 12:46:01 -0800
layout: post
permalink: /2004/02/20/flashcommand-flash-command-line-compiler-for-os-x/
categories:
  - General
---


I have built an OS X version of my [FlashCommand][1] command line compiler for Flash MX 2004. This uses the Flash MX 2004 extensibility layer to allow you to compile Flash files (FLA) from the command line.

It has a ton of options, and will also catch and redirect any ActionScript compile errors to stdout.

Update : I have moved the source and downloads to its own Google Code project which can be found [here][2].

Here is the usage info:

<!--more-->

usage: flashcommand -e | -c | -p \[-v] [-x\] (-s <sourcefile>) ([-o] <exportpath>) ([-t] <timeout>)([-d] <tempdir>) [-j]

Options and arguments:

-a : Prints version and about information.  
-c : Specifies save and compact action.   
-d : Specifies temp directory that will be used for temporary files. Optional.  
-e : Specifies export action.  
-h : Prints usage information.  
-j : Specifies that the generated JSFL file should be printed. If this option is specified, Flash will not be executed.  
-o : Specifies the output file if -e flag is also set. Optional. If not specified, file will be output to same directory as source.  
-p : Specifies publish action.  
-s : Specifies source file. Required.  
-t : Specifies timeout value. Optional.  
-v : Specifies verbose mode. Optional.  
-x : Specifies whether Flash should be closed after it is done processing. Optional.

Requires that [python][3] is installed on your system.

To install, download the file and copy the flashcommand file to somewhere within your path. Make sure to make it executable by running the following command:

chmod 755 flashcommand

If you find any bugs, or have questions or suggestions, then post them log an issue on the [project page][4].

 [1]: http://www.markme.com/mesh/archives/003656.cfm
 [2]: http://code.google.com/p/flashcommand/
 [3]: http://www.python.org
 [4]: http://code.google.com/p/flashcommand/issues/list