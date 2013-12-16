---
title: Creating Re-distributable ActionScript Libraries of Pixel Bender Filters
author: mikechambers
date: 2008-09-17 12:28:01 -0800
layout: post
permalink: /2008/09/17/creating-re-distributable-actionscript-libraries-of-pixel-bender-filters/
categories:
  - General
tags:
  - pixelbender
---


Last week I wrote a number of blog posts showing how to work with [Pixel Bender][1] filters in Flash, Flex and ActionScript. In particular, I wrote about how to [embed pixel bender filters within a SWF][2] and how to [encapsulate custom Pixel Bender filters in an ActionScript 3 class][3]. For this post, I am going to take the next step, and show how to create re-distributable SWC libraries of custom Pixel Bender filters that can be used in [Flash Player 10][4] based projects (including Flex Builder, MXMLC and Flash Professional).  
<!--more-->

  
Basically, we will create a SWC (redistributable library of ActionScript classes) that contains our Pixel Bender filter encapsulated inside of an ActionScript class. We will create the SWC in [Flex Builder][5] although you could also easily do it using the *compc* command line tool included in the Flex SDK.

First, we need to set up Flex builder so that it will recognize the Flash Player 10 classes that we need to use to create and compile our filter class. 

Download one of the [Flex 3.2 nightly builds][6] (I am using 3.2.0.3238) and extract it to a location on your desktop (I will refer to this as FLEX3.2_PATH). The builds contain support for compiling to Flash Player 9 and Flash Player 10.

Next, open up Flex Builder. We need to add the Flex SDK we just downloaded to Flex Builder. You can find complete instructions in this [technote][7]. Basically, go to *Window > Preferences > Flex > Installed Flex SDKs > Add* and point to the SDK you just downloaded.

Next, created a new &#8220;Flex Library Project&#8221; by going to *File > New > Flex Library Project* (dont worry, this is actually just an ActionScript library and doesn&#8217;t require or use Flex).

Specify a project name and where the project will be stored. In the *Flex SDK version* section, click the *Use a specific SDK* radio button, and then from the drop down, select the Flex SDK you just added (which should be named *Flex 3.2*). 

[<img src="http://farm4.static.flickr.com/3239/2865425551_dc8c0fb7c7.jpg" width="500" height="476" alt="Creating a Project for FP 10" />][8]

Click the *Next* button (not the *Finish* button). This will take you to a panel where you can set build paths. We need to tell Flex Builder to compile for Flash Player 10, and not Flash Player 9. Select the *Library path* tab button at the top. This should show the Flex 3.2 SDK which you are using. Click the little arrow next to the SDK listing to expand the entry. This will show the SWCs being used to compile the project. Select the *playerglobal.swc* entry, and click the *Remove* button. This will remove the Flash Player 9 SWC from the project.

Next, we need to add the Flash Player 10 SWC. Click the *Add SWC* button and then browse to *FLEX3.2_PATH/frameworks/libs/player/10* and select the *playerglobal.swc* in that directory and click ok.

Finally, make sure the *playerglobal.swc* entry is expanded and select the *Link Type* entry, and click the *Edit* button. Set the *Link Type* to *External* and click ok, and then click the *Finish* button. 

[<img src="http://farm4.static.flickr.com/3006/2865425531_890d4092e8.jpg" width="500" height="417" alt="Setting Flex Builder to compile to FP 10" />][9]

The project is now configured to create SWC libraries that work with Flash Player 10 classes.

Note, you may get a compile error in the *Problem view* saying that nothing has been specified to be included in the SWC. You can ignore that for now.

Next, we need to add our Pixel Bender filter, and create the class that embeds it and provides an APIs for it. We will use the same filter and classes that I used in my earlier blog post [here][3]. Copy the *testfilter.pbj* file into the filters directory.

In the *src* directory of the project, create a new folder called &#8220;filters&#8221;. We will use this as the namespace for all of our custom filters (of course, you may want to use a different namespace and directory structure). Copy the filters pbj file into that directory.

Now we are ready to add our ActionScript class for the filter. I am not going to go through all of the steps of creating the class, you can get most of that in this post. 

Right click on the filters folder, and select *New > ActionScript Class*. Give the class a name (I am using *TestFilter* for this example), set the *Superclass* to *ShaderFilter* and click the *Finish* button. If you just copy the class from the previous past, make sure to update the package path in the class definition.

Here is what the project layout looks like now:

<img src="/images/blog/pixelbenderswcs/project.png" height="112" width="190" />

Here is the filter class I created for the filter:

<div class="highlight">
  <pre>package filters
{
	<span style="color: #008000; font-weight: bold">import</span> flash.display.Shader<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.filters.ShaderFilter<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.utils.ByteArray<span style="color: #666666">;</span>
			
	<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">class</span> TestFilter <span style="color: #008000; font-weight: bold">extends</span> ShaderFilter
	{
		<span style="color: #408080; font-style: italic">//the file that contains the binary bytes of the PixelBender filter</span>
		[Embed(<span style="color: #BA2121">"testfilter.pbj"</span><span style="color: #666666">,</span> mimeType<span style="color: #666666">=</span><span style="color: #BA2121">"application/octet-stream"</span>)]
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> Filter<span style="color: #666666">:</span>Class<span style="color: #666666">;</span>		
		
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">var</span> _shader<span style="color: #666666">:</span>Shader<span style="color: #666666">;</span>
		
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> TestFilter(value<span style="color: #666666">:</span><span style="color: #008000">Number</span> <span style="color: #666666">=</span> <span style="color: #666666">50</span>)
		{
			<span style="color: #408080; font-style: italic">//initialize the ShaderFilter with the PixelBender filter we</span>
			<span style="color: #408080; font-style: italic">//embedded</span>
			_shader <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Shader(<span style="color: #008000; font-weight: bold">new</span> Filter() as ByteArray);
			
			<span style="color: #408080; font-style: italic">//set the default value</span>
			<span style="color: #008000; font-weight: bold">this</span>.value <span style="color: #666666">=</span> value<span style="color: #666666">;</span>
			<span style="color: #008000; font-weight: bold">super</span>(_shader);
		}
		
		
		<span style="color: #408080; font-style: italic">//This filter only has one value, named value</span>
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> get value()<span style="color: #666666">:</span><span style="color: #008000">Number</span>
		{	
			<span style="color: #008000; font-weight: bold">return</span> _shader.data.amount.value[<span style="color: #666666"></span>];	
		}
		
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> set value(value<span style="color: #666666">:</span><span style="color: #008000">Number</span>)<span style="color: #666666">:</span>void
		{
			<span style="color: #408080; font-style: italic">//not that pixel bender filters take an array of values, even</span>
			<span style="color: #408080; font-style: italic">//though we only have one in our example</span>
			_shader.data.amount.value <span style="color: #666666">=</span> [value];
		}		

	}
}
</pre>
</div>

At this point, we are ready to add the class to the SWC, and then compile the project.

Open *Project > Properties > Flex Library Build Path*. On the *Classes* tab, make sure the *TestFilter* class is selected. You do not need to include the filter pbj file in the SWC as this is compiled into the *TestFilter* class when the class is compiled into the SWC.

Click the *OK* button. The class and SWC should be compiled. If you get any compile errors you will need to fix them first. Once the SWC is compiled, you can find it in the projects *bin* folder.

You now have a SWC that contains your custom ActionScript Pixel Bender class and filter. At this point, you can distribute and / or reuse the SWC for other projects. Just link the SWC like you would any other SWC and your filter class will be available. Today, this works in Flex Builder and MXMLC (provided you set them up to compile to Flash Player 10). Once Flash Professional CS4 is released (which includes support for Flash Player 10) you will be able to use the SWC and filter there also (and yes, the SWC import bug is fixed).

Using this technique, you can create reusable libraries of custom Pixel Bender filters, and use them in your project just like the Flash Player&#8217;s built in filters.

 [1]: http://labs.adobe.com/wiki/index.php/Pixel_Bender_Toolkit
 [2]: http://www.mikechambers.com/blog/2008/09/08/embedding-pixel-bender-filters-within-a-swf/
 [3]: http://www.mikechambers.com/blog/2008/09/08/encapsulating-custom-pixel-bender-filters-in-actionscript-3/
 [4]: http://labs.adobe.com/technologies/flashplayer10/
 [5]: http://www.adobe.com/products/flex/
 [6]: http://opensource.adobe.com/wiki/display/flexsdk/Download+Flex+3
 [7]: http://livedocs.adobe.com/flex/3/html/help.html?content=build_6.html#162812
 [8]: http://www.flickr.com/photos/mikechambers/2865425551/ "Creating a Project for FP 10 by mike.chambers, on Flickr"
 [9]: http://www.flickr.com/photos/mikechambers/2865425531/ "Setting Flex Builder to compile to FP 10 by mike.chambers, on Flickr"