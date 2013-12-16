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

Well, yesterday, FITC posted [all of the video sessions from FITC Toronto][1], and I spent some time watching Lee Brimelow's presentation on working with ByteArrays. It is a really great session, that provides a clear and solid foundation and understanding of working with ByteArrays and bits and bytes.

Anyways, after watching Lee's session, it all finally clicked for me, and I spent some time last night putting together a simple parser that would dynamically load and display a [24Bit BMP image file][2] within Flash.  
<!--more-->

  
I wanted to post the code below, along with complete comments, in order to provide a simple, real world example for anyone else interested in learning how to work with lower level file formats. 

The code requires Adobe AIR (so I can load the BMP directly). In order to convert to the Flash Player in the browser, just replace the File loading with FileReference.browse.

``` actionscript
package
{
	import flash.filesystem.File;
	import flash.filesystem.FileStream;
	import flash.filesystem.FileMode;
	
	import flash.display.Sprite;
	import flash.display.BitmapData;
	import flash.display.Bitmap;
	import flash.utils.Endian;
	
	import flash.geom.Rectangle;
	
	[SWF(width='550', height='400', backgroundColor='#FFFFFF', frameRate='12')]
	public class BMPViewer extends Sprite
	{
		private static const MAGIC_NUMBER:String = "BM";
		private static const BMP_DATA_OFFSET_POSITION:int = 0xA;
		private static const WIDTH_POSITION:int = 0x12;
		private static const HEIGHT_POSITION:int = 0x16;
		
		public function BMPViewer()
		{
			loadBMP();
			super();
		}
		
		/*
			Loads and reads a 24 Bit bitmap file.
			
			Based on BMP info from:
			http://en.wikipedia.org/wiki/BMP%5Ffile%5Fformat
		*/
		private function loadBMP():void
		{
			//Load BMP. This requires AIR.
			//Use FileReference.browse for
			//Flash Player
			var bmpFile:File = new File("app:/image.bmp");
			var fs:FileStream = new FileStream();
			
			//BMP files are Little Endian, which means their
			//least significant byte is first (right to left)
			fs.endian = Endian.LITTLE_ENDIAN;
			
			//open the file in READ mode
			fs.open(bmpFile, FileMode.READ);
			
			//check the first two bytes to make sure
			//it is a valid BMP file
			if(fs.readUTFBytes(2) != MAGIC_NUMBER)
			{
				trace("FAIL : NOT A BMP FILE");
				
				//not a BMP file, close steam
				//and exit
				fs.close();
				return;
			}
			
			//note, we could also grab the length from the 
			//header and make sure the file was the correct
			//length
			
			//change the cursors position to the point
			//in the header that contains the value / offset
			//of where the actual bitmap data begins
			//read in the 4 Bytes that contain the value
			fs.position = BMP_DATA_OFFSET_POSITION;
			var dataPosition:int = fs.readInt();

			//set cursor position to where the BMP
			//width is stored
			fs.position = WIDTH_POSITION;
			
			//read in the 4 Bytes that contain the width
			var bmpWidth:int = fs.readInt();
			
			//read in the 4 Bytes that contain the height
			var bmpHeight:int = fs.readInt();
			
			//set cursor to where the BMP pixel data begins
			fs.position = dataPosition;
			
			var row:int = 0;
			var column:int = 0;
			
			//every row length in a BMP file must bee a multiple
			//of 4 (see the spec). So, we need to determine how much
			//padding we need to add at the end of each line. 
			var padding:int = (bmpWidth % 4);
				
			//create a fixed length Vector to store the pixel
			//values as we read them.
			var pixels:Vector.<uint> = new Vector.<uint>(bmpWidth * bmpHeight, true);

			//loop through data (rows and columns)
			//note that data stored in BMP is backwards to Flash and is
			//stored from bottom row up, not top row down.
			//So we have to loop backwards
			var counter:int = 0;
			for(var i:int = bmpHeight; i > 0; i--)
			{
				for(var k:int = 0; k < bmpWidth; k++)
				{
					
					
					var position:int = ((i - 1) * bmpWidth) + k;
					/*
						This is the original code that I had which works fine
						but is not as effecient as what I have now.
						
						Basically, Pixels are stored within 3 sucessive Bytes
						in a BMP file, with one Byte each for Blue, Green and
						Red values (in that order).
						
						So, this reads the Bytes for each pixel, one at a time
						and then combines them into a single value which is
						the combined RGB pixel value.
						
						I left the code as I think it make it a little easier to
						understand what is going on, as well as how some of these
						calls can be optimized.
					*/
					
					/*
					var blue:int = fs.readUnsignedByte();
					var green:int = fs.readUnsignedByte();
					var red:int = fs.readUnsignedByte();
					
					pixels[position] = (red << 16 ^ green << 8 ^ blue);
					*/

					
					/*
						Here is the final code which is more efficient, as it only
						needs to make 2 read calls in order to get the values.
						
						Thanks to Thibault Imbert (bytearray.org) for pointing out
						and helping me understand the optimization.
					*/
					
					//bytes in file are in Blue, Green, Red order
					//int is 32 bits (8 bytes). So, we store the first two bytes of the pixel
					// (which contain the Red value), and
					//then shift everything over 1 byte (8bits) to make room for
					//the green and blue values (remember the file is little endian), which we
					// then write into the int in the right position
					//The final value has the colors in the correct order (Red, Green, Blue)
										
					var pixelValue:uint = fs.readUnsignedByte() | fs.readUnsignedShort() << 8;
					pixels[position] = pixelValue;
				}
				
				//we are at the end of the row, so now we have to move the cursor
				//forward so it ends on a multiple of 4
				if(padding)
				{
					fs.position += padding;
				}
			}
			
			//done reading file, close stream.
			fs.close();
			
			//create a Rectangle with width / height of Bitmap
			var rect:Rectangle = new Rectangle(0, 0, bmpWidth, bmpHeight);
			
			//create the BitmapData object to hold hold the BMP data.
			//we do a red fill here so it is easier to see if we have any errors
			//in our code
			var bmpData:BitmapData = new BitmapData(bmpWidth, bmpHeight, false, 0xFF0000);
			
			//copy the BMP pixel data into the BitmapData
			bmpData.setVector(rect, pixels);
			
			//create a new Bitmap instance using the BitmapData
			var bitmap:Bitmap = new Bitmap(bmpData);
			bitmap.x = 10;
			bitmap.y = 10;
					
			//add Bitmap to the display list
			addChild(bitmap);
		}
	}
}
```

You can download the example from [here][3].

Thanks to [Lee][4] for his presentation, and [Thibault Imber][5]t who helped me understand some of the details around endianes, as well as made some suggestions for optimizations.

If you are interested in learning more, I strong suggest watching [Lee's FITC Presentation][1].

 [1]: http://www.fitc.ca/media/
 [2]: http://en.wikipedia.org/wiki/BMP%5Ffile%5Fformat
 [3]: /blog/files/examples/BMPViewer.zip
 [4]: http://www.theflashblog.com
 [5]: http://www.bytearray.org