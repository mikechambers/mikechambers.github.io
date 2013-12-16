---
title: 'CommandProxy : .NET / AIR Integration Proof of Concept'
author: mikechambers
date: 2008-01-17 12:34:01 -0800
layout: post
permalink: /2008/01/17/commandproxy-net-air-integration-proof-of-concept/
categories:
  - air
---


Two of the most requested features for [Adobe AIR][1] have been the ability to launch native executables from an AIR application, and the ability to integrate native libraries into an AIR application. Unfortunately, neither feature will be included in Adobe AIR 1.0.

However, this does not mean that you cannot build an AIR application that has closer / tighter integration with the underlying operating system. This lower level of integration is possible, but it requires some work on your part. I have put together a proof of concept project, which shows how to integrate Adobe AIR applications with c# / .NET code on any operating system that Adobe AIR currently runs on (Mac and Windows). The project is called [CommandProxy][2]. It provides a communication proxy between an AIR application and the underlying operating system and could theoretically work with other web based desktop runtimes (such as [Mozilla Prism][3]).

Update : I have posted some additional thoughts on this proof of concept [here][4].  
<!--more-->

  
Note, this project is in no way supported by Adobe. This is a proof of concept project that I put together to help developers understand one possible way to extend AIR functionality beyond that that is provided by the runtime.

The general concept behind the project is similar to the <strike>now defunct</strike> [Artemis project][5] (which is Java based). The AIR application communicates with the CommandProxy process to communicate and integrate with the underlying operating system. Currently the command proxy supports launching processes (and getting the output from the processes) as well as taking a screenshot of the user&#8217;s current screen. However, the framework is built in such a manner that it is possible to add new functionality to the proxy.

Here is an overview of the life-cycle of an AIR application using the command proxy.

[<img src="http://farm3.static.flickr.com/2366/2199401003_55dd51c188.jpg" width="500" height="322" alt="CommandProxy / AIR Application Lifecycle" />][6]

1.  Command Proxy process is launched by the user. The shortcut for the process passes in the path to the AIR application to launch (or this can be hard coded into the proxy)
2.  The Command Proxy process then launches the AIR application, passing in a communication key, as well as the socket port that the AIR application should use to communicate with the proxy.
3.  The AIR app may then at some point communicate with the proxy to execute a command. For example, it may tell the proxy to launch a specific process.
4.  The proxy executes the specified command.
5.  If appropriate, the proxy then returns any command output back to the AIR application.
6.  The command / response cycle can occur multiple times during the application life-cycle
7.  When the AIR application process is terminated (i.e. the user closes the application), then the proxy process automatically exits.

Currently, the project is meant as a proof of concept, and not as a general use framework. This mainly means that there is not a lot of documentation (although the code is fully commented) and if you want to use it, you are going to have to compile the proxy yourself. If there is interest, then I am willing to expand the project to other contributors.

If you wanted to use something like this in a production level application, then you would need to:

*   Compile the CommandProxy
*   Compile the AIR application
*   Create the AIR file to install the AIR application
*   Create a custom installer that first installs the AIR application, and then installs the short cut to the command proxy

Instead of launching the AIR application directly, the user would launch the command proxy process, which would then launch the AIR application.

The project is hosted on Google code, and includes the following:

*   Full C# / .NET code, compilable under [Visual Studio][7] and [Mono][8]. (Screenshots do not work under Mono)
*   ActionScript 3 library for communicating with the proxy.
*   Some very basic documentation

If you have questions, then post them in the comments and I will try and address them (and maybe create an FAQ on the project page). If there is interest, then I could also create a mail list on Google groups to discuss the project. If you find bugs with the code, then post them on the [project&#8217;s issues page][9].

I am also hoping to post some examples of AIR apps that use the proxy. [Lee Brimelow][10] built a simple example of an AIR application that takes a screenshot, and then opens it in Photoshop for editing. You can see a demo of that example toward the end of the video posted [here][11] (it is about half way through the video).

Update : The code is released under an [MIT License][12].

You can find more information on the [CommandProxy project page][2].

Update : I have posted some additional thoughts on the code [here][4].

 [1]: http://www.adobe.com/go/air
 [2]: http://code.google.com/p/commandproxy/
 [3]: http://wiki.mozilla.org/Prism
 [4]: http://www.mikechambers.com/blog/2008/01/22/commandproxy-its-cool-but-is-it-a-good-idea/
 [5]: http://artemis.effectiveui.com/
 [6]: http://www.flickr.com/photos/mikechambers/2199401003/ "CommandProxy / AIR Application Lifecycle by mike.chambers, on Flickr"
 [7]: http://www.microsoft.com/express/vcsharp/Default.aspx
 [8]: http://www.mono-project.com/Main_Page
 [9]: http://code.google.com/p/commandproxy/issues/list
 [10]: http://www.theflashblog.com
 [11]: http://theflashblog.com/?p=309
 [12]: http://www.opensource.org/licenses/mit-license.php