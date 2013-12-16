---
title: Why Adobe chose FXG over SVG
author: mikechambers
date: 2008-09-30 12:30:01 -0800
layout: post
permalink: /2008/09/30/why-adobe-chose-fxg-over-svg/
categories:
  - General
---


I am currently on a [speaking and press tour in Asia][1] talking about some of the new stuff we are doing in [Flex 4][2]. One of the things that people seem to be really excited about is [FXG][3] and Thermo, and the improved designer / developer workflow that they promise. However, I have received a couple of questions about why we didnt just choose to use SVG instead of creating a new format.  
<!--more-->

  
This is actually addressed in the [specification][4]:

> When initial work on an XML-based graphics interchange format began, the natural first thought was to use SVG. However, there are key differences between SVG and Flash Player&#8217;s graphics capabilities. These include core differences in SVG and Flash&#8217;s rendering model with regards to filters, transforms and text. Additionally, the interchange format needed to be able to support future Flash Player features, which would not necessarily map to SVG features. As such, the decision was made to go with a new interchange format, FXG, instead of having a non-standard implementation of SVG. FXG does borrow from SVG whenever possible.

Essentially, SVG didnt map well to the Flash world.

Our initial work around the format actually focused on SVG and Mark Anders has just posted a blog post describing in detail some of the [issues that we ran into that led us to finally decide to pursue FXG over SVG][5].

You can read his post [here][5].

 [1]: http://www.mikechambers.com/blog/2008/09/11/mini-speaking-tour-in-asia-tokyo-seoul-tapei-and-hong-kong/
 [2]: http://www.mikechambers.com/blog/2008/08/27/everything-there-is-to-know-about-flex-4-gumbo/
 [3]: http://www.mikechambers.com/blog/2008/08/28/getting-started-with-flex-4-fxg-and-flex-builder-3/
 [4]: http://opensource.adobe.com/wiki/display/flexsdk/FXG+1.0+Specification
 [5]: http://www.andersblog.com/archives/2008/09/flash_on_the_be.html