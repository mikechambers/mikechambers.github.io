---
title: Example Code for 360Flex Apollo Session
author: mikechambers
date: 2007-03-09 12:05:01 -0800
layout: post
permalink: /2007/03/09/example-code-for-360flex-apollo-session/
categories:
  - General
---


During my [Apollo][1] overview session at [360Flex][2], I built a simple HTML editor that provided live preview and allowed the HTML to save to the desktop. It is a pretty simple app, but it shows an example of using both the File API in Apollo as well as HTML.

I mentioned in the session that I would post it online, so here it is:

<!--more-->

  
<STYLE>
  PRE {font : normal normal normal 12 &#8220;Courier New&#8221;, Courier, Arial;;}
</STYLE>

<pre>&lt;?xml <font color="#000087">version</font>="<font color='blue'>1.0</font>" encoding="<font color='blue'>utf-8</font>"?&gt;
&lt;mx:Application xmlns:mx="<font color='blue'>http://www.adobe.com/2006/mxml</font>" layout="<font color='blue'>absolute</font>"&gt;

&lt;mx:Script&gt;
&lt;![CDATA[
import flash.filesystem.FileMode;
import flash.filesystem.FileStream;
import flash.filesystem.File;

<font color='#878787'>/* Called when the user wants to save the file */</font>
private <font color="#993300">function</font> onSave():<font color="#993300">void</font>
{
        <font color='#878787'>//Get a reference to the desktop
</font>        <font color="#993300">var</font> desktop:File = File.desktopDirectory;
        
        <font color='#878787'>//create a reference to the file on the desktop in which we will save html
</font>        <font color="#993300">var</font> saveFile:File = desktop.resolve(fileName.<font color="#000087">text</font>);
        
        <font color='#878787'>//create a FileStream instance to write to the file
</font>        <font color="#993300">var</font> fs:FileStream = <font color="#993300">new</font> FileStream();
        
        <font color='#878787'>//open file in WRITE mode
</font>        fs.open(saveFile, FileMode.WRITE);
        
        <font color='#878787'>//write the string to the file
</font>        fs.writeUTFBytes(input.<font color="#000087">text</font>);
        
        <font color='#878787'>//close the file / file stream
</font>        fs.<font color="#000087">close</font>();
}

<font color='#878787'>/* called when text in the TextArea changes */</font>
private <font color="#993300">function</font> onTextChange():<font color="#993300">void</font>
{
        <font color='#878787'>//pretty simple. Copy text from TextArea into HTML control as HTML
</font>        <font color="#000087">html</font>.<font color="#000087">htmlText</font> = input.<font color="#000087">text</font>;
}
]]&gt;
&lt;/mx:Script&gt;

&lt;!-- Used to enter HTML --&gt;
&lt;mx:TextArea right="<font color='blue'></font>" left="<font color='blue'></font>" id="<font color='blue'>input</font>" top="<font color='blue'></font>" <font color="#000087">height</font>="<font color='blue'>139</font>" textInput="<font color='blue'>onTextChange()</font>"/&gt;

&lt;!-- Save Button --&gt;
&lt;mx:Button label="<font color='blue'>Save</font>" id="<font color='blue'>saveButton</font>" bottom="<font color='blue'>10</font>" right="<font color='blue'>10</font>" click="<font color='blue'>onSave()</font>"/&gt;

&lt;!-- File Name <font color="#000087">on</font> Desktop to save HTML <font color="#993300">in</font> --&gt;
&lt;mx:TextInput id="<font color='blue'>fileName</font>" right="<font color='blue'>72</font>" bottom="<font color='blue'>10</font>" <font color="#000087">text</font>="<font color='blue'>test.html</font>" /&gt;

&lt;!-- HTML field to <font color="#993300">do</font> live preview of HTML --&gt;
&lt;mx:HTML right="<font color='blue'></font>" left="<font color='blue'></font>" top="<font color='blue'>147</font>" bottom="<font color='blue'>40</font>" id="<font color='blue'>html</font>"/&gt;
&lt;/mx:Application&gt;

</pre>

Post any questions in the comments.

 [1]: http://www.adobe.com/go/apollo
 [2]: http://360flex.org/