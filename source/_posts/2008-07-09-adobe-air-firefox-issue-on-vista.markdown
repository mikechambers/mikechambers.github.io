---
title: Adobe AIR / Firefox issue on Vista
author: mikechambers
date: 2008-07-09 12:00:01 -0800
layout: post
permalink: /2008/07/09/adobe-air-firefox-issue-on-vista/
categories:
  - General
---


One of the issue mentioned in our the Adobe AIR 1.1 release notes is an issue where [Firefox is not used as the default web browser on Vista][1]. From the technote:  
<!--more-->

> On Windows Vista, web pages opened from AIR applications (this is done by calling the navigateToURL() method) may not open the default browser; it always opens Internet Explorer. To workaround this problem, go to Start > Default Programs > Set Program Access and Computer Defaults. Expand the Custom section, select the option next to the application you want to set as the system-wide default browser (for example, Mozilla Firefox), and then click OK.

As the note mentions, this is an issue on Vista. We are working on narrowing down the issue, and it looks like it has something to do with some changes around registry settings in Vista.

If you have run into the issue, could you take a second and answer the following questions in the comments:

1.  Are you running on Vista?
2.  Are you running with admin privledges?
3.  Do you have UAC (Universal Access control) enabled?
4.  Is Firefox set as your default browser?
5.  If you go to a command prompt and type &#8220;start http://www.google.com&#8221;, which browser opens?
6.  Are you running on Firefox 3

This will help us confirm what we think the issue is (as well as whether it is an AIR, Mozilla and / or Vista issue).

Ill update the post as I get more info. Also, please keep the comments on topic for this post.

Update (September 3, 2008) : If you are running into this issue, please try the [fix mentioned in this blog post][2] (substituting you default browser for Google Chrome), and leave a comment indicating whether it fixed the issue.

Update (September 3, 2008): There is another potential fix [here][3].

Update (November 17, 2008) : These issues have now bee fixed in [Adobe AIR 1.5][4].

 [1]: http://kb.adobe.com/selfservice/viewContent.do?externalId=kb403978&sliceId=1#E4
 [2]: http://blog.dotsmart.net/2008/09/03/setting-google-chrome-as-the-default-browser-for-adobe-air-apps/
 [3]: http://agoln.net/archives/148
 [4]: http://get.adobe.com/air/