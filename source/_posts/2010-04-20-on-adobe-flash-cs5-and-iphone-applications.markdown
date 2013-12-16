---
title: On Adobe, Flash CS5 and iPhone Applications
author: mikechambers
layout: post
permalink: /2010/04/20/on-adobe-flash-cs5-and-iphone-applications/
categories:
  - General
tags:
  - apple
  - fp10.1
  - iphone
  - mobile
---

A little over a week ago Apple released a new draft of their iPhone developer program license which contained the following clause:

> 3.3.1 — Applications may only use Documented APIs in the manner prescribed by Apple and must not use or call any private APIs. Applications must be originally written in Objective-C, C, C++, or JavaScript as executed by the iPhone OS WebKit engine, and only code written in C, C++, and Objective-C may compile and directly link against the Documented APIs (e.g., Applications that link to Documented APIs through an intermediary translation or compatibility layer or tool are prohibited).

Essentially, this has the effect of restricting applications built with a number of technologies, including Unity, Titanium, MonoTouch, and Flash CS5. While it appears that Apple may selectively enforce the terms, it is our belief that Apple will enforce those terms as they apply to content created with Flash CS5. Developers should be prepared for Apple to remove existing content and applications (100+ on the store today) created with Flash CS5 from the iTunes store.  
<!--more-->

  
We will still be shipping the ability to target the iPhone and iPad in Flash CS5. However, we are not currently planning any additional investments in that feature.

To be clear, during the entire development cycle of Flash CS5, the feature complied with Apple's licensing terms. However, as developers for the iPhone have learned, if you want to develop for the iPhone you have to be prepared for Apple to reject or restrict your development at anytime, and for seemingly any reason. In just the past week Apple also changed its licensing terms to essentially [prohibit ad networks other than its own on the iPhone][1], and it came to light that [Apple had rejected an application from a Pulitzer Prize winning cartoonist][2] on editorial grounds (which Apple later said was a "mistake").

The primary goal of Flash has always been to enable cross browser, platform and device development. The cool web game that you build can easily be targeted and deployed to multiple platforms and devices. However, this is the exact opposite of what Apple wants. They want to tie developers down to their platform, and restrict their options to make it difficult for developers to target other platforms. There is plenty of commentary online about this, so I won't belabor the point, but I have included some links below that cover it more depth:

*   [Apple Wants to Own You][3]
*   [Apple Locks iPhone Developers in Its Walled Garden][4]

So, was all of the work on the iPhone packager a waste of time and resources? No, I don't believe so. We proved that:

1.  There is no technical reason that Flash can't run on the iPhone
2.  Developers can create well performing and compelling content for the device with Flash

However, more importantly, the teams implemented features (such as hardware acceleration and Ahead of Time compilation) that we will now be able to leverage for other devices and platforms. We have gained knowledge and experience that are being directly applied to Flash Player 10.1 and Adobe AIR 2.0 for other mobile operating systems.

Fortunately, the iPhone isn't the only game in town. Android based phones have been doing well behind the success of the Motorola Droid and Nexus One, and there are a number of [Android based tablets][5] slated to be released this year. We are [working closely with Google][6] to bring both Flash Player 10.1 and Adobe AIR 2.0 to these devices, and thus far, the results have been very promising.

Because this is Flash, it is rather trivial to port games created with Flash that target the iPhone to target other operating systems, such as Android. At [FlashCamp San Francisco][7] on Friday night, David Wadhwani (GM and VP of the Flash Platform) showed off a number of games running on Android that had been created with Flash, many of which had already been deployed as iPhone games. My personal favorites were [Chroma Circuit][8] and GridShock created by Josh Tynjala of [Bowler Hat Games][9]. Both games were originally developed as browser based games and were then updated to target the iPhone (Chroma Circuit was featured on the iTunes app store). Josh recently updated and optimized them to target Flash Player on Android, and the [results][10] have been impressive. There have already been a couple of developers who have moved their Flash based content from the iPhone to Flash on Android (couple of examples below) and I expect that this is a trend we will be seeing more and more of.

Here are some links to developers who originally targeted the iPhone with their Flash content and are now deploying to Android:

*   [Adobe AIR for Android: Chroma Circuit and Qrossfire Videos][10]
*   [Jobe Makar : Flash is Speedy on Android][11]
*   [Jobe Makar's Fruit Smash Organic (Video)][12]
*   [Alan Queen's Star Map Game (Video)][13]

Both Flash Player 10.1 and Adobe AIR 2.0 for Android are in pre-release testing. If you are interested in being notified when we expand the testing, you can sign up at:

*   [Flash Player 10.1 for Android Beta][14]
*   [Adobe AIR 2.0 for Android Beta][15]

Personally, I am going to shift all of my mobile focus from iPhone to Android based devices (I am particularly interested in the Android based tablets coming out this year) and not focus on the iPhone stuff as much anymore. This includes both Flash based, and Objective-C based iPhone development. While I actually enjoy working in Objective-C, I don't have any current plans to update and / or maintain my existing native iPhone applications (including the [AS3 Reference Guide][16], and [Timetrocity][17]). As I wrote [previously][18], I think that the closed system that Apple is trying to create is bad for the industry, developers and ultimately consumers, and that is not something that I want to actively promote. Don't worry though, I definitely plan to get both [Pew Pew][19] and [Bacon Unicorn Adventure][20] running on Android and am planning on open sourcing both.

We are at the beginning of a significant change in the industry, and I believe that ultimately open platforms will win out over the type of closed, locked down platform that Apple is trying to create. I am excited about Flash Player 10.1 and Adobe AIR 2.0 and all of the opportunities that they will make available to Flash developers across multiple platforms (desktop, Android, Palm, Windows Phone 7, RIM, etc...).

NOTE : Please keep comments constructive and on topic. Off topic comments will be moderated / deleted. (And yes, commenting that "Flash SUXXORS!" or calling me a "wanker" are considered off topic).

UPDATE (September 10, 2010) : Apple has updated their licensing terms and now allow addition tools and technologies to be used to develop iPhone / iOS applications. You can find more information on how this impacts Flash [here][21].

 [1]: http://www.wired.com/epicenter/2010/04/with-new-developer-agreement-apple-unlevels-the-iad-playing-field/#ixzz0lamm408R
 [2]: http://www.niemanlab.org/2010/04/mark-fiore-can-win-a-pulitzer-prize-but-he-cant-get-his-iphone-cartoon-app-past-apples-satire-police/
 [3]: http://slate.com/id/2250993
 [4]: http://www.pcworld.com/article/194318/apple_locks_iphone_developers_in_its_walled_garden.html
 [5]: http://mashable.com/2010/03/24/nvidia-tegra-android-tablet-demo/
 [6]: http://blogs.adobe.com/conversations/2010/04/adobe_air_on_the_android_platf.html
 [7]: http://flashcampsf.eventbrite.com
 [8]: http://www.youtube.com/watch?v=6WZrE1_7Dw4
 [9]: http://bowlerhatgames.com/
 [10]: http://joshblog.net/2010/04/20/adobe-air-for-android-chroma-circuit-and-qrossfire-videos/
 [11]: http://jobemakar.blogspot.com/2010/04/flash-is-speedy-on-android.html
 [12]: http://www.youtube.com/watch?v=R_ia7q2-yuM&feature=player_embedded
 [13]: http://www.youtube.com/watch?v=dDQHCiFl7oc
 [14]: https://www.adobe.com/cfusion/entitlement/index.cfm?e=labs_flashplayer10_android_signup
 [15]: https://www.adobe.com/cfusion/entitlement/index.cfm?e=labs_air_android_signup
 [16]: http://www.mikechambers.com/as3iphone/
 [17]: http://www.mikechambers.com/timetrocity/
 [18]: http://www.mikechambers.com/blog/2010/01/28/some-personal-thoughts-on-apple-and-the-trend-towards-closed-platforms/
 [19]: http://www.flickr.com/photos/mikechambers/4005016921/
 [20]: http://twitpic.com/q00ox
 [21]: http://www.mikechambers.com/blog/2010/09/10/update-on-flash-and-iphone-development/