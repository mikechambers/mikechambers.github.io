---
title: Atom ActionScript Class Updated
author: mikechambers
date: 2004-02-09 12:23:01 -0800
layout: post
permalink: /2004/02/09/atom-actionscript-class-updated/
categories:
  - General
---


I have posted a new version of my [Atom ActionScript class][1]. This is version .20 and has a number of changes:

*   Supports all elements and attributes specified in [Atom spec .03][2]
*   Utilizes W3CDateTime class

I am still calling this a beta, because I am thinking about some major re-factoring. Right now it does not support non-Atom names spaces, and is not constructed in a way that would make it easy to extend to add this functionality. I am trying to figure out how to make it easy to extend in order to add custom name space support.

You can view the latest version of the class [here][1].

You can view a simple example of the class in use [here][3].

Any suggestions or questions? Post them in the comments.

 [1]: /mesh/archives/004355.cfm
 [2]: http://www.atomenabled.org/developers/syndication/atom-format-spec.php
 [3]: /mesh/archives/004384.cfm