---
title: Bash Scripts for working with ActionScript 3 in TextMate
author: mikechambers
layout: post
permalink: /2008/10/09/bash-scripts-for-working-with-actionscript-3-in-textmate/
categories:
  - General
tags:
  - as3
  - bash
  - textmate
---


I have switched over to using [TextMate][1] for some of my experimentations with ActionScript. I like how lightweight it is, its extensibility, command completion functionality, and ease of setting up new projects. I find it is perfect for quickly testing new code and ideas.

I have put together a couple of bash scripts, which coupled with the [ActionScript 3 and Flex TextMate bundles][2] have made working in TextMate a little easier for me.  
<!--more-->

  
The first script is called `autocompile`, which takes a class file, and compiles it anytime the file changes. This is really useful in TextMate as you can see any compile errors as you code.

**autocompile**

<div class="highlight">
  <pre><span style="color: #408080; font-style: italic">#!/bin/bash</span>

<span style="color: #408080; font-style: italic"># mxmlc autocompile bash script</span>
<span style="color: #408080; font-style: italic"># create by mike chambers</span>
<span style="color: #408080; font-style: italic"># http://www.mikechambers.com</span>


<span style="color: #408080; font-style: italic">#how often it check for changes in seconds</span>
<span style="color: #19177C">LOOP_INTERVAL</span><span style="color: #666666">=</span>2

<span style="color: #408080; font-style: italic">#make sure that a file name was passed in</span>
<span style="color: #008000; font-weight: bold">if</span> <span style="color: #666666">[</span> -z <span style="color: #19177C">$1</span> <span style="color: #666666">]</span>;then
        <span style="color: #008000">echo</span> <span style="color: #BA2121">"You must specify a file to compile"</span>
        <span style="color: #008000">exit </span>0
<span style="color: #008000; font-weight: bold">fi</span>

<span style="color: #408080; font-style: italic">#make sure that the file exists</span>
<span style="color: #008000; font-weight: bold">if</span> <span style="color: #666666">[</span> ! -e <span style="color: #19177C">$1</span> <span style="color: #666666">]</span>; <span style="color: #008000; font-weight: bold">then</span>
<span style="color: #008000; font-weight: bold">        </span><span style="color: #008000">echo</span> <span style="color: #BA2121">"$1 does not exist"</span>
        <span style="color: #008000">exit </span>0;
<span style="color: #008000; font-weight: bold">fi</span>

<span style="color: #408080; font-style: italic">#function to call mxmlc</span>
<span style="color: #008000; font-weight: bold">function </span>compile<span style="color: #666666">()</span>
<span style="color: #666666">{</span>
        mxmlc <span style="color: #19177C">$1</span>
<span style="color: #666666">}</span>

<span style="color: #408080; font-style: italic">#compile on load</span>
compile <span style="color: #19177C">$1</span>

<span style="color: #408080; font-style: italic">#get and store the last modified date of the file</span>
<span style="color: #19177C">MODDATE</span><span style="color: #666666">=</span><span style="color: #BA2121">`</span>stat -f %m <span style="color: #19177C">$1</span><span style="color: #BA2121">`</span>

<span style="color: #408080; font-style: italic">#loop every 2 seconds</span>
<span style="color: #008000; font-weight: bold">while</span> <span style="color: #666666">[</span> <span style="color: #008000">true</span> <span style="color: #666666">]</span>
<span style="color: #008000; font-weight: bold">do</span>
        <span style="color: #408080; font-style: italic">#get the modified date</span>
        <span style="color: #19177C">TDATE</span><span style="color: #666666">=</span><span style="color: #BA2121">`</span>stat -f %m <span style="color: #19177C">$1</span><span style="color: #BA2121">`</span>

        <span style="color: #408080; font-style: italic">#check to see if it has changed</span>
        <span style="color: #008000; font-weight: bold">if</span> <span style="color: #666666">[</span> <span style="color: #BA2121">"$TDATE"</span> !<span style="color: #666666">=</span> <span style="color: #BA2121">"$MODDATE"</span> <span style="color: #666666">]</span>; <span style="color: #008000; font-weight: bold">then</span>
                <span style="color: #408080; font-style: italic">#file changed. Store new date</span>
                <span style="color: #19177C">MODDATE</span><span style="color: #666666">=</span><span style="color: #19177C">$TDATE</span>

                <span style="color: #408080; font-style: italic">#compile</span>
                compile <span style="color: #19177C">$1</span>
        <span style="color: #008000; font-weight: bold">fi</span>

        <span style="color: #408080; font-style: italic">#sleep until we check file again</span>
        sleep <span style="color: #19177C">$LOOP_INTERVAL</span>
<span style="color: #008000; font-weight: bold">done</span>
</pre>
</div>

&nbsp;

Using the script is easy, just pass in the name of the file you want it to compile:

`autocompile Foo.as`

The next script is called `as`. Basically, it takes the name of an ActionScript class file, generates the file from a template, opens it within a new project in TextMate, and automatically compiles the file when it is changed. This makes it very simple to setup a new project and start coding.

<div class="highlight">
  <pre><span style="color: #408080; font-style: italic">#!/bin/bash</span>

<span style="color: #408080; font-style: italic"># script for creating and setting up ActionScript projects in</span>
<span style="color: #408080; font-style: italic"># TextMate</span>
<span style="color: #408080; font-style: italic"># create by mike chambers</span>
<span style="color: #408080; font-style: italic"># http://www.mikechambers.com</span>

<span style="color: #408080; font-style: italic">#make sure that a file name was passed in</span>
<span style="color: #008000; font-weight: bold">if</span> <span style="color: #666666">[</span> -z <span style="color: #19177C">$1</span> <span style="color: #666666">]</span>;then
        <span style="color: #008000">echo</span> <span style="color: #BA2121">"You must specify a Class file name"</span>
        <span style="color: #008000">exit </span>0
<span style="color: #008000; font-weight: bold">fi</span>

<span style="color: #408080; font-style: italic">#get the class name (remove .as)</span>
<span style="color: #19177C">classname</span><span style="color: #666666">=</span><span style="color: #BA2121">`</span><span style="color: #008000">echo</span> <span style="color: #19177C">$1</span> | cut -d<span style="color: #BA2121">&#39;.&#39;</span> -f1<span style="color: #BA2121">`</span>

<span style="color: #408080; font-style: italic">#dir that contains the as.template file</span>
<span style="color: #408080; font-style: italic">#make sure to set this</span>
<span style="color: #408080; font-style: italic">#there should be a way to get this automatically</span>
<span style="color: #19177C">wdir</span><span style="color: #666666">=</span><span style="color: #BA2121">"/Users/mesh/bin/astmp"</span>

<span style="color: #408080; font-style: italic">#write the contents of the template to the class file.</span>
cat <span style="color: #19177C">$wdir</span>/as.template | sed s/CLASSNAME/<span style="color: #19177C">$classname</span>/ &gt; <span style="color: #19177C">$1</span>

<span style="color: #408080; font-style: italic">#open the current directory and file in textmate</span>
mate .

<span style="color: #408080; font-style: italic">#begin to autocompile it</span>
autocompile <span style="color: #19177C">$1</span>
</pre>
</div>

&nbsp;

This requires that the following *as.template* file is in the directory referenced in the script (in the `wdir` variable).

**as.template**

<div class="highlight">
  <pre>package
{
        <span style="color: #008000; font-weight: bold">import</span> flash.display.Sprite<span style="color: #666666">;</span>
        <span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">class</span> CLASSNAME <span style="color: #008000; font-weight: bold">extends</span> Sprite
        {
                <span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> CLASSNAME()
                {
                }
        }
}
</pre>
</div>

&nbsp;

In order to create the new project, create a new directory, `cd` to it and run the `as` command, passing in the name of the ActionScript class file you want it to create.

    mkdir Foo
    cd Foo
    as Foo.as

&nbsp;

This will create a new *File.as* file that contains the stub code for the `Foo` class. It will then open the *Foo.as* file in a new project in TextMate, and will compile the class anytime it changes (printing any compile errors and warnings to the terminal).

Note that I could automate the directory creation also, although I decided not to do that right now.

Couple of notes:

*   You must have the TextMate command line tools installed and in your path (TextMate > Help > Terminal Usage).
*   `as` and `autocompile` must be placed within your path.
*   You must update the `wdir` variable in the as script to point to the path where the as.template file is stored.
*   Make sure to set the `as` and `autocompile` script to be executable : chmod 755
*   The Flex SDK must be installed with the *bin* directory (that contains `mxmlc`) added to your path.

I also have the ActionScript 3 and Flex bundles installed within TextMate. I [setup my mm.cfg so that it writes trace statements and warnings to the flashlog.txt file][3], and then I open that file in the Console so I can view runtime debug info (you can also just `tail -f` the file in terminal). (You can open the console from the ActionScript 3 Bundle in TextMate : Bundles > ActionScript 3 > Debug > Open Flash Log in Console)

Finally, I modify the Run command for the file in TextMate to open the SWF in the standalone debug Flash player (which I have set to be the default handler for the swf file type). In order to do this, I just modified the ActionScript 3 Bundle Run command (CMD-R) to execute:

<div class="highlight">
  <pre><span style="color: #19177C">name</span><span style="color: #666666">=</span><span style="color: #BA2121">`</span><span style="color: #008000">echo</span> <span style="color: #19177C">$TM_FILEPATH</span> | cut -d<span style="color: #BA2121">&#39;.&#39;</span> -f1<span style="color: #BA2121">`</span>
open <span style="color: #19177C">$name</span>.swf
</pre>
</div>

&nbsp;

So, now as I type, I can see the errors as I make them, and can just hit CMD-R to test the SWF and see the runtime debug info in the console.

One additional thing I might do is to modify the `autocompile` script to play a sound when the compile fails.

Post any questions, suggestions or errors in the comments.

 [1]: http://macromates.com/
 [2]: http://flashalisious.com/2007/07/30/installing-as3-and-flex-bundle-for-textmate/
 [3]: http://blog.flexexamples.com/2007/08/26/debugging-flex-applications-with-mmcfg-and-flashlogtxt/