---
title: Using Vectors in ActionScript 3 and Flash Player 10
author: mikechambers
layout: post
permalink: /2008/08/19/using-vectors-in-actionscript-3-and-flash-player-10/
categories:
  - General
---


One of the new ActionScript features included in the [Flash Player 10 Public Beta][1] is the inclusion of a Vector class. Essentially, the Vector class is a typed Array, and in addition to ensuring your collection is type safe, can also provide (sometimes significant) performance improvements over using an Array.

Using the Vector class is pretty simple, and very similar to using an Array. In fact, the Vector class contains all of the same methods as the Array class. The main difference is how you instantiate it.

For example, here is how you instantiate an Array:  
<!--more-->

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">var</span> a<span style="color: #666666">:</span><span style="color: #008000">Array</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Array</span>();
<span style="color: #408080; font-style: italic">//or</span>
<span style="color: #008000; font-weight: bold">var</span> b<span style="color: #666666">:</span><span style="color: #008000">Array</span> <span style="color: #666666">=</span> [];
</pre>
</div>

Here is an example of instantiating a Vector that contains int types:

<div class="highlight">
  <pre><span style="color: #408080; font-style: italic">//var VARIABLENAME:Vector.&lt;VECTORTYPE&gt; = new Vector.&lt;VECTORTYPE&gt;();</span>
<span style="color: #008000; font-weight: bold">var</span> vector<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span>int<span style="color: #666666">&gt;</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Vector.<span style="color: #666666">&lt;</span>int<span style="color: #666666">&gt;</span>();
</pre>
</div>

Just as in an Array, you can initialize the Vector length to a specific size, by passing the length into the constructor:

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">var</span> size<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">7;</span>
<span style="color: #008000; font-weight: bold">var</span> vector<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span>int<span style="color: #666666">&gt;</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Vector.<span style="color: #666666">&lt;</span>int<span style="color: #666666">&gt;</span>(size);
</pre>
</div>

However, the Vector has an additional constructor argument, which is a Boolean value that specifies whether the Vector size is fixed (true) or can be changed (false). The default value is false, and the property can be changed with the fixed property:

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">var</span> size<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">7;</span>
<span style="color: #008000; font-weight: bold">var</span> fixed<span style="color: #666666">:</span><span style="color: #008000">Boolean</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">true</span>
<span style="color: #008000; font-weight: bold">var</span> vector<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span>int<span style="color: #666666">&gt;</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Vector.<span style="color: #666666">&lt;</span>int<span style="color: #666666">&gt;</span>(size<span style="color: #666666">,</span> fixed);
vector.fixed <span style="color: #666666">=</span> <span style="color: #666666">!</span>fixed<span style="color: #666666">;</span>
</pre>
</div>

Keep in mind, that if fixed is set to true, then you cannot call any Vector methods that change the length, such as pop(), push(), shift(), etc&#8230;

Vectors are also type safe, so while with an Array you can store multiple types:

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">var</span> s<span style="color: #666666">:</span><span style="color: #008000">String</span> <span style="color: #666666">=</span> <span style="color: #BA2121">"I am a string"</span><span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">var</span> d<span style="color: #666666">:</span><span style="color: #008000">Date</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Date</span>();	
<span style="color: #008000; font-weight: bold">var</span> n<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> <span style="color: #666666">1138</span>		
<span style="color: #008000; font-weight: bold">var</span> a<span style="color: #666666">:</span><span style="color: #008000">Array</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Array</span>();
a[<span style="color: #666666"></span>] <span style="color: #666666">=</span> s<span style="color: #666666">;</span>
a[<span style="color: #666666">1</span>] <span style="color: #666666">=</span> d<span style="color: #666666">;</span>
a[<span style="color: #666666">2</span>] <span style="color: #666666">=</span> n<span style="color: #666666">;</span>

<span style="color: #0000FF">trace</span>(a[<span style="color: #666666">1</span>] is <span style="color: #008000">Date</span>); <span style="color: #408080; font-style: italic">//true</span>
</pre>
</div>

You will get a compile time TypeError with a Vector:

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">var</span> s<span style="color: #666666">:</span><span style="color: #008000">String</span> <span style="color: #666666">=</span> <span style="color: #BA2121">"I am a string"</span><span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">var</span> d<span style="color: #666666">:</span><span style="color: #008000">Date</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Date</span>();	
<span style="color: #008000; font-weight: bold">var</span> n<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> <span style="color: #666666">1138</span>		
<span style="color: #008000; font-weight: bold">var</span> v<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span><span style="color: #008000">String</span><span style="color: #666666">&gt;</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Vector.<span style="color: #666666">&lt;</span><span style="color: #008000">String</span><span style="color: #666666">&gt;;</span>
v[<span style="color: #666666"></span>] <span style="color: #666666">=</span> s<span style="color: #666666">;</span>
v[<span style="color: #666666">1</span>] <span style="color: #666666">=</span> d<span style="color: #666666">;</span>
v[<span style="color: #666666">2</span>] <span style="color: #666666">=</span> n<span style="color: #666666">;</span>

<span style="color: #0000FF">trace</span>(v[<span style="color: #666666">1</span>] is <span style="color: #008000">Date</span>); <span style="color: #408080; font-style: italic">//false</span>

<span style="color: #408080; font-style: italic">//Compile time errors:</span>
<span style="color: #408080; font-style: italic">//Implicit coercion of a value of type Date to an unrelated type String.	</span>
<span style="color: #408080; font-style: italic">//Implicit coercion of a value of type Number to an unrelated type String.	</span>
</pre>
</div>

Other than that, working with a Vector is pretty much the same as working with an Array. The APIs are the same, and you can access items directly via their index.

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">var</span> vector<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span>int<span style="color: #666666">&gt;</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Vector.<span style="color: #666666">&lt;</span>int<span style="color: #666666">&gt;</span>();

<span style="color: #008000; font-weight: bold">var</span> rand<span style="color: #666666">:</span><span style="color: #008000">Number</span><span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">for</span>(<span style="color: #008000; font-weight: bold">var</span> i<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span> i <span style="color: #666666">&lt;</span> <span style="color: #666666">1000000;</span> i<span style="color: #666666">++</span>)
{
	rand <span style="color: #666666">=</span> (<span style="color: #008000">Math</span>.floor(<span style="color: #008000">Math</span>.random() <span style="color: #666666">*</span> <span style="color: #666666">1000000</span>) as int);
	vector.push(rand);
}

<span style="color: #0000FF">trace</span>(vector[<span style="color: #666666">7</span>]);
</pre>
</div>

One last thing to keep in mind is that a Vector is basically a dense array. This means that all items in the Vector must have either a value or null.

For example, with an Array, you can do this:

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">var</span> a<span style="color: #666666">:</span><span style="color: #008000">Array</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Array</span>();
a[<span style="color: #666666"></span>] <span style="color: #666666">=</span> <span style="color: #BA2121">"foo"</span><span style="color: #666666">;</span>
a[<span style="color: #666666">6</span>] <span style="color: #666666">=</span> <span style="color: #BA2121">"bar"</span><span style="color: #666666">;</span>
</pre>
</div>

But if you try that with a Vector:

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">var</span> v<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span><span style="color: #008000">String</span><span style="color: #666666">&gt;</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Vector.<span style="color: #666666">&lt;</span><span style="color: #008000">String</span><span style="color: #666666">&gt;</span>();
v[<span style="color: #666666"></span>] <span style="color: #666666">=</span> <span style="color: #BA2121">"foo"</span><span style="color: #666666">;</span>
v[<span style="color: #666666">6</span>] <span style="color: #666666">=</span> <span style="color: #BA2121">"bar"</span><span style="color: #666666">;</span>
</pre>
</div>

You will get a RangeError at runtime.

The fix is to initialize the Vector length:

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">var</span> v<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span><span style="color: #008000">String</span><span style="color: #666666">&gt;</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Vector.<span style="color: #666666">&lt;</span><span style="color: #008000">String</span><span style="color: #666666">&gt;</span>(<span style="color: #666666">7</span>);
v[<span style="color: #666666"></span>] <span style="color: #666666">=</span> <span style="color: #BA2121">"foo"</span><span style="color: #666666">;</span>
v[<span style="color: #666666">6</span>] <span style="color: #666666">=</span> <span style="color: #BA2121">"bar"</span><span style="color: #666666">;</span>
</pre>
</div>

Below is an example that shows a difference in performance in looping over a million numbers in a collection. Keep in mind that this is one specific test, and depending on your use case, performance improvements may be greater or smaller.

<div class="highlight">
  <pre>package
{
	<span style="color: #008000; font-weight: bold">import</span> flash.display.Sprite<span style="color: #666666">;</span>

	<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">class</span> VectorTest <span style="color: #008000; font-weight: bold">extends</span> Sprite
	{
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">static</span> const NUM_LOOPS<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">5;</span>
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> VectorTest()
		{	
						
			<span style="color: #008000; font-weight: bold">var</span> vector<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span>int<span style="color: #666666">&gt;</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Vector.<span style="color: #666666">&lt;</span>int<span style="color: #666666">&gt;</span>();
			<span style="color: #008000; font-weight: bold">var</span> array<span style="color: #666666">:</span><span style="color: #008000">Array</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Array</span>();
			
			<span style="color: #408080; font-style: italic">//populate data</span>
			<span style="color: #008000; font-weight: bold">var</span> rand<span style="color: #666666">:</span><span style="color: #008000">Number</span><span style="color: #666666">;</span>
			<span style="color: #008000; font-weight: bold">for</span>(<span style="color: #008000; font-weight: bold">var</span> i<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span> i <span style="color: #666666">&lt;</span> <span style="color: #666666">1000000;</span> i<span style="color: #666666">++</span>)
			{
				rand <span style="color: #666666">=</span> (<span style="color: #008000">Math</span>.floor(<span style="color: #008000">Math</span>.random() <span style="color: #666666">*</span> <span style="color: #666666">1000000</span>) as int);
				vector.push(rand);
				array.push(rand);
			}
			
			<span style="color: #008000; font-weight: bold">var</span> sTime<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> getMilliseconds();
			loopArray(array);
			<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"Loop Array Avg (5) : "</span> <span style="color: #666666">+</span> ((getMilliseconds() <span style="color: #666666">-</span> sTime)<span style="color: #666666">/</span>NUM_LOOPS));

			sTime <span style="color: #666666">=</span> getMilliseconds();
			loopVector(vector);
			<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"Loop Vector Avg (5) : "</span> <span style="color: #666666">+</span> ((getMilliseconds() <span style="color: #666666">-</span> sTime)<span style="color: #666666">/</span>NUM_LOOPS));

		}
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> getMilliseconds()<span style="color: #666666">:</span><span style="color: #008000">Number</span>
		{
			<span style="color: #008000; font-weight: bold">return</span> (<span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Date</span>()).getTime();
		}
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> loopArray(a<span style="color: #666666">:</span><span style="color: #008000">Array</span>)<span style="color: #666666">:</span>void
		{
			<span style="color: #008000; font-weight: bold">var</span> len<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> a.length<span style="color: #666666">;</span>
			
			<span style="color: #008000; font-weight: bold">var</span> n<span style="color: #666666">:</span>int<span style="color: #666666">;</span>
			<span style="color: #008000; font-weight: bold">for</span>(<span style="color: #008000; font-weight: bold">var</span> i<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span> i <span style="color: #666666">&lt;</span> NUM_LOOPS<span style="color: #666666">;</span> i<span style="color: #666666">++</span>)
			{
				<span style="color: #008000; font-weight: bold">for</span>(<span style="color: #008000; font-weight: bold">var</span> k<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span> k <span style="color: #666666">&lt;</span> len<span style="color: #666666">;</span> k<span style="color: #666666">++</span>)
				{
					n <span style="color: #666666">=</span> a[k];
				}
			}
		}
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> loopVector(v<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span>int<span style="color: #666666">&gt;</span>)<span style="color: #666666">:</span>void
		{
			<span style="color: #008000; font-weight: bold">var</span> len<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> v.length<span style="color: #666666">;</span>
			
			<span style="color: #008000; font-weight: bold">var</span> n<span style="color: #666666">:</span>int<span style="color: #666666">;</span>
			<span style="color: #008000; font-weight: bold">for</span>(<span style="color: #008000; font-weight: bold">var</span> i<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span> i <span style="color: #666666">&lt;</span> NUM_LOOPS<span style="color: #666666">;</span> i<span style="color: #666666">++</span>)
			{
				<span style="color: #008000; font-weight: bold">for</span>(<span style="color: #008000; font-weight: bold">var</span> k<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span> k <span style="color: #666666">&lt;</span> len<span style="color: #666666">;</span> k<span style="color: #666666">++</span>)
				{
					n <span style="color: #666666">=</span> v[k];
				}
			}
		}
	}
	
	
}
</pre>
</div>

On my machine, I get this output:

`
<pre>Loop Array Avg (5) : 115.8
Loop Vector Avg (5) : 108.8</pre>
<p>`

Which is significant given the simplicity of the test (just referencing the value).

You can find more information on Vectors in the [Flash Player 10 Beta documentation][2].

You can find more information on [Flash Player 10 on labs][1].

 [1]: http://labs.adobe.com/technologies/flashplayer10/
 [2]: http://download.macromedia.com/pub/labs/flashplayer10/flashplayer10_as3langref_070208.zip