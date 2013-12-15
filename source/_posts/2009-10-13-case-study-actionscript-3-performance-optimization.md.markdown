---
title: 'Case Study : ActionScript 3 Performance Optimization'
author: mikechambers
layout: post
permalink: /2009/10/13/case-study-actionscript-3-performance-optimization/
categories:
  - ActionScript
tags:
  - actionscript3
  - as3
  - performance
---


Prompted by some of the work from [Grant Skinner][1] (in particular his [FOTB 2009 session][2]) and [Thibault Imbert][3], I have been doing a lot of research lately into optimizing ActionScript 3 content. Not just how to make it run faster, but how to approach the process of optimization.

I am also starting to work on a small project which works with pixel data from images, and on which I anticipate performance might be an issue when working with larger images. I figured this would be a good opportunity to use some of the early code as a case study. I wanted to post the process and results here.  
<!--more-->

  
The task that I will focus on is grabbing a palette of 16 colors from an image, created by averaging the colors within that image. Upon searching on google, I found a [very good solution over at soulwire.co.uk][4], which I will use as the base for creating the palette. I want to point out that the original code targeted Flash Player 9 (and thus couldn&#8217;t take advantage of some things such as Vectors), and already ran pretty blazingly fast.

I am using Grant Skinner&#8217;s [performance test harness][5] to profile performance. Each test is run 50 times, and is tested in Flash Player MAC 10,0,32,18 (debug) in the browser. 

You can download all of the code from [here][6].

First, here is the original test case, based on soulwire&#8217;s code:

<div class="highlight">
  <pre><span style="color: #408080; font-style: italic">/*</span>
<span style="color: #408080; font-style: italic">	Code adapted from:</span>
<span style="color: #408080; font-style: italic">	http://blog.soulwire.co.uk/flash/actionscript-3/colourutils-bitmapdata-extract-colour-palette/</span>
<span style="color: #408080; font-style: italic">*/</span>

package
{
	<span style="color: #008000; font-weight: bold">import</span> flash.display.Bitmap<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.display.<span style="color: #008000">BitmapData</span><span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.display.Sprite<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.events.Event<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.geom.<span style="color: #008000">Rectangle</span><span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.geom.<span style="color: #008000">Point</span><span style="color: #666666">;</span>
	
	<span style="color: #008000; font-weight: bold">import</span> com.gskinner.utils.PerformanceTest<span style="color: #666666">;</span>
	
	<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">class</span> PixelSort <span style="color: #008000; font-weight: bold">extends</span> Sprite
	{
		
		[Embed(source<span style="color: #666666">=</span><span style="color: #BA2121">"../graphics/image.jpg"</span>)]
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">var</span> TestImage<span style="color: #666666">:</span>Class<span style="color: #666666">;</span>
		
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> PixelSort()
		{
			addEventListener(Event.ADDED_TO_STAGE<span style="color: #666666">,</span> onAddedToStage);
		}
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> d<span style="color: #666666">:</span><span style="color: #008000">BitmapData</span><span style="color: #666666">;</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onAddedToStage(evet<span style="color: #666666">:</span>Event)<span style="color: #666666">:</span>void
		{
			removeEventListener(Event.ADDED_TO_STAGE<span style="color: #666666">,</span> onAddedToStage);
			
			<span style="color: #008000; font-weight: bold">var</span> b<span style="color: #666666">:</span>Bitmap <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> TestImage();
			
			d <span style="color: #666666">=</span> b.bitmapData<span style="color: #666666">;</span>
			
			<span style="color: #008000; font-weight: bold">var</span> perfTest<span style="color: #666666">:</span>PerformanceTest <span style="color: #666666">=</span> PerformanceTest.getInstance();
			perfTest.out <span style="color: #666666">=</span> <span style="color: #0000FF">trace</span><span style="color: #666666">;</span>
			perfTest.testFunction(run<span style="color: #666666">,</span> <span style="color: #666666">50,</span> <span style="color: #BA2121">"averagecolors"</span><span style="color: #666666">,</span> <span style="color: #BA2121">"averagecolors"</span>);			
		}
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> run()<span style="color: #666666">:</span>void
		{
			<span style="color: #008000; font-weight: bold">var</span> out<span style="color: #666666">:</span><span style="color: #008000">Array</span> <span style="color: #666666">=</span> averagecolors(d<span style="color: #666666">,</span> <span style="color: #666666">16</span>);
		}
		
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> averageColour( source<span style="color: #666666">:</span><span style="color: #008000">BitmapData</span> )<span style="color: #666666">:</span>uint
		{
			<span style="color: #008000; font-weight: bold">var</span> red<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> <span style="color: #666666">0;</span>
			<span style="color: #008000; font-weight: bold">var</span> green<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> <span style="color: #666666">0;</span>
			<span style="color: #008000; font-weight: bold">var</span> blue<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> <span style="color: #666666">0;</span>

			<span style="color: #008000; font-weight: bold">var</span> count<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> <span style="color: #666666">0;</span>
			<span style="color: #008000; font-weight: bold">var</span> pixel<span style="color: #666666">:</span><span style="color: #008000">Number</span><span style="color: #666666">;</span>

			<span style="color: #008000; font-weight: bold">for</span> (<span style="color: #008000; font-weight: bold">var</span> x<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span> x <span style="color: #666666">&lt;</span> source.width<span style="color: #666666">;</span> x<span style="color: #666666">++</span>)
			{
				<span style="color: #008000; font-weight: bold">for</span> (<span style="color: #008000; font-weight: bold">var</span> y<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span> y <span style="color: #666666">&lt;</span> source.height<span style="color: #666666">;</span> y<span style="color: #666666">++</span>)
				{
					pixel <span style="color: #666666">=</span> source.getPixel(x<span style="color: #666666">,</span> y);

					red <span style="color: #666666">+=</span> pixel <span style="color: #666666">&gt;&gt;</span> <span style="color: #666666">16</span> <span style="color: #666666">&</span> <span style="color: #666666"></span>xFF<span style="color: #666666">;</span>
					green <span style="color: #666666">+=</span> pixel <span style="color: #666666">&gt;&gt;</span> <span style="color: #666666">8</span> <span style="color: #666666">&</span> <span style="color: #666666"></span>xFF<span style="color: #666666">;</span>
					blue <span style="color: #666666">+=</span> pixel <span style="color: #666666">&</span> <span style="color: #666666"></span>xFF<span style="color: #666666">;</span>

					count<span style="color: #666666">++</span>
				}
			}

			red <span style="color: #666666">/=</span> count<span style="color: #666666">;</span>
			green <span style="color: #666666">/=</span> count<span style="color: #666666">;</span>
			blue <span style="color: #666666">/=</span> count<span style="color: #666666">;</span>

			<span style="color: #008000; font-weight: bold">return</span> red <span style="color: #666666">&lt;&lt;</span> <span style="color: #666666">16</span> <span style="color: #666666">|</span> green <span style="color: #666666">&lt;&lt;</span> <span style="color: #666666">8</span> <span style="color: #666666">|</span> blue<span style="color: #666666">;</span>
		}		
		
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> averagecolors( source<span style="color: #666666">:</span><span style="color: #008000">BitmapData</span><span style="color: #666666">,</span> colors<span style="color: #666666">:</span>int )<span style="color: #666666">:</span><span style="color: #008000">Array</span>
		{
			<span style="color: #008000; font-weight: bold">var</span> averages<span style="color: #666666">:</span><span style="color: #008000">Array</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Array</span>();
			<span style="color: #008000; font-weight: bold">var</span> columns<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #008000">Math</span>.round( <span style="color: #008000">Math</span>.sqrt( colors ) );

			<span style="color: #008000; font-weight: bold">var</span> row<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span>
			<span style="color: #008000; font-weight: bold">var</span> col<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span>

			<span style="color: #008000; font-weight: bold">var</span> x<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span>
			<span style="color: #008000; font-weight: bold">var</span> y<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span>

			<span style="color: #008000; font-weight: bold">var</span> w<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #008000">Math</span>.round( source.width <span style="color: #666666">/</span> columns );
			<span style="color: #008000; font-weight: bold">var</span> h<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #008000">Math</span>.round( source.height <span style="color: #666666">/</span> columns );

			<span style="color: #008000; font-weight: bold">for</span> (<span style="color: #008000; font-weight: bold">var</span> i<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span> i <span style="color: #666666">&lt;</span> colors<span style="color: #666666">;</span> i<span style="color: #666666">++</span>)
			{
				<span style="color: #008000; font-weight: bold">var</span> rect<span style="color: #666666">:</span><span style="color: #008000">Rectangle</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Rectangle</span>( x<span style="color: #666666">,</span> y<span style="color: #666666">,</span> w<span style="color: #666666">,</span> h );

				<span style="color: #008000; font-weight: bold">var</span> box<span style="color: #666666">:</span><span style="color: #008000">BitmapData</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">BitmapData</span>( w<span style="color: #666666">,</span> h<span style="color: #666666">,</span> <span style="color: #008000; font-weight: bold">false</span> );
				box.copyPixels( source<span style="color: #666666">,</span> rect<span style="color: #666666">,</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Point</span>() );

				averages.push( averageColour( box ) );
				box.dispose();

				col <span style="color: #666666">=</span> i <span style="color: #666666">%</span> columns<span style="color: #666666">;</span>

				x <span style="color: #666666">=</span> w <span style="color: #666666">*</span> col<span style="color: #666666">;</span>
				y <span style="color: #666666">=</span> h <span style="color: #666666">*</span> row<span style="color: #666666">;</span>

				<span style="color: #008000; font-weight: bold">if</span> ( col <span style="color: #666666">==</span> columns <span style="color: #666666">-</span> <span style="color: #666666">1</span> ) row<span style="color: #666666">++;</span>
			}

			<span style="color: #008000; font-weight: bold">return</span> averages<span style="color: #666666">;</span>
		}		
	}
}
</pre>
</div>

&nbsp;

And here is the initial performance test:

<pre>––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
averagecolors (50 iterations)                                           
Player version: MAC 10,0,32,18 (debug)
averagecolors                                                           
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
method...................................................ttl ms...avg ms
averagecolors                                              1264    25.28
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––</pre>

&nbsp;

&nbsp;

First, considering what the code is doing, it is already pretty fast, taking only 25 ms to split the image into a grid, and loop through all of the pixels and averaging the values. However, there is probably some room for improvement, especially given that the original code targets Flash Player 9 and thus cant take care of Flash Player 10 optimizations such as using Vectors.

Now, the first thing I would normally do is to profile the SWF using the profiler in Flash Builder to find out where the most time is being sent. However, in this case, there are only two methods that do anything, *averageColors* and *averageColor*. *averageColors* is called once, while *averageColor* is called once for each swatch we want to create (in this case 16), and ends up looping over each pixel in the image (over those 16 calls). So these are the two areas we will focus on, with particular attention directed to *averageColor*.

The first thing I did was look at updating the content to Flash Player 10 by converting all of the Arrays to Vectors. I expected to get a decent boost from this, but the improvement was minimal.

Within the *averageColors* method, I looked at reusing the *Point*, *Rectangle* and *BitmapData* instances, instead of creating new ones on each iteration of the loop. Again, on the desktop this didn&#8217;t really make any difference. However, one thing to consider is that on a mobile device where memory allocation can be more expensive (and there is less RAM altogether), this change may have had a bigger impact (which I didnt test). This leads to an important point. It is important to test performance on the platforms which you are targeting, as some optimizations can have a different impact depending on where the content is running.

Next, I set the *averageColor* and *averageColors* methods as *final*, which allows them too be looked up at compile time (as opposed to runtime), this led to small improvement in performance, but again, not really anything significant.

At this point, I was getting a very slight performance improvement, but not really anything that mattered (basically, small enough to be insignificant),

<pre>––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
averagecolors (50 iterations)                                          
Player version: MAC 10,0,32,18 (debug)
averagecolors                                                           
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
method...................................................ttl ms...avg ms
averagecolors                                              1224    24.48
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––</pre>

&nbsp;

Next, I moved on to the *averageColor* method, where I expected (and hoped) to have better results, as this is where the bulk of the work occurs.

First I converter some of the Numbers to ints and uints in places where Numbers were not needed. This led to a small improvement.

<pre>––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
averagecolors (50 iterations)                                           
Player version: MAC 10,0,32,18 (debug)
averagecolors                                                           
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
method...................................................ttl ms...avg ms
averagecolors                                              1190    23.80
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––</pre>

&nbsp;

Next, I changed the `bitmapData.getPixel` call to use `bitmapData.getVector`. Doing this then allowed me to loop through the pixels using a single loop, instead of a nested double loop, and also eliminated a *getPixel* call for each pixel. I used a *for each* loop to loop through the pixel color values.

This provided another slight improvement (although not quite as much as I expected). We are now making some small gains.

<pre>––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
averagecolors (50 iterations)                                           
Player version: MAC 10,0,32,18 (debug)
averagecolors                                                           
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
method...................................................ttl ms...avg ms
averagecolors                                              1137    22.74
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––</pre>

&nbsp;

Next, I decided to try a *for* loop, instead of a *for each* loop.

<pre>––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
averagecolors (50 iterations)                                           
Player version: MAC 10,0,32,18 (debug)
averagecolors                                                           
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
method...................................................ttl ms...avg ms
averagecolors                                               282     5.64
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––</pre>

&nbsp;

Wow! As you can see, that makes a huge difference.

Finally, I explicitly cast *i* to an *int* when pulling the value from the Vector. This gave a small improvement, but again, nothing significant:

<pre>––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
averagecolors (50 iterations)                                           
Player version: MAC 10,0,32,18 (debug)
averagecolors                                                           
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
method...................................................ttl ms...avg ms
averagecolors                                               268     5.36
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––</pre>

&nbsp;

I tried a couple of more optimizations in the method, around converting division operations to multiplication operation, and replacing `Math.round` calls but in this case it didnt make any difference.

I also looked at caching some constants used in some of the bitwise operations, changing

<div class="highlight">
  <pre>red <span style="color: #666666">+=</span> pixel <span style="color: #666666">&gt;&gt;</span> <span style="color: #666666">16</span> <span style="color: #666666">&</span> <span style="color: #666666"></span>xFF<span style="color: #666666">;</span>
green <span style="color: #666666">+=</span> pixel <span style="color: #666666">&gt;&gt;</span> <span style="color: #666666">8</span> <span style="color: #666666">&</span> <span style="color: #666666"></span>xFF<span style="color: #666666">;</span>
</pre>
</div>

&nbsp;

to

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> s16<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> <span style="color: #666666">16</span> <span style="color: #666666">&</span> <span style="color: #666666"></span>xFF<span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> s8<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> <span style="color: #666666">8</span> <span style="color: #666666">&</span> <span style="color: #666666"></span>xFF<span style="color: #666666">;</span>

red <span style="color: #666666">+=</span> pixel <span style="color: #666666">&gt;&gt;</span> s16<span style="color: #666666">;</span>
green <span style="color: #666666">+=</span> pixel <span style="color: #666666">&gt;&gt;</span> s8<span style="color: #666666">;</span>
</pre>
</div>

&nbsp;

First, that optimization actually produces the wrong result (I had my operator precedence backwards). Second, it was actually slower:

<pre>––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
averagecolors (50 iterations)                                           
Player version: MAC 10,0,32,18 (debug)
averagecolors                                                           
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
method...................................................ttl ms...avg ms
averagecolors                                               349     6.98
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––</pre>

&nbsp;

There are two lessons from this. First, make sure your optimizations produce the same results (ideally by creating and using unit tests). Second, bitwise operations are really, really fast. In this case, they are even faster than doing a variable lookup.

So, after going through the code, and applying a number of different optimizations, I was able to improve performance from an average of 25.28 ms, to 5.36 ms, an improvement of about 470%.

Here is the final code:

<div class="highlight">
  <pre><span style="color: #408080; font-style: italic">/*</span>
<span style="color: #408080; font-style: italic">	Code adapted from:</span>
<span style="color: #408080; font-style: italic">	http://blog.soulwire.co.uk/flash/actionscript-3/colourutils-bitmapdata-extract-colour-palette/</span>
<span style="color: #408080; font-style: italic">*/</span>

package
{
	<span style="color: #008000; font-weight: bold">import</span> flash.display.Bitmap<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.display.<span style="color: #008000">BitmapData</span><span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.display.Sprite<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.events.Event<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.geom.<span style="color: #008000">Rectangle</span><span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.geom.<span style="color: #008000">Point</span><span style="color: #666666">;</span>
	
	<span style="color: #008000; font-weight: bold">import</span> com.gskinner.utils.PerformanceTest<span style="color: #666666">;</span>
	
	<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">class</span> PixelSort <span style="color: #008000; font-weight: bold">extends</span> Sprite
	{
		
		[Embed(source<span style="color: #666666">=</span><span style="color: #BA2121">"../graphics/image.jpg"</span>)]
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">var</span> TestImage<span style="color: #666666">:</span>Class<span style="color: #666666">;</span>
		
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> PixelSort()
		{
			addEventListener(Event.ADDED_TO_STAGE<span style="color: #666666">,</span> onAddedToStage);
		}
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> d<span style="color: #666666">:</span><span style="color: #008000">BitmapData</span><span style="color: #666666">;</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> onAddedToStage(evet<span style="color: #666666">:</span>Event)<span style="color: #666666">:</span>void
		{
			removeEventListener(Event.ADDED_TO_STAGE<span style="color: #666666">,</span> onAddedToStage);
			
			<span style="color: #008000; font-weight: bold">var</span> b<span style="color: #666666">:</span>Bitmap <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> TestImage();
			
			d <span style="color: #666666">=</span> b.bitmapData<span style="color: #666666">;</span>
			
			<span style="color: #008000; font-weight: bold">var</span> perfTest<span style="color: #666666">:</span>PerformanceTest <span style="color: #666666">=</span> PerformanceTest.getInstance();
			perfTest.out <span style="color: #666666">=</span> <span style="color: #0000FF">trace</span><span style="color: #666666">;</span>
			perfTest.testFunction(run<span style="color: #666666">,</span> <span style="color: #666666">50,</span> <span style="color: #BA2121">"averagecolors"</span><span style="color: #666666">,</span> <span style="color: #BA2121">"averagecolors"</span>);			
		}
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> run()<span style="color: #666666">:</span>void
		{
			<span style="color: #008000; font-weight: bold">var</span> out<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span>uint<span style="color: #666666">&gt;</span> <span style="color: #666666">=</span> averagecolors(d<span style="color: #666666">,</span> <span style="color: #666666">16</span>);
		}		
		
		<span style="color: #008000; font-weight: bold">public</span> final <span style="color: #008000; font-weight: bold">function</span> averageColour( source<span style="color: #666666">:</span><span style="color: #008000">BitmapData</span> )<span style="color: #666666">:</span>uint
		{
			<span style="color: #008000; font-weight: bold">var</span> red<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> <span style="color: #666666">0;</span>
			<span style="color: #008000; font-weight: bold">var</span> green<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> <span style="color: #666666">0;</span>
			<span style="color: #008000; font-weight: bold">var</span> blue<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> <span style="color: #666666">0;</span>

			<span style="color: #008000; font-weight: bold">var</span> count<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span>
			<span style="color: #008000; font-weight: bold">var</span> pixel<span style="color: #666666">:</span>uint<span style="color: #666666">;</span>
			
			<span style="color: #008000; font-weight: bold">var</span> pixels<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span>uint<span style="color: #666666">&gt;</span> <span style="color: #666666">=</span> source.getVector(<span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Rectangle</span>(<span style="color: #666666">0,0,</span> source.width<span style="color: #666666">,</span> source.height));
			<span style="color: #008000; font-weight: bold">var</span> len<span style="color: #666666">:</span>int <span style="color: #666666">=</span> pixels.length<span style="color: #666666">;</span>

			<span style="color: #008000; font-weight: bold">for</span>(<span style="color: #008000; font-weight: bold">var</span> i<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span> i <span style="color: #666666">&lt;</span> len<span style="color: #666666">;</span> i<span style="color: #666666">++</span>)
			{	
				pixel <span style="color: #666666">=</span> pixels[int(i)];

				red <span style="color: #666666">+=</span> pixel <span style="color: #666666">&gt;&gt;</span> <span style="color: #666666">16</span> <span style="color: #666666">&</span> <span style="color: #666666"></span>xFF<span style="color: #666666">;</span>
				green <span style="color: #666666">+=</span> pixel <span style="color: #666666">&gt;&gt;</span> <span style="color: #666666">8</span> <span style="color: #666666">&</span> <span style="color: #666666"></span>xFF<span style="color: #666666">;</span>
				blue <span style="color: #666666">+=</span> pixel <span style="color: #666666">&</span> <span style="color: #666666"></span>xFF<span style="color: #666666">;</span>

				count<span style="color: #666666">++;</span>
			}

			red <span style="color: #666666">/=</span> count<span style="color: #666666">;</span>
			green <span style="color: #666666">/=</span> count<span style="color: #666666">;</span>
			blue <span style="color: #666666">/=</span> count<span style="color: #666666">;</span>

			<span style="color: #008000; font-weight: bold">return</span> red <span style="color: #666666">&lt;&lt;</span> <span style="color: #666666">16</span> <span style="color: #666666">|</span> green <span style="color: #666666">&lt;&lt;</span> <span style="color: #666666">8</span> <span style="color: #666666">|</span> blue<span style="color: #666666">;</span>
		}		
		
		<span style="color: #008000; font-weight: bold">public</span> final <span style="color: #008000; font-weight: bold">function</span> averagecolors( source<span style="color: #666666">:</span><span style="color: #008000">BitmapData</span><span style="color: #666666">,</span> colors<span style="color: #666666">:</span>int )<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span>uint<span style="color: #666666">&gt;</span>
		{

			<span style="color: #008000; font-weight: bold">var</span> averages<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span>uint<span style="color: #666666">&gt;</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Vector.<span style="color: #666666">&lt;</span>uint<span style="color: #666666">&gt;</span>(colors<span style="color: #666666">,</span> <span style="color: #008000; font-weight: bold">false</span>);
			<span style="color: #008000; font-weight: bold">var</span> columns<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #008000">Math</span>.round( <span style="color: #008000">Math</span>.sqrt( colors ) );

			<span style="color: #008000; font-weight: bold">var</span> row<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span>
			<span style="color: #008000; font-weight: bold">var</span> col<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span>

			<span style="color: #008000; font-weight: bold">var</span> x<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span>
			<span style="color: #008000; font-weight: bold">var</span> y<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span>
			
			<span style="color: #008000; font-weight: bold">var</span> w<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #008000">Math</span>.round( source.width <span style="color: #666666">/</span> columns );
			<span style="color: #008000; font-weight: bold">var</span> h<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #008000">Math</span>.round( source.height <span style="color: #666666">/</span> columns );

			<span style="color: #008000; font-weight: bold">var</span> p<span style="color: #666666">:</span><span style="color: #008000">Point</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Point</span>();
			<span style="color: #008000; font-weight: bold">var</span> rect<span style="color: #666666">:</span><span style="color: #008000">Rectangle</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Rectangle</span>(<span style="color: #666666">0,0,0,0</span>);
			<span style="color: #008000; font-weight: bold">var</span> box<span style="color: #666666">:</span><span style="color: #008000">BitmapData</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">BitmapData</span>( w<span style="color: #666666">,</span> h<span style="color: #666666">,</span> <span style="color: #008000; font-weight: bold">false</span> );
				
			<span style="color: #008000; font-weight: bold">for</span> (<span style="color: #008000; font-weight: bold">var</span> i<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span> i <span style="color: #666666">&lt;</span> colors<span style="color: #666666">;</span> i<span style="color: #666666">++</span>)
			{
				rect.x <span style="color: #666666">=</span> x<span style="color: #666666">;</span>
				rect.y <span style="color: #666666">=</span> y<span style="color: #666666">;</span>
				rect.width <span style="color: #666666">=</span> w<span style="color: #666666">;</span>
				rect.height <span style="color: #666666">=</span> h<span style="color: #666666">;</span>

				box.copyPixels( source<span style="color: #666666">,</span> rect<span style="color: #666666">,</span> p );

				averages[i] <span style="color: #666666">=</span>  averageColour( box );
				
				col <span style="color: #666666">=</span> i <span style="color: #666666">%</span> columns<span style="color: #666666">;</span>

				x <span style="color: #666666">=</span> w <span style="color: #666666">*</span> col<span style="color: #666666">;</span>
				y <span style="color: #666666">=</span> h <span style="color: #666666">*</span> row<span style="color: #666666">;</span>

				<span style="color: #008000; font-weight: bold">if</span> ( col <span style="color: #666666">==</span> columns <span style="color: #666666">-</span> <span style="color: #666666">1</span> ) 
				{
					row<span style="color: #666666">++;</span>
				}
			}
			box.dispose();
			<span style="color: #008000; font-weight: bold">return</span> averages<span style="color: #666666">;</span>
		}		
	}
}
</pre>
</div>

&nbsp;

**Lessons learned**

**Profile content to isolate bottlenecks** : I skipped that step in this case since my code consisted of only two methods, but even in that case, the most significant improvement came from a single optimization. Profile so you know where to focus your efforts.

**Test and profile all optimizations** : Make sure to test performance after each optimization, as optimizations do not always have the desired effect.

**Test on target devices and platforms** : Optimizations can have a different impact on where they are run. This includes browser, platform and device, as well as player type (debug vs release). For example, when testing directly from Flash Authoring, results where significantly slower than when testing in the browser. 

**Test the results of the optimizations** : Make sure that your optimizations do not break your code or content. The best way to do this is by using unit tests and running them after each optimization.

There is still some potential for optimization. In particular, since the code is essentially looping over all of the pixels of a bitmap and then doing some math operations on their values, this could be a good candidate for porting to PixelBender.

If you have any additional optimizations, questions or suggestions, post them in the comments.

Also, make sure to check out [soulwire&#8217;s blog][7], as he is doing some very cool stuff with ActionScript 3 and Flash.

 [1]: http://www.gskinner.com/blog/
 [2]: http://gskinner.com/blog/archives/2004/06/conference_sess.html
 [3]: http://www.bytearray.org/
 [4]: http://blog.soulwire.co.uk/flash/actionscript-3/extract-average-colours-from-bitmapdata/
 [5]: http://www.gskinner.com/blog/archives/2009/04/as3_performance.html
 [6]: /blog/files/examples/PixelSort.zip
 [7]: http://blog.soulwire.co.uk/