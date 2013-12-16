---
title: Updated Eval Technote
author: mikechambers
date: 2002-05-14 12:15:01 -0800
layout: post
permalink: /2002/05/14/updated-eval-technote/
categories:
  - General
---


The [tech note ][1]describing using eval on the left side of an operator has been updated to take note of an issue that has arisen.<!--StartFragment -->

<PRE>eval(&#8220;TextField&#8221; + &#8220;One&#8221;) = &#8220;string1&#8243;<BR />trace(&#8220;TextFieldOne&#8221;)</PRE>

  
Will return &#8220;undefined&#8221; in Test Movie and the eval() will fail in Macromedia Flash Player 6.  
To correct the problem enclose the string concatenation in an extra set of parentheses:`<BR>`
<PRE>eval((&#8220;TextField&#8221; + &#8220;One&#8221;)) = &#8220;string1&#8243;;</PRE>

  
``  
You can find more info on eval in this [post][2].

 [1]: http://www.macromedia.com/support/flash/ts/documents/assignment_area.htm
 [2]: http://radio.weblogs.com/0106797/2002/05/09.html#a68