---
title: Compiling ActionScript 3 and MXML on Mac and Linux
author: mikechambers
date: 2005-12-22 12:11:01 -0800
layout: post
permalink: /2005/12/22/compiling-actionscript-3-and-mxml-on-mac-and-linux/
categories:
  - General
---


I finally switched back to Mac from Windows yesterday. I had moved to Windows a couple of months ago so that I could use the Flex Builder 2 alpha. However, after my 4th system failure in the past 3 months, I decided it was time to go back to Mac.

One of the first things I wanted to set up was my development environment so that I could continue to develop in Flex 2 and ActionScript 3. We do not currently have a Mac version of Flex Builder, but fortunately, the command line compiler (mxmlc) included with Flex builder is written in Java, which means it should (and does) run on Mac and Linux.  
<!--more-->

  
NOTE, currently, mxmlc is supported on windows only. The instructions below work well, but running mxmlc on non-Windows system is currently not supported.

The MXMLC compiler that is included with Flex Builder comes with a Windows executable wrapper (mxmlc.exe) that makes it very easy to use on Windows. However, you can not use the wrapper on Mac or Linux. Getting the compiler to run is not too difficult once you figure it out, although it can require constructing a pretty extensive command to run. In order to make this easier, I wrote my own simple bash script that acts as a wrapper for mxmlc and makes it easy to compile ActionScript 2 and Flex 2 applications from the command line on Mac and Linux.

First, you need to download the compiler and set it up on your system. We have [a page on the Labs wiki that describes how to do this on non-Windows systems][1].

Once the compiler is setup, calling MXMLC is not too difficult. Here is a typical command line to compile a simple application:

    java -jar "/Users/mesh/bin/flex/lib/mxmlc.jar" -flexlib "/Users/mesh/bin/flex/frameworks/" MyApp.as

That would work as long as the application only used Flash Player APIs, and not external ActionScript libraries. If it used external ActionScript classes, then you would need to specify the ActionScript classpaths like so:

    java -jar "/Users/mesh/bin/flex/lib/mxmlc.jar" -flexlib "/Users/mesh/bin/flex/frameworks/" -actionscript-classpath /Users/mesh/src/flashplatform/projects/corelib/trunk/src/actionscript3/ /Users/mesh/src/flashplatform/projects/testlib/trunk/src/actionscript3/ MyApp.as

This specifies two paths to search for classes. As you can see, it begins to get a little more tedious to construct the command line. However, the Flex engineers considered this, and created a config file that the mxmlc compiler uses. You can find this setting in the frameworks/flex-config.xml file. 

If we add the following to the file (just un-comment the entry already in the file):

    <actionscript-classpath>
    
     <path-element</Users/mesh/src/flashplatform/projects/corelib/trunk/src/actionscript3/</path-element>
    
     <path-element</Users/mesh/src/flashplatform/projects/testlib/trunk/src/actionscript3/</path-element>       
    
    </actionscript-classpath>

then MXMLC will know where to look for ActionScript classes, and we will no longer need to specify them on the command line.

But, that still brings us back to:

    java -jar "/Users/mesh/bin/flex/lib/mxmlc.jar" -flexlib "/Users/mesh/bin/flex/frameworks/" MyApp.as

which is still a little tedious to type each time you want to compile the application.

So, I wrote a simple bash script that wraps mxmlc. 

First, create a new text file on your machine (I called it mxmlc), and add the following script to it:

    #!/bin/bash
    
    flex='/Users/mesh/bin/flex/'
    
    classpath=''
    
    if [ -n "$ASCLASSPATH" ]; then
            classpath="-actionscript-classpath `echo $ASCLASSPATH | sed 's/:/ /g'`"
    fi
    
    echo $classpath
    
    java -jar "$flex/lib/mxmlc.jar" -flexlib "$flex/frameworks/" $classpath --incremental=true $@

Make sure to change the:

    flex='/Users/mesh/bin/flex/'

to point to the folder that contains your flex files (that you installed according to the instructions here). Not that the script adds the &#8211;incrental=true flag. This enables incremental compilation and should dramatically increases compilation performance.

Next, from the command line you need to make sure that the script is executable, so run this command on it:

    chmod 755 mxmlc

Once you have done that, you can now compile your applications like so:

    mxmlc MyApp.as

The script is written so that you can also pass any supported mxmlc command line arguments to it, like so:

    mxmlc -verbose MyApp.as

It also supports a system level ActionScript classpath. If you want to specify your ActionScript classpath in the system, and not in the flex-config.xml file (similar to a Java classpath), just specify an $ASCLASSPATH environment variable, that contains a colon &#8220;:&#8221; separated lists of ActionScript classpath.

For example, my .profile file in my home directory contains this line:

    ASCLASSPATH=/Users/mesh/src/flashplatform/projects/corelib/trunk/src/actionscript3/:/Users/mesh/src/flashplatform/projects/testlib/trunk/src/actionscript3/
    
    export ASCLASSPATH

Now, any application or script on my system can access my ActionScript classpath. If this is set, then the mxmlc script will use it when compiling the application. Of course, you can continue to specify it on the command line or via the flex-config.xml file.

Here are some additional resources on using mxmlc:

*   [Compiling and Developing with ActionScript 3 and Flex 2 on the Mac][1] (labs)
*   [Using the mxmlc command line compiler to compiler ActionScript 3 and Flex 2 Framework applications][2] (labs)
*   [Compile AS3 on Mac][3] (Josh Buhler)

Hope that help makes compiling on Mac and Linux easier. If you have any comments / suggestions / corrections, please post them in the comments.

 [1]: http://labs.macromedia.com/wiki/index.php/Flex_Framework:tutorials:mac_development
 [2]: http://labs.macromedia.com/wiki/index.php/Flex_Framework:tutorials:compiling_mxmlc
 [3]: http://www.joshbuhler.com/2005/10/20/compile-as-3-on-mac