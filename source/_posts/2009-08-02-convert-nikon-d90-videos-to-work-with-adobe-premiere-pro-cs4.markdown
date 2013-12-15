---
title: Converting Nikon D90 Videos to work with Adobe Premiere Pro CS4
author: mikechambers
layout: post
permalink: /2009/08/02/convert-nikon-d90-videos-to-work-with-adobe-premiere-pro-cs4/
categories:
  - General
  - Photography
tags:
  - d90
  - nikon
  - Photography
  - premiere
  - video
---


I recently bought my first DSLR, the [Nikon D90][1], which I have been [having a blast with][2]. One of the cool features of the camera, is that it supports creating HD video clips (of up to 5 minutes) (view an example [here][3]). However, the way the clips are created seems to confuse [Adobe Premiere Pro CS4][4], which won&#8217;t open or import the clips without a little work on your part.  
<!--more-->

  
I found instructions [here][5] on how to use the terminal to get Premiere to understand the clips, and based on that (with some tweaks and fixes), I have put together a bash script that will &#8220;fix&#8221; all of the Nikon D90 AVI clips in a directory so that Premiere Pro will recognize them.

**Usage:**

`d90topremier [dirWithClips]`

The &#8220;dirWithClips&#8221; argument is optional, and if not specified will assume the clips are in the current working director.

The output will look something like this:

    ./DSC_0002.AVI --> ./DSC_0002.mov
    ./DSC_0003.AVI --> ./DSC_0003.mov
    ./DSC_0004.AVI --> ./DSC_0004.mov
    ./DSC_0005.AVI --> ./DSC_0005.mov
    ./DSC_0007.AVI --> ./DSC_0007.mov
    ./DSC_0008.AVI --> ./DSC_0008.mov
    ./DSC_0009.AVI --> ./DSC_0009.mov
    ./DSC_0010.AVI --> ./DSC_0010.mov
    ./DSC_0011.AVI --> ./DSC_0011.mov
    ./DSC_0014.AVI --> ./DSC_0014.mov
    

&nbsp;

**Requirements**

The script requires the &#8220;setfile&#8221; command, which is available in the free [Mac OS X Developer SDK][6].

**Script**

<div class="highlight">
  <pre><span style="color: #408080; font-style: italic">#/bin/bash</span>

<span style="color: #408080; font-style: italic">#################################################</span>
<span style="color: #408080; font-style: italic">#</span>
<span style="color: #408080; font-style: italic"># Bash script that modifies Nikon D90 AVI Video</span>
<span style="color: #408080; font-style: italic"># file so they are reconized by Adobe Preiere Pro CS4</span>
<span style="color: #408080; font-style: italic">#</span>
<span style="color: #408080; font-style: italic"># Created by Mike Chambers</span>
<span style="color: #408080; font-style: italic"># http://www.mikechambers.com</span>
<span style="color: #408080; font-style: italic"># Based on original script at:</span>
<span style="color: #408080; font-style: italic"># http://www.alexbeckett.co.uk/blog/2009/07/02/techie-importing-d90-dmovie-video-into-premiere-pro/</span>
<span style="color: #408080; font-style: italic">#</span>
<span style="color: #408080; font-style: italic">#################################################i</span>

<span style="color: #19177C">oldExt</span><span style="color: #666666">=</span>mov
<span style="color: #19177C">newExt</span><span style="color: #666666">=</span>AVI

<span style="color: #19177C">d</span><span style="color: #666666">=</span><span style="color: #BA2121">"./"</span>

<span style="color: #008000; font-weight: bold">if</span> <span style="color: #666666">[</span> -n <span style="color: #BA2121">"$1"</span> <span style="color: #666666">]</span>;then
        <span style="color: #19177C">d</span><span style="color: #666666">=</span><span style="color: #BA2121">"$1"</span>
<span style="color: #008000; font-weight: bold">fi</span>

<span style="color: #008000; font-weight: bold">if</span> <span style="color: #666666">[</span> ! -e <span style="color: #BA2121">"$d"</span> <span style="color: #666666">]</span>; <span style="color: #008000; font-weight: bold">then</span>
<span style="color: #008000; font-weight: bold">        </span><span style="color: #008000">echo</span> <span style="color: #BA2121">"$d does not exist"</span>
        <span style="color: #008000">exit </span>0;
<span style="color: #008000; font-weight: bold">fi</span>


<span style="color: #008000; font-weight: bold">for </span>filename in <span style="color: #BA2121">"$d"</span>*.<span style="color: #19177C">$oldExt</span>
  <span style="color: #008000; font-weight: bold">do</span>
<span style="color: #008000; font-weight: bold">        if</span> <span style="color: #666666">[</span> ! -e <span style="color: #BA2121">"$filename"</span> <span style="color: #666666">]</span>; <span style="color: #008000; font-weight: bold">then</span>
<span style="color: #008000; font-weight: bold">                continue</span>;
        <span style="color: #008000; font-weight: bold">fi</span>

<span style="color: #008000; font-weight: bold">        </span>setfile -t <span style="color: #BA2121">"VfW "</span> <span style="color: #BA2121">"$filename"</span>

        <span style="color: #19177C">newFileName</span><span style="color: #666666">=</span><span style="color: #BA2121">"${filename%$oldExt}$newExt"</span>
        mv <span style="color: #BA2121">"$filename"</span> <span style="color: #BA2121">"$newFileName"</span>

        <span style="color: #008000">echo</span> <span style="color: #BA2121">"$filename --&gt; $newFileName"</span>
  <span style="color: #008000; font-weight: bold">done</span>
</pre>
</div>

&nbsp;  
Just place this into a file called &#8220;d90topremier&#8221;, place it in your path, and make sure to chmod it like so:

`chmod 755 d90topremier`

If you run into any issues, or have any improvements for the script, post them in the comments.

 [1]: http://www.nikonusa.com/Find-Your-Nikon/Product/Digital-SLR/25446/D90.html
 [2]: http://www.flickr.com/photos/mikechambers/collections/72157621787429394/
 [3]: http://www.flickr.com/photos/mikechambers/3774623194/in/set-72157621777297569/
 [4]: http://tryit.adobe.com/us/cs4/premiere/p/?sdid=ETRZP
 [5]: http://www.alexbeckett.co.uk/blog/2009/07/02/techie-importing-d90-dmovie-video-into-premiere-pro/
 [6]: https://connect.apple.com/cgi-bin/WebObjects/MemberSite.woa/wa/getSoftware?bundleID=20414