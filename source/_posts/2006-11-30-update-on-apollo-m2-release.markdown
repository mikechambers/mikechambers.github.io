---
title: Update on Apollo (m2 release)
author: mikechambers
date: 2006-11-30 12:47:01 -0800
layout: post
permalink: /2006/11/30/update-on-apollo-m2-release/
categories:
  - General
---


Sorry for the lack of posts lately. I have been traveling a lot (Korea Max, and [now in Europe][1]), as well as focusing on an internal Apollo release. I wanted to make up for the lack of posts though by giving everyone an update on what is going on with Apollo.  
<!--more-->

  
As I mentioned above, we just had another internal Apollo release. This release, named M2, is our third internal release and includes a number of new features including:

*   HTML Support within Flash content (woot!)
*   Updated File System API (with both Synchronous and Asynchronous APIs)
*   Initial implementation of express install from the web browser
*   Updates to the Windowing API (although we don&#8217;t have multiple window support yet)
*   Initial Flex Framework support of Apollo (i.e. HTML control, ApolloApplication component).
*   lots more

We have added our initial HTML support, and it is pretty cool. Right now HTML only works within Flash / Flex content. i.e. you cant have a top level HTML Apollo application yet. The thing that is really cool though about the HTML support via Flash, is that the HTML is rendered via the Flash display stack, and thus anything that you can do with content on Flash&#8217;s display list (blur, rotate, etc...), you can also do with HTML (and the HTML remains interactive). You can find more details on this [video of the the HTML session from Max][2] that I posted a couple of weeks ago.

Right now, you can specify a URL for the HTML control to load (remote or local), or give it a string of HTML to render. Remember, that this is a full HTML engine ([WebKit][3]), so all HTML, CSS, JavaScript, etc... is supported.

Another cool thing that was included in M2, was a pretty significant update to the File I/O API. In general the APIs were cleaned up and rationalized, but the biggest thing was the addition of a synchronous File API (in M1 all File I/O was Asynchronous). This provides a lot of flexibility for the developer, and makes it even easier to read / write data to and from the file system.

One little gem that I discovered in the APIs was the File.writeObject() and File.readObject() methods. Basically, this will take an ActionScript object and write it out to the file system (or read it from the file system). Using the [registerClassAlias API][4] or meta data, you can even serialize and de-serialize custom classes. This makes it super simple to persist application state between sessions.

For example, here is the code from Ascension (an Apollo mp3 player I am working on) that saves and loads the song library:

`
<pre>
//this is the code the loads and de-serializes an Array of Songs
private function onFileReadComplete(event:Event):void
{
 	var fs:FileStream = FileStream(event.target);

	//this reads the file as ActionScript data (in this case
	//an Array of Songs
 	var data:Array = (fs.readObject()) as Array;
 	fs.close();
 		
 	for each(var s:Song in data)
 	{
 		addSong(s);
 	}								
 }

//this serializes the current Array of Songs to the file system
public function save():void
{
	//createLibPath just returns the path to the file 
	//where the songs are serialized
 	var fr:File = new File(createLibPath());
 	var fileStream:FileStream = new FileStream();
 		
 	fileStream.openAsync(fr, FileMode.WRITE);
 	
	//songs.source is an Array of Song instances
 	fileStream.writeObject(songs.source);
 	fileStream.close();
}
</pre>
<p>`

I use ASYNC APIs here as I don&#8217;t know how large the song library for the user will be. This ensures that the app will not lock up and freeze even if loading / saving a very large song library.

The team is now starting to work on the next release (M3). Tons of new stuff going in including support for HTML / JavaScript based applications. I will post more info on this a little further into the development cycle.

Anyways, that is a quick update on what has been going on with Apollo. Pretty much everyone we have shown Apollo too has been pretty excited about it, which is cool (especially considering that we are still pretty early in the development process). Expect to hear and see more over the next couple of months.

As usual, you can find more info on Apollo at:

<http://www.adobe.com/go/apollo>

 [1]: http://weblogs.macromedia.com/mesh/archives/2006/11/apollo_in_europ.html
 [2]: http://weblogs.macromedia.com/mesh/archives/2006/11/video_leveragin.html
 [3]: http://webkit.org/
 [4]: http://livedocs.macromedia.com/flex/2/langref/flash/net/package.html#registerClassAlias()