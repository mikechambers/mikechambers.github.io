---
title: stringUtils.as
author: mikechambers
date: 2002-05-14 12:18:01 -0800
layout: post
permalink: /2002/05/14/stringutilsas/
categories:
  - General
---


Simple library that adds useful methods to the String object. You can view the documentation [here][1]. This is provided as is, but please post any errors, corrections or suggestions in the comments below.
<PRE>/*<BR />String Utility Component version 1.5</PRE>

<PRE>Mike Chambers</PRE>

<PRE>thanks to Branden Hall, Ben Glazer, Christian Cantrell, Nik Schramm<BR />*/</PRE>

<PRE>/*<BR />&nbsp;This allows user to check from other include files whether or not the stringUtils<BR />&nbsp;library has been included.</PRE>

<PRE>&nbsp;Example:</PRE>

<PRE>&nbsp;if(!String.stringUtilsDefined)<BR />&nbsp;{<BR />&nbsp;&nbsp;trace(&#8220;stringUtils.as not found&#8221;);<BR />&nbsp;}<BR />*/<BR />String.prototype.constructor.stringUtilsDefined = true;<BR />String.prototype.constructor.stringUtilsVersion = 1.5;</PRE>

<PRE>/**<BR />*&nbsp;This methods trims all of the white space from the left side of a String.<BR />*/<BR />String.prototype.ltrim = function()<BR />{</PRE>

<PRE>&nbsp;var size = this.length;<BR />&nbsp;for(var i = 0; i &lt; size; i++)<BR />&nbsp;{<BR />&nbsp;&nbsp;if(this.charCodeAt(i) &gt; 32)<BR />&nbsp;&nbsp;{<BR />&nbsp;&nbsp;&nbsp;return this.substring(i);<BR />&nbsp;&nbsp;}<BR />&nbsp;}<BR />&nbsp;return &#8220;&#8221;;</PRE>

<PRE>}</PRE>

<PRE>/**<BR />*&nbsp;This methods trims all of the white space from the right side of a String.<BR />*/<BR />String.prototype.rtrim = function()<BR />{<BR />&nbsp;var size = this.length;<BR />&nbsp;for(var i = size; i &gt; 0; i&#8211;)<BR />&nbsp;{<BR />&nbsp;&nbsp;if(this.charCodeAt(i) &gt; 32)<BR />&nbsp;&nbsp;{<BR />&nbsp;&nbsp;&nbsp;return this.substring(0, i + 1);<BR />&nbsp;&nbsp;}<BR />&nbsp;}<BR />&nbsp;return &#8220;&#8221;;<BR />}</PRE>

<PRE>/**<BR />*&nbsp;This methods trims all of the white space from both sides of a String.<BR />*/<BR />String.prototype.trim = function()<BR />{<BR />&nbsp;return this.rtrim().ltrim();<BR />}</PRE>

<PRE>/**<BR />*&nbsp;This methods returns true if the String begins with the string passed into<BR />*&nbsp;the method. Otherwise, it returns false.<BR />*/</PRE>

<PRE>String.prototype.beginsWith = function(s) {<BR />&nbsp;return (s == this.substring(0, s.length));<BR />};</PRE>

<PRE>/**<BR />*&nbsp;This methods returns true if the String ends with the string passed into<BR />*&nbsp;the method. Otherwise, it returns false.<BR />*/<BR />String.prototype.endsWith = function(s) {<BR />&nbsp;return (s == this.substring(this.length &#8211; s.length));<BR />};</PRE>

<PRE>&nbsp;</PRE>

<PRE><BR />String.prototype.remove = function(remove)<BR />{<BR />&nbsp;return this.replace(remove, &#8220;&#8221;);<BR />}</PRE>

<PRE>String.prototype.replace = function(replace, replaceWith)<BR />{<BR />&nbsp;sb = new String();<BR />&nbsp;&nbsp;found = false;<BR />&nbsp;for (var i = 0; i &lt; this.length; i++)<BR />&nbsp;&nbsp;&nbsp; {<BR />&nbsp;&nbsp;&nbsp; &nbsp;if(this.charAt(i) == replace.charAt(0))<BR />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {&nbsp;&nbsp;&nbsp;<BR />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;found = true;<BR />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; for(var j = 0; j &lt; replace.length; j++)<BR />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {<BR />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;if(!(this.charAt(i + j) == replace.charAt(j)))<BR />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {<BR />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;found = false;<BR />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; break;<BR />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<BR />&nbsp;&nbsp;&nbsp;}<BR />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if(found)<BR />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {<BR />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;sb += replaceWith;<BR />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; i = i + (replace.length &#8211; 1);<BR />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; continue;<BR />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<BR />&nbsp;&nbsp;}<BR />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sb += this.charAt(i);<BR />&nbsp;}<BR />&nbsp;&nbsp;&nbsp; return sb;<BR />}<BR /></PRE>

 [1]: /mesh/files/stringutils/