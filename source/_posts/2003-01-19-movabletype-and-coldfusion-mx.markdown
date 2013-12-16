---
title: MovableType and ColdFusion MX
author: mikechambers
date: 2003-01-19 12:29:01 -0800
layout: post
permalink: /2003/01/19/movabletype-and-coldfusion-mx/
categories:
  - General
---


A couple of people have noticed that I am hosting [MovableType][1] on a [ColdFusion server][2] and having MovableType generate ColdFusion Templates, and wanted to know how I did it.  
<!--more-->

  
It is actually pretty simple. In the Blog Config > Preferences section of the MT admin tool, simply set the File extension for archive files setting to &#8220;cfm&#8221; Then, in the templates section, makes sure that all of your templates are set to output cfm and not html files.

So if a template is generating a file named index.html, change it to generate index.cfm.

Rebuild your entire site, and all of your site&#8217;s pages will be rebuilt as ColdFusion templates.

One tip, make sure you go into your webserver directory and delete the old HTML files. MovableType will not do this, and if they are both there, the old pages may be served sometimes (especially if it is an index file).

So now, I have the option of using the power of ColdFusion to easily add dynamic content to my MovableType weblog.

 [1]: http://www.movabletype.org
 [2]: http://www.macromedia.com/software/coldfusion/