---
title: 'Top Flash Misperceptions : Flash is a CPU Hog'
author: mikechambers
layout: post
permalink: /2010/05/10/top-flash-misperceptions-flash-is-a-cpu-hog/
categories:
  - General
tags:
  - flash_myths
---

This is one of the most prevalent misperceptions associated with Flash. Basically, the myth is that Flash uses an inordinate amount of CPU compared to other, similar technologies. 

Before looking in more detail at this misperception, I think it is important to point out that when one makes the statement "Flash is a CPU hog", they are making a comparison of Flash CPU usage to some baseline. This then begs the question: Flash uses a lot of CPU compared to what? By comparing Flash CPU usage to other similar technologies and content, it becomes clear that Flash CPU usage is not excessive for the type of content that it displays and executes.  
<!--more-->

  
If the comparison is between Flash based dynamic, multi-media content and static HTML documents, then, of course, Flash content is going to use more CPU. It is doing a lot more stuff, potentially including loading data, playing audio and / or video, drawing and animating content, responding to user input, and so on. The nature of multimedia content is that it is doing more, and thus requires more CPU resources. Thus, if the comparison is against static web documents, then yes, Flash does use more CPU, although a more apt statement would be "Multimedia content uses more CPU". However, this only answers the question whether Flash uses more CPU than static HTML documents, and does not address the misperception that Flash uses an inordinate amount of CPU for what it does.

A more useful comparison is to look at Flash CPU usage relative CPU usage of content running in other similar technologies. If you look at other technologies that can provide some Flash like capabilities in the browser, such as HTML 5 / CSS 3 and Canvas, you will find that Flash does not necessarily use a particularly high amount of CPU for what is is doing. Indeed, dynamic HTML 5 / Canvas based examples use CPU amounts comparable to (and in many cases significantly more than) similar Flash content. For example, I posted some [benchmarks][1] of CPU usage for for some popular HTML 5 / Canvas examples. Lets look at the results:

[MacHeist Dynamic Canvas / JavaScript animation example][2]

<table width="450" border="1">
  <tr>
    <th width="141" scope="col">
      &nbsp;
    </th>
    
    <th width="33%" align="center" scope="col">
      Mac
    </th>
    
    <th width="33%" align="center" scope="col">
      Windows
    </th>
  </tr>
  
  <tr>
    <th align="left" valign="bottom" scope="row">
      Google Chrome
    </th>
    
    <td align="center">
      95%
    </td>
    
    <td align="center">
      80%
    </td>
  </tr>
  
  <tr>
    <th align="left" valign="bottom" scope="row">
      Safari
    </th>
    
    <td align="center" bgcolor="#00FF00">
      25%
    </td>
    
    <td align="center">
      80%
    </td>
  </tr>
  
  <tr>
    <th align="left" valign="bottom" scope="row">
      Firefox
    </th>
    
    <td align="center" bgcolor="#FF0000">
      100%
    </td>
    
    <td align="center">
      40%
    </td>
  </tr>
  
  <tr>
    <th align="left" valign="bottom" scope="row">
      Internet Explorer
    </th>
    
    <td align="center">
      NA
    </td>
    
    <td align="center">
      0%
    </td>
  </tr>
</table>

[9elements JavaScript / Canvas Dynamic Animation Example][3]

<table width="450" border="1">
  <tr>
    <th width="141" scope="col">
      &nbsp;
    </th>
    
    <th width="33%" align="center" scope="col">
      Mac
    </th>
    
    <th width="33%" align="center" scope="col">
      Windows
    </th>
  </tr>
  
  <tr>
    <th align="left" valign="bottom" scope="row">
      Google Chrome
    </th>
    
    <td align="center">
      100%
    </td>
    
    <td align="center">
      96%
    </td>
  </tr>
  
  <tr>
    <th align="left" valign="bottom" scope="row">
      Safari
    </th>
    
    <td align="center">
      98%
    </td>
    
    <td align="center">
      104%
    </td>
  </tr>
  
  <tr>
    <th align="left" valign="bottom" scope="row">
      Firefox
    </th>
    
    <td align="center" bgcolor="#FF0000">
      100% &#8211; 170%
    </td>
    
    <td align="center" bgcolor="#00FF00">
      72%
    </td>
  </tr>
  
  <tr>
    <th align="left" valign="bottom" scope="row">
      Internet Explorer
    </th>
    
    <td align="center">
      NA
    </td>
    
    <td align="center">
      Did Not Work
    </td>
  </tr>
</table>

As you can see from the numbers, CPU usage for the HTML 5 / Canvas examples are generally taxing the CPU. 

Now, the benchmarks above are comparing relative CPU performance of content across browsers and operating systems, and are not meant to be a comparison of HTML 5 and Flash CPU performance (since the content is different). It does show though, that in general, multimedia content taxes the CPU. If you are interested in a more direct comparison of performance between various multimedia technologies, then check out the [tests done at themaninblue.com][4]. This is one specific test but it shows that if anything, Flash performance is on par (if not better in some cases) with comparable technologies.

Now, there is currently one potential exception to this, and that is video playback. Looking at the [video performance numbers posted at Streaming Learning Center][5], you can see that in some configurations, Flash video can require more CPU resources than H.264 video played back directly in the browser. Specifically, on Safari on Mac, H.264 video played back via the browser, uses significantly less CPU than video played back via the Flash Player. The reason for this discrepancy in performance is due to the availability of hardware accelerated video playback for H.264 video played directly within Safari on Mac. Hardware accelerated playback on Mac was not available for the Flash Player. On browser / operating system combinations where Flash also has access to hardware acceleration, Flash video playback CPU usage is comparable to native browser playback usage. As you would expect, if hardware acceleration is not available to the Flash Player, yet is available to the browser (such as on Safari on Mac), then Flash is going to require more CPU.

On this last point, it is important to note that Apple has recently begun to make available [some of the APIs][6] required to allow the Flash Player to hardware accelerate video playback on the Mac. Adobe has posted an [early Flash Player build, code-named "Gala"][7], which has the ability to leverage the GPU for video playback on the Mac. Early results are showing improvements in CPU utilization and indicate Flash Player CPU usage for video playback in "Gala" is becoming comparable to hardware accelerated video played back directly within in the browser.

So, when looking at Flash CPU usage compared to other multimedia technologies, then no, Flash does not use an inordinate amount of CPU. While Flash content can at times use high amounts of CPU, this is a result of the nature of the content, and not necessarily specific to the Flash runtime.

Note, just to be clear, I am not suggesting that there is no room for improvement in Flash Player CPU usage (there is). However, the statement that Flash is a CPU Hog, or uses an inordinate amount of CPU is not correct.

Resources

*   [Relative Performance of Rich Media Content across Browsers and Operating Systems][1]
*   [Flash Player: CPU Hog or Hot Tamale? It Depends.][5]
*   [&#8220;HTML5&#8243; versus Flash: Animation Benchmarking][4]
*   [Comparison of performance of Flash Player 10.1 and HTML 5 on Mobile Devices][8]
*   [H.264 hardware decoding in Mac OS X][6]
*   [Flash Player &#8220;Gala&#8221; Public Pre-release preview][7]
*   [Testing Flash Player 10.1 for the Mac][9]

Please keep comments constructive and on topic. Off topic comments may be moderated / deleted.

 [1]: http://www.mikechambers.com/blog/2010/03/01/relative-performance-of-rich-media-content-across-browsers-and-operating-systems/
 [2]: http://www.macheist.com
 [3]: http://9elements.com/io/projects/html5/canvas/
 [4]: http://themaninblue.com/writing/perspective/2010/03/22/
 [5]: http://www.streaminglearningcenter.com/articles/flash-player-cpu-hog-or-hot-tamale-it-depends-.html
 [6]: http://blog.kaourantin.net/?p=89
 [7]: http://labs.adobe.com/technologies/flashplayer10/gala/
 [8]: http://vimeo.com/10553088
 [9]: http://www.streamingmedia.com/Articles/Editorial/Featured-Articles/Testing-Flash-Player-10.1-for-the-Mac-66970.aspx