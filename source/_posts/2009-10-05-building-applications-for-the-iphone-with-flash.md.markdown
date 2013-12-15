---
title: Building Applications for the iPhone with Flash
author: mikechambers
layout: post
permalink: /2009/10/05/building-applications-for-the-iphone-with-flash/
categories:
  - General
---


This morning during the day 1 keynote at [Adobe Max 2009][1], Adobe announced that the next version of Adobe Flash (Flash Professional CS5) will include support for creating stand-alone applications for the Apple iPhone and iPod Touch. As you can imagine, this is something that we are really excited about, and we expect there to be a lot of questions. This post should address some of those questions, and point to additional resources with more information.

So, what exactly did we announce?  
<!--more-->

  
The next version of Flash Authoring will enable developers to create stand-alone iPhone applications using Flash technologies (including ActionScript 3). These applications are just like any other iPhone application and can be distributed via the Apple iTunes Application store. Indeed, there are already a [number of applications][2] created with Flash on the store today.

One thing I want to stress is that this is for standalone applications, and is not the Flash Player for mobile Safari (which is something we continue to work on). The end result is a native iPhone application, and not a SWF that runs in the browser. We compile the SWF to a native application using [LLVM][3]. There is no requirement for the Flash Player / Adobe AIR Runtime to be installed on the device or included in the application. The end result is a native iPhone application.

Currently, this project is in private beta, and we plan to release a public beta of Flash CS5 with support for building iPhone applications before the end of this year. We are not accepting any new people for the private beta, but you can [sign up to be notified][4] when the public beta is available.

We have posted a [developer FAQ][5] on labs, which addresses a lot of the questions we expect you will have (we will continue to update this as necessary). The FAQ also includes some information that will be helpful if you want to start working on some content in anticipation of the public beta.

One thing that I really want to stress though, is that developing for the iPhone is mobile / device development. The iPhone has a significantly slower processor and less memory than what can be found in a typical desktop computer. As such, existing content may need to be optimized for performance, and / or user interactions (given the smaller screen and different UI metaphors). So, design and develop content with these limitations and differences in mind. Fortunately, we have done some things in the compiler, including enabling support for hardware accelerated rendering, to help with performance. Expect more information on this, and other optimization strategies once the public beta is available.

I am sure there are a lot of questions. As I mentioned above, we have created a [developer FAQ][5] that should address a lot of the most common questions. We have also created a [forum][6] for discussion of the announcements and technologies. Please feel free to also post any questions in the comments here.

Here are some additional resources:

*   [Flash Applications for iPhone on Labs][7]
*   [Developing for the Apple iPhone using Flash][3]
*   [Developer FAQ][5]
*   [iPhone forum][6]

Finally, if you are attending Max, we have a number of sessions which will cover building iPhone applications using Flash. I will make another post with information on those shortly (my session will be a general Q & A session on building iPhone applications with Flash).

 [1]: http://max.adobe.com/
 [2]: http://labs.adobe.com/wiki/index.php/Applications_for_iPhone:Developer_FAQ#Are_there_currently_any_applications_on_the_iTunes_App_Store_created_with_Flash.3F
 [3]: http://www.adobe.com/devnet/logged_in/abansod_iphone.html
 [4]: http://www.adobe.com/go/flashprobetanotify
 [5]: http://labs.adobe.com/wiki/index.php/Applications_for_iPhone:Developer_FAQ
 [6]: http://forums.adobe.com/community/labs/flashcs5/appsfor_iphone
 [7]: http://labs.adobe.com/technologies/flashcs5/appsfor_iphone/