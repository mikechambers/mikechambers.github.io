---
title: 'Update on ActionScript 3 Development Task Contest #1'
author: mikechambers
date: 2009-11-12 12:12:01 -0800
layout: post
permalink: /2009/11/12/update-on-actionscript-3-development-task-contest-1/
categories:
  - General
tags:
  - AS3DTC
  - AS3DTC1
---

Well, there is just a little over a day before the deadline for entries to the [ActionScript Development Task Contes][1]t (AS3DTC) are due. I wanted to make a quick post with a couple of reminders to ensure everyone has their correctly working submissions in on time.

First, a couple items:  
<!--more-->

1.  Make sure to include your name for the copyright in the ProximityManager.as file (replace my name at the top). This is really important, as you have the copyright, and it makez it easier for me to know who the submission is from.
2.  Run your submissions again against the latest test files. There have been some minor changes to the test, so make sure they dont affect your results.
3.  Test that you are returning valid results. See below for tips about how to do this.
4.  Read through the [comments][2] in the original contest post, especially the comments that I made. There are some rule clarifications that are important.
5.  Make sure you are using testing with [the latest contest files][3]. TestRunner.as has had some updates.

Regarding #4, here are some of the rule clarifications:

*   For the purposes of the contest, you should use the x, y coordinates of the display objects to determine which cell they are contained within (i.e. you don't have to worry about a display object straddling two cells).
*   Basically, the only information your class has access to is that which is passed to its constructors and methods. Your code cannot make assumptions based on information in the test which is not passed to the ProximityManager class (i.e., how many items there are on the stage, or the fact that the items are not moving, etc…). If I change the parameters of the test that your code does not know about, then your class should still work correctly.
*   The bounds argument is now required in ProximityManager constructor. This specifies the bounds of the collision detection / grid area.
*   If the positions of the DisplayObjects change, update will be called again. Thus, when update is called, the code should treat it as new data.
*   You must return a new Vector from getNeighbors. (You can't re-use the same Vector instance).

If you have any additional questions about the rules, then please post them on the original post.

**Validating Results**

Inside of TestRunner.as, there is a checkResults method, which you can use to validate your results.

To run it, uncomment the runTests() method in onStageAdded, and and the add this code:

``` actionscript
private function onStageAdded(e:Event):void
{
	...

	//runTests();

	proximityManager.update(items);
	checkResults(checkSprite_3, proximityManager.getNeighbors(checkSprite_3));
}
```

This will return something that should similar to this:

![title](blog/files/as3dtc/test_results_example.png)

This test ensures that you are not missing any DisplayObjects which you should return.

To ensure you are not including any DisplayObjects which you should not be, change the for each loop in checkResults to:

``` actionscript
private function checkResults(checkSprite:Sprite, items:Vector.<DisplayObject>):Boolean
{
	...
	
	for each(var disp:Sprite in items)
	{
		disp.graphics.beginFill( 0x0000FF , 1 );
		disp.graphics.drawCircle( 5 , 5 , 5 );
		disp.graphics.endFill();
		disp.alpha = 1;
	}
	
	...
}
```

You should not see any dark spots appear.

I have gone through and done an initial validation all of the submissions thus far. There were a couple of entries which were not returning the correct results, and I have emailed those developers. I also did a quick test run on my Mac Book Pro (2.4 Ghz Intel Core 2 Duo), and in general, right now, the bar to reach is an average of 2 &#8211; 3 ms per test run. Most submissions use take the same basic approach, but some have some interesting twists. I think there is still a opportunity for someone to take a novel approach and maybe jump ahead.

Remember, contest entries have to be received by me (mesh@adobe.com) by 12 Noon, PST, Friday, November 13.

 [1]: /blog/2009/11/10/actionscript-3-development-task-contest-1/
 [2]: http://www.mikechambers.com/blog/2009/11/10/actionscript-3-development-task-contest-1/#comments
 [3]: http://github.com/mikechambers/ActionScript-3-Development-Task-Contests/tree/master/AS3DTC_1/p