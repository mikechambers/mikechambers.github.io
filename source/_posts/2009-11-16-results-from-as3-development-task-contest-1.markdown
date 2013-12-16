---
title: 'Results from AS3 Development Task Contest #1'
author: mikechambers
date: 2009-11-16 12:57:01 -0800
layout: post
permalink: /2009/11/16/results-from-as3-development-task-contest-1/
categories:
  - General
tags:
  - AS3DTC
  - AS3DTC1
---


I have just completed running all of the performance tests for the [ActionScript 3 Development Task Contest #1][1].

The result below are tentative until I have confirmed that the code follows the rules (and spirit) of the contest. If you see any issues with any of the top 5 submissions, please post them in the comments. You can view all of the entries in the [contest's GitHub repository][2].

Here are the results:  
<!--more-->
<iframe width='500' height='700' frameborder='0' src='http://spreadsheets.google.com/pub?key=tpFIybNqY4G30EWVIKKoPmQ&single=true&gid=0&output=html&widget=true'></iframe>
  
You can download the raw results in CSV format from [here][3], or view them on google docs [here][4].

All examples were compiled with MXMLC from the Flex SDK 3.4 (Version 3.4.0 build 9271), with the following command:

``` bash
mxmlc --target-player=10.0.0 -compiler.source-path ~/src/PerformanceTest/ -- TestRunner.as
```

Results were obtained by running TestRunner.as. TestRunner.as ran each test 300 times per run. The TestRunner was run a total of 5 times (with the SWF reloaded each time).

Test were run in Safari Version 4.0.4 (6531.21.10) on Mac 10.6.2 in Flash Player 10,0,32,18 (regular). The Mac was a MacPro 2 x 3 GHZ Quad Core Intel Xeon with 8 GB RAM.

I will finalize results and announce the winner either late tonight, on Wednesday (I am traveling on Tuesday). Check back here for updated information, or follow my twitter account at [@mesh][5]. I will be awarding prizes to multiple submissions.

**UPDATE : (November 17th, 2009)** : I am declaring the entries final. Arnaud Gatouillat is the overall winner, and wins Flex Builder, a tshirt, etc... In addition, given some of the great results that we got from the submissions, I am also going to award a prize (their choice of a tshirt from threadless.org) to the next 3 top entries, which include Grant Skinner, Jim Cheng, and Jean Phillipp Auclair. If you are one of the top four entries, please email me at mesh@adobe.com and we will work out the details.

 [1]: http://www.mikechambers.com/blog/tag/as3dtc1/
 [2]: http://github.com/mikechambers/ActionScript-3-Development-Task-Contests/tree/master/AS3DTC_1/
 [3]: http://github.com/mikechambers/ActionScript-3-Development-Task-Contests/blob/master/AS3DTC_1/results/results.csv
 [4]: http://spreadsheets.google.com/ccc?key=0AqqzNUoZeUetdEFBNlE4VURyQTA0aGFrMWdueW9jMGc&hl=en
 [5]: http://www.twitter.com/mesh