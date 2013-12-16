---
title: 'Dynamic Drawing with Flash MX : Robert Penner'
author: mikechambers
date: 2002-07-11 12:11:01 -0800
layout: post
permalink: /2002/07/11/dynamic-drawing-with-flash-mx-robert-penner/
categories:
  - Conferences
---


The slides for this presentation are [online][1].  
Robert started off by showing off some of the Flash drawing experiments that have been done by the flash community (all to the tune of &#8220;Christmas on acid&#8221;).  
(btw, the room is packed).  
Shape Drawing API  
Every shape that you draw will be within a movie clip.  
MovieClip.lineTo() : draws a line. initially it is invisble, so you need to use lineStyle to give it a color. starts at 0,0 coordinate of movie clip that it is contained within.  
MovieClip.moveTo : moves the drawing point to a new position. does not do anything visible.  
MovieClip.curveTo : draws curves. takes 4 numbers, two for each curve. control and anchors. anhors are where they end up, and control influences the curve. curves toward control points, but doesn&#8217;t touch it.  
MovieClip.beginFill : for creating solid shapes.  
MovieClip.endFill :  
If you are not at the starting point, then the final side will automatically be drawn to the starting point. you can then remove the line style (leave it empty), and it will remove the last line.  
MovieClip.beginGradientFill : for dynamically creating gradient fills.  
MovieClip.clear : will clear all drawings within movieclip. it resets drawing properties (such as linestyle).  
framebased, use onEnterFrame event. First step is clear graphics from previous frame, and then draw. repeat. (try putting a lot of values set by random()).  
showing more cool drawing api examples. (a bunch of 3d wireframe worlds by glenn thomas, a cad like drawing program, sam wan&#8217;s mysterons, ).  
extending drawing API.  
MovieClip.drawLine() (see robert&#8217;s site for notes / example code). takes a starting and ending corrdinate and draws a line.  
showing a bunch of other custom drawing functions (triangles).  
note, i had to leave early (halfway though).

 [1]: http://www.robertpenner.com/presentations