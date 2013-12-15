---
title: Simple Apollo Offline Caching Example
author: mikechambers
layout: post
permalink: /2007/03/19/simple-apollo-offline-caching-example/
categories:
  - General
---


I have put together a very simple example of how to download and cache items to the files system. This can be useful if your application needs to work offline, or if you want to optimize performance and don&#8217;t want to have to keep downloading the same assets over and over.

This example uses some of the caching classes from my Ascension mp3 player, and required the [corelib library][1].

Here is the code for the app:  
<!--more-->

  
`
<pre><?xml version="1.0" encoding="utf-8"?>
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute"
	creationComplete="onCreationComplete()">
	<mx:Script>
		<![CDATA[
			import com.adobe.apps.ascension.events.URLCacheEvent;
			import com.adobe.apps.ascension.utils.URLCache;
			
			private var cache:URLCache;
			private var CACHE_NAME:String = "mycache";
			
			private function onCreationComplete():void
			{
				imagePathField.text = "http://apollocamp.eventbrite.com/img/logos/47616422.png";
				
				cache = new URLCache(CACHE_NAME);
				
				cache.addEventListener(URLCacheEvent.ITEM_READY, onItemReady);
				cache.addEventListener(URLCacheEvent.ITEM_CACHED, onItemCached);
			}
			
			private function onLoadImageClick():void
			{
				if(imagePathField.text == "")
				{
					return;
				}
				
			
				cache.cacheURL(imagePathField.text, imagePathField.text);
			}
			
			private function onItemReady(e:URLCacheEvent):void
			{
				writeToOutput("Item Ready : " + e.file.url);
				image.source = e.file.url;
			}
			
			private function onItemCached(e:URLCacheEvent):void
			{
				writeToOutput("File Cached : " + e.file.url);
			}
			
			private function writeToOutput(s:String):void
			{
				output.text += s + "\n";
			}
		]]>
	</mx:Script>
	<mx:Button y="10" label="Load Image" right="10" click="onLoadImageClick()"/>
	<mx:Canvas right="10" left="10" top="40" bottom="114" borderColor="0xffffff" borderStyle="solid">
		<mx:Image width="100%" height="100%" id="image" scaleContent="true"/>
	</mx:Canvas>
	<mx:TextInput right="112" left="10" top="10" id="imagePathField"/>
	
	<mx:TextArea height="96" bottom="10" left="10" right="10" id="output"/>
</mx:Application>
</pre>
<p>`

Basically, the first time you load an image, you get two events. One that the item has been cached, and one that the item is ready to use. If you try to load the same image again, then you only get the item ready event, since the item has already been downloaded and cached.

Here is what the app looks like:

<img src="/mesh/files/CacheExample.png" height="500" with="397" border="0" alt="" />

Here is the main cache class:

`
<pre>package com.adobe.apps.ascension.utils
{
	import flash.events.EventDispatcher;
	import flash.events.IEventDispatcher;
	import flash.events.Event;
	import flash.net.FileReference;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.filesystem.File;
	import com.adobe.crypto.MD5;
	import com.adobe.net.DynamicURLLoader;
	import flash.events.IOErrorEvent;
	import flash.filesystem.FileStream;
	import flash.filesystem.FileMode;
	import com.adobe.apps.ascension.events.URLCacheEvent;
	import flash.net.URLLoaderDataFormat;
	import flash.utils.ByteArray;


	//todo: add event metadata

	public class URLCache extends EventDispatcher
	{
		private var _cacheName:String;
		//maybe rename to make it clearer it loads data
		public function URLCache(cacheName:String)
		{
			_cacheName = cacheName;
		}
		
		public function get cacheName():String
		{
			return _cacheName;
		}
		
		private function getStorageDir():File
		{
			return File.appStorageDirectory.resolve(_cacheName);
		}
		
		public function itemExists(key:String):Boolean
		{
			return getItemFile(key).exists;
		}
		
		public function clearCache():void
		{
			var cacheDir:File = getStorageDir();
			try
			{
				cacheDir.deleteDirectory(true);
			}
			catch (e:IOErrorEvent)
			{
				// we tried!
			}
		}
		
		public function getItemFile(key:String):File
		{
			var dir:File = getStorageDir();
			var fName:String = generateKeyHash(key);
			var file:File = dir.resolve(fName);
			
			return file;
		}
		
		public function cacheURL(url:String, key:String):void
		{
			
			var file:File = getItemFile(key);
			
			//todo: do we need to check if the dir exists?
			
			if(file.exists)
			{
				var e:URLCacheEvent = new URLCacheEvent(URLCacheEvent.ITEM_READY);
					e.key = key;
					e.file = file;
					
				dispatchEvent(e);	
				return;
			}
			
			
			var loader:DynamicURLLoader = new DynamicURLLoader();
				loader.file = file;
				loader.key = key;
				
				loader.addEventListener(Event.COMPLETE, onDataLoad);
				loader.addEventListener(IOErrorEvent.IO_ERROR, onLoadError);
				
				loader.dataFormat = URLLoaderDataFormat.BINARY;
				
				loader.load(new URLRequest(url));
			
		}
		
		private function onLoadError(event:IOErrorEvent):void
		{
			trace("onLoadError : could not cache item");
		}
		
		private function onDataLoad(event:Event):void
		{
			var loader:DynamicURLLoader = DynamicURLLoader(event.target);
			
			var f:File = File(loader.file);
			var key:String = String(loader.key);
			
			var fileStream:FileStream = new FileStream();
				fileStream.open(f, FileMode.WRITE);
				fileStream.writeBytes(loader.data as ByteArray);
				fileStream.close();
				
				var g:URLCacheEvent = new URLCacheEvent(URLCacheEvent.ITEM_CACHED);
					g.key = key;
					g.file = f;
					
				dispatchEvent(g);	
				
				var e:URLCacheEvent = new URLCacheEvent(URLCacheEvent.ITEM_READY);
					e.key = key;
					e.file = f;
					
				dispatchEvent(e);	
		}
		
		
		private function generateKeyHash(key:String):String
		{
			return MD5.hash(key);
		}
	}
}</pre>
<p>`

This works with any data / file types.

It still needs to be cleaned up some, but I wanted to get an example online asap.

You can download the entire example code [here][2].

 [1]: http://code.google.com/p/as3corelib/
 [2]: /mesh/files/CacheExample.zip