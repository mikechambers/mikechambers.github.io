---
title: Getting Started with Flash Remoting and Java within ColdFusion MX
author: mikechambers
layout: post
permalink: /2002/05/05/getting-started-with-flash-remoting-and-java-within-coldfusion-mx/
categories:
  - General
---


This is an addendum to the following article:  
[Getting Started with ColdFusion MX and Flash Remoting article][1]  
that uses a Java class deployed in ColdFusion MX to create a service that can be called from Flash via Flash Remoting. Note, currently you must have ColdFusion MX installed in order to use Flash Remoting. However, we will be releasing separate versions for Java servers very soon.  
This article assumes that you are familiar with Java and Java concepts.  
1. Open the above article in your web browser.  
2. Download and install the ColdFusion MX preview release.  
3. Download and install the Flash Remoting Addons for Flash MX.  
4. Create HelloWorld.java in the com.macromedia.test package.  
HelloWorld.java should contain the following code:  
\*****  
\*****\*\\*\*HelloWorld.java\*\*\***  
\***\***\***\***
<PRE>package com.macromedia.test; <BR /><BR />&nbsp;<BR />public class HelloWorld<BR />{&nbsp; <BR />&nbsp;public String sayHello()<BR />&nbsp;{ <BR />&nbsp;&nbsp;return &#8220;Hello World&#8221;;<BR />&nbsp;} <BR />}</PRE>

  
\*****  
\***\***\***\****  
\***\***\***\****  
\***\***\***\****  
\***\***\***\***\***  
compile this into the *<cfinstall>\\runtime\\servers\\default* directory.  
There are no changes required in the Flash code. Open the example file in Flash MX and test your movie.  
Note : If you have done any of the other versions of the tutorials, you need to rename the *wwwroot\\com\\macromedia\\test* directory (to ensure that the Java class is called and not the code in the folder).  
Of course, this is a really simple example. Play around with passing more complex data such as Arrays, HashMaps and ResultSets. Ill post more information later on how to pass more complex datatypes.

 [1]: http://www.macromedia.com/desdev/mx/coldfusion/articles/startremoting.html