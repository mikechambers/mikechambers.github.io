---
title: 'Sample App : MXNA Stand-alone viewer'
author: mikechambers
date: 2004-04-29 12:30:01 -0800
layout: post
permalink: /2004/04/29/sample-app-mxna-stand-alone-viewer/
categories:
  - General
---


I recently moved moved offices, and am now sitting with the Flash team. One thing I noticed was that we have a nice 42&#8243; Plasma screens, which was not being used. So, I decided to put together a simple application that would make it easy to help keep myself and the Flash team up with the latest news and information from the Flash community.

The application I created, MXNA Feed Scroller (original name, heh?), is a Flash based, fullscreen standalone application that displays information on the last 15 weblog posts from the Flash community. It is updated every 15 minutes. It gets its information from the [MXNA web service API][1] and uses the [MXNA ActionScript 2 Library][1].

Here is a picture of the app in action:

[<img alt="mxna_feedviewer_sm.jpg" src="/mesh/files/mxna_feedviewer_sm.jpg" width="300" height="225" border="0" />][2]

Here is a screen shot of the app:  
<!--more-->

  
<img alt="mxna_feedviewer_scrn.gif" src="/mesh/files/mxna_feedviewer_scrn.gif" width="548" height="401" border="0" />

You can download the source code for the application from [here][3].

And just because I like to look at the output from [Sean Voisen&#8217;s Code Beautifier][4] so much, here are the two classes for the application:

**MXNAFeedScrollerController.as**

`
<pre>import com.macromedia.mxna.MXNAWebService;
import com.macromedia.mxna.app.feedscroller.MXNAFeedView;

/* Associated with the main app controller clip */
class com.macromedia.mxna.app.feedscroller.MXNAFeedScrollerController extends MovieClip
{
	
	private var mxna:MXNAWebService;
	private var feedView:MXNAFeedView;
	
	private var category:String = "Flash";
	private var interval:Number = (60 * 15 * 1000); // 15 minutes
	
	/*
		Constructor. We do everything in onLoad to be sure
		everything has initialized
	*/
    public function MXNAFeedScrollerController()
    {
    }
    
	/*
		Called by Flash when the clip is laoded on stage. We do a bunch of
		initialization here.
	*/
    private function onLoad():Void
    { 	
    	Mouse.hide();
    	
    	mxna = new MXNAWebService();
    	
    	mxna.addEventListener("onGetPostsByCategory", this);
    	
    	//load the posts from the server
    	loadPosts();
    	
    	//reloads the posts from the server at the specified interval
    	setInterval(this, "loadPosts", interval);
    }
    
    /*
    	Loads the latests posts from the server
    */
    private function loadPosts(Void):Void
    {
    	mxna.getPostsByCategory(category);
    }
    
    /*
    	called when posts are loaded from the server
    */
    private function onGetPostsByCategory(eventObj:Object):Void
    {
    	feedView.setDataProvider(eventObj.posts);
    }

}</pre>
<p>`

&nbsp;

**MXNAFeedView.as**

`
<pre>/* Associated with the feedview clip */
class com.macromedia.mxna.app.feedscroller.MXNAFeedView extends MovieClip
{
	private var dp:Array;
	private var index:Number = 0;
	private var rankingClip:MovieClip;
	
	private var titleField:TextField;
	private var sourceField:TextField;
	private var postTimeField:TextField;
	private var contentField:TextField;
	private var urlField:TextField;
	
	/*How often (in milliseconds) the post is changed*/
	private var interval:Number = (15 * 1000); //15 seconds
	
	
	/*
		Constructor. We do everything in onLoad to be sure
		everything has initialized
	*/
    public function MXNAFeedView()
    {
    }
    
	/*
		Called by Flash when the clip is laoded on stage. We do a bunch of
		initialization here.
	*/
    private function onLoad():Void
    {
    	this.titleField.wordWrap = true;
		this.sourceField.wordWrap = true;
		this.postTimeField.wordWrap = true;
		this.contentField.wordWrap = true;
		this.urlField.wordWrap = true;
		
		setInterval(this, "rotatePost", interval);
    }
    
    /* Displays the next post */
    private function rotatePost()
    {
    	var tempIndex:Number = getNextIndex();
    	populateFields(dp[tempIndex]);
    }
    
    /*
    	returns the index for the next post.
    */
    private function getNextIndex()
    { 	
    	//if index is greater than or equal to the dp length
    	//then we are at the last item. reset to the first item
    	if(index == (dp.length - 1))
    	{
    		index = 0;
    	}
    	else
    	{
    		index++;
    	}
    	
    	return index;
    }
    
    /* specifies the dataprovider / array of posts */
    public function setDataProvider(dp:Array):Void
    {
    	var isFirstLoad:Boolean = (this.dp == null);
  	
    	this.dp = dp;
    	this.index = 0;
    	
    	if(isFirstLoad)
    	{
    		populateFields(dp[0]);
    	}
    }
    
    /*
    	populates the posts from a given object (from the post
    	dataprovider)
    */
    private function populateFields(data:Object):Void
    {
        var star:Number = Number(data.ranking);

        if(star < 1)
        {
            star = 1;
        }
        
        rankingClip.attachMovie("star" + star, "star", 999);
   	
   	
    	this.titleField.text = data.title;
		this.sourceField.text = data.name;
		this.postTimeField.text = data.dateAggregated;
		this.contentField.text = data.excerpt;
		this.urlField.text = data.link;
    }

}</pre>
<p>`

Thanks to [Josh Dura][5] who cleaned up the look of the app for me.

if you find any bugs or have any questions or suggestions, post them in the comments.

 [1]: /mxna/tools.cfm
 [2]: /mesh/files/mxna_feedviewer.jpg
 [3]: /mesh/files/MXNAFeedScroller.zip
 [4]: http://voisen.org/archives/projects/000239.php
 [5]: http://www.joshdura.com