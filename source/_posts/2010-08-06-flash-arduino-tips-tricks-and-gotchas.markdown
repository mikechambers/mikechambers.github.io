---
title: Flash / Arduino Tips, Tricks and Gotchas
author: mikechambers
date: 2010-08-06 12:00:01 -0800
layout: post
permalink: /2010/08/06/flash-arduino-tips-tricks-and-gotchas/
categories:
  - General
tags:
  - arduino
  - physical computing
---


This is a ongoing post where I will post tips, tricks and gotchas that I learn while developing with Flash and the Arduino. I will update this from time to time with more information.
<!--more-->

### Make sure you are using the correct BAUD Rate

If your Flash / Arduino communication does not seem to be working, then make sure that you have set the BAUD rate to the same rate in both your Arduino code, and the configuration file for your Serial Proxy (such as TinkerProxy).

### Slow down the BAUD Rate

If you are getting weird errors, or some messages between Flash and Arduino seem to get dropped, then try slowing down your BAUD rate to 9600 and see if that fixes the issue.

If it does, you can then try and debug and figure out if any particular thing in your code was causing the problem.

### Sending NULL Bytes from Arduino

If you are using XMLSocket for your communication between Flash and Arduino, then you need to send a NULL Byte from Arduino when you are done writing a message to the serial port.

``` javascript
Serial.println("Hello From Arduino");
Serial.print(0, BYTE);
```

However, I have run into issues where if you send multiple NULL Bytes too fast, then some of the messages will get dropped (not sure if this is an Arduino, TinkerProxy or Flash issue).

So, if you are using XMLSocket, and seem to be losing messages from Arduino, then try reducing some of NULL Bytes being sent and see if that fixes the issues.

### Sending data in Socket connect handler

Be careful when sending data from Flash in the Socket class's *Event.CONNECT* handler. For example:

``` actionscript
private function onConnect(event:Event):void
{
	_socket.writeUTFBytes("Hello from Flash");
	_socket.flush();
}
```

My experience is that this message will be lost. Remember that the Arduino does not run its code until something connects to it. TinkerProxy appears to not connect to the Arduino until the Flash content connects to TinkerProxy.

Thus, the *Event.CONNECT* event handler may be broadcast before TinkerProxy has connected to the Arduino or before the Arduino has finished running its setup function.

I have found that you have to wait about 2 seconds (2000 ms) before you can reliably send data to the Arduino after you connect to TinkerProxy. So, just start a two second timer in the connect event handler, and send your data once that fires (then clean up the timer).

Here is an example:

``` actionscript
var connectTimer:Timer;
private function onConnectTimer(event:TimerEvent):void
{
	connectTimer.stop();
	connectTimer.removeEventListener(TimerEvent.TIMER, onConnectTimer);
	connectTimer = null;

	_socket.writeUTFBytes("Hello from Flash");
}

private function onConnect( event:Event ):void
{
	connectTimer = new Timer(PING_INTERVAL);
	connectTimer.addEventListener(TimerEvent.TIMER, onConnectTimer);

	connectTimer.start();
}
```

### Socket verses XMLSocket

You can use both the String based XMLSocket class, and the binary based Socket class to send and receive data between the Flash and Arduino.

I suggest that you use the Socket class instead of the XMLSocket class for a number of reasons:

1.  Socket is more flexible and extensible, allowing you send send multiple data types (not just strings).
2.  It can be difficult working with strings in Arduino code, and thus easier to send numbers from Flash (which requires Socket class). Ive written a seperate post with info on [how to send numbers from Flash to Arduino][1].
3.  Using XMLSocket requires that you send NULL bytes from Arduino to terminate messages, which has caused problems for me in the past (see above).

Even if you just want to send Strings, I still suggest using Socket, as you then have the option in the future to send additional data types.

Here is how to send a String with the Socket class:

``` actionscript
_socket.writeUTFBytes("Hi, im a String!");
```

The one disadvantage to using Socket verses XMLSocket, is that you have to buffer the input yourself, since all of the data may not arrive at once. However, that is pretty simple:

``` actionscript
//Character that delineates the end of a message received
//from the Arduino
private static const EOL_DELIMITER:String = "\n";

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
```

### Client / Server Development

It can be useful to think of Flash / Arduino development as regular client / server development. Most of the communication techniques you would use when developing on the web also apply when developing with the Arduino.

### Integer Division

Be careful when dividing numbers on the Arduino. If you divide 2 ints, they are not automatically converted to floats, which means you may get some odd results:

`5 / 15 //will result in 0`

If you do need to divide ints, then cast them to a float first, like so:

`(float)5/(float)15 //results in .33333`

In general, you should try and work with ints, as working with floats on the Arduino is relatively slow.

### Dont Upload Arduino code while Flash content is connected

You can upload new Arduino / sketch programs while TinkerProxy is connected to the Arduino. However, if you try and upload a new program while your Flash content is connected to the TinkerProy (and thus the Arduino), the upload will fail.

Try closing the Flash content and uploading again, and if that doesn't work, stop TinkerProxy, press the reset button on the Arduino, and try and upload it again.

### Serial Monitor is your friend

Before hooking up your Flash content to the Arduino, try and confirm as much of the Arduino code is working well as possible. 

This can often be done by monitoring output (regular and debug) from the Arduino App's Serial Monitor (*Arduino App > Tools > Serial Monitor*). (Make sure to set the correct BAUD rate in the Serial Monitor.

You can put in extra `Serial.println()` statements in your code, and they will be traced out to the monitor. Once you are sure things are working, then you can remove the statements.

### Dont forget to blink

If you are having trouble getting your Flash content to work with the Arduino (and are not receiving data from the Arduino), try blinking LEDs in different parts of your code. That can help tell you what is being run, and narrow down the issue.

Here is a simple function to blink the onboard LED:

``` javascript
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

Which you can call in your code like so:

`blink(2);`

If you have any additional tips or things to watch out for, post them in the comments.

 [1]: /blog/2010/08/01/sending-multibyte-numbers-from-actionscript-to-arduino/