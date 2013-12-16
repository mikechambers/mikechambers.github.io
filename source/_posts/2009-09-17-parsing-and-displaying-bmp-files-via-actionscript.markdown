---
title: Parsing and displaying BMP files via ActionScript
author: mikechambers
date: 2009-09-17 12:29:01 -0800
layout: post
permalink: /2009/09/17/parsing-and-displaying-bmp-files-via-actionscript/
categories:
  - ActionScript
  - General
tags:
  - as3
  - bytearray
---


I dont have a formal computer science training / education, so I never got the chance to learn about working with low level data structures (bits and bytes). I have wanted to learn this for some time, but had difficulty finding resources for it which didnt assume I had a computer science degree.

Well, yesterday, FITC posted [all of the video sessions from FITC Toronto][1], and I spent some time watching Lee Brimelow&#8217;s presentation on working with ByteArrays. It is a really great session, that provides a clear and solid foundation and understanding of working with ByteArrays and bits and bytes.

Anyways, after watching Lee&#8217;s session, it all finally clicked for me, and I spent some time last night putting together a simple parser that would dynamically load and display a [24Bit BMP image file][2] within Flash.  
<!--more-->

  
I wanted to post the code below, along with complete comments, in order to provide a simple, real world example for anyone else interested in learning how to work with lower level file formats. 

The code requires Adobe AIR (so I can load the BMP directly). In order to convert to the Flash Player in the browser, just replace the File loading with FileReference.browse.

<div class="highlight">
  <pre>package
{
	<span style="color: #008000; font-weight: bold">import</span> flash.filesystem.File<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.filesystem.FileStream<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.filesystem.FileMode<span style="color: #666666">;</span>
	
	<span style="color: #008000; font-weight: bold">import</span> flash.display.Sprite<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.display.<span style="color: #008000">BitmapData</span><span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.display.Bitmap<span style="color: #666666">;</span>
	<span style="color: #008000; font-weight: bold">import</span> flash.utils.Endian<span style="color: #666666">;</span>
	
	<span style="color: #008000; font-weight: bold">import</span> flash.geom.<span style="color: #008000">Rectangle</span><span style="color: #666666">;</span>
	
	[SWF(width<span style="color: #666666">=</span><span style="color: #BA2121">&#39;550&#39;</span><span style="color: #666666">,</span> height<span style="color: #666666">=</span><span style="color: #BA2121">&#39;400&#39;</span><span style="color: #666666">,</span> backgroundColor<span style="color: #666666">=</span><span style="color: #BA2121">&#39;#FFFFFF&#39;</span><span style="color: #666666">,</span> frameRate<span style="color: #666666">=</span><span style="color: #BA2121">&#39;12&#39;</span>)]
	<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">class</span> BMPViewer <span style="color: #008000; font-weight: bold">extends</span> Sprite
	{
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">static</span> const MAGIC_NUMBER<span style="color: #666666">:</span><span style="color: #008000">String</span> <span style="color: #666666">=</span> <span style="color: #BA2121">"BM"</span><span style="color: #666666">;</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">static</span> const BMP_DATA_OFFSET_POSITION<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666"></span>xA<span style="color: #666666">;</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">static</span> const WIDTH_POSITION<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0x12;</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">static</span> const HEIGHT_POSITION<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0x16;</span>
		
		<span style="color: #008000; font-weight: bold">public</span> <span style="color: #008000; font-weight: bold">function</span> BMPViewer()
		{
			loadBMP();
			<span style="color: #008000; font-weight: bold">super</span>();
		}
		
		<span style="color: #408080; font-style: italic">/*</span>
<span style="color: #408080; font-style: italic">			Loads and reads a 24 Bit bitmap file.</span>
<span style="color: #408080; font-style: italic">			</span>
<span style="color: #408080; font-style: italic">			Based on BMP info from:</span>
<span style="color: #408080; font-style: italic">			http://en.wikipedia.org/wiki/BMP%5Ffile%5Fformat</span>
<span style="color: #408080; font-style: italic">		*/</span>
		<span style="color: #008000; font-weight: bold">private</span> <span style="color: #008000; font-weight: bold">function</span> loadBMP()<span style="color: #666666">:</span>void
		{
			<span style="color: #408080; font-style: italic">//Load BMP. This requires AIR.</span>
			<span style="color: #408080; font-style: italic">//Use FileReference.browse for</span>
			<span style="color: #408080; font-style: italic">//Flash Player</span>
			<span style="color: #008000; font-weight: bold">var</span> bmpFile<span style="color: #666666">:</span>File <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> File(<span style="color: #BA2121">"app:/image.bmp"</span>);
			<span style="color: #008000; font-weight: bold">var</span> fs<span style="color: #666666">:</span>FileStream <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> FileStream();
			
			<span style="color: #408080; font-style: italic">//BMP files are Little Endian, which means their</span>
			<span style="color: #408080; font-style: italic">//least significant byte is first (right to left)</span>
			fs.endian <span style="color: #666666">=</span> Endian.LITTLE_ENDIAN<span style="color: #666666">;</span>
			
			<span style="color: #408080; font-style: italic">//open the file in READ mode</span>
			fs.open(bmpFile<span style="color: #666666">,</span> FileMode.READ);
			
			<span style="color: #408080; font-style: italic">//check the first two bytes to make sure</span>
			<span style="color: #408080; font-style: italic">//it is a valid BMP file</span>
			<span style="color: #008000; font-weight: bold">if</span>(fs.readUTFBytes(<span style="color: #666666">2</span>) <span style="color: #666666">!=</span> MAGIC_NUMBER)
			{
				<span style="color: #0000FF">trace</span>(<span style="color: #BA2121">"FAIL : NOT A BMP FILE"</span>);
				
				<span style="color: #408080; font-style: italic">//not a BMP file, close steam</span>
				<span style="color: #408080; font-style: italic">//and exit</span>
				fs.close();
				<span style="color: #008000; font-weight: bold">return</span><span style="color: #666666">;</span>
			}
			
			<span style="color: #408080; font-style: italic">//note, we could also grab the length from the </span>
			<span style="color: #408080; font-style: italic">//header and make sure the file was the correct</span>
			<span style="color: #408080; font-style: italic">//length</span>
			
			<span style="color: #408080; font-style: italic">//change the cursors position to the point</span>
			<span style="color: #408080; font-style: italic">//in the header that contains the value / offset</span>
			<span style="color: #408080; font-style: italic">//of where the actual bitmap data begins</span>
			<span style="color: #408080; font-style: italic">//read in the 4 Bytes that contain the value</span>
			fs.position <span style="color: #666666">=</span> BMP_DATA_OFFSET_POSITION<span style="color: #666666">;</span>
			<span style="color: #008000; font-weight: bold">var</span> dataPosition<span style="color: #666666">:</span>int <span style="color: #666666">=</span> fs.readInt();

			<span style="color: #408080; font-style: italic">//set cursor position to where the BMP</span>
			<span style="color: #408080; font-style: italic">//width is stored</span>
			fs.position <span style="color: #666666">=</span> WIDTH_POSITION<span style="color: #666666">;</span>
			
			<span style="color: #408080; font-style: italic">//read in the 4 Bytes that contain the width</span>
			<span style="color: #008000; font-weight: bold">var</span> bmpWidth<span style="color: #666666">:</span>int <span style="color: #666666">=</span> fs.readInt();
			
			<span style="color: #408080; font-style: italic">//read in the 4 Bytes that contain the height</span>
			<span style="color: #008000; font-weight: bold">var</span> bmpHeight<span style="color: #666666">:</span>int <span style="color: #666666">=</span> fs.readInt();
			
			<span style="color: #408080; font-style: italic">//set cursor to where the BMP pixel data begins</span>
			fs.position <span style="color: #666666">=</span> dataPosition<span style="color: #666666">;</span>
			
			<span style="color: #008000; font-weight: bold">var</span> row<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span>
			<span style="color: #008000; font-weight: bold">var</span> column<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span>
			
			<span style="color: #408080; font-style: italic">//every row length in a BMP file must bee a multiple</span>
			<span style="color: #408080; font-style: italic">//of 4 (see the spec). So, we need to determine how much</span>
			<span style="color: #408080; font-style: italic">//padding we need to add at the end of each line. </span>
			<span style="color: #008000; font-weight: bold">var</span> padding<span style="color: #666666">:</span>int <span style="color: #666666">=</span> (bmpWidth <span style="color: #666666">%</span> <span style="color: #666666">4</span>);
				
			<span style="color: #408080; font-style: italic">//create a fixed length Vector to store the pixel</span>
			<span style="color: #408080; font-style: italic">//values as we read them.</span>
			<span style="color: #008000; font-weight: bold">var</span> pixels<span style="color: #666666">:</span>Vector.<span style="color: #666666">&lt;</span>uint<span style="color: #666666">&gt;</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Vector.<span style="color: #666666">&lt;</span>uint<span style="color: #666666">&gt;</span>(bmpWidth <span style="color: #666666">*</span> bmpHeight<span style="color: #666666">,</span> <span style="color: #008000; font-weight: bold">true</span>);

			<span style="color: #408080; font-style: italic">//loop through data (rows and columns)</span>
			<span style="color: #408080; font-style: italic">//note that data stored in BMP is backwards to Flash and is</span>
			<span style="color: #408080; font-style: italic">//stored from bottom row up, not top row down.</span>
			<span style="color: #408080; font-style: italic">//So we have to loop backwards</span>
			<span style="color: #008000; font-weight: bold">var</span> counter<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span>
			<span style="color: #008000; font-weight: bold">for</span>(<span style="color: #008000; font-weight: bold">var</span> i<span style="color: #666666">:</span>int <span style="color: #666666">=</span> bmpHeight<span style="color: #666666">;</span> i <span style="color: #666666">&gt;</span> <span style="color: #666666">0;</span> i<span style="color: #666666">--</span>)
			{
				<span style="color: #008000; font-weight: bold">for</span>(<span style="color: #008000; font-weight: bold">var</span> k<span style="color: #666666">:</span>int <span style="color: #666666">=</span> <span style="color: #666666">0;</span> k <span style="color: #666666">&lt;</span> bmpWidth<span style="color: #666666">;</span> k<span style="color: #666666">++</span>)
				{
					
					
					<span style="color: #008000; font-weight: bold">var</span> position<span style="color: #666666">:</span>int <span style="color: #666666">=</span> ((i <span style="color: #666666">-</span> <span style="color: #666666">1</span>) <span style="color: #666666">*</span> bmpWidth) <span style="color: #666666">+</span> k<span style="color: #666666">;</span>
					<span style="color: #408080; font-style: italic">/*</span>
<span style="color: #408080; font-style: italic">						This is the original code that I had which works fine</span>
<span style="color: #408080; font-style: italic">						but is not as effecient as what I have now.</span>
<span style="color: #408080; font-style: italic">						</span>
<span style="color: #408080; font-style: italic">						Basically, Pixels are stored within 3 sucessive Bytes</span>
<span style="color: #408080; font-style: italic">						in a BMP file, with one Byte each for Blue, Green and</span>
<span style="color: #408080; font-style: italic">						Red values (in that order).</span>
<span style="color: #408080; font-style: italic">						</span>
<span style="color: #408080; font-style: italic">						So, this reads the Bytes for each pixel, one at a time</span>
<span style="color: #408080; font-style: italic">						and then combines them into a single value which is</span>
<span style="color: #408080; font-style: italic">						the combined RGB pixel value.</span>
<span style="color: #408080; font-style: italic">						</span>
<span style="color: #408080; font-style: italic">						I left the code as I think it make it a little easier to</span>
<span style="color: #408080; font-style: italic">						understand what is going on, as well as how some of these</span>
<span style="color: #408080; font-style: italic">						calls can be optimized.</span>
<span style="color: #408080; font-style: italic">					*/</span>
					
					<span style="color: #408080; font-style: italic">/*</span>
<span style="color: #408080; font-style: italic">					var blue:int = fs.readUnsignedByte();</span>
<span style="color: #408080; font-style: italic">					var green:int = fs.readUnsignedByte();</span>
<span style="color: #408080; font-style: italic">					var red:int = fs.readUnsignedByte();</span>
<span style="color: #408080; font-style: italic">					</span>
<span style="color: #408080; font-style: italic">					pixels[position] = (red &lt;&lt; 16 ^ green &lt;&lt; 8 ^ blue);</span>
<span style="color: #408080; font-style: italic">					*/</span>

					
					<span style="color: #408080; font-style: italic">/*</span>
<span style="color: #408080; font-style: italic">						Here is the final code which is more efficient, as it only</span>
<span style="color: #408080; font-style: italic">						needs to make 2 read calls in order to get the values.</span>
<span style="color: #408080; font-style: italic">						</span>
<span style="color: #408080; font-style: italic">						Thanks to Thibault Imbert (bytearray.org) for pointing out</span>
<span style="color: #408080; font-style: italic">						and helping me understand the optimization.</span>
<span style="color: #408080; font-style: italic">					*/</span>
					
					<span style="color: #408080; font-style: italic">//bytes in file are in Blue, Green, Red order</span>
					<span style="color: #408080; font-style: italic">//int is 32 bits (8 bytes). So, we store the first two bytes of the pixel</span>
					<span style="color: #408080; font-style: italic">// (which contain the Red value), and</span>
					<span style="color: #408080; font-style: italic">//then shift everything over 1 byte (8bits) to make room for</span>
					<span style="color: #408080; font-style: italic">//the green and blue values (remember the file is little endian), which we</span>
					<span style="color: #408080; font-style: italic">// then write into the int in the right position</span>
					<span style="color: #408080; font-style: italic">//The final value has the colors in the correct order (Red, Green, Blue)</span>
										
					<span style="color: #008000; font-weight: bold">var</span> pixelValue<span style="color: #666666">:</span>uint <span style="color: #666666">=</span> fs.readUnsignedByte() <span style="color: #666666">|</span> fs.readUnsignedShort() <span style="color: #666666">&lt;&lt;</span> <span style="color: #666666">8;</span>
					pixels[position] <span style="color: #666666">=</span> pixelValue<span style="color: #666666">;</span>
				}
				
				<span style="color: #408080; font-style: italic">//we are at the end of the row, so now we have to move the cursor</span>
				<span style="color: #408080; font-style: italic">//forward so it ends on a multiple of 4</span>
				<span style="color: #008000; font-weight: bold">if</span>(padding)
				{
					fs.position <span style="color: #666666">+=</span> padding<span style="color: #666666">;</span>
				}
			}
			
			<span style="color: #408080; font-style: italic">//done reading file, close stream.</span>
			fs.close();
			
			<span style="color: #408080; font-style: italic">//create a Rectangle with width / height of Bitmap</span>
			<span style="color: #008000; font-weight: bold">var</span> rect<span style="color: #666666">:</span><span style="color: #008000">Rectangle</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">Rectangle</span>(<span style="color: #666666">0,</span> <span style="color: #666666">0,</span> bmpWidth<span style="color: #666666">,</span> bmpHeight);
			
			<span style="color: #408080; font-style: italic">//create the BitmapData object to hold hold the BMP data.</span>
			<span style="color: #408080; font-style: italic">//we do a red fill here so it is easier to see if we have any errors</span>
			<span style="color: #408080; font-style: italic">//in our code</span>
			<span style="color: #008000; font-weight: bold">var</span> bmpData<span style="color: #666666">:</span><span style="color: #008000">BitmapData</span> <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> <span style="color: #008000">BitmapData</span>(bmpWidth<span style="color: #666666">,</span> bmpHeight<span style="color: #666666">,</span> <span style="color: #008000; font-weight: bold">false</span><span style="color: #666666">,</span> <span style="color: #666666"></span>xFF0000);
			
			<span style="color: #408080; font-style: italic">//copy the BMP pixel data into the BitmapData</span>
			bmpData.setVector(rect<span style="color: #666666">,</span> pixels);
			
			<span style="color: #408080; font-style: italic">//create a new Bitmap instance using the BitmapData</span>
			<span style="color: #008000; font-weight: bold">var</span> bitmap<span style="color: #666666">:</span>Bitmap <span style="color: #666666">=</span> <span style="color: #008000; font-weight: bold">new</span> Bitmap(bmpData);
			bitmap.x <span style="color: #666666">=</span> <span style="color: #666666">10;</span>
			bitmap.y <span style="color: #666666">=</span> <span style="color: #666666">10;</span>
					
			<span style="color: #408080; font-style: italic">//add Bitmap to the display list</span>
			addChild(bitmap);
		}
	}
}
</pre>
</div>

&nbsp;

You can download the example from [here][3].

Thanks to [Lee][4] for his presentation, and [Thibault Imber][5]t who helped me understand some of the details around endianes, as well as made some suggestions for optimizations.

If you are interested in learning more, I strong suggest watching L[ee&#8217;s FITC Presentation][1].

 [1]: http://www.fitc.ca/media/
 [2]: http://en.wikipedia.org/wiki/BMP%5Ffile%5Fformat
 [3]: /blog/files/examples/BMPViewer.zip
 [4]: http://www.theflashblog.com
 [5]: http://www.bytearray.org