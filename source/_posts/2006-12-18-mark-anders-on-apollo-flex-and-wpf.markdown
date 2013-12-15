---
title: Mark Anders on Apollo, Flex and WPF
author: mikechambers
layout: post
permalink: /2006/12/18/mark-anders-on-apollo-flex-and-wpf/
categories:
  - General
---


The Register has posted an [interview with Mark Anders of Adobe][1]. The article touches on a number of topics, including Flex, WPF, and Apollo. In particular, this quote from Mark caught my eye:  
<!--more-->

> If you look at what Microsoft is doing with WPF, they say it&#8217;s really about rich Internet applications but actually, I don&#8217;t think it is, because I think rich Internet applications are not about Windows only. I think the Internet is about a multitude of machines and you do not always know what they are.

This idea of Rich Internet Application being by definition cross platform is something I have been thinking about and discussing offline for a while. It seems to me that one of the primary reason RIAs have taken off is that as a developer, you can offer a compelling experience, and not worry about what OS the end user is running. You can just target a platform layer above the operating system (Flash or the browser). Of course, some people argue that this is increasingly making the operating system irrelevant, and for some classes of applications, I believe it is.

However, one of the main issues with running applications within the browser is that the application is limited in functionality by the browser and the browser sandbox. For some applications, this is not an issue, but for others it places a significant constraint on the application (for both developers and end users). [Apollo][2], which I work on, aims to address this by allowing developers to use the same development skills they use to target the browser (Flash, Flex, HTML, JavaScript, etc&#8230;), to build and deploy those applications to the desktop, and get away from some of the constrains of running within the browser. Thus, you get the advantages of RIAs (easy development model, cross platform), while also being able to take advantage of being on the desktop (access to local resources, first class application experience).

I get asked a lot whether I see WPF and WPF/E as directly competing with Apollo. I personally don&#8217;t see them as direct competitors. WPF is all about building Windows applications, not cross platform Rich Internet applications. WPF/E is constrained by the limitations of the browser (and Microsoft doesn&#8217;t have the best track record when it comes to cross platform plugins and internet clients). Apollo is all about enabling Rich Internet Applications to run on the desktop, while staying true to what make RIAs so attractive in the first place (cross platform, ease of development).

Im on vacation right now, so I am not going to drill down on this too much just yet, but I wanted to get a link up to Mark&#8217;s interview. (I plan to write more about this soon).

You can view the entire article [here][1].

via [[JD][3]]

 [1]: http://www.regdeveloper.co.uk/2006/12/15/mark_anders_flash/
 [2]: http://www.adobe.com/go/apollo
 [3]: http://weblogs.macromedia.com/jd/archives/2006/12/anders_on_apoll.cfm