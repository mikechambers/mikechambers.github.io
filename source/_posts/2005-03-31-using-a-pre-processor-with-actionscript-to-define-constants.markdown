---
title: Using a Pre-processor with ActionScript to define constants
author: mikechambers
date: 2005-03-31 12:12:01 -0800
layout: post
permalink: /2005/03/31/using-a-pre-processor-with-actionscript-to-define-constants/
categories:
  - General
---


Yesterday I posted some simple info on [how to use the cpp pre-processor to pre-process ActionScript files][1]. I [showed][1] how you can use the #ifdef directive to conditionally add / remove stuff from the final ActionScript file. However, cpp can do a lot more than just conditional section includes.

You can use the [#define][2] directive to define constants within your ActionScript file / class.

For example, lets look at a simple example:

<!--more-->

  
`
<pre>class ObjectCreator
{
    var DEFAULTWIDTH:Number = 5;
    var DEFAULTHEIGHT:Number = 5;

    function ObjectCreator()
    {
    }
    
    function createObjects(Void):Void
    {
        for(var i:Number = 0; i < 10000; i++)
        {
            var o = new Object();
            o.width = this.DEFAULTWIDTH;
            o.height = this.DEFAULTHEIGHT;
        }
    }   
}</pre>
<p>`

In this case, we use a naming convention (all caps) to denote a variable that should be treated as a constant. However, it is not a true constant. This means that it can be changed at runtime, and that the player has to look up the value each time it is accessed. In certain circumstances, this can have an impact on performance.

However, if you run the ActionScript file through the cpp processor then you can use the [#define][2] constant to essentially allow you to use constants in your code.

Here is the same code using #define:

`
<pre>#define DEFAULTWIDTH 5
#define DEFAULTHEIGHT 5

class ObjectCreator
{
    function ObjectCreator()
    {
    }
    
    function createObjects(Void):Void
    {
        for(var i:Number = 0; i < 10000; i++)
        {
            var o = new Object();
            o.width = DEFAULTWIDTH;
            o.height = DEFAULTHEIGHT;
        }
    }   
}</pre>
<p>`

After running through the cpp pre-processor:

*cpp -P ObjectCreator.p ObjectCreator.as*

the following ActionScript file is created:

`
<pre>class ObjectCreator
{
    function ObjectCreator()
    {
    }
    
    function createObjects(Void):Void
    {
        for(var i:Number = 0; i < 10000; i++)
        {
            var o = new Object();
            o.width = 5;
            o.height = 5;
        }
    }   
}</pre>
<p>`

Notice that DEFAULTWIDTH and DEFAULTHEIGHT have been replaced with their constant values of 5. Of course, in this case the constants are only being used in one place, but the more the constant is used, the more useful using #define becomes.

Couple of notes. Pay attention to the syntax for #define:

*#define name value*

There is no = sign between the name and value. There is also no trailing semi-colon. If you add either, they will be treated as part of the macro and inserted into your code

You can find more info about using the cpp preprocessor with ActionScript [here][1]. You can find more info about the #define directive [here][2].

 [1]: http://www.markme.com/mesh/archives/007367.cfm
 [2]: http://gcc.gnu.org/onlinedocs/cpp/Object_002dlike-Macros.html#Object_002dlike-Macros