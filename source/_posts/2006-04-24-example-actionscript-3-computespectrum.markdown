---
title: 'Example : ActionScript 3 ComputeSpectrum'
author: mikechambers
date: 2006-04-24 12:56:01 -0800
layout: post
permalink: /2006/04/24/example-actionscript-3-computespectrum/
categories:
  - General
---


One of the cool new sound APIs in ActionScript 3, is the [SoundMixer.computeSpectrum API][1]. This allows you to get information about sounds currently playing within the player.

Andre Michelle put together [a nice example][2] that shows a visualization of the playing sound within the player. I tried to figure out the API from Andre Michelle&#8217;s example (some of it was over my head), but with some help from [Grant Skinner][3] at [FITC][4], I finally figured it out and put together a simple example that shows how to use the API.  
<!--more-->

  
[View the computeSpectrum Example][5] ([requires Flash Player 8.5 beta][6]).

Here is the code with comments.

`
<pre>
package
{
	import flash.display.Sprite;
	import flash.media.Sound;
	import flash.display.BitmapData;
	import flash.util.ByteArray;
	import flash.media.SoundMixer;
	import flash.events.Event;
	import flash.net.URLRequest;
	import flash.system.ApplicationDomain;
	
	public class SpectrumTest extends Sprite
	{
		private var bytes:ByteArray;
		private var CHANNEL_LENGTH:uint = 256;
		
		public function SpectrumTest()
		{
			var s:Sound = new Sound(new URLRequest("Helicopter.mp3"));
				s.play();

			bytes = new ByteArray();
			
			addEventListener( Event.ENTER_FRAME, onEnterFrame );
			
		}
		
		private function onEnterFrame( event: Event ): void
		{
			SoundMixer.computeSpectrum(bytes, true, 0);
			
			var smooth:Number;
			var value:Number;
			
			graphics.clear();
			
			//place in middle of screen
			var xVal:Number = (stage.stageHeight / 2);
			
			//evenly distribute
			var spacing:Number = (stage.stageWidth / CHANNEL_LENGTH);
			
			var color:Number;
			
			//first 256 is left channell, second 256 is right channell
			for(var i:int = 0; i < CHANNEL_LENGTH; i++)
			{
				//get the next byte
				value = bytes.readFloat();
				
				
				//normalize it to be a value between 0 and 256
				value = (value * CHANNEL_LENGTH) << 0;
				
				//figure out the color based on the value
				color = 0xFF0000|(value << 8);
				
				graphics.lineStyle(1, color, 1);
				
				graphics.beginFill(color);
				
				//draw the circle, position based on width and spectrum position
				//radius scaled down to fit better
				graphics.drawCircle(i * spacing, xVal, value / 8);
				
			}
		}
		
	}
}

</pre>
<p>`

Really cool stuff that opens up a ton of posibilities within Flash.

Update : 05/08/06 : I have added the example to the labs subversion repository, so you can always find the most up-to-date version [here][7].

 [1]: http://livedocs.macromedia.com/labs/1/flex/langref/flash/media/SoundMixer.html#computeSpectrum()
 [2]: http://blog.andre-michelle.com/2006/soundmixercomputespectrum/
 [3]: http://www.gskinner.com
 [4]: http://www.fitc.ca/event_detail.cfm?festival_id=5&display=introduction
 [5]: http://weblogs.macromedia.com/mesh/files/blogposts/as3_spectrum/
 [6]: http://www.macromedia.com/go/labs_flex2_downloads
 [7]: http://labs.adobe.com/svn/flashplatform/?/projects/actionscriptsamples/trunk/src/actionscript3/sound/ComputeSpectrum/