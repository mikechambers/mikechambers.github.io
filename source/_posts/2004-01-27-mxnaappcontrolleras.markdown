---
title: MXNAAppController.as
author: mikechambers
date: 2004-01-27 12:34:01 -0800
layout: post
permalink: /2004/01/27/mxnaappcontrolleras/
categories:
  - ActionScript
---


I am going to post the class files for the [MXNA WebService App][1] I put together over the weekend. I will post them as I add the comments.

I will eventually post all of the source, but I want to work out all of the kinks first.

The first class I am posting, MXNAAppController is the controller for the application. It handles all communication with the web services on the server, and contains a single view class, that contains most of the UI elements for the app.

So, if you find any bugs, or have any suggestions, post them in the comments.

<!--more-->

  
`
<pre>import mx.containers.Window;
import com.macromedia.mxna.MXNAWebService;
import com.macromedia.mxna.app.MXNAFeedView;
import mx.controls.Alert;
import mx.controls.ProgressBar;

/* Associated with the main app controller clip */
class com.macromedia.mxna.app.MXNAAppController extends MovieClip
{
	/*Window Component for Background*/
	private var bgWindow:Window; 
    
	/*MXNA WebService Class to Load Data*/
    private var ws:MXNAWebService;
	/*Main App View*/
    private var feedView:MXNAFeedView;
    
	/*clip to block window component interaction*/
    private var blocker:MovieClip;

	/*Progress Bar Component*/
    private var pBar:ProgressBar;
    
	/*Used to cache category data*/
    private var feedCache:Object;
    private var so:SharedObject;

	/*
		Constructor. We do everything in onLoad to be sure
		everything has initialized
	*/
    public function MXNAAppController()
    {
    }
    
	/*
		Called by Flash when the clip is laoded on stage. We do a bunch of
		initialization here.
	*/
    private function onLoad():Void
    {
        feedCache = new Object();
    
		//set the clip to catch mouse events to the Window Component title bar.
		//we jsut want to use it for the background
        blocker._alpha = 0;
        blocker.onRelease = function(){};
        blocker.useHandCursor = false;
    
        bgWindow.title = "MXNA WebService Example";
    
		//braodcast when the user selects a category
        feedView.addEventListener("onSelectCategory", this);
    
		//Custom class that provides an interface / API to the MXNA webservices
        ws = new MXNAWebService();
		//event when categories load from server
        ws.addEventListener("onGetCategories", this);
		//event when posts load from server
        ws.addEventListener("onGetPostsByCategory", this);
		//event when an error occurs
		ws.addEventListener("onFault", this);
    
		//see if categories have been laoded before. If so, use them.
        so = SharedObject.getLocal("MXNAWebServiceExample");
        var categories = so.data.categories;
        
        if(categories != undefined)
        {
            setCategories(categories);
        }
        else
        {
            enableProgress(true, "Loading Categories...");
			//if categories not saved from before, then load them from the server.
            ws.getCategories();        
        }
    }
    
    public function onActivate(Void):Void
    {
    }
    
	//utility methods that takes an array of categories and sets them in the UI
	//passing them to the feedView
    private function setCategories(categories:Array):Void
    {
        feedView.setCategories(categories, "CATEGORY");
		
		//when the categories are loaded, lets go get the first batch of posts
		//so the user has something to look at.
        getPostsByCategory("All");
    }
    
	//takes a category, and gets the posts for that category from the server
    private function getPostsByCategory(category:String):Void
    {
        enableProgress(true, "Loading " + category + " Feeds...");
        ws.getPostsByCategory(category);
    }
    
	//method to manage the progress bar.
	//We are usign it in indetermindate mode, so, we need to turn it off when
	//it is not being used (i.e. make it invisible).
    private function enableProgress(enabled:Boolean, label:String):Void
    {
        if(label == undefined)
        {
            label = "";
        }
        
        pBar.indeterminate = enabled;
        pBar.label = label;
        pBar.enabled = enabled;
        pBar._visible = enabled;      
        
		//if something is being loaded, we need to disable the UI in order to
		//keep things in sync
        feedView.enabled = !enabled;
    }
    
	//event listener method, called when categories are loaded from the server.
    private function onGetCategories(eventObj:Object):Void
    {
        enableProgress(false);
        
		//contains an array of string category names
        var results:Array = eventObj.categories;
		
		//we need to add the "All" option since this is not returned from
		//the server
        results.unshift({CATEGORY:"All"});
        
		//lets save the categories in an SO, so we don't have to load them next
		//time
        so.data.categories = results;
        so.flush();
        
        setCategories(results);               
    }
    
	//event listener method, called when the user selects a category from the UI.
    private function onSelectCategory(eventObj:Object):Void
    {        
		//category name
        var category:String = eventObj.category;
        
		//lets see if the feeds are in the cache
        if(feedCache[category] != undefined)
        {
			//if so, use it
            feedView.dataProvider = feedCache[category];
            return;
        }
    
		//otherwise, go to the server to get the feeds for the category
        getPostsByCategory(category);
    }
    
	//event listener method, called when posts are loade from the server
    private function onGetPostsByCategory(eventObj:Object):Void
    {
        enableProgress(false);   
        
		//add them to the cache.
        feedCache[eventObj.category] = eventObj.feeds;
        
		//send them to the feedView to be displayed
        feedView.dataProvider = eventObj.feeds;
    }
    
	//called if an error occurs. only broadcast by MXNA class right now.
    private function onFault(faultObj:Object):Void
    {    

	    var info:Object = faultObj.fault;
	    
		//show an Alert box with some info
	    Alert.show(info.detail, 
	    			info.faultstring, 
				Alert.OK,
				this, 
				null, 
				"errorIcon",
				Alert.OK);
				
		feedView.enabled = false;
		enableProgress(false);
	
    }
}</pre>
<p>`

Btw, [big ups][2] to Sean Voisen for the [AS 2 support][3] in his MovableType CodeBeautifier.

 [1]: http://www.markme.com/mesh/archives/004255.cfm
 [2]: http://www.hbo.com/alig/
 [3]: http://voisen.org/archives/flash_mx/000328.php