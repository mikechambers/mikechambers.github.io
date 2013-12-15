---
title: 'Functions, activation objects and &#8216;this&#8217; in ActionScript 3'
author: mikechambers
layout: post
permalink: /2008/10/08/function-closures-and-this-in-actionscript-3/
categories:
  - General
---


I have been reading through [Colin Moock&#8217;s Essential ActionScript 3 book][1], taking my time on each chapter to make sure I get the most out of it. I have been using ActionScript 3 pretty consistently for a couple of years (about a year before it was public), but I have been pleasantly surprised with how much stuff I am learning from reading Moock&#8217;s book.

Anyways, I am currently reading Chapter 5 on Functions which among other things covers function scope and <del datetime="2008-10-09T18:47:55+00:00">closures</del> activation objects (although the book goes into more detail in Chapter 16). This is one of the things that frequently trips up new developers. When creating a function, the function has access to all of the variables within its scope, even if the function is passed to and called within another scope. However, one thing to watch out for is that when using function closures, `this` always points to the Global object, and not to the object / instance that the function is called within.  
<!--more-->

  
For example:

**FunctionClosureTest.as**

<div class="highlight">
  <pre>package {
	<span style="color: #008000; font-weight: bold">import</span> flash.display.Sprite<span style="color: #666666">;</span>

	<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">class</span> FunctionClosureTest <span style="color: #008000; font-weight: bold">extends</span> Sprite
	{
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> FunctionClosureTest()
		{
			
			<span style="color: #008000; font-weight: bold">var</span> f<span style="color: #666666">:</span><span style="color: #008000">Function</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">function</span>()<span style="color: #666666">:</span>void
			{
				<span style="color: #0000FF">trace</span>(<span style="color: #008000; font-weight: bold">this</span>);
			}
			
			f();<span style="color: #408080; font-style: italic">//call function</span>
			<span style="color: #0000FF">trace</span>(<span style="color: #008000; font-weight: bold">this</span>);<span style="color: #408080; font-style: italic">//trace current scope</span>
			
			<span style="color: #008000; font-weight: bold">var</span> k<span style="color: #666666">:</span>Foo <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Foo();
			k.runFunction(f);<span style="color: #408080; font-style: italic">//call function in different instance</span>
		}
		
		<span style="color: #008000; font-weight: bold">public</span> override <span style="color: #008000; font-weight: bold">function</span> toString()<span style="color: #666666">:</span><span style="color: #008000">String</span>
		{
			<span style="color: #008000; font-weight: bold">return</span> <span style="color: #BA2121">"FunctionClosureTest"</span><span style="color: #666666">;</span>	
		}
	}
}


<span style="color: #008000; font-weight: bold">class</span> Foo
{
	<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> runFunction(f<span style="color: #666666">:</span><span style="color: #008000">Function</span>)<span style="color: #666666">:</span>void
	{
		f();
	}
}

<span style="color: #408080; font-style: italic">//rewrite toString for Global object</span>
<span style="color: #008000; font-weight: bold">this</span>.toString <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">function</span>()<span style="color: #666666">:</span><span style="color: #008000">String</span>
{
	<span style="color: #008000; font-weight: bold">return</span> <span style="color: #BA2121">"Global"</span>
}
</pre>
</div>

&nbsp;

Outputs:

    Global
    FunctionClosureTest
    Global</pre>
    <p></p>
    However, this doesn't mean that we cant access the original scope that this points to. We just need to copy that to the local scope in a variable, so it is stored and accessible within the function closure.
    
    
    Here is the updated example:
    
    
    **FunctionClosureTest.as**
    
    
    <div class="highlight">
      <pre>package {
	<span style="color: #008000; font-weight: bold">import</span> flash.display.Sprite<span style="color: #666666">;</span>

	<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">class</span> FunctionClosureTest <span style="color: #008000; font-weight: bold">extends</span> Sprite
	{
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> FunctionClosureTest()
		{
			<span style="color: #008000; font-weight: bold">var</span> scope<span style="color: #666666">:</span><span style="color: #008000">Object</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">this</span><span style="color: #666666">;</span>
			<span style="color: #008000; font-weight: bold">var</span> f<span style="color: #666666">:</span><span style="color: #008000">Function</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">function</span>()<span style="color: #666666">:</span>void
			{
				<span style="color: #0000FF">trace</span>(scope);
			}
			
			f();<span style="color: #408080; font-style: italic">//call function</span>
			<span style="color: #0000FF">trace</span>(<span style="color: #008000; font-weight: bold">this</span>);<span style="color: #408080; font-style: italic">//trace current scope</span>
			
			<span style="color: #008000; font-weight: bold">var</span> k<span style="color: #666666">:</span>Foo <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Foo();
			k.runFunction(f);<span style="color: #408080; font-style: italic">//call function in different instance</span>
		}
		
		<span style="color: #008000; font-weight: bold">public</span> override <span style="color: #008000; font-weight: bold">function</span> toString()<span style="color: #666666">:</span><span style="color: #008000">String</span>
		{
			<span style="color: #008000; font-weight: bold">return</span> <span style="color: #BA2121">"FunctionClosureTest"</span><span style="color: #666666">;</span>	
		}
	}
}


<span style="color: #008000; font-weight: bold">class</span> Foo
{
	<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> runFunction(f<span style="color: #666666">:</span><span style="color: #008000">Function</span>)<span style="color: #666666">:</span>void
	{
		f();
	}
}

<span style="color: #408080; font-style: italic">//rewrite toString for Global object</span>
<span style="color: #008000; font-weight: bold">this</span>.toString <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">function</span>()<span style="color: #666666">:</span><span style="color: #008000">String</span>
{
	<span style="color: #008000; font-weight: bold">return</span> <span style="color: #BA2121">"Global"</span>
}
</pre>
      
    </div>
    
    
    &nbsp;
    
    
    The only change is to store a reference to the current this in a variable, and then access that variable from the <del datetime="2008-10-09T18:47:55+00:00">function closure</del> activation object.
    
    
    <div class="highlight">
      <pre><span style="color: #008000; font-weight: bold">var</span> scope<span style="color: #666666">:</span><span style="color: #008000">Object</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">this</span><span style="color: #666666">;</span>
<span style="color: #008000; font-weight: bold">var</span> f<span style="color: #666666">:</span><span style="color: #008000">Function</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">function</span>()<span style="color: #666666">:</span>void
{
	<span style="color: #0000FF">trace</span>(scope);
}
</pre>
      
    </div>
    
    
    &nbsp;
    
    
    This now outputs:
    
    
        FunctionClosureTest
        FunctionClosureTest
        FunctionClosureTest
    
    
    By storing the this reference in a local variable, we are able to then access it later from the <del datetime="2008-10-09T18:47:55+00:00">function closure</del> activation object, regardless of which scope the function is called within.

 [1]: http://www.moock.org/eas3/