---
title: Pixel Bender Grayscale Filter
author: mikechambers
layout: post
permalink: /2008/09/18/pixel-bender-grayscale-filter/
categories:
  - General
tags:
  - pixelbender
---


Below is another simple [Pixel Bender][1] filter that I created last night. This one basically, converts an image to gray scale, using the ITU-R Recommendation BT.709 algorithm described [here][2].

[<img src="http://farm4.static.flickr.com/3057/2868222770_e537d4b918.jpg" width="500" height="192" alt="Pixel Bender Grayscale Filter" />][3]  
<!--more-->

  
Here is the filter:

<div class="highlight">
  <pre><span style="color: #666666">&lt;</span>languageVersion <span style="color: #666666">:</span> <span style="color: #666666">1.0;&gt;</span>

kernel GrayScale
<span style="color: #666666">&lt;</span>   namespace <span style="color: #666666">:</span> <span style="color: #BA2121">"mesh"</span><span style="color: #666666">;</span>
    vendor <span style="color: #666666">:</span> <span style="color: #BA2121">"Mike Chambers"</span><span style="color: #666666">;</span>
    version <span style="color: #666666">:</span> <span style="color: #666666">1;</span>
    description <span style="color: #666666">:</span> <span style="color: #BA2121">"Gray scale filter"</span><span style="color: #666666">;</span>
<span style="color: #666666">&gt;</span>
{
    input image4 src<span style="color: #666666">;</span>
    output pixel4 dst<span style="color: #666666">;</span>

    void
    evaluatePixel()
    {
        dst <span style="color: #666666">=</span> sampleNearest(src<span style="color: #666666">,</span>outCoord());
        
        <span style="color: #408080; font-style: italic">//algorithm from ITU-R Recommendation BT.709</span>
        <span style="color: #408080; font-style: italic">//http://local.wasp.uwa.edu.au/~pbourke/texture_colour/imageprocess/</span>
        float avg <span style="color: #666666">=</span> <span style="color: #666666">0.2125</span> <span style="color: #666666">*</span> dst.r <span style="color: #666666">+</span> <span style="color: #666666">0.7154</span> <span style="color: #666666">*</span> dst.g <span style="color: #666666">+</span> <span style="color: #666666">0.0721</span> <span style="color: #666666">*</span> dst.b<span style="color: #666666">;</span>
        dst <span style="color: #666666">=</span> float4(avg<span style="color: #666666">,</span> avg<span style="color: #666666">,</span> avg<span style="color: #666666">,</span> dst.a);

    }
}
</pre>
</div>

Again, its pretty simple, but I am trying to learn both Pixel Bender and image processing in general. The biggest thing I learned for this example is how to work with different vector sizes (which can be a little confusing). Im still wrapping my head around it, but once I get it down, Ill make a post on vectors in Pixel Bender.

 [1]: http://labs.adobe.com/wiki/index.php/Pixel_Bender_Toolkit
 [2]: http://local.wasp.uwa.edu.au/~pbourke/texture_colour/imageprocess/
 [3]: http://www.flickr.com/photos/mikechambers/2868222770/ "Pixel Bender Grayscale Filter by mike.chambers, on Flickr"