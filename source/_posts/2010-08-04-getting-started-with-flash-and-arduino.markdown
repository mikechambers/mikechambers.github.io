---
title: Getting Started with Flash and Arduino
author: mikechambers
date: 2010-08-04 12:01:01 -0800
layout: post
permalink: /2010/08/04/getting-started-with-flash-and-arduino/
categories:
  - General
tags:
  - actionscript
  - arduino
  - flash
  - physical computing
  - tutorial
---


In this post, I will show how to setup your development environment and started developing Flash projects that integrate with the [Arduino][1] electronic platform.

So, what is Arduino? From the website:  
<!--more-->

> Arduino is an open-source electronics prototyping platform based on flexible, easy-to-use hardware and software. It's intended for artists, designers, hobbyists, and anyone interested in creating interactive objects or environments.

Basically, the Arduino can be a bridge from the computer to the physical world, allowing developers and artist to both read input from sensors, as well as output from the computer to the physical world. 

The design of the Arduino board is open source, which among other things, means that there are a lot of options for both the main board, as well as add-ons. Take a look at the Arduino sections at [Adafruit][2] and [SparkFun.com][3] to get an idea of the type of add-ons / shields that have already been created.

For this tutorial, we will cover how to:

1.  Set up Arduino and make sure it is connected correctly.
2.  Install and configure a proxy program so Flash can communicate with the Arduino.
3.  Build a simple Flash application that blinks an LED on the Arduino.

Once we are finished with the tutorial, you will be all setup to begin working on real world Flash / Arduino projects.

**What you will need**

1.  An Arduino Main Board: These are pretty cheap ($20 - $30) and you can pick them up tons of places (I recommend [AdaFruit][4] and [Sparkfun][5]). If you are just getting started with basic electronics, you may want to consider picking up a starter kit ([AdaFruit][6], [SparkFun][7]). The most current version is the [Arduino Duemilanove with Atmega328][8] which I will be using. Make sure that you get the appropriate USB cable if it is not included with your Arduino.
2.  Arduino software and drivers for your platform: You can grab these from the [Arduino downloads page][9]. I will be using the Arduino 0018 download on Mac.
3.  TinkerProxy. [TinkerProxy][10] is a small local proxy that acts as a bridge between the serial port and Flash (via a socket server). This allows Flash to communicate with the Arduino.
4.  Editor for writing ActionScript code. You can use any editor such as Flash Authoring, Flash Builder, FDT, etc...
5.  Flash / ActionScript compiler. Finally, you will need a way to compile your ActionScript. Again, this could be anything that can compile ActionScript 3, such as Flash Builder, Flash Authoring, etc... I will be using the MXMLC command line compiler from the open source Flex 4 SDK.

You can download and view all of the code from this article from [my GitHub examples repository][11].

**Installing Arduino**

First, we need to install the Arduino software and drivers. The Arduino site has very good [platform specific getting started articles][12], so I am not going to try and reproduce them here.

Following the instructions for your specific platform, and once your Arduino is setup and working, come back here:

*   [Windows][13]
*   [Mac OS X][14]
*   [Linux][15]

If you run into any issues, make sure that you check out the [troubleshooting document][16].

**Setting up TinkerProxy**

Now that you have your Arduino set up and working, we are ready to install a local proxy application that will bridge the communication between Flash and the Arduino. There are a [number of possible proxies][17] for this, but for this article, we will be using [TinkerProxy](). This is an open source port of *serproxy* and has good support for Flash.

Download the most recent version of TinkerProxy from the project's [download page][18]. I am using the 2.0 release from March 2009. 

Once you have downloaded it, unzip the file. This will create a directory named *tinkerproxy-2_0*. Move this directory to where you want to keep it. On my system, I put it at *~/bin/tinkerproxy*. If you like, you can add this directory to your system's path, which will allow you to start TinkerProxy from anywhere.

Open up the tinkerproxy directory in your file manager. You should see 3 files:

*   serproxy.cfg : configuration file
*   serproxy.exe : windows executable
*   serproxy.osx : mac executable

If you are on Mac, rename the *serproxy.cfg* file to *serproxy.osx.cfg*. (Im not sure if you need to rename it on Windows).

Open the configuration file (*serproxy.osx.cfg*) in a text editor so we can make a couple of changes.

First, find the line that looks like this:

`serial_device1=/dev/tty.usbserial-A6004osh`

You need to update this to the serial port that the Arduino is connected to. You can do this 2 ways.

The easiest way is to open up the Arduino development environment (make sure the Arduino is connected), and find the entry in *Arduino > Tools > Serial Port*.

You can also run the following command : `ls -l /dev/` and find the Arduino entry there (it will be the *usbserial* entry).

Once you have found the correct serial port, update the configuration file with the information.

`serial_device1=/dev/cu.usbserial-A700dZgM`

Next, we need to specify which comm port the Arduino is associated with. (This is usually comm port 3 on Windows). For the mac, just change the comm_ports entry like so:

`comm_ports=1`

Next, change the *comm_baud* setting to 9600.

`comm_baud=9600`

This is the speed that Arduino and TinkerProxy communicate (9600 bytes a second). You can set this at a higher level but it is good to start out low in order to ensure that any issues are not due to the baud rate. 

Finally, we need to update the *net_port* setting. Comment out all of the net_port* entries, except for *net_port1*. For its value, set the port that you want the proxy to listen on.

`net_port1=5331`

Here is what my entire *serproxy.osx.cfg* proxy looks like:

``` bash
# Config file for serproxy
# See serproxy's README file for documentation

# Transform newlines coming from the serial port into nils
# true (e.g. if using Flash) or false
newlines_to_nils=false

# on a mac you will need to add this
serial_device1=/dev/cu.usbserial-A700dZgM

# Comm ports used
comm_ports=1

# Default settings
comm_baud=9600
comm_databits=8
comm_stopbits=1
comm_parity=none

# Idle time out in seconds
timeout=300

# Port 1 settings (ttyS0)
net_port1=5331

# Port 2 settings (ttyS1)
#net_port2=5332

# Port 3 settings (ttyS2)
#net_port3=5333

# Port 4 settings (ttyS3)
#net_port4=5334
```

Once you have made the changes, save the file and close it.

We are now ready to start TinkerProxy. Make sure that the Arduino is still connected to your computer.

Open up the terminal, and change to the directory where TinkerProxy is installed. Run the following command:

`./serproxy.osx`

You should see the following output:

```
Serproxy 0.2.0 - Tinker.it 
Based on code by (C)1999 Stefano Busti, (C)2005 David A. Mellis

Waiting for clients
```

If you see this, then you are all set. If you get an error, double check your configuration file, and make sure you are in the directory where [serproxy.osx]() is located. 

**Code**

We are finally ready to write some code. For this tutorial, we have Flash control an LED on the Arduino, and have the Arduino send status messages back to Flash. 

We need to write two pieces of code. First, we need to write code that will be loaded and run on the Arduino. This will control the hardware, and listen for and respond to messages from Flash. We then need to write some Flash / ActionScript code that will send and received commands to and from the Arduino.

**Arduino Code**

Lets write the Arduino code first.

Open up the Arduino application, and create a new file called *FlashBlink.pde*. Type the code below into the editor:

``` javascript
/*
	Simple example that controls the blinking of the LED
	connected to digital PIN 13.

	Created by Mike Chambers

	http://www.mikechambers.com

	You can hook up an external LED by connecting an LED
	to PIN 13 and GND (make sure that the anode (long leg) is
	connected to PING 13 and the cathode (short leg) is connected
	to GND.

	The on board LED is also connected to PIN 13, and will
	be controlled by this program.

	Example is released under the following license:

	The MIT License

	Copyright (c) 2010 Mike Chambers

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/


//The digital pin that the LED is connected to
#define LED_PIN 13

//incoming command to toggle LED blinking state
#define TOGGLE_LED_STATE 't'

#define EOL_DELIMITER "\n"

//int to hold incoming byte when we read it
int incoming = 0;

//whether the led should blink
boolean shouldBlinkLED = false;

//setup function. called when the program first runs
void setup()
{
	//start listening for incoming messages on the serial port
	//at 9600 baud
	Serial.begin(9600);

    //Send a message out that the program is initializing
    Serial.print("INITIALIZING");
        
    //Flash looks for this to know when the message is done
    //See the comments in the Flash file for more info.
    Serial.print(EOL_DELIMITER);
        
	//set the pin more for the digital ping that
	//the LED is connected to (can be INPUT or OUTPUT)
	pinMode(LED_PIN, OUTPUT);

	//blink the LED 5 times so we can visually see that the
	//program is running
	blinkLED(5);

    //Send out a message that initialization is complete.
    Serial.print("READY");
    Serial.print(EOL_DELIMITER);
}

//program loop. Called each timer tick (really fast)
void loop()
{
	//check if we should blink the LED
	if(shouldBlinkLED)
	{
		//if so, blink the LED
		blinkLED(1);
	}
  
	//check if there are any bytes available
	//on the Serial port
	if(Serial.available() > 0)
	{
		//read a single byte.
		incoming = Serial.read();
    

		//Calling Serial.read() remove the byte from the Serial
		//buffer. In this case, if there are multiple bytes that
		//were sent, the next one will be handled on the next loop.
		//You could also grab it by calling Serial.read() again
    
		//check if the incoming byte was a command to toggle
		//the state of the LED blinking
		if(incoming == TOGGLE_LED_STATE)
		{
			//it was a command
			
			//toggle the state of the LED Blinking
      		shouldBlinkLED = !shouldBlinkLED;
      
			//send a message to the Serial port with the 
			//new LED Blink state
       
			Serial.print("LED BLINK STATE: "); 
			if(shouldBlinkLED)
			{
				Serial.print("ON");
			}
        	else
        	{
          		Serial.print("OFF");
        	}
        
			Serial.print(EOL_DELIMITER);

			//note, if you are using XMLSocket in Flash to read
			//the string data over the socket then we also have to send 
			//a null byte with the following command:
			//
			//Serial.print(0, BYTE);
			//
			//However, in general, it is going to be easier, and more flexible
			//to use the Socket class (and not the XMLSocket class).
    	}
	}
}

//function to blink the LED
void blinkLED(int count)
{
	//loop through
	for(int i = 0; i < count; i++)
	{
		//turn LED on
    	digitalWrite(LED_PIN, HIGH);

		//wait 500 ms
    	delay(500);
	
		//turn LED off
    	digitalWrite(LED_PIN, LOW);

		//wait 500 ms
    	delay(500);
	}
}
```

The code is extensively commented and explains what is going on. Make sure that you read through them.

Basically, the code just listens for a single character ("t") to be sent over the Serial port. When it receives a "t" then it toggles the blinking of the LED (from ON to OFF or vice versa). When the LED is toggled, the Arduino will send a message back to Flash with the current LED state. Finally, the code blinks the LED 5 times when it starts so you can see that it is loaded and is running correctly.

Once you have the code typed in, press the "Verify" button (looks like a Play button) (*Sketch > Verify / Compile*) in order to ensure that you don't have any compilation errors. Once it compiles, then we are ready to upload it to the Arduino.

Make sure that the Arduino is connected, and then press the "Upload" button in the Arduino editor (*File > Upload to I/O Board*). This will upload the code to the Arduino. Note that even if you disconnect the Arduino, the code will still be on there, and begin running when the Arduino is connected (you don't have to re-upload it every time).

Before we write the ActionScript code, lets test the Arduino code we just wrote to ensure everything is working. We can do this by opening the Arduino Serial Monitor and send a message.

Open the Serial Monitor (*Tools > Serial Monitor*) and make sure that the baud rate is set to 9600 (in the bottom right of the window). Wait until you see the "INITIALIZING" and "READY" messages printed from the Arduino (we send these from our code). At the top, type in the letter "t" and click "Send". This sends the message to the Arduino. You should see the LED blinking toggle state, and also see a message in the console from the Arduino with the LED blink status.

If something doesn't work, then go back and check your code. Make sure you have set the baud rate correctly in your code and in the Serial Monitor. Once everything is working, then we are ready to move on to the final step, which is to write some Flash code to control and communicate with the Arduino.

**Flash / ActionScript Code**

From the Flash side of things, integrating with the Arduino is pretty much the same as regular client / server development with Flash. Indeed, we will use the [Socket][19] class to send and receive messages to the Arduino via TinkerProxy.

Here is our ActionScript code for interacting with the Arduino:

``` actionscript
/*
Simple Example that connects to an Arduino (via TinkerProxy) and controls
the blinking of an LED.

Created by Mike Chambers

http://www.mikechambers.com

The MIT License

Copyright (c) 2010 Mike Chambers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

package
{
import flash.events.Event;
import flash.display.Sprite;
import flash.net.Socket;
import flash.events.IOErrorEvent;
import flash.events.ProgressEvent;
import flash.events.SecurityErrorEvent;
import flash.utils.Endian;
import flash.events.MouseEvent;

public class FlashBlink extends Sprite
{
	
	//command sent to the Arduino to toggle LED blinking state
	private static const TOGGLE_LED_STATE:String = "t";
	
	//Character that delineates the end of a message received
	//from the Arduino
	private static const EOL_DELIMITER:String = "\n";
	
	//socket we will use to connect to TinkerProxy
	private var _socket:Socket;
	
	//Address where TinkerProxy is located. Will usually be
	//localhost / 127.0.0.1
	private var _proxyAddress:String = "127.0.0.1";
	
	//port TinkerProxy is listening on
	private var _proxyPort:uint = 5331;
	
	//constructor
	public function FlashBlink()
	{
		//listen for when we are added to the stage
		addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
	}
	
	private function onAddedToStage(event:Event):void
	{
		removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
		
		//create a Sprite to add to the stage.
		//This will be a simple button
		var s:Sprite = new Sprite();
		
		//draw a green square in the Sprite
		s.graphics.beginFill(0x00FF00);
		s.graphics.drawRect(0,0, 200,100);
		s.graphics.endFill();
		
		//Add Sprite to the display list
		addChild(s);
		
		//position it
		s.x = 50;
		s.y = 50;
		
		//listen for when the user clicks the Sprite
		s.addEventListener(MouseEvent.CLICK, onClick);
		
		_socket = new Socket();

		//Register for socket events
		
		//socket connected
		_socket.addEventListener( Event.CONNECT, onConnect );			
		
		//socket closed
		_socket.addEventListener( Event.CLOSE, onClose );			
		
		//data received from socket
		_socket.addEventListener( ProgressEvent.SOCKET_DATA, onSocketData );
		
		//Error connecting
		_socket.addEventListener( IOErrorEvent.IO_ERROR, onIOError );
		
		//Security Error
		_socket.addEventListener( SecurityErrorEvent.SECURITY_ERROR, onSecurityError );
		
		//need to set Endianness for Socket. THIS IS IMPORTANT
		//If this is set incorrectly, the Arduino will not be able to understand
		//all of the data sent from Flash. 
		//
		//See:
		//http://www.mikechambers.com/blog/2010/08/01/sending-multibyte-numbers-from-actionscript-to-arduino/
		_socket.endian = Endian.LITTLE_ENDIAN;
		
		//connect
		_socket.connect(_proxyAddress, _proxyPort);
	}
	
	//called when we connect to the proxy server
	private function onConnect(event:Event):void
	{
		/*
			note, you cannot reliably write data to the socket here.
			
			Im not sure if this is a Flash player issue, or a timing issue
			with the proxy.
		*/
		trace("Socket Connected");
	}
	
	/*
		This function / event handler is called when data is received
		on the socket. 
		
		However, it is important to remember that the event is called as
		data is received, which means that not all of the data may be available
		when it is called.
		
		For example, if you sent the string "Hello World" from Arduino,
		then the event handler might be called twice. Once with "Hello Wo" and
		a second time with "rld".
		
		"Because of this, in most cases, you need to buffer the data, and parse
		out messages, looking for a character (that you specify) that delineates the
		end of a message.
		
		If you just want to send a single character back from Arduino, then this
		is not necessary. However, the handler below is generic, and already does all
		of the buffering, so you can just use it.
	*/
	
	//string to hold data as it comes in.
	private var buffer:String = "";
	
	//event called when data arrives on the socket from the
	//arduino
	private function onSocketData(event:ProgressEvent):void
	{
		//get the string sent from the Arduino. This could be any binary data
		//but in our case, we are sending strings.
		//In general, it is much easier to just always send strings from 
		//Arduino, and then parse then in ActionScript
		var data:String = _socket.readUTFBytes( _socket.bytesAvailable );
		
		//copy the newly arrived data into the buffer string.
		buffer += data;
		
		//completed message from the server
		var msg:String;
		var index:int;
		
		//loop through the buffer until it contains no more
		//end of message delimiter
		while((index = buffer.indexOf(EOL_DELIMITER)) > -1)
		{
			//extract the message from the beginning to where the delimiter is
			//we don't include the delimiter
			msg = buffer.substring(0, index);
			
			//remove the message from the buffer
			buffer = buffer.substring(index + 1);
			
			//trace out the message (or do whatever you want with it)
			trace("Message Received from Arduino : " + msg);
		}				
		
	}
	
	//called when the user clicks the button on stage
	private function onClick(event:MouseEvent):void
	{
		trace("onClick");
		
		//make sure we are connected to the socket
		if(!_socket.connected)
		{
			//if not, don't do anything
			trace("You must be connected to send a command to the Arduino.");
			return;
		}
		
		//write the command to the server
		_socket.writeUTFBytes(TOGGLE_LED_STATE);
		
		//flush the socket. Not really necessary, but here for forward compatibility.
		_socket.flush();
	}
	
	//called when the socket is closed
	private function onClose(event:Event):void
	{
		trace("Socket Closed");
	}
	
	//called if an error occurs while connecting to the socket.
	private function onIOError(event:IOErrorEvent):void
	{
		trace("IOErrorEvent : " + event.text);
	}
	
	//called when there is a security error. Usually if you try to connect to a socket
	//when the SWF doesn't have permission. 
	//See:
	//http://www.adobe.com/devnet/flashplayer/articles/fplayer9_security_04.html
	//In most cases, when testing locally, this will not be an issue.
	private function onSecurityError(event:SecurityErrorEvent):void
	{
		trace("SecurityErrorEvent : " + event.text);
	}
}
}
```

Now, that looks like a lot of code for a simple example, but remember that it is mostly comments.

Basically, when the SWF starts running, we connect to the TinkerProxy server. When the button / square on the stage is clicked, then we send a message to the Arduino, telling it toggle the blink state. If you watch the Arduino closely, you can see when it is receiving information as the RX LED button will blink. Also notice how the blinking of the LED is turned on / off each time you click the button in the SWF.

The code also listens for the Arduino to send messages back. In this case, it is just a simple string specifying whether the LED is in blinking mode. Pay particular attention to the code and comments where we get the message from the Arduino. We have to buffer the code coming from the Arduino, since the entire message may not always arrive in one piece. The function is pretty generic can be reused in any project. All of the messages from the Arduino are traced out.

Also, notice that we specifying the Endianness for the socket server: 

`_socket.endian = Endian.LITTLE_ENDIAN;`

This is necessary to ensure that the Arduino can understand all of the data sent from Flash.

Make sure that the Arduino has initialized before you send any messages to it, or else the messages will be dropped. Normally this is not an issue, since the setup runs instantly, but in our case, we are blinking the LEDs first, so it takes a couple of moments for the setup to run.

I have uploaded a short video showing the Arduino running the code (click through the view the HD version).

<object width="560" height="340"><param name="movie" value="http://www.youtube.com/v/QtpuxLu4WmU&amp;hl=en_US&amp;fs=1?rel=0&amp;hd=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/QtpuxLu4WmU&amp;hl=en_US&amp;fs=1?rel=0&amp;hd=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="560" height="340"></embed></object>

At this point, you should have your system setup for Flash / Arduino development, and have a basic understanding of how to send and receive data between Flash content and the Arduino. Of course, the real fun comes when you begin to hook up sensors and motors and real world data. Check out some of the pre-made shields created for the Arduino at [Adafruit][2] and [SparkFun.com][3] to get an idea of what is out there.

**Addition Resources**

*   [Getting Started with Arduino Book][20] (Highly Recommended)
*   [Arduino Examples][21]
*   [Arduino Reference][22]
*   [Arduino / Flash Forum][23]
*   [Arduino / Flash Playground][24]
*   [Kevin Hoyt's Blog Posts on Flash / Arduino][25] (Really great resource)
*   [Getting Started in Electronics][26] (Classic book, very approachable)
*   [MAKE: Electronics: Learning Through Discovery][27]

Again, you can download all of the code from this tutorial [here][11].

If you find any errors in the post, or run into any issues trying to get stuff to work, then post in the comments.

 [1]: http://www.arduino.cc
 [2]: http://www.adafruit.com/index.php?main_page=index&cPath=17_21
 [3]: http://www.sparkfun.com/commerce/categories.php?c=103
 [4]: http://www.adafruit.com/index.php?main_page=product_info&cPath=17&products_id=50
 [5]: http://www.sparkfun.com/commerce/product_info.php?products_id=666
 [6]: http://www.adafruit.com/index.php?main_page=product_info&cPath=17&products_id=68
 [7]: http://www.sparkfun.com/commerce/product_info.php?products_id=9284
 [8]: http://arduino.cc/en/Main/ArduinoBoardDuemilanove
 [9]: http://arduino.cc/en/Main/Software
 [10]: http://code.google.com/p/tinkerit/wiki/TinkerProxy
 [11]: http://github.com/mikechambers/ExamplesByMesh/tree/master/Arduino/FlashArduinoGettingStarted/
 [12]: http://arduino.cc/en/Guide/HomePage
 [13]: http://arduino.cc/en/Guide/Windows
 [14]: http://arduino.cc/en/Guide/MacOSX
 [15]: http://www.arduino.cc/playground/Learning/Linux
 [16]: http://arduino.cc/en/Guide/Troubleshooting
 [17]: http://www.arduino.cc/playground/Interfacing/SerialNet
 [18]: http://code.google.com/p/tinkerit/downloads/list
 [19]: http://help.adobe.com/en_US/FlashPlatform/beta/reference/actionscript/3/flash/net/Socket.html?allClasses=1
 [20]: http://www.amazon.com/Getting-Started-Arduino-Make-Projects/dp/0596155514
 [21]: http://arduino.cc/en/Tutorial/HomePage
 [22]: http://arduino.cc/en/Reference/HomePage
 [23]: http://www.arduino.cc/cgi-bin/yabb2/YaBB.pl?board=interfacing
 [24]: http://www.arduino.cc/playground/Interfacing/Flash
 [25]: http://blog.kevinhoyt.org/?cat=29
 [26]: http://www.amazon.com/Getting-Started-Electronics-Forrest-Mims/dp/0945053282/ref=sr_1_1?ie=UTF8&s=books&qid=1280982691&sr=8-1
 [27]: http://www.amazon.com/MAKE-Electronics-Learning-Through-Discovery/dp/0596153740/ref=sr_1_1?ie=UTF8&s=books&qid=1280982679&sr=8-1