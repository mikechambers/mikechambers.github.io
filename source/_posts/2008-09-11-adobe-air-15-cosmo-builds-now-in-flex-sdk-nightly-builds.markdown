---
title: 'Adobe AIR 1.5 (&#8220;Cosmo&#8221;) builds now in Flex SDK Nightly builds'
author: mikechambers
date: 2008-09-11 12:18:01 -0800
layout: post
permalink: /2008/09/11/adobe-air-15-cosmo-builds-now-in-flex-sdk-nightly-builds/
categories:
  - General
---


If you check out the [Flex SDK nightly builds][1], then you may have noticed that there are now [Adobe AIR][2] 1.5 bits included in the SDK. This is part of the AIR teams ongoing effort to continue to integrate closer into the Flex SDKs build process, and in general to provide more visibility into what is going on with AIR.

As the version number indicates, the Adobe AIR 1.5 release (code-named &#8220;Cosmo&#8221;) is a dot / incremental release. One of our original goals with AIR has been to update more frequently, as opposed to just having large updates at infrequent intervals. This release focuses on continuing to improve the foundation laid by the [1.0][3] and [1.1][4] release, and includes a number of changes and bug fixes, including, but not limited to:  
<!--more-->

*   Flash Player 10 integration, including 
    *   3D Effects and APIs
    *   Custom Filters and Effects ([Pixel Bender][5])
    *   New Text engine (with support for right to left, and vertical text layout)
    *   Drawing API enhancements
    *   Updated Saffron engine for font rendering
    *   Vector data type (typed Arrays)
    *   Enhanced Sound APIs
    *   Dynamic video streaming
    *   and [much more][6]
*   Integration of the [SquirrelFish][7] JavaScript VM into the Webkit HTML engine (should provide significant improvements to JavaScript execution)
*   Support for new languages 
    *   Swedish
    *   Dutch
    *   Czech
    *   Polish
    *   Turkish
*   Encrypted Local / SQLite databases
*   Lots of bugs fixes and stability improvements, including the uber-annoying 
    *   [AIR applications do not use the default browser to launch URLs on Vista][8]
    *   AIR applications open a new instance of Firefox to handle urls (as opposed to opening a new tab)

Note, that a couple of things from Flash Player 10 may not make the release for AIR 1.5. This includes Mac vector printing, and GPU / hardware accelerated rendering. We are also not picking up experimental features from the current WebKit builds.

The SDK contains the command line tools and libraries to author, test and package AIR files. **It does not include a runtime installer or updated documentation.** There is currently support for Mac and Windows, but not support for Linux (yet). However, expect more news on Linux very soon. 

The nightly releases are not the same as labs releases. Just as with the Flex SDK nightly builds, they have not been tested nearly the same as milestone and labs releases. There are bugs. Sometimes, there will be really bad bugs, but in general, the quality and stability level will continually improve as we move toward the release this fall. While the nightly releases are not targeted at locating bugs, if you do find issues you want to report, you can use the [bug report form][9] to do so.

Of course, as with any pre-release information, this is all subject to change, although at this point we don&#8217;t anticipate any major changes.

If you have any questions, or want clarification on anything just post a comment below.

 [1]: http://opensource.adobe.com/wiki/display/flexsdk/Download+Flex+3
 [2]: http://www.adobe.com/go/air
 [3]: http://kb.adobe.com/selfservice/viewContent.do?externalId=kb403153
 [4]: http://kb.adobe.com/selfservice/viewContent.do?externalId=kb403978
 [5]: http://labs.adobe.com/wiki/index.php/Pixel_Bender_Toolkit
 [6]: http://www.adobe.com/devnet/logged_in/jchurch_flashplayer10.html
 [7]: http://webkit.org/blog/189/announcing-squirrelfish/
 [8]: http://www.mikechambers.com/blog/2008/07/09/adobe-air-firefox-issue-on-vista/
 [9]: http://www.adobe.com/cfusion/mmform/index.cfm?name=wishform