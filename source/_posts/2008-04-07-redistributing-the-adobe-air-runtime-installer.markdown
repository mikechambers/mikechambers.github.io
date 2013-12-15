---
title: Redistributing the Adobe AIR Runtime Installer
author: mikechambers
layout: post
permalink: /2008/04/07/redistributing-the-adobe-air-runtime-installer/
categories:
  - General
---


I am currently traveling through Europe as part of the [European leg of the on AIR Tour][1] (just wrapped up the Brussels event). The events have been great thus far, and the attendance and reactions have been very positive. One of the cool things about the event is that it gives me (and the other speakers) a chance to hang out and chat with developers. One of the questions that keep coming up, and which I wanted to answer on here really quickly, is whether it is possible re-distribute the Adobe AIR runtime installer, and if so how.

The answer is yes, we provide a way to allow developers to redistribute the runtime installer. For the most part, end users download the AIR runtime directly, either from the Adobe website, or as part of the seamless badge install (both of which assume the user is online). However, for various reasons, developers may not want to rely on installing the runtime directly from Adobe (i.e. maybe the end user will not be online). Along with the 1.0 release, we also released a program to allow developers to license the right to redistribute the Adobe AIR installer, either on its own, or as part of a native installer.  
<!--more-->

  
In order to re-distribute the Adobe AIR installer, you must [first apply for, and receive permission from Adobe to redistribute it][2] (this requires accepting a license, and submitting a form). Once you do this, you can get all of the documentation for how to distribute the runtime and integrate it with your custom installer.

We have a ton of information on this on the [website][3] (including a [FAQ][4]).

In general, the license allows you to:

*   distribute the runtime installer on a closed intranet
*   distribute the runtime installer on fixed media, such as CD or DVD Roms.
*   distribute and launch the runtime installer as part of another native installer

In general, the license does not allow you to:

*   modify the installer, or files to allow AIR application to run without having the runtime installed on the user&#8217;s system.
*   distribute DLL&#8217;s or other files from the runtime directly within an application

For example, if you get a license, you could redistribute the runtime installer on a CD rom, next to your application&#8217;s AIR file. You could also bundle it in a native installer, that first installed the runtime, and then installed the AIR application.

However, you could not, for example, extract files from the installer, installer files, or the installed AIR runtime, and include them in your application and redistribute those (i.e. maybe to try to get an AIR app to run without having the runtime installed).

In general, this is simply a different way to redistribute the Adobe AIR installer. Running AIR applications always requires that the runtime be installed on the user&#8217;s system. You cannot modify the installer, or the installer or runtime files (as the website says &#8220;Licensee must distribute the Adobe AIR installers and files as-is without modification.&#8221;)

Anyways, this is just a quick overview. To get the all of the information, including the license agreements, check out the [website][3] and the [FAQ][5]. The team has been pretty quick about going through submissions, so if you need a license, it shouldn&#8217;t take too long.

Post any questions in the comments (although I am in Europe right now, so it might take me a while to respond). If you have legal questions about the licese, then check out the [license][6] and [FAQ][4] (Im not qualified to answer legal questions).

 [1]: http://onair.adobe.com
 [2]: http://www.adobe.com/products/air/runtime_distribution1.html#license
 [3]: http://www.adobe.com/products/air/runtime_distribution1.html
 [4]: http://www.adobe.com/products/air/runtime_distribution_faq.html
 [5]: http://www.adobe.com/products/air/runtime_distribution_faq.htm
 [6]: http://www.adobe.com/products/air/runtime_agreement.html