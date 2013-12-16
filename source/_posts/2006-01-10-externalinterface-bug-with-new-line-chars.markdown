---
title: ExternalInterface Bug with new line chars
author: mikechambers
date: 2006-01-10 12:36:01 -0800
layout: post
permalink: /2006/01/10/externalinterface-bug-with-new-line-chars/
categories:
  - General
---


A couple of days ago I ran into a bug with ExternalInterface which caused me quite a hassle (a couple of [people][1] ran into it before I did). I finally figured it out, and wanted to post here in case anyone else runs into it.  
<!--more-->

  
Basically, if the data being passed from JavaScript to ActionScript or ActionScript to JavaScript via ExternalInterface contains any line returns (\n) then the string is not serialized correctly, and the call will fail (you will probably see a JavaScript error). This affects both Flash Player 8, and the [Flash Player 8.5 alpha][2].

The issue has been logged and is being looked at it. Luckily, there is a simple workaround, which is to manually escape the line returns by replace \n with \\n.

Here is how to do it in ActionScript 3:

<pre>var data:String = stringToPass.replace(/\n/g, "\\n" );</pre>

and here is how to do it in ActionScript 2:

<pre>function escapeLineReturns(s:String):String
{
    trace("a");
    var len:Number = s.length;
    var sb = "";
    
    var c;
    for(var i:Number = 0; i &lt; len; i++)
    {
        c = s.charAt(i);
        if(c == "\n")
        {
            sb += "\\n";
        }
        else
        {
            sb += c;
        }
    }
    
    trace("r : " + sb);
    return sb;
}

var data:String = escapeLineReturns(stringToPass);</pre>

On the JavaScript side you can basically use the same solution as in ActionScript 3.0:

<pre>var data = stringToPass.replace(/\n/g, "\\n" );</pre>

 [1]: http://codinginparadise.org/weblog/2005/12/serious-bug-in-flash-8.html
 [2]: http://labs.macromedia.com/technologies/flashplayer8_5/