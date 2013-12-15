---
title: Toggling mute on Mac OS X with non-Mac Keyboards and Alfred
author: mikechambers
layout: post
permalink: /2011/05/23/toggling-mute-on-mac-os-x-with-non-mac-keyboards-and-alfred/
categories:
  - General
---


I recently switched keyboards and picked up a [daskeyboard professional (model-s)][1]. This is a really nice (and satisfying) mechanical keyboard, which I really like. However, das only makes a Windows version of the keyboard, and I am running Mac OS X. In general, this isn&#8217;t an issue, as I was able to remap control keys to be in the right position, but I really missed being able to quickly toggle whether the system volume is muted.

I could probably use an app such as [DoubleCommand][2] to remap one of the function keys to the mute key, but I didn&#8217;t want to rely on on a third-party piece of software that I would have to configure each time I wanted to set up a new system. So, I decided to create a simple AppleScript Application that I could call from [Alfred][3] (or [Quicksilver][4]) that would toggle whether the volume was muted.  
<!--more-->

  
Here is the script:

<div class="wp_syntax">
  <div class="code">
    <pre class="applescript" style="font-family:monospace;"><span style="color: #ff0033; font-weight: bold;">set</span> volumeSettings <span style="color: #ff0033; font-weight: bold;">to</span> <span style="color: #ff0033; font-weight: bold;">get</span> volume settings
<span style="color: #ff0033; font-weight: bold;">if</span> output muted <span style="color: #ff0033; font-weight: bold;">of</span> volumeSettings <span style="color: #ff0033; font-weight: bold;">is</span> <span style="color: #0066ff;">false</span> <span style="color: #ff0033; font-weight: bold;">then</span>
	<span style="color: #ff0033; font-weight: bold;">set</span> volume <span style="color: #ff0033; font-weight: bold;">with</span> output muted
<span style="color: #ff0033; font-weight: bold;">else</span>
	<span style="color: #ff0033; font-weight: bold;">set</span> volume <span style="color: #ff0033; font-weight: bold;">without</span> output muted
<span style="color: #ff0033; font-weight: bold;">end</span> <span style="color: #ff0033; font-weight: bold;">if</span></pre>
  </div>
</div>

[Download Source and Application from my GitHub account][5].

To use this, download the application (or compile the script). Save the application in a place where Alfred / Quicksilver can find it. I placed mine in my /Applications folder.

Now, when you want to toggle whether the volume is muted, just launch Alfred / Quicksilver and type mute.

I know its a pretty simple solution, but I wanted to share it, and post it here for future reference. If you have any suggestions or a better solution, post them in the comments.

 [1]: http://www.daskeyboard.com/model-s-professional/
 [2]: http://doublecommand.sourceforge.net/
 [3]: http://www.alfredapp.com/
 [4]: http://www.blacktree.com/
 [5]: https://github.com/mikechambers/ExamplesByMesh/tree/master/AppleScript/mute