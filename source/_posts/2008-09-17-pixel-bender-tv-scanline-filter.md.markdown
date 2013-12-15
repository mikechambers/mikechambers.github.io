---
title: Pixel Bender TV Scanline Filter
author: mikechambers
layout: post
permalink: /2008/09/17/pixel-bender-tv-scanline-filter/
categories:
  - General
tags:
  - pixelbender
---


After seeing all of the [cool stuff people have been doing with Pixel Bender,][1] I finally decided to spend a little time and start learning how to build them myself.

The learning curve isn&#8217;t too difficult, although you do have to learn some new concepts, and deal with some limitations (at least when creating filters for Flash). The most difficult part for me thus far, is just understanding color and pixel math and manipulation (something I need to read up on more).

Anyways, below if one of my first filters. I wanted to post it as it is a pretty simple example, while still potentially being useful. Basically, it creates a TV scanline effect by making every other row of pixels black.  
<!--more-->

  
Here is a before an after example (you need to click to view the full size in order to see the effect well).

[<img src="http://farm3.static.flickr.com/2217/2867328548_a35f316ee5.jpg" width="500" height="190" alt="Scanline FIlter" />][2]

Here is the code for the filter:

<div class="highlight">
  <pre><span style="color: #666666">&lt;</span>languageVersion <span style="color: #666666">:</span> <span style="color: #666666">1.0;&gt;</span>

kernel ScanLines
<span style="color: #666666">&lt;</span>   namespace <span style="color: #666666">:</span> <span style="color: #BA2121">"mesh"</span><span style="color: #666666">;</span>
    vendor <span style="color: #666666">:</span> <span style="color: #BA2121">"Mike Chambers"</span><span style="color: #666666">;</span>
    version <span style="color: #666666">:</span> <span style="color: #666666">1;</span>
    description <span style="color: #666666">:</span> <span style="color: #BA2121">"Generates a TV Scanline effect"</span><span style="color: #666666">;</span>
<span style="color: #666666">&gt;</span>
{
    input image4 src<span style="color: #666666">;</span>
    output pixel4 dst<span style="color: #666666">;</span>

    void
    evaluatePixel()
    {
        <span style="color: #408080; font-style: italic">//get the current pixel</span>
        dst <span style="color: #666666">=</span> sampleNearest(src<span style="color: #666666">,</span> outCoord());
        
        <span style="color: #408080; font-style: italic">//find out the vertical pixel size. In Flash this will always be 1</span>
        float pixelVSize <span style="color: #666666">=</span> pixelSize(src).y<span style="color: #666666">;</span>
        
        <span style="color: #408080; font-style: italic">//pixelVSize / 2.0 - outCoord() gives center of pixel, so we have to adjust to find</span>
        <span style="color: #408080; font-style: italic">//center of our pixel</span>
        <span style="color: #008000; font-weight: bold">if</span>( int(mod(((pixelVSize <span style="color: #666666">*</span> outCoord().y) <span style="color: #666666">-</span> pixelVSize <span style="color: #666666">/</span> <span style="color: #666666">2.0</span>)<span style="color: #666666">,</span> <span style="color: #666666">2.0</span> )) <span style="color: #666666">==</span> <span style="color: #666666"></span>)
        {
            <span style="color: #408080; font-style: italic">//if on an even row, set the pixel to blackt</span>
            dst.r <span style="color: #666666">=</span> <span style="color: #666666">0.0;</span>
            dst.b <span style="color: #666666">=</span> <span style="color: #666666">0.0;</span>
            dst.g <span style="color: #666666">=</span> <span style="color: #666666">0.0;</span>
            
            <span style="color: #408080; font-style: italic">//can also do</span>
            <span style="color: #408080; font-style: italic">////dst = float4(0.0,0.0,0.0, 1.0);</span>
        }          
    }
}
</pre>
</div>

Thanks to [Kevin Goldsmith][3] from the Pixel Bender team for helping me out.

The comments in the code explain what is going on.

You can load this into [Pixel Bender][4] to play around with it, and compile it for use in Flash Player 10.

I wanted to add a parameter to allow the line size to be set. It doesn&#8217;t look like I can store variables in between calls to evaluatePixel(). Im trying to figure out an algorithm to figure it out in one pass, but im not sure that my math skills are up to the task at the moment. 

You can find all of my other posts on Pixel Bender [here][5].

 [1]: http://pixelero.wordpress.com/
 [2]: http://www.flickr.com/photos/mikechambers/2867328548/ "Scanline FIlter by mike.chambers, on Flickr"
 [3]: http://blogs.adobe.com/kevin.goldsmith/
 [4]: http://labs.adobe.com/wiki/index.php/Pixel_Bender_Toolkit
 [5]: http://www.mikechambers.com/blog/tag/pixelbender/