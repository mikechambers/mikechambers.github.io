---
title: Relative Performance of Rich Media Content across Browsers and Operating Systems
author: mikechambers
layout: post
permalink: /2010/03/01/relative-performance-of-rich-media-content-across-browsers-and-operating-systems/
categories:
  - General
---

Two of the things that Flash is often criticized for is that it:

1.  Uses too much CPU
2.  Performs significantly worse on the Mac than on Windows

This got me thinking about whether some quick tests would bear this out, and if so, whether it was isolated to just Flash content.

Below are some raw numbers showing CPU usage of various rich content across different browsers and operating systems. This includes video deployed via HTML 5, JavaScript / Canvas animations, Flash Video, and Flash animations. This is by no means a scientific study, but I do think the results show that:  
<!--more-->

1.  Flash does not necessarily perform worse on Mac as opposed to PC
2.  All rich media content, including that created with JavaScript / HTML 5 content show (sometimes widely) varying levels of performance across browsers and operating systems

All numbers below show CPU usage as a total of all CPU resources available on the system. This means that if you are running on a machine with more than one core processor, then CPU usage can be over 100%. This is how Mac shows CPU usage, and I feel it gives a clearer picture of how much CPU any individual item is using. Windows CPU usage have been normalized to show CPU usage in terms of this overall CPU usage.

All tests were run on the following hardware:

<table width="450" border="1" cellpadding="2">
  <tr>
    <td width="192" align="left"  widtd="178">
      <strong>Model Identifier:</strong>
    </td>
    
    <td width="242" align="left" scope="col" widtd="256">
      MacPro3,1
    </td>
  </tr>
  
  <tr>
    <td align="left" scope="row">
      <strong>Processor Name:</strong>
    </td>
    
    <td align="left">
      Quad-Core Intel Xeon
    </td>
  </tr>
  
  <tr>
    <td align="left" scope="row">
      <strong>Processor Speed:</strong>
    </td>
    
    <td align="left">
      3 GHz
    </td>
  </tr>
  
  <tr>
    <td align="left" scope="row">
      <strong>Number of Processors:</strong>
    </td>
    
    <td align="left">
      2
    </td>
  </tr>
  
  <tr>
    <td align="left" scope="row">
      <strong>Total Number of Cores:</strong>
    </td>
    
    <td align="left">
      8
    </td>
  </tr>
  
  <tr>
    <td align="left" scope="row">
      <strong>L2 Cache:</strong>
    </td>
    
    <td align="left">
      12 MB
    </td>
  </tr>
  
  <tr>
    <td align="left" scope="row">
      <strong>Memory:</strong>
    </td>
    
    <td align="left">
      8 GB
    </td>
  </tr>
  
  <tr>
    <td align="left" scope="row">
      <strong>Bus Speed:</strong>
    </td>
    
    <td align="left">
      1.6 GHz
    </td>
  </tr>
</table>

I have both a Windows 7 and OS X partition on this computer, and Windows 7 tests were run while booted into Windows 7.

For browsers, I used the latest release browser versions. For Flash Player, I used the latest labs release (Flash Player 10.1 Beta 3 : 10,1,51,95).

**Mac OS X Versions**

<table width="353" border="1" cellpadding="2">
  <tr>
    <td width="120">
      <strong>Mac OS X</strong>
    </td>
    
    <td width="217">
      10.6.2
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>Google Chrome</strong>
    </td>
    
    <td>
      5.0.307.9 beta
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>Safari</strong>
    </td>
    
    <td>
      4.0.4 (6531.21.10)
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>Firefox</strong>
    </td>
    
    <td>
      3.6
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>Flash Player</strong>
    </td>
    
    <td>
      MAC 10,1,51,95
    </td>
  </tr>
</table>

**Windows 7 Versions**

<table width="353" border="1" cellpadding="2">
  <tr>
    <td width="120">
      <strong>Windows 7</strong>
    </td>
    
    <td width="217">
      7600
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>Google Chrome</strong>
    </td>
    
    <td>
      4.0.249.89 (38071)
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>Safari</strong>
    </td>
    
    <td>
      4.0.4 (531.21.10)
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>Firefox</strong>
    </td>
    
    <td>
      3.6
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>Internet Explorer</strong>
    </td>
    
    <td>
      8.0.7600.16385
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>Flash Player</strong>
    </td>
    
    <td>
      WIN 10,1,51,95
    </td>
  </tr>
</table>


IMPORTANT, THE ONLY RELEVANT COMPARISONS ARE BETWEEN PERFORMANCE OF THE SAME CONTENT ACROSS DIFFERENT BROWSERS AND OPERATING SYSTEMS. COMPARING FLASH CONTENT TO JAVASCRIPT CONTENT IN THIS TEST IS NOT VALID GIVEN THE DIFFERENCES IN THE CONTENT AND / OR FUNCTIONALITY.

Below are the pages / content run, and the amount of CPU they took to run. Lowest CPU usage is highlighted in green, and highest CPU usage is highlighted in red. I have also included a platform delta line, which shows the range in performance between the high and lowest CPU usage per operating system. Note, that as time passes, the content at some of the URLs may change, and not reflect the content tested.

Note: I am looking into why Internet Explorer is reporting 0% CPU usage on some of the JavaScript and Flash examples.

[MacHeist Dynamic Canvas / JavaScript animation example][1]

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


[9elements JavaScript / Canvas Dynamic Animation Example][2]

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
      100% - 170%
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


[Sublime HTML 5 HD Video Example][3]

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
      85%
    </td>
    
    <td align="center">
      24%
    </td>
  </tr>
  
  <tr>
    <th align="left" valign="bottom" scope="row">
      Safari
    </th>
    
    <td align="center" bgcolor="#00FF00">
      21%
    </td>
    
    <td align="center" bgcolor="#FF0000">
      104%
    </td>
  </tr>
  
  <tr>
    <th align="left" valign="bottom" scope="row">
      Firefox
    </th>
    
    <td align="center">
      85%
    </td>
    
    <td align="center">
      80%
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


[HYPE Dynamic Flash Animation Example][4]

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
      25%
    </td>
    
    <td align="center" bgcolor="#00FF00">
      16%
    </td>
  </tr>
  
  <tr>
    <th align="left" valign="bottom" scope="row">
      Safari
    </th>
    
    <td align="center">
      17%
    </td>
    
    <td align="center" bgcolor="#FF0000">
      48%
    </td>
  </tr>
  
  <tr>
    <th align="left" valign="bottom" scope="row">
      Firefox
    </th>
    
    <td align="center">
      23%
    </td>
    
    <td align="center">
      18%
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


[Vimeo HD Flash Video Example][5]

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
      88%
    </td>
    
    <td align="center" bgcolor="#00FF00">
      56%
    </td>
  </tr>
  
  <tr>
    <th align="left" valign="bottom" scope="row">
      Safari
    </th>
    
    <td align="center">
      58%
    </td>
    
    <td align="center">
      64%
    </td>
  </tr>
  
  <tr>
    <th align="left" valign="bottom" scope="row">
      Firefox
    </th>
    
    <td align="center">
      70%
    </td>
    
    <td align="center">
      64%
    </td>
  </tr>
  
  <tr>
    <th align="left" valign="bottom" scope="row">
      Internet Explorer
    </th>
    
    <td align="center">
      NA
    </td>
    
    <td align="center" bgcolor="#FF0000">
      104%
    </td>
  </tr>
</table>


**Overall Comparative Performance** (shows how often each platform performed the best per content type)

<table width="450" border="1">
  <tr>
    <th align="left" scope="col">
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
    <th align="left" scope="row">
      HTML / JavaScript
    </th>
    
    <td align="center">
      3
    </td>
    
    <td align="center">
      6
    </td>
  </tr>
  
  <tr>
    <th align="left" scope="row">
      Flash
    </th>
    
    <td align="center">
      2
    </td>
    
    <td align="center">
      4
    </td>
  </tr>
  
  <tr>
    <th align="left" scope="row">
      All
    </th>
    
    <td align="center">
      5
    </td>
    
    <td align="center">
      10
    </td>
  </tr>
</table>

&nbsp;

I am not going to draw any definitive conclusions from this, but I do have some observations based on the results above.

*   From these tests, Flash content does not perform consistently worse on Mac than on Windows.
*   There is a wide range of CPU usage for HTML 5 video, depending on the browser / operating system it is being played back on, with Mac generally being slower.
*   Canvas / JavaScript animations (at least those tested) seem to have high CPU usage, and generally run slower on Mac than on Windows (although not in all cases).
*   Some of the HTML / JavaScript content would not run across all browsers.
*   There seems to be some bug in the tested Flash Player when playing back video in Firefox. CPU usage would climb very high, and then drop. (I have reported this to the team).
*   Availability of hardware acceleration for playing back video looks like it makes a huge difference in CPU usage (duh!).
*   Regardless of technology (Flash and JavaScript / HTML), performance of rich media can vary widely depending on which browser / operating system it runs on.

AGAIN, AS I STATED BEFORE THE ONLY RELEVANT COMPARISONS ARE BETWEEN PERFORMANCE OF THE SAME CONTENT ACROSS DIFFERENT BROWSERS AND OPERATING SYSTEMS. COMPARING FLASH CONTENT TO JAVASCRIPT CONTENT IN THESE TESTS IS NOT VALID GIVEN THE DIFFERENCES IN THE CONTENT AND / OR FUNCTIONALITY.

Please keep comments on topic. Off topic comments will be moderated / deleted.

Update (March 10, 2010) : You can find similar (but separate) tests and discussions on this topic [here][6] and [here][7].

Update (March 11, 2010) : Updated to make it clearer which Flash Player version was being used.

 [1]: http://www.macheist.com
 [2]: http://9elements.com/io/projects/html5/canvas/
 [3]: http://jilion.com/sublime/video
 [4]: http://www.hypeframework.org/02_examples/variablevibration/content/03_variablevibration/
 [5]: http://vimeo.com/1694439
 [6]: http://www.streaminglearningcenter.com/articles/flash-player-cpu-hog-or-hot-tamale-it-depends-.html
 [7]: http://www.readwriteweb.com/archives/does_html5_really_beat_flash_surprising_results_of_new_tests.php