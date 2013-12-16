---
title: 'SE|PY : Python : Editing ActionScript on OS X'
author: mikechambers
date: 2004-02-12 12:08:01 -0800
layout: post
permalink: /2004/02/12/sepy-python-editing-actionscript-on-os-x/
categories:
  - General
---


I made the switch from Windows to OS X about 3 months ago. I have absolutely loved it and have not had any problems except for one thing. I have not been able to find a good editor to write ActionScript code.

I had been using [JEdit][1], but it is a little to slow and a little too Java for my liking. The other night, I came across the [SE|PY editor project][2].

<!--more-->

This is an ActionScript editor written in [Python][3] that has an impressive array of features specific to ActionScript. You can download the binaries for Windows, but as of yet there is no support for OS X.

A couple of developers have worked to get it running on OS X, and have had some success. It appears that a lot of the issues simply have to do with path issues (due to differences between Windows and OS X).

So, I downloaded the source, took a crash corse in Python, and began hacking away (all today). To my surprise, I actually got it to run and load an ActionScript file.

<div align="center">
  <a href="/mesh/files/sepy_osx.gif"><img alt="sepy_osx_sm.gif" src="/mesh/files/sepy_osx_sm.gif" width="450" height="312" border="0" /></a><br /><a href="/mesh/files/sepy_osx.gif">View full size.</a>
</div>

It is still not usable, but it has definitely raised my spirits. So, if you know Python, use a Mac, and want to help get the editor running, head over to the project&#8217;s site and sign up.

Btw, here is the change I made to WindowsProjects.py to get it to run (added this else to the first if / else statement):

<pre>else:
        ico = wxIcon(os.path.normpath('%s/icons/%s.ico' % (path, 'file')),wxBITMAP_TYPE_ICO,16,16)
</pre>

You can find more info on SE|PY [here][2].

 [1]: http://www.jedit.org
 [2]: http://www.sephiroth.it/python/sepy.php?column=0
 [3]: http://www.python.org