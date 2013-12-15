---
title: ActionScript 3 Vector / Array Performance Comparison
author: mikechambers
layout: post
permalink: /2008/09/24/actioscript-3-vector-array-performance-comparison/
categories:
  - General
tags:
  - as3 vector performance
---


In my [original post on the new Flash Player 10 Vector class][1], I did a simple example that showed Vectors being slightly faster than Array when just populating and looping through collections.

Below is another example that shows a more significant performance increase when using Vectors. In this example, I populate an Array and Vector with 5 million random numbers, and then loop through them and average all of the numbers.  
<!--more-->

  
Running the test on my MacBook Pro, the Vector is about 60% faster:

**Vector** 1.824  
**Array** 2.938  
62.08 %

Here is the code:

<div class="highlight">
  <pre>package {
	<span style="color: #008000; font-weight: bold">import</span> flash.display.Sprite<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> __AS3__.vec.Vector<span style="color: #666666">;</span>

	<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">class</span> VectorPerformance <span style="color: #008000; font-weight: bold">extends</span> Sprite
	{
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">static</span> const LENGTH<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">5000000;</span>
		
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> VectorPerformance()
		{
			<span style="color: #408080; font-style: italic">//vector performance</span>
			<span style="color: #008000; font-weight: bold">var</span> vectorStartTime<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> getTime();
			
			<span style="color: #008000; font-weight: bold">var</span> v<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span><span style="color: #008000">Number</span><span style="color: #666666">&gt;</span> <span style="color: #666666">=</span> generateVector();
			<span style="color: #008000; font-weight: bold">var</span> vAvg<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> averageVector(v);
			
			<span style="color: #008000; font-weight: bold">var</span> vectorTime<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> (getTime() <span style="color: #666666">-</span> vectorStartTime) <span style="color: #666666">/</span> <span style="color: #666666">1000;</span>
			
			<span style="color: #408080; font-style: italic">//array performance</span>
			<span style="color: #008000; font-weight: bold">var</span> arrayStartTime<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> getTime();
			
			<span style="color: #008000; font-weight: bold">var</span> a<span style="color: #666666">:</span><span style="color: #008000">Array</span> <span style="color: #666666">=</span> generateArray();
			<span style="color: #008000; font-weight: bold">var</span> aAvg<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> averageArray(a);
			
			<span style="color: #008000; font-weight: bold">var</span> arrayTime<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> (getTime() <span style="color: #666666">-</span> arrayStartTime) <span style="color: #666666">/</span> <span style="color: #666666">1000;</span>
			
			<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"Vector"</span><span style="color: #666666">,</span> vectorTime);
			<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"Array"</span><span style="color: #666666">,</span> arrayTime);
			<span style="color: #0000FF">trace</span>((vectorTime<span style="color: #666666">/</span>arrayTime) <span style="color: #666666">*</span> <span style="color: #666666">100</span> <span style="color: #666666">+</span> <span style="color: #BA2121">" %"</span>);
		}
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> generateVector()<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span><span style="color: #008000">Number</span><span style="color: #666666">&gt;</span>
		{
			<span style="color: #008000; font-weight: bold">var</span> v<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span><span style="color: #008000">Number</span><span style="color: #666666">&gt;</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Vector.<span style="color: #666666">&lt;</span><span style="color: #008000">Number</span><span style="color: #666666">&gt;</span>(LENGTH<span style="color: #666666">,</span> <span style="color: #008000; font-weight: bold">true</span>);
			
			<span style="color: #008000; font-weight: bold">for</span>(<span style="color: #008000; font-weight: bold">var</span> i<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span> i <span style="color: #666666">&lt;</span> LENGTH<span style="color: #666666">;</span> i<span style="color: #666666">++</span>)
			{
				v[i] <span style="color: #666666">=</span> <span style="color: #008000">Math</span>.random() <span style="color: #666666">*</span> <span style="color: #666666">100000;</span>
			}
		
			<span style="color: #008000; font-weight: bold">return</span> v<span style="color: #666666">;</span>	
		}
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> averageVector(v<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span><span style="color: #008000">Number</span><span style="color: #666666">&gt;</span>)<span style="color: #666666">:</span><span style="color: #008000">Number</span>
		{			
			<span style="color: #008000; font-weight: bold">var</span> sum<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> <span style="color: #666666">0;</span>
			<span style="color: #008000; font-weight: bold">var</span> len<span style="color: #666666">:</span>int <span style="color: #666666">=</span> v.length<span style="color: #666666">;</span>
			
			<span style="color: #008000; font-weight: bold">for</span>(<span style="color: #008000; font-weight: bold">var</span> i<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span> i <span style="color: #666666">&lt;</span> LENGTH<span style="color: #666666">;</span> i<span style="color: #666666">++</span>)
			{
				sum <span style="color: #666666">+=</span> v[i];
			}
			
			<span style="color: #008000; font-weight: bold">return</span> (sum <span style="color: #666666">/</span> len);
		}
		
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> generateArray()<span style="color: #666666">:</span><span style="color: #008000">Array</span>
		{
			<span style="color: #008000; font-weight: bold">var</span> a<span style="color: #666666">:</span><span style="color: #008000">Array</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Array</span>(LENGTH);
			
			<span style="color: #008000; font-weight: bold">for</span>(<span style="color: #008000; font-weight: bold">var</span> i<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span> i <span style="color: #666666">&lt;</span> LENGTH<span style="color: #666666">;</span> i<span style="color: #666666">++</span>)
			{
				a[i] <span style="color: #666666">=</span> <span style="color: #008000">Math</span>.random() <span style="color: #666666">*</span> <span style="color: #666666">100000;</span>
			}
		
			<span style="color: #008000; font-weight: bold">return</span> a<span style="color: #666666">;</span>	
		}
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> averageArray(arr<span style="color: #666666">:</span><span style="color: #008000">Array</span>)<span style="color: #666666">:</span><span style="color: #008000">Number</span>
		{			
			<span style="color: #008000; font-weight: bold">var</span> sum<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> <span style="color: #666666">0;</span>
			<span style="color: #008000; font-weight: bold">var</span> len<span style="color: #666666">:</span>int <span style="color: #666666">=</span> arr.length<span style="color: #666666">;</span>
			
			<span style="color: #008000; font-weight: bold">for</span>(<span style="color: #008000; font-weight: bold">var</span> i<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span> i <span style="color: #666666">&lt;</span> LENGTH<span style="color: #666666">;</span> i<span style="color: #666666">++</span>)
			{
				sum <span style="color: #666666">+=</span> arr[i];
			}
			
			<span style="color: #008000; font-weight: bold">return</span> (sum <span style="color: #666666">/</span> len);
		}		
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> getTime()<span style="color: #666666">:</span><span style="color: #008000">Number</span>
		{
			<span style="color: #008000; font-weight: bold">return</span> (<span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Date</span>()).getTime();
		}
	}
}
</pre>
</div>

Of course, this is only one test. Depending on what you are doing, Vectors may be even faster, or slower.

One interesting note, originally my test had each collection sorted before they were averaged, but it turned out that sorting Vector was slower than sorting the Array. Not sure if this is a bug, but I have reported it to the player team.

 [1]: http://www.mikechambers.com/blog/2008/08/19/using-vectors-in-actionscript-3-and-flash-player-10/