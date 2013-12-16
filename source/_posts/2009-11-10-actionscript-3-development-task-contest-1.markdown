---
title: 'ActionScript 3 Development Task Contest #1'
author: mikechambers
layout: post
permalink: /2009/11/10/actionscript-3-development-task-contest-1/
categories:
  - General
tags:
  - AS3DTC
  - AS3DTC1
---


I was working on some code over the weekend and was spending a lot of time trying to figure out the best way to approach a problem, and how to get the best performance from the solution. I thought it would be useful and interesting to see how other developers would approach the problem. This gave me an idea for an ActionScript 3 contest, which I am announcing today.  
<!--more-->

  
**What**: ActionScript 3 Development Task Contest (AS3DTC)  
**When**: Submissions must be received by Mike Chambers (<mesh@adobe.com>) by 12 Noon, PST, Friday, November 13th.  
**Who**: Anyone is eligible (see details below)  
**Prizes** : Copy of Flex Builder 3, choice of a T-shirt from [threadless.org][1], lots of random swag, and the admiration and adulation of your ActionScript developer peers.

**Goals of contest**

1.  Get some solid implementations of classes that will be useful to everyone.
2.  Get multiple examples of high performance code that everyone can learn from.
3.  Drive discussions around implementations, and possible further optimizations (code and architectural).

Keep these goals in mind when writing your code and making your submission.

**Contest Task**

Implement a class named ProximityManager that divides the stage into a grid with cells sizes of 35px x 35px, and returns all of the display object instances within the same and adjacent cells as a specified display object (that will be passed in).

I have provided a TestRunner.as class that will be used to judge the contest. You cannot change this file. Your entry will consist of a class called ProximityManager.as that implements the constructor and public APIs in the included ProximityManager.as.

**Update** (November 11, 2009) : For the purposes of the contest, you can use the x, y coordinates of the display objects to determine which cell they are contained within (i.e. you dont have to worry about a display object straddling two cells).

The TestRunner will randomly place 10,000 display objects on the stage. It will then randomly place four target Sprites (checkSprites) instances on the stage.

The test that will be run is:

<div class="highlight">
  <pre><span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> testProximityManager()<span style="color: #666666">:</span>void
{
	proximityManager.update(items);
	proximityManager.getNeighbors(checkSprite_1);
	proximityManager.getNeighbors(checkSprite_2);
	proximityManager.getNeighbors(checkSprite_3);
	proximityManager.getNeighbors(checkSprite_4);
}
</pre>
</div>

&nbsp;

Where items is a Vector of all DisplayObjects to be checked against, and checkSprite is the target Sprite, whose neighbors must be found and returned in a Vector of DisplayObjects.

Tests will be run and results determined using Grant Skinner&#8217;s [ActionScript 3 Performance Test Harness][2].

[Download Contest Files][3]

All test files and entries will be posted to the [ActionScript 3 Development Task Contests GitHub Repository][4].

**Additional Rules**

*   Code must be release under an [MIT license][5].
*   Code must be fully commented.
*   Code must be human readable.
*   Code must implement the constructor and public APIs defined in the included ProximityManager.as file.
*   Code must be implemented in the provided ProximityManager.as class.
*   Contest is open to everyone.
*   Code must be authored by the submitter.
*   Code cannot have any external dependencies (including Flex).
*   Code cannot require any additional tools, pre or post processing steps.
*   All entry code must include the MIT license at the top, as well as the name of the developer who wrote and is submitting the code.
*   Developers may enter more than once, but only entries that take a significantly different approach will be accepted.

Note, that the rules and TestRunner may be tweaked after I post them, but I will try and make any changes or clarifications within 1 day. Please make sure to check back to this post for any changes.

Don&#8217;t try to game the contest. If you are not sure if you are, then ping me. This is a community contest for fun and learning. I will make the final call on all disputes and entries. If I think an entry doesn&#8217;t abide by the rules, or is trying to game the contest then I may reject the entry. I am very serious about this, so dont mess around.

**Update** (November 10, 2009) : Basically, the only information your class has access to is that which is passed to its constructors and methods. Your code cannot make assumptions based on information in the test which is not passed to the ProximityManager class (i.e., how many items there are on the stage, or the fact that the items are not moving, etc...). If I change the parameters of the test that your code does not know about, then your class should still work correctly.

The winning entry will be determined by compiling the TestRunner.as (included) and submission class with the latest public release of the mxmlc compiler. The TestRunner SWF will be run 5 times and total times will be combined. The submission with the lowest total time over the test iterations will be the winner. The return values from the getNeighbors API will be validated (an example validation test is included in the TestRunner).

Tests will be run on the latest Flash Player 10 Release (non-debug) version in the Safari browser (latest release version) on an Intel Mac Pro. All submissions will be posted online.

Once the results are announced, ranked, and posted, there will be a short period before the contest is finalized. This will give the community a chance to identify any bugs in the code logic. I will make the final decision about whether any bugs in the logic will disqualify the entry. Basically, if it is a minor bug that will not affect performance, then I will let it pass. If it is a major bug, or has a major impact on performance, then I will probably disqualify the entry. I may give the developer a chance to correct the bug.

Since one of the main goals of the contest is to help generate knowledge on techniques and optimizations, the contest is open to everyone, including Adobe employees. However, if an Adobe employee wins, the prizes will go to the highest ranked non-Adobe employee.

This is the first time I have tried this, so there will be some kinks in the process. Please be patient, and keep the goals and spirit of the contest in mind. If it goes well, then we will do more contests, with different tasks.

If you find any errors / bugs in the TestRunner class, please post them in the comments, and I will get them fixed.

If you have any questions, or want clarification on something, post it in the comments. All clarifications made by me in this post and its comments should be considered part of the rule set.

Watch this blog post, and my twitter account ([@mesh][6]) for contest updates and reminders.

File Updates:

**Release 0.7 (November 12, 2009)**

*   TestRunner now waits one second after it has loaded before it runs the performance tests.

**Release 0.6 (November 12, 2009)**

*   checkResults now removes all result items from the stage. This makes it easier to view and validate results

**Release 0.5 (November 12, 2009)**

*   All circles are now drawn so the top left of their bounds is at 0,0.

**Release 0.4 (November 11, 2009)**

*   bounds argument is now required in ProximityManager constructor. This specifies the bounds of the collision detection / grid area.

**Release 0.3 (November 11, 2009)**

*   Fixed Release dates in README.txt
*   Added visual validation code to TestRunner.as (thanks to Sean Christmann for the help)
*   Made a minor change to how circles are drawn in Display Objects on stage.  
    **From** : `disp.graphics.drawCircle( 0 , 0 , 5 )`;  
    **To** : `disp.graphics.drawCircle( 5 , 5 , 5 );` 

**Release 0.2 (November 10, 2009)**

*   Move SWF meta data from ProximityManager to TestRunner
*   Added README.txt file

**Release 0.1 (November 10, 2009)**

*   Initial Release

 [1]: http://www.threadless.com/
 [2]: http://www.gskinner.com/blog/archives/2009/04/as3_performance.html
 [3]: http://github.com/mikechambers/ActionScript-3-Development-Task-Contests/tree/master/AS3DTC_1/p
 [4]: http://github.com/mikechambers/ActionScript-3-Development-Task-Contests/tree/master/AS3DTC_1/
 [5]: http://www.opensource.org/licenses/mit-license.php
 [6]: http://www.twitter.com/mesh