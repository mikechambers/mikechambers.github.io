---
title: 'Video with Flash MX : A Users Guide : Session 1 of 3.'
author: mikechambers
layout: post
permalink: /2002/07/10/video-with-flash-mx-a-users-guide-session-1-of-3/
categories:
  - Conferences
---


Video in Flash MX.  
<!--StartFragment -->&nbsp;Danny Mavromatis and Mike Davidson, ESPN.com

  
Danny and Mike work for ESPN.com which is a very popular site. they do have some power to force users to change browsers.  
Video in Flash  
**Image Sequences**  
Most primitive version of video in flash is a sequence of images. They are showing some Seinfeld clips that use the technique. Basically, take a video clip, export it as a sequence of images, and then import them into flash (flash will recornize that it is a sequence of images).  
problems, no sound, although you can manually add it. it is essentially an image of jpgs. no temporal compression.  
**QuickTime**  
Flash Player is embedded in player. Pretty much flash 4 compatible, but can be a little buggy. more for adding effects on top of quicktime movies.  
**Video on Top of Flash**  
Interface in Flash, and then layer video ontop of flash using DHTML and iframes. Works pretty well. problems with browser support (due to DHTML).  
The Importance of Flash MX Video  
  
*   Reduces incompatibilities between systems (some difference between playback on pc and mac, pc smoother).  
    *   Reduces complexities of mcahine interactions.  
        *   Easier to set up on the client.  
            *   More self-contained  
                *   Not easiliy saveable on client-machines  
                    *   More onsistence playback across platforms.</UL>
                      
                    on mac, import an 1/8 of a second&nbsp; blank audio on first frame. set it to stream. this will make the video drop frames if it can&#8217;t keep up, which leads to better video flow.  
                    Showing new ESPN video player. Flash Interface, with a layer of video (real or windows media) over flash. sometimes it will not come up, can take a while to load due to checking players, browser, etc&#8230;  
                    Showing Xgames video full screen flash application / projector, with video. *Pretty sweet &#8211; mc*.  
                    It is more difficult to steal video from Flash. That doesn&#8217;t mean it is impossible, but for regular users, it is enough of a hassle, that most will give up or not try.  
                    Because everything is contained within Flash, you can leverage the power of flash with video to completely customize your application (i.e. create a custom / advanced preloader for the video).  
                    more advantages to video in flash  
                      
                    *   no missing codec issues.  
                        *   fully transparent display mechanism  
                            *   temporal compression (only saves video data that changes from flash to flash. sorenson squeeze does this and leads to higher quality and lower file sizes).  
                                *   easily operable across flash applicaiotns.  
                                    *   potential on playback on devices.</UL>
                                      
                                    Limitations of Video in Flash  
                                      
                                    *   currently not batch encodable (sorenson spark pro can do this).  
                                        *   No built in buffering mechanisms (you can write your own buffering with ActionScript).  
                                            *   No built in connection speed detection mchanisms.  
                                                *   No sure streamtype capabilities.  
                                                    *   Current Flash 6 player pentration is low.</UL>
                                                      
                                                    they are showing media metrix numbers for flash penetration. numbers are from march. they are very consistent in growth rates. every 14 months, pentration is up to 86% (based on his research. *note, we project flash 6 rates will go up faster than in the past. -mc*)  
                                                      
                                                    *   Video does not automatically stop on last frame (you can write actionscript to stop it).  
                                                        *   upsacing video size is slightly inferior to other video formats.  
                                                            *   not a reference format (quicktime is, windows media, real are not).  
                                                                *   no rights managements capabilities.  
                                                                    *   No native full screen mode. </UL>
                                                                      
                                                                    end of session.</p>