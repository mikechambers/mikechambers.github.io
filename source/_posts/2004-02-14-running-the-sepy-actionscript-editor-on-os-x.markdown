---
title: Running the SE|PY ActionScript editor on OS X
author: mikechambers
layout: post
permalink: /2004/02/14/running-the-sepy-actionscript-editor-on-os-x/
categories:
  - General
---


I have put together a step by step guide to getting the [SE|PY][1] ActionScript editor to run on OS X.

<!--more-->

1.  Make sure that you have python installed by running the following command in the terminal (omit the >):  
    >python</p> 
    *   If you get an error that it cannot be found go to <http://www.python.org> and download the source. Follow the directions from the site to compile and install it. 
        Make sure to follow the directions in Mac/OSX/README. This is required if you want to create apps created with Python (including SE|PY).
        
        Here are the commands I used to compile Python from the source on OS X
        
        >./configure &#8211;enable-framework  
        >make  
        >sudo make frameworkinstall </li> </ul> </li> 
        *   Download the source for the SE|PY editor: 
            *   Via the DevSource from the project page:  
                <http://sourceforge.net/project/showfiles.php?group_id=90749> 
            *   Via CVS with the following two commands (this will have the most up to date code):  
                >cvs -d:pserver:anonymous@cvs.sourceforge.net:/cvsroot/SE|PY login  
                >cvs -z3 -d:pserver:anonymous@cvs.sourceforge.net:/cvsroot/SE|PY co SciTE
        *   switch to the root directory for the source and try to run the program:  
            >pythonw main.pyw 
        *   If you get an error about the pyRXP library missing, then you need to install the library. 
            1.  download the source from:  
                <http://www.reportlab.org/pyrxp.html> 
            2.  Switch to the root of the pyRXP library source and run  
                >python setup.py build 
            3.  If you are using the default OSX install of python, you may get errors that it can&#8217;t find the python header files (if you built and isntalled python yourself you shouldnt get these errors). 
                *   open setup.py, and look for a line like this: 
                    include_dirs=[RXPDIR],
                    
                    i edited it to include the python header files directory:
                    
                    include_dirs=[RXPDIR, "/Developer/SDKs/MacOSX10.3.0.sdk/System/Library/Framework  
                    s/Python.framework/Versions/2.3/include/python2.3/"], </li> </ul> </li> 
                    *   run  
                        >python setup.py build. 
                    *   if you don&#8217;t get any errors, then run:  
                        >python setup.py install</p> 
                        The library should now be installed. </li> </ol> </li> 
                        *   If you get an error that pythonw cannot be found: 
                            1.  Check and see if /usr/local/bin/pythonw exists. If it does: 
                                *   Add /usr/local/bin to your path, or call pythonw with the complete path /usr/local/bin/pythonw. 
                            2.  If it is not there, you need to install the wxPython library. 
                                1.  Goto <http://www.wxpython.org> and download and install the library. I suggest that you install the binaries as I was not able to get the source to compile. 
                                    *   If you built python yourself or if you are using OS X 10.2 or lower, use this file :   
                                        [http://prdownloads.sourceforge.net/wxpython/wxPythonOSX-2.4.2.4-py2.3.dmg][2]
                                    *   Otherwise, use this file :  
                                        <http://prdownloads.sourceforge.net/wxpython/wxPythonOSX-2.4.2.4-Py2.3-panther.dmg>
                        *   You can now try to run SE|PY by switching back to the directory with the source code and typing: 
                            >pythonw main.pyw </li> </ol> 
                            You should now be able to load and run SE|PY. If you have any questions or problems post them in the comments. If you want to contribute to the development of SE|PY then you can join the [development mailing list][3].

 [1]: http://www.sephiroth.it/python/sepy.php
 [2]: http://prdownloads.sourcef  orge.net/wxpython/wxPythonOSX-2.4.2.4-py2.3.dmg
 [3]: http://lists.sourceforge.net/lists/listinfo/sepy-developement