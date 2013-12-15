---
title: XBox to Flash Video HowTo (pictures)
author: mikechambers
layout: post
permalink: /2004/10/01/xbox-to-flash-video-howto-pictures/
categories:
  - General
---


As I posted yesterday, we did a little test that involved streaming video from an [Xbox][1] (playing [StarWars Battlefront][2]) over [DevChat][3] via [Flash video][4]. I actually did [something similar][5] to this about a year ago, but this was to help test a new (and hopefully better) hardware configuration.

A lot of people were asking how we did it, so I thought I would make a quick post explaining it.

Here is the setup:  
<!--more-->

  
<img alt="xbox_flow_.gif" src="/mesh/files/xbox_test/xbox_flow_.gif" width="389" height="392" border="0" />

Xbox connects to the [Canopus ADVC 100][6]. This is a box that takes video in via a number of different connections, and allows you to split it out via a number of connections. We used an RCA cable to connect the Xbox to the ADVC 100. We could have also use an S-Video cable, which would have given us better picture quality, but we did not have one handy. 

The ADVC 100 splits the connection. One connection goes via RCA cable to a [Viewsonic N4][7]. This is a nice little box that converts video in the VGA signals. The main reason we needed this is so that we could play the game on a monitor (in this case a 42 inch Plasma), which we connect with via a VGA cable. Ideally we would have connected directly to the plasma screen from the ADVC 100 with an SVideo cable, but we didn&#8217;t have an S-Video cable handy, and thus had to connect through the AV connections (VGA) in the conference room.

The other connection from the ADVC 100 connects to a Mac Powerbook (1.25 ghz, 1 gig ram) via Firewire.

Finally, we had a simple audio connection from the ADVC 100 to the conference rooms audio system.

This setup allows us to view / play on the plasma while at the same time making the video available to the Powerbook.

For this test, we opened up DevChat on the powerbook, selected the video pod, and created a video and audio stream. We just had to tell the Flash / Central player to use the Digital Video (DV) feed via Firewire as the audio and video source. Danny Dura posted a screen shot of it [here][8].

Of course, we could also open some video editing software (such as iMovie) and save the DV stream. That is a post for another day though. 

Here are a couple of pictures of the setup. Sorry that they are a little blurry, but they were taken with a couple of cell phones (my [Motorola v600][9] and [Christian&#8217;s][10] new [Sidekick II][11]):

<img alt="xbox_1_.jpg" src="/mesh/files/xbox_test/xbox_1_.jpg" width="640" height="480" border="0" />

<img alt="xbox_2_.jpg" src="/mesh/files/xbox_test/xbox_2_.jpg" width="640" height="480" border="0" />

<img alt="xbox_3_.jpg" src="/mesh/files/xbox_test/xbox_3_.jpg" width="602" height="393" border="0" />

We learned a couple of things:

*   The hardware setup works
*   We need to use higher quality cables (S-Video) for the connections. Video quality noticeable suffered do to the lower quality cables, and the length of the cables.
*   Danny needs to learn to aim in Battlefront

This was just simple test to check out the hardware configuration. We are working on some other things which should be pretty cool. More info on that in the future.

 [1]: http://www.xbox.com
 [2]: http://www.xbox.com/en-US/starwarsbattlefront/default.htm?level3=starwarsbattlefront&level2=fg5blurb&level1=enusgames
 [3]: http://www.markme.com/mesh/archives/004319.cfm
 [4]: http://www.macromedia.com/devnet/mx/flash/video.html
 [5]: http://www.markme.com/mesh/archives/000360.cfm
 [6]: http://www.canopus.com/US/products/advc-100/pm_advc-100.asp
 [7]: http://www.viewsonic.com/products/tventertainment/tvvideoprocessors/nextvisionn4/
 [8]: http://www.danieldura.com/archives/rants_and_raves/watch_star_wars_battlefront_in_devchat.php
 [9]: http://commerce.motorola.com/consumer/QWhtml/m_v600.html
 [10]: /cantrell/
 [11]: http://www.danger.com/consumers_hiptop2.php