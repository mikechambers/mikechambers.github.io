---
title: Streaming your Desktop on Mac OS X
author: mikechambers
layout: post
permalink: /2011/05/29/setting-up-desktop-streaming-on-mac-os-x/
categories:
  - General
tags:
  - fmle
  - mac
  - streaming
  - video
---


I have been playing a lot of [Starcaft 2][1] lately, and really getting into the entire [community][2]. One part of the community that I recently discovered has been live streams of games (some from pros) via sites like [justin.tv][3] and [ustream.com][4]. There are plenty of articles online talking about how to stream your desktop on Windows based machines, but virtually none on how to do it from a Mac. This article will show how to use Adobe Flash Media Live Encoder (and a couple of other tools) to live stream your desktop to justin.tv (although the setup would also work for other streaming sites).  
<!--more-->

  
I am going to divide the article up into a couple of sections. The first part will show how to get a basic desktop stream going, including system sound. The second section will show a more advanced sound setup that allows you to also broadcast your microphone, and audio from other apps such as skype.

## Basic Desktop Streaming Setup

The basic setup will allow us to stream our desktop and system audio to justin.tv. This requires the following software:

*   [Adobe Flash Media Live Encoder (FMLE) 3.2 for Mac][5] : Encodes and streams video and audio to justin.tv
*   [CamTwist][6] : Used to capture desktop as a video source
*   [Soundflower][7] : Utility used to capture and redirect system output
*   justin.tv config file : Only required if you are streaming to justin.tv (link provided below)

The basic setup is pretty simple, and essentially requires setting up CamTwist to capture your desktop as a video source, and have Flash Media Live Encoder take that video source, combine it with the system audio, and stream it to the server (in this case justin.tv).

### A Note on Performance

Keep in mind that encoding and broadcasting live video feeds can be very CPU intensive, and thus may require significant system resources. Depending on what you are streaming, this may affect other applications running on your system, or even the quality of the stream.

### Configuring CamTwist

First, download and install CamTwist. Once it is installed, open it up, and under the Step 1 section, double click &#8220;Desktop&#8221; (not &#8220;Desktop+&#8221;). &#8220;Desktop+&#8221; allows you to select a specific window to broadcast, but since we are going to be broadcasting our entire desktop, we will just use the Desktop preset.

You can save these settings by clicking the &#8220;Save Setup&#8221; button.

Do not select any effects in Step 2.

In Step 3 make sure that &#8220;Desktop&#8221; is included and checked. In the settings window, make sure that screen is set to &#8220;Main Screen&#8221;. This ensures that only the main screen will be broadcast (which only matters if you have multiple monitors). 

Also make sure that &#8220;Full Screen&#8221; and &#8220;Show mouse pointer (simulated)&#8221; are selected.

Once you have set all of these settings, you can save them by clicking the &#8220;Save Setup&#8221; button.

<div style="text-align:center">
  <img height="364" width="600" src="/blog/images/mac_screen_broadcast/camtwist_main.png" />
</div>

&nbsp;

Now, open the preferences (*CamTwist > Preferences*), and select the &#8220;General Tab&#8221;. Set the frame rate to the same frame rate you plan to encode at. I am using 24 FPS. The higher the FPS, the smoother the video, but the more bandwidth and CPU required to encode and transmit it.

Set video size to &#8220;Custom&#8221; and set it to your desktop resolution. In my case, I have it set to 1920 x 1200, which is my native desktop resolution. Set it to the native resolution even if you are going to broadcast at a lower resolution. We will have Adobe Flash Media Live Encoder scale the video down, as my experience has been that it does it much more efficiently than CamTwist.

<div style="text-align:center">
  <img height="342" width="384" src="/blog/images/mac_screen_broadcast/camtwist_preferences.png" />
</div>

&nbsp;

Once you have set the preferences, close the window and restart CamTwist. Make sure the &#8220;Desktop&#8221; section is selected. You can test that everything is working by selecting *Tools > Preview*, which will give you a small preview of the video being captured.

### Configuring Audio with Soundflower

In order to capture audio, we need a way to capture the system&#8217;s audio output, and make it an input for Flash Media Live encoder. Mac OS X does not have native support for doing this, but the free Soundflower utility enabled this.

Soundflower is a utility that can combine multiple audio outputs and redirect them into a single audio output. We can use this to capture system audio, and pass it on to FMLE to include the audio for our video stream.

First, download and install [Soundflower][7]. Once it is installed, launch it. It won&#8217;t open an application window, but will add a small menu item icon (a flower) on the top right of the menu bar.

We need to tell OS X to direct system audio output to Soundflower. Open Sound preferences (*System Preferences > Sound > Output*) and select &#8220;Soundflower (2ch)&#8221;.

<div style="text-align:center">
  <img height="482" width="668" src="/blog/images/mac_screen_broadcast/sound_settings_basic.png" />
</div>

&nbsp;

Basically, anything that you would hear through your speakers will now be directed first through Soundflower.

Next, click the Soundflower icon on the menu bar, and for &#8220;Soundflower (2ch)&#8221; select what you would normally have set as your system output (such as headphone, or Line-Out). This will redirect the audio through Soundflower, and pass it through your normal output so you can still hear it. However, because it is first directed through Soundflower, we can now also use that as an input source in FMLE.

<div style="text-align:center">
  <img height="434" width="292" src="/blog/images/mac_screen_broadcast/soundflower_basic.png" />
</div>

&nbsp;

There is a lot more advanced stuff we can do with Soundflower, which we will cover later in the article.

### Configuring Adobe Flash Media Live Encoder

[Adobe Flash Media Live Encoder][5] (FMLE) is a free tool provided by Adobe that can take a video and audio feed, and create either a VP6 or H.264 encoded video stream that can be streamed to servers and sites such as justin.tv. 

Download and install the latest version of FMLE (this article is using version 3.2). If CamTwist is not already running, go ahead and open it. Once FMLE is installed, open it up.

Now, before we start changing settings, we need to first download a config file for our specific justin.tv account. This will include information specific to our account that justin.tv uses to determine which account the stream is associated with. If you are not using justin.tv, you may to skip this section, although you may need to look up docs on how to configure the stream for your specific server.

Log into your justin.tv account, and then visit [this page][8]. At the bottom of the page is section for &#8220;Flash Media Encoder&#8221;. Click the &#8220;Config File&#8221; button. This is the XML config file for FMLE specific for your justin.tv account. Click the button and download the file to your desktop.

**Note** : This file will allow anyone who has it to stream to your justin.tv account, so be careful to protect it.

Once you have downloaded the file, we are ready to import it into FMLE. Switch to FMLE and select *File > Open Profile*. You may get a warning that some tags are not support, and defaults are being used. Just ignore this.

If you look in the output panel on the right side of FMLE, you should see the FMS URL set to something like: `rtmp://live.justin.tv/app`, and the stream attribute have a value similar to: `live_12345678_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`.

Again, this second string is specific to your account, and will allow anyone to stream to your justin.tv account. You can hide the panel it is shown in (so it wont be displayed on your stream), by selecting &#8220;Panel Options&#8221; and setting it to &#8220;Meta Data&#8221; (so the panel wont be displayed). Note that you may need to do this each time your start FMLE.

We are now ready to set up the encoding options for FMLE. First, we will setup the video encoding settings. Some of the settings may vary depending on your system, but I will point out where and why you might want to tweak them.

#### FMLE : Video Settings

First, in the video panel, make sure that &#8220;Video&#8221; is checked. For &#8220;Device&#8221;, select &#8220;CamTwist&#8221;. If &#8220;CamTwist&#8221; does not appear as an option, make sure that CamTwist is running and is set to broadcast the desktop. If it isn&#8217;t, start it, and then restart FMLE.

Once you have selected CamTwist, you can confirm that it is working by making sure &#8220;Input Video&#8221; is selected in the &#8220;Preview&#8221; panel at the top. With this selected, you should see the video feed preview of your desktop.

Next, we need to set the video codec we will be encoding to as well as its options. There is a choice between H.264 and VP6. I am not going to go into a discussion about which is better. In general though H.264 offers higher quality at lower bitrates, with slightly higher CPU usage, while VP6 offers lower quality, with higher bitrates and slightly lower CPU usage. For this article, I will be using H.264 to stream to the server.

Select &#8220;H.264&#8243; as the Format, and click the little wrench icon. This will open a panel where we can set additional setting specific to the codec.

Set the profile to &#8220;Main&#8221;.

The &#8220;Level&#8221; value will vary depending on the resolution you will be encoding at. In our case, I will be encoding at 720p (1280 x 720) at 24 FPS, so I need to set the level to &#8220;3.1&#8243;. You can find a list of levels and resolutions / FPS in the [H.264 wikipedia article][9].

Finally, we need to set the Keyframe Frequency. This determines how frequently keyframes (complete captures of the image) are inserted into the stream. We will use the default of &#8220;5&#8243;.

<div style="text-align:center">
  <img height="292" width="300" src="/blog/images/mac_screen_broadcast/advanced_encoder_settings.png" />
</div>

&nbsp;

Once you have set the codec settings, click the &#8220;OK&#8221; button.

Back in FMLE, set the Frame Rate to &#8220;24.00&#8243; fps. Higher framerates provide smoother video, but require more CPU and bandwidth. Lower framerates provide choppier video, but require less CPU and bandwidth. I think that 24 FPS is a good middle ground, but feel free to experiment. Just remember that if you change this, you should also change it in the CamTwist preferences, so they are the same.

Set &#8220;Input Size&#8221; to the size that you will be broadcasting / encoding at. We do this, even though the input received from CamTwist is a higher resolution. FMLE will scale the video to the appropriate size. It has been my experience that this uses less CPU that having CamTwist do the scaling.

We could set input size to the full resolution of the input stream, and then have the output size as a scaled down stream. However, in my case, i have a 16:10 stream resolution which FMLE currently doesn&#8217;t support, which would result in part of the stream being chopped at the top and bottom. By having the scaling done at the Input Size, I was able to get the content scaled correctly, without having any part of the stream cropped. (If anyone has more feedback on this, please post it in the comments.).

Make sure that &#8220;Maintain Aspect Ratio&#8221; is also checked for &#8220;Input Size&#8221;. This prevents the video from being skewed when it is scaled.

Now, FMLE can encode and output multiple streams and sizes (which I believe justin.tv supports), however, we will just be broadcasting one stream.

Make sure the first stream is checked, and set the &#8220;Bit Rate&#8221; to &#8220;1000&#8243; kbps. This setting basically specifies how much data is included in the stream. The higher the value, the clearer the image (less compression) and the more bandwidth required. The main thing to consider when setting this is how much upstream bandwidth you have available. You can get a general idea by doing a [speed test][10] and looking at the upload results. On the right of the stream section in FMLE, will be an estimate of the total bandwidth required to stream at the current setting. You want to make sure that you have some buffer between what you are sending, and what your upstream bandwidth is. Otherwise, viewers of your stream may see frequent drops and stutters.

To start with, I would set it at 1000, test, and then move the value up (in increments of 500) until you find a good balance between bandwidth usage and video quality.

Set the &#8220;Output Size&#8221; to the output size you want to stream at. For this article, we will be streaming at 720p (&#8220;1280 x 720&#8243;), which is a standard HD resolution, and I feel provides a good tradeoff for providing high quality stream for the bandwidth required. Again, adjusting the resolution will affect the amount of bandwidth required for the stream.

You can leave both &#8220;Deinterlace&#8221; (since we are running at 720p) and &#8220;Timecode&#8221; unchecked.

#### FMLE : Audio Settings

Audio settings are a bit less involved than video settings, and mostly requires finding a balance between quality and bandwidth required.

Make sure that &#8220;Audio&#8221; is checked at the top of the Audio section.

For &#8220;Device&#8221;, select &#8220;Soundflower (2ch)&#8221;. If this does not appear, make sure Soundflower is running. If it is not, start it and restart FMLE.

Once it is set, you can test that is is working by checking &#8220;Audio&#8221; in the preview panel and thenm play an audio source on your system. You should see the audio levels reflected in the preview panel (on the right). You should also be able to hear the audio through your headphones / speakers. If you dont, make sure that you have set the output correctly in Soundflower (see above).

For Format, select &#8220;Mp3&#8243;, and set &#8220;Channels&#8221; to &#8220;Stereo&#8221; and &#8220;Sample Rate&#8221; to &#8220;44100&#8243;.

The &#8220;Bit Rate&#8221; setting determines how much data is used to encode the audio. Higher values mean clearer audio / less compression but require more bandwidth. Unless you are streaming high quality audio / music, then 128 Kbps should be fine, and depending on your bandwidth, you may want to set it slightly lower.

Turn the volume all the way up.

<div style="text-align:center">
  <img height="394" width="634" src="/blog/images/mac_screen_broadcast/flme_settings.png" />
</div>

&nbsp;

At this point, look at the bandwidth required estimate under the Volume setting. Make sure this is not too high in relation to your upstream bandwidth. You want to ensure there is some padding for data spikes, or if your available bandwidth goes down a bit. If the bandwidth required is too high, then go through and tweak the settings (see above) until you get the bandwidth to an acceptable level. You may need to do some live testing to find the best compromise between audio / video quality and required bandwidth.

Now that we have entered all of the settings, we want to save our FMLE profile, so we can easily use it again. Select *File > Save Profile* and save the profile onto your system. By default, FMLE will open with the last settings used, but you can also open the saved profile by going to *File > Open Profile*.

All that is left to do, is to start the stream, and make sure everything is working with justin.tv. Click the green &#8220;Start&#8221; button and switch over to your justin.tv channel. You should see your desktop and audio being streamed on your channel (there may be some delay between your desktop and the playback on the stream).

Make sure audio and video quality are good. If they are not, then stop the stream, tweak the settings and try again.

If you run into any errors, just check the &#8220;Encoding Log&#8221; panel in FMLE (which will open when you start the stream). You can also get general statistics on your stream in the Encoding pane which can be useful for trying to track down issues.

### General Trouble Shooting

#### Audio Not working

If audio is not working, make sure:

*   Soundflower is running
*   Soundflower was launched before FMLE was opened
*   Soundflower is set correctly as the Output in system Sound preferences
*   Try stopping and starting the stream in FMLE

If audio is working on stream, but not locally, make sure that:

*   Correct output is set in Soundflower

#### Video not working

If the video stream is not working:

*   Make sure that CamTwist is running, and is configured to output the desktop
*   Make sure that CamTwist was started before FMLE was started
*   Make sure that Video is selected in FMLE
*   Make sure you you downloaded and loaded the justin.tv config file
*   Try stopping and starting the stream in FMLE

If video is choppy on justin.tv

*   Adjust audio and video settings in FMLE 
    *   Video output resolution
    *   Video output Bit Rate
    *   Audio output Bit Rate
    *   Increase Keyframe interval for H.264
*   Check system resources (view in Activity Monitor) and make sure your system has enough resources to encode and stream audio in real time
*   Close any applications not necessary to streaming
*   Turn off &#8220;Video Input&#8221;, &#8220;Video Output&#8221;, and &#8220;Audio&#8221; previews in FMLE. </ul> 
    ## Advanced Configuration for Streaming your desktop on Mac OS X
    
    The information above is all you need if you just want to stream your desktop and system audio to a remote server (such as justin.tv). However, if you want be able to also stream your microphone input or entire skype calls / conversations, then there are a couple of more steps you need to take.
    
    For this section, we will be using all of the software above, along with:
    
    *   [LineIn][11] : Allows you to redirect system audio inputs to audio outputs.
    
    By using LineIn, in conjunction with the applications above, you can have very advanced control over how you mix your audio on the desktop, including which audio outputs are included in your stream, and on your desktop.
    
    For this example, we will be setting up our system so that:
    
    *   Microphone input is included in the stream, but not included in the local system output
    *   Skype conversations (both local and remote) are included in the stream
    
    First, download [LineIn][11], and copy it to your applications folder. We are going to need to use two instances of LineIn, and since Mac OS X will only allow us to launch one instance of an app at a time, we need to make a copy of the app and rename it. So, copy the LineIn application, and rename the copy to LineIn2.
    
    Launch both LineIn and LineIn2 (their windows may overlap when they launch).
    
    One feature of Soundflower which we did not discuss above, it that it creates two separate output channel (one with 2 channels, and one with 16 channels). We can use this, in conjunction with LineIn, to provide different audio feeds for the desktop and the stream.
    
    In the first LineIn window, set the &#8220;Input from&#8221; to your local microphone input. Then, set the &#8220;Output to&#8221; &#8220;Soundflower (2ch)&#8221;. This basically takes the input from your microphone, and redirects it to the Soundflower (2ch) output (being used by FMLE).
    
    Next, click the &#8220;Pass Thru&#8221; button to enable the changes we just made.
    
    <div style="text-align:center">
      <img height="174" width="425" src="/blog/images/mac_screen_broadcast/linein1.png" />
    </div>
    
    &nbsp;
    
    At this point, if you have configured your streaming according the the instructions above, your microphone input will now be included in the audio for your stream. However, if you test this, you will also notice that the microphone input is also output to your system audio (since system Sound output is set to Soundflower (2ch)). Hearing yourself in your speakers / headphone as you speak can be very confusing and distracting (not to mention annoying), so we need to configure things so microphone input is not output locally.
    
    This is where the second instance of LineIn comes in. If you havent already, launch LineIn2. Set the &#8220;Input from&#8221; to &#8220;Soundflower (16ch)&#8221; and set the &#8220;Output to&#8221; to &#8220;Soundflower (2ch)&#8221;. Once you have done this, click the &#8220;Pass Thru&#8221; button to enable the changes.
    
    <div style="text-align:center">
      <img height="174" width="425" src="/blog/images/mac_screen_broadcast/linein2.png" />
    </div>
    
    &nbsp;
    
    Next, we need to set all system audio output to go to &#8220;Soundflower (16ch)&#8221;. Open system Sound Output settings (*System Preferences > Sound > Output*) and set output to &#8220;Soundflower (16ch)&#8221;. Now, all system audio output will go to &#8220;Soundflower (16ch)&#8221;, which is then being redirected (by LineIn) to &#8220;Sunflower (2ch)&#8221;.
    
    <div style="text-align:center">
      <img height="482" width="668" src="/blog/images/mac_screen_broadcast/sound_settings_advanced.png" />
    </div>
    
    &nbsp;
    
    At this point, we now have two separate Soundflower channels. One (&#8220;Soundflower (2ch)&#8221;) includes both system audio and microphone input, and one (&#8220;Soundflower 16ch&#8221;) includes all system audio, minus the microphone input.
    
    We don&#8217;t need to change anything in FMLE, since it is already set to use Soundflower (2ch) as its audio input. However, in order to hear the correct audio locally, we need to change the Soundflower local output. Click the Soundflower icon on the menu bar. Set &#8220;Soundflower (2ch)&#8221; to &#8220;None (Off)&#8221;, and set &#8220;Soundflower (16ch)&#8221; to the local output you want to use (which ever output your speakers / headphone is connected to).
    
    <div style="text-align:center">
      <img height="437" width="295" src="/blog/images/mac_screen_broadcast/soundflower_advanced.png" />
    </div>
    
    &nbsp;
    
    You should now be able to hear all system audio locally without hearing the microphone. However, the stream includes the audio from both the local system and microphone.
    
    At this point, anything you output to &#8220;Soundflower (16ch)&#8221; will be included in the stream (and played locally). This means you can set other applications, such as Skype, to also output to Soundflower (16ch) in order to include them in the stream.
    
    Configuring this in [Skype][12] is easy. Just open Skype, and launch the Audio / Video preferences (*Skype > Preferences > Audio / Video*). Set the &#8220;Speakers&#8221; to &#8220;Soundflower (16ch)&#8221; and close the preferences. Now any audio that comes through Skype, will be included in the stream.
    
    <div style="text-align:center">
      <img height="239" width="600" src="/blog/images/mac_screen_broadcast/skype_settings.png" />
    </div>
    
    &nbsp;
    
    You can do this with any application that allows you to specify sound output. You just need to keep in mind that you only have 16 channels total (which should be plenty).
    
    With this setup, you can stream your desktop, system audio, local microphone and skype conversations all of the same time (useful, for example, if you are streaming multiple player games while playing / chatting with friends).
    
    ## Conclusion
    
    While setting up desktop streaming on Mac OS X can seem a bit daunting at first, it is not too difficult. Once you do get it setup with the configuration describe in this article, you have a lot of flexibility in how things are broadcast, including which audio sources are included / excluded.
    
    ## Additional Resources
    
    ### Applications
    
    *   [Adobe Flash Media Encoder 3.2][5]
    *   [CamTwist][6]
    *   [Soundflower][7]
    *   [LineIn][11]
    ### Articles / Resources
    
    *   [Beginners Guide to Desktop Streaming][13] : Great walkthrough for streaming your desktop from Windows
    *   [Using CamTwist with Justin.tv][14]
    *   [Adobe Flash Media Live Encoder Documentation][15]
    *   [How To Make Your Own Web TV Show][16] : Great video series by Sean &#8220;Day[9]&#8221; Plott.
    *   [Justin.tv forums][17]
    *   [Adobe Flash Media Live Encoder Forums][18]
    *   [TeamLiquid Forums Stream Quality Guide][19]
    
    If you have any questions or suggestions, then post them in the comments.

 [1]: http://us.battle.net/sc2/en/
 [2]: http://www.reddit.com/r/starcraft
 [3]: http://justin.tv
 [4]: http://www.ustream.tv/
 [5]: http://www.adobe.com/products/flashmediaserver/flashmediaencoder/
 [6]: http://allocinit.com/index.php?title=CamTwist
 [7]: http://cycling74.com/products/soundflower/
 [8]: http://www.justin.tv/broadcast/adv_other
 [9]: http://en.wikipedia.org/wiki/H.264/MPEG-4_AVC#Levels
 [10]: http://www.speedtest.net
 [11]: http://www.rogueamoeba.com/freebies/
 [12]: http://www.skype.com
 [13]: http://root-destiny.com/newbies-guide-to-streaming/
 [14]: http://www.justin.tv/p/camtwist
 [15]: http://help.adobe.com/en_US/FlashMediaLiveEncoder/3.0/Using/
 [16]: http://www.pcworld.com/article/213034/screencast_live_how_to_make_your_own_web_tv_show.html
 [17]: http://community.justin.tv/forums/
 [18]: http://forums.adobe.com/community/flash/flash_media_live_encoder
 [19]: http://www.teamliquid.net/forum/viewmessage.php?topic_id=220584