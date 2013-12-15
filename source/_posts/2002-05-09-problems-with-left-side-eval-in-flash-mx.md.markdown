---
title: Problems with left side eval in Flash MX
author: mikechambers
layout: post
permalink: /2002/05/09/problems-with-left-side-eval-in-flash-mx/
categories:
  - General
---


I am still seeing a lot of confusion over this issue, so i thought i would try to clarify. You can no longer use eval() on the left side of a statement.&nbsp; However, this only applies when publishing as a Flash 6 or greater SWF. This change was made in to be more consistent with ECMA-262.  
Couple of points:  
  
*   As long as you are publishing as a Flash 5 movie, you can still use eval() on the left side, even if using Flash MX.  
    *   The Flash 6 player will correctly play Flash 5 files with eval() on the left side of a statement.  
        *   The only time this should be a problem, is if you have a Flash 5 movie with eval() on the left side, and try to publish it as a Flash 6 movie. You cannot do this.</UL>
          
        Here are links to technotes that describe the issue:  
          
        *   <!--StartFragment -->
            
            [Eval() on the left side of an argument causes error][1]  
            *   [Macromedia Flash MX Top 5 Topics][2]</UL>
              
            As a general rule, you should use this["foo"] instead of eval(&#8220;foo&#8221;), even when authoring for Flash 5.  
            Update [5/14/02] : The technote has been updated. You can read a summary of the changes in the [post][3].</p>

 [1]: http://www.macromedia.com/support/flash/ts/documents/assignment_area.htm
 [2]: http://www.macromedia.com/support/flash/ts/documents/mxtopics.htm#scripts
 [3]: http://radio.weblogs.com/0106797/2002/05/14.html#a81