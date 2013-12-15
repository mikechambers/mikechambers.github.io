---
title: Do Apollo and WPF compete with each other?
author: mikechambers
layout: post
permalink: /2007/03/18/do-apollo-and-wpf-compete-with-each-other/
categories:
  - General
---


Im going to try to keep this post short (I have a bunch of other posts I need to work on tonight), but this question came up during [Apollo Camp][1].

Do Apollo and WPF compete?

The answer that I have, and am posting here is that, no, I don&#8217;t think that they do.  
<!--more-->

  
[WPF][2] is a Windows technology for creating windows applications. It is targeted at Windows developers. If you want to build Windows desktop applications, using Microsoft technologies (XAML, C#), then WPF is for you. The primary development tools are Windows only (which make sense, since you are building Windows applications).

[Apollo][3] is a cross platform runtime (currently in Alpha), that is targeted at allowing web developers to use those web development skills, to bring web and rich internet applications to the desktop. It is targeted at web developers. You use existing web technologies (Flash, Flex, HTML, JavaScript) to build your applications. The development tools are cross platform.

Now, there may be cases where the functionality of Apollo and WPF overlap, however, even in these cases, I don&#8217;t think that there really is that much competition. If you are a Microsoft .NET / WPF developer and don&#8217;t care about being cross platform, then you are probably going to use WPF. If you are a web developer, then you are probably going to use Apollo.

I think that the only runtimes that really compete directly with each other in the Adobe / Microsoft worlds are Flash in the browser and WPF/E, but Ill leave that post for another day.

Here is a simple chart I put together to try to display my thinking on this.

<img src="/mesh/files/wpf_apollo_chart.png" border="0" alt="WPF Apollo Chart" height="516" width="423" />

So, Apollo is kind of in this new, in between space between the desktop and the browser, that combines some of the advantages of web technologies and deployment, with some of the advantages of being on the desktop. Someone needs to come up with a good name to describe this space.

I am curious to hear others thoughts. Post them in the comments.

 [1]: http://www.adobe.com/go/apollocamp
 [2]: http://en.wikipedia.org/wiki/Windows_Presentation_Foundation
 [3]: http://www.adobe.com/go/apollo