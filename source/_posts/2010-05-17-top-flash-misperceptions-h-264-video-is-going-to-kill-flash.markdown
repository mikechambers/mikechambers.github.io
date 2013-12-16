---
title: 'Top Flash Misperceptions : H.264 Video is going to kill Flash'
author: mikechambers
date: 2010-05-17 12:33:01 -0800
layout: post
permalink: /2010/05/17/top-flash-misperceptions-h-264-video-is-going-to-kill-flash/
categories:
  - General
tags:
  - flash_myths
---

For today's myth, I want to cover one that has its roots in some fundamental misunderstandings around video technologies. That is the idea that H.264 Video (deployed via the HTML5 video tag) will kill Flash. This is a more recent meme, which has spread with the growing awareness of the forthcoming HTML5, but is unfortunately based on some fundamental misunderstandings about Flash, video capabilities, and the web in general.  
<!--more-->
  
First, we need to clarify a few things. H.264 is a video codec and not a player. It is a way to encode video. In order to view an H.264 encoded video, an end user must load it into a player such as running in Flash Player, Quicktime or VLC. Flash Player is a full featured multimedia runtime which supports a wide range of multimedia formats including H.264 (as well as other video codecs). Developers can create Flash content that can load and play H.264 encoded video (as YouTube does).

Since Flash Player is a multimedia runtime and H.264 is a video codec, it should be clear that one cannot replace the other. In other words, video is just one thing that Flash Player is used for. Other Flash Player uses include rich internet applications, web-based gaming, multimedia content, and rich branding experiences.

The current [draft of the HTML5 specification][1] includes a video tag, which promises to allow developers to deploy video on the web without having to use Flash Player (or another runtime). Indeed, a number of browsers have already begun to implement the tag. You could argue that the HTML5 video tag in conjunction with H.264 could replace Flash as the primary means for delivery of video on the web.

However, It is important to note that browser vendors have not agreed on a single codec to support for the HTML5 video tag. So, while Safari, <del>Chrome</del> and (eventually) Internet Explorer will be supporting H.264, Mozilla has made it clear that [it will not be able to add support for H.264 to Firefox due to patent and licensing restrictions][2]. Firefox thus leverages the Ogg Theora codec for HTML5 video, which is believed by many to be free of patent issues. Regardless, lets assume that browser vendors eventually agree on a single codec (perhaps a new one).

UPDATED : March 1, 2011 : Google has [announced][3] that it will be removing support for the H.264 codec from Google Chrome.

Even if browser vendors were to agree on a single codec to support, Flash Player will continue to play a major role in video on the web for several reasons.

In the short term (next year), it is a no brainer. The vast majority of video on the web is viewed via Flash Player, and while that lead may eventually erode, no one is arguing that Flash Player based video will go away in the next year. Even though use use of H.264 video is growing, much (if not most) of that video is still viewed via Flash Player.

In the medium term (2 - 5 years), the HTML5 video tag will still not replace Flash. The browser used by the majority of users, Internet Explorer does not currently support the video tag (although they have announced support in IE 9), and thus the [recommended best practice][4] for deploying video via the HTML5 video tag, is to also deploy it via Flash Player to ensure that users in all browsers can view it.

It takes a long time for users to abandon older browsers. For example, of the users that visit Wikipedia, [21% still use Internet Explorer 6 which was released in 2001][5]! Given how long it takes old browsers to go out of use, Flash will continue to help enable video to be delivered reliably across browsers and platforms (at least as a fallback).

Furthermore, as opposed to Flash Player, browsers do not have consistent support for some of the more advanced video features. These include functionality such as streaming, adaptive bitrate delivery, and content protection. I expect that eventually some if not all of these features will be supported within (at least some) browsers. However, as was discussed above, the slow pace that users update their web browser will ensure that Flash Player will still be needed to be used to deliver video.

In the long run, you could argue that eventually browsers will have more complete support for video and that those browsers will be used by enough users, that content providers could justify no longer using Flash for video. However, I believe that this is wrong as it assumes that Flash Player and the video industry will not continue to innovate and add new features and functionality around video that developers and users will want to take advantage of. i.e. that Flash video will not evolve from its current state.

If history is any indicator, this is an incorrect assumption. On average, from the time a new version of Flash Player is released, it takes 12 - 18 months for it to reach about 95% of users (Flash Player 10.1 took 6 months to hit 80%). This means that new features and functionality can be added to Flash Player, and those features can then be reliably used online within about 12 - 18 months (Player generally reaches 80% penetration in less than 12 months).

So when Flash Player adds a new video feature developers can take advantage of the new functionality in a relatively short period of time. If the feature is useful and popular enough, then it may eventually get rolled into the next HTML version and / or implemented by browser vendors (which is completely fine with Adobe). Given the amount of time that it takes for users to update their browsers, developers can still use a combination of HTML and Flash Player in order to ensure users of all browsers could view their content and leverage the new functionality and features.

This is not an argument that Flash video is better than HTML5 video (maybe it is, maybe it isn't). However, the HTML specification process as well as browser updates move at a slower pace than Flash. This is largely due to the fact that HTML is a group driven process (although recently some browsers have been moving more quickly on their own ahead of the HTML specification process). However, this is not necessarily a bad thing. HTML specification writers are in the position of being able to cherry pick the best and proven technologies (from multiple sources, including the Flash Player), and can thus focus their efforts on areas they know developers and users will want to take advantage of (this is an area where Flash Player has been driving innovation for years, and which more recently, an argument that Google made with Google Gears).

And believe it or not, if HTML5 based video begins to eat into the amount of video served via the Flash Player, Adobe is completely fine with that. It just means that we will have to continue to innovate with the Flash Player in ways that makes it compelling for developers to leverage. It wouldn't be the first time that tasks done in Flash have moved over to be done in HTML / JavaScript as browsers matured.

So, to summarize, H.264 is not going to replace Flash Player as they are not the same thing. HTML5 video is also not likely to replace the Flash player, at least in the short to medium terms given the slow pace of browser adoption, and the lack of more advanced video functionality implemented in the browsers. While mobile adoption and usage could change these metrics, the desktop is going to continue to play a significant role, at least in the medium term.

Now, I know a lot of people are going to criticize this, and frame it as Adobe bashing HTML5. That is not the case. I expect that the use of HTML5 video will continue to grow, particularly for progressive video such as the type served by YouTube. This isn't an argument of which technology is better, but rather whether video served via Flash is going to go away any time soon. It isn't.

Resources

*   [Wikipedia : Usage Share of web browsers][5]
*   [Flash Player Penetration Stats][6]
*   [Video, Freedom and Mozilla][2]
*   [Pardon Our Dust][7]
*   [HTML5 Specification Draft][1]
*   [There is no WebKit on Mobile][8]
*   [Flash Co-Creator Jonathan Gay on Flash, Adobe, Apple, Video and HTML5][9]
*   [HTML Video Codec Support in Chrome][3]

 [1]: http://dev.w3.org/html5/spec/Overview.html
 [2]: http://weblogs.mozillazine.org/roc/archives/2010/01/video_freedom_a.html
 [3]: http://blog.chromium.org/2011/01/html-video-codec-support-in-chrome.html
 [4]: http://henriksjokvist.net/archive/2009/2/using-the-html5-video-tag-with-a-flash-fallback
 [5]: http://en.wikipedia.org/wiki/Usage_share_of_web_browsers
 [6]: http://www.adobe.com/products/player_census/flashplayer/
 [7]: http://blog.hulu.com/2010/05/13/pardon-our-dust/
 [8]: http://www.quirksmode.org/blog/archives/2009/10/there_is_no_web.html
 [9]: http://coldhardflash.com/2010/05/flash-co-creator-jonathan-gay-responds-to-steve-jobs.html