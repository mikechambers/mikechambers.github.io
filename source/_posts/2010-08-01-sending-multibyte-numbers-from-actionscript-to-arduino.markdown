---
title: Sending Multibyte Numbers from ActionScript to Arduino
author: mikechambers
layout: post
permalink: /2010/08/01/sending-multibyte-numbers-from-actionscript-to-arduino/
categories:
  - General
tags:
  - arduino
  - physical computing
---


If you follow me on twitter, then you have probably noticed that I have been learning about Flash, physical computing and electronics lately. I started out working with [Phidgets][1], and have recently begun working with the [Arduino][2] (Ill write up Flash / Arduino getting started tutorial shortly). I am currently working on a project where I need to send data from Flash to the Arduino, and quickly discovered that it is not as easy as I thought it would be. In this post, I will show an example of how to send multibyte Numbers from ActionScript to Arduino.  
<!--more-->

  
When you send data to Arduino over the Serial port, Arduino reads that data byte by byte. Thus, if you want to send a string to the Arduino, you have to read the string byte by byte and reconstruct it which is a bit of a hassle, but nothing too difficult. However, what if you want to send a number? If you just need to send a small whole number (up to 127), then you can simply write the number to the socket:

``` javascript
socket.writeByte(127);
```

and then read the same number in Arduino by reading the byte:

``` javascript
value = Serial.read();
Serial.println(value, DEC); //will send 127
```

However, if you need to send a number larger than 127, then things get a bit tricky. This is because numbers larger than 127 require multiple bytes to send, which means that you cannot simply read in the number on the Arduino side (since you have to read byte by byte). One solution (suggested to my by [Thibault Imbert][3]) is to multiply the number by some ratio. This would allow you to represent numbers larger than 127, but at the price of accuracy.

So, after much searching, I found a [post]() on the Arduino forums that shows how to build a float from a byte array using a union. With that code as a guide, I was able to figure out how to send a float from ActionScript to Arduino.

I have uploaded a [simple example][4] into my github example code repository. The Flash part of the example is done in Flex and ActionScript, but the ActionScript code is the same regardless of what you are using to build your Flash content.

Note, all of the code in the examples is released under an [MIT license][5].

First, lets look at the Arduino sketch:

``` javascript
//union that we will use
//the construct the float
//from the individual bytes
//sent from Flash / ActionScript
union u_tag {
    byte b[4];
    float ival;
} u;

float value;

void setup()
{
  Serial.begin(9600);
}

void loop()
{  
  
  //this example assumes only floats / Numbers
  //are being sent. So we just look for data in 4 byte
  //increments
  if(Serial.available() > 3)
  {
    
    //read the 4 bytes into the union
    u.b[0] = Serial.read();
    u.b[1] = Serial.read();
    u.b[2] = Serial.read();
    u.b[3] = Serial.read();
    
    //retrieve the float value of the union
    //(based on the bytes passed in)
    value = u.ival;
  
    //send the reconstructed float back to the Serial
    //flash
    Serial.print(value, DEC);
    
    //write out a null byte, (the Flash Socket
    //class looks for this)
    Serial.print(0, BYTE);
  }
  
}
```

Now, lets look at how we send the Number from ActionScript:

``` actionscript
private function onApplicationComplete():void
{
	//only allow numbers, period and minus sign
	numberInput.restrict = ".0-9\\-";
	
	socket = new Socket()
	socket.addEventListener(Event.CONNECT, onConnect);
	socket.addEventListener(Event.CLOSE, onClose);
	socket.addEventListener( IOErrorEvent.IO_ERROR, onIOError );
	socket.addEventListener( SecurityErrorEvent.SECURITY_ERROR, onSecurityError );
	socket.addEventListener( ProgressEvent.SOCKET_DATA, onSocketData );
	
	//disable until we connect
	this.enabled = false;
	
	//this is important! If you dont set this to
	//little endian, then Arduino wont understand
	//the bytes
	socket.endian = Endian.LITTLE_ENDIAN;
	
	socket.connect(SERVER_ADDRESS, PORT);
}

private function onSendClick():void
{
	//get the number that the user input
	var out:Number = Number(numberInput.text);
	
	//write it as a float to the server.
	//this is important.
	socket.writeFloat(out);
	
	//if number is too big, then it will overflow on
	//the Arduino, and probably come back as 0.00000
}
```

Again, you can [download the complete example from my GitHub repository][4].

A couple of things to take note of. Notice that we set the Endianness of the socket to LITTLE_ENDIAN. This is necessary for Arduino to be able to understand the number we are sending.

Second, notice that we send the number by calling *socket.writeFloat*. I initially tried *writeInt*, but ActionScript ints are 4 bytes, where the Arduino int is 2. Thibault suggested I send the number using *writeShort*, but that also did not work.

Basically, the only way I was able to get it to work, was to use *writeFloat*. In practice this should not matter, but it is something you should keep in mind.

Now, I am pretty sure it is possible to send other ActionScript multibyte number types using *writeInt*, *writeUnsignedInt* and *writeShort*, since we are just sending raw bytes over the socket. However, I have not figured out how to reconstruct them on the Arduino side yet. If anyone gets additional types working, then post a note in the comments.

UPDATE : I have [posted another example][6] that shows how to send ints / shorts from ActionScript to Arduino. You can view the code [here][6].

Being able to easily send multibyte numbers make communication significantly easier, because, now, among other things, we can easily send packets of complex data. Ill leave that for another post though.

If you have any suggestions or corrections, then leave them in the comments.

 [1]: http://www.mikechambers.com/blog/2010/07/26/getting-started-with-phidgets-and-actionscript/
 [2]: http://Arduino.cc/
 [3]: http://bytearray.org/
 [4]: http://github.com/mikechambers/ExamplesByMesh/tree/master/Arduino/MultibyteNumbersFromFlash
 [5]: http://www.opensource.org/licenses/mit-license.php
 [6]: http://github.com/mikechambers/ExamplesByMesh/tree/master/Arduino/MultibyteIntFromFlash/