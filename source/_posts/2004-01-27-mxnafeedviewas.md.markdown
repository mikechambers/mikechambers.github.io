---
title: MXNAFeedView.as
author: mikechambers
layout: post
permalink: /2004/01/27/mxnafeedviewas/
categories:
  - ActionScript
---


Here is the next class from the [MXNA Web Service sample app][1]. This is the MXNAFeedView class, and is the main (and currently only) view class of the app.

It contains most of the UI elements for selecting and displaying categories and feeds.

You can also view the [MXNAAppController][2] class.

I will post the rest of the classes as I comment and finish them.

As usual, if you have any suggestions or questions, post them in the comments. 

<!--more-->

  
`
<pre>import mx.controls.ComboBox;
import mx.controls.DataGrid
import mx.controls.TextArea;

import com.macromedia.mesh.events.EventProxy;
import com.macromedia.mxna.app.MXNARankingCell;

/*
	This class is the main view application. It contains the primary
	UI elements for displaying information to the user.
*/
class com.macromedia.mxna.app.MXNAFeedView extends MovieClip
{
	/* Declar functions that EventDispatcher adds */
    private var dispatchEvent:Function;
    public var addEventListener:Function;
    public var removeEventListener:Function;

	/* Components used in class */
    private var category_cb:ComboBox;
    private var feedDG:DataGrid;
    private var feedField:TextArea;
    private var titleField:TextArea;
    private var urlField:TextArea;
    
	/* used to load ranking stars into */
    private var loadingClip:MovieClip;
    
	/* 
		These are proxies so we can direct the events to individual methods
		and so we can run them in the scope of this class
	*/
    private var categoryProxy:EventProxy;
    private var feedGridProxy:EventProxy;
    
	/* The enabled state of the class */
    private var isEnabled:Boolean;
    
	/* 
		We have to store the current direction of the ranking sort
		so we can manually sort it
	*/
    private var rankingSortASC:Boolean;
    
	/* Array of Months. This should really be in some */
    private var MONTHS:Array = ["January",
    			"February",
			"March",
			"Arpil",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"];
    
	/* Constructor. Most initialization done in onLoad */
    public function MXNAFeedView()
    {
		/* initialize this class to broadclass events using EventDispatcher*/
        mx.events.EventDispatcher.initialize(this);
    }
    
	/* 
		called when the class / symbol is loaded on stage. Most of the
		initialization is done here
	*/
    private function onLoad():Void
    {
        isEnabled = true;
        rankingSortASC = true;
    
		/* 
			Create a proxy so the change event from the category ComboBox
			can go to its own method, and be called in the scope of
			this class
		*/
        categoryProxy = new EventProxy(this, "onCategorySelect");
        category_cb.addEventListener("change", categoryProxy);
        
        //show up to 10 items at a time in the combo box dropdown
        category_cb.rowCount = 10;
        
		//only show the following columns in the datagrid
        feedDG.columnNames = ["title", "name", "ranking"];
        
		//size the columns in the datagrid
        feedDG.getColumnAt(0).width = feedDG._width - 200;
        feedDG.getColumnAt(1).width = 105;
        feedDG.getColumnAt(2).width = 95;
        
		//use a custom cell renderer for the ranking column.
        feedDG.getColumnAt(2).cellRenderer = "MXNARankingCell";
		//don't sort ranking column automatically
        feedDG.getColumnAt(2).sortOnHeaderRelease = false;
        
		//catch the headerRelease event so we can sort the ranking column manually
        feedDG.addEventListener("headerRelease", this);
        
		/* 
			Create a proxy so the change event from the datagrid
			can go to its own method, and be called in the scope of
			this class
		*/		
        feedGridProxy = new EventProxy(this, "onFeedGridSelect");
        feedDG.addEventListener("change", feedGridProxy);
	
		//initialize feed data TextArea
        feedField.html = true;
        feedField.editable = false;
        
		//initialize feed title TextArea
        titleField.html = true;
        titleField.editable = false; 
		titleField.wordWrap = false;
		//no border
        titleField.setStyle("borderStyle", "none");
	
		//initialize feed url TextAre
		urlField.html = true;
        urlField.editable = false; 
		urlField.wordWrap = false;
		//no border
        urlField.setStyle("borderStyle", "none");
    }
    
	//setter for setting the enabled property
    public function set enabled(enabled:Boolean)
    {
        isEnabled = enabled;
        
        category_cb.enabled = enabled;
        feedDG.enabled = enabled;
        feedField.enabled = enabled;   
		titleField.enabled = enabled;
		urlField.enabled = enabled;
    }
 
	//getter for enabled property
    public function get enabled():Boolean
    {
        return isEnabled;
    }
    
	//populates the ComboBox with categories
	//Takes on optional second parameter that specifies which field the label
	//is stored within
    public function setCategories(categories:Array, labelField:String):Void
    {
        if(labelField != undefined)
        {
            category_cb.labelField = labelField;
        }
        
        category_cb.dataProvider = categories;
    }
    
	//setter for the feeds to be displayed within the DataGrid
    public function set dataProvider(dp:Array)
    {
		//clear all TextArea fields
		clearFields();
		
		//set the dataprovider for the DataGrid
        feedDG.dataProvider = dp;
	
		//select the first row in the data grid
		feedDG.selectedIndex = 0;
		
		//since the previous line does not trigger the change event, we need to
		//manually call the displayFeed method, to display the info on the first
		//row
		displayFeed(feedDG.selectedItem);
    }
    
	//simple methods that clears the TextArea and ranking stars
    private function clearFields(Void):Void
    {
	    titleField.text = "";
	    feedField.text = "";
	    urlField.text = "";
	    loadingClip.star.removeMovieClip();
    }
    
	//simple method to format a Date object into the format we want to display
    private function formatDate(d:Date):String
    {
	    //January 25, 2004Ã¯Â¿Â½Ã¯Â¿Â½11:30 AM
	    
	    var hours:Number = d.getHours();
	    var timeOfDay:String = "AM";
	    
	    if(hours > 12)
	    {
		    timeOfDay = "PM";
		    hours = hours - 12;
	    }
	    
		//note, this will only work up until 2010
	    var year:Number = d.getYear() - 100;
	    
	    //TODO: the minutes to be formatted when it is 1-9.
	    var out:String = MONTHS[d.getMonth()] + " " + d.getDate() + ", " +
	    		"200" + year + "  " + hours + ":" + d.getMinutes() + 
			" " + timeOfDay + " UTC";
	    return out;
    }
    
	//takes an item from the DataGrid, and display the specific information
    private function displayFeed(feedItem:Object):Void
    {
		/*
			feedItem contains the following properties:
				websiteUrl
				title
				link
				excerpt
				dateAggregated
				ranking
				clicks
				category
				name
				id
		*/
		
		//bail if undefined
		if(feedItem == undefined)
		{
			return;
		}

		//title field
        titleField.text = "<b>" + createLink(feedItem.title, feedItem.link, true) + "</b> (" + 
                    createLink(feedItem.name, feedItem.websiteUrl, true) + ")";
    
		//feed field
        feedField.text =  "<i>" + formatDate(feedItem.dateAggregated) +  "</i><br>" +
                    feedItem.excerpt + "<br><br>" + createLink("Link...", feedItem.link, true, true);
        
		//urlField
		urlField.text = createLink(feedItem.link, feedItem.link, true, true);	    
		    
		//ranking is passed in as a string
        var star:Number = Number(feedItem.ranking);
        
		//normally, we only rank items within the last 24 hours. Items older than
		//24 hours rank 0, and dont show any graphic. However, this was confusing
		//in the UI, so we will give items older than 24 hours 0 stars.
		//Note that this does not necessarily mean they have no clicks, but 
		//rather that they are older than 24 hours.
		//TODO : Fix this. Maybe a different graphic.
        if(star < 1)
        {
            star = 1;
        }
        
		//display the appropriate star symbol
        loadingClip.attachMovie("star" + star, "star", 998);
  
    }
    
	//simple method that generates HTML code for a link
	//optionally takes two extra parameters that specify whether to
	//color(highlight) and underline the link.
	//
	//TODO : Look into using style sheets
    private function createLink(title:String, link:String, 
    				highlight:Boolean, underline:Boolean):String
    {
		//default highlight to false
		if(highlight == undefined)
		{
			highlight = false;
		}
	
		//default underline to false
		if(underline == undefined)
		{
			underline = false;
		}
		
		//create the link
		var out:String = "<a href=\"" + link +"\">" + title + "</a>";
		
		//see if we need to add a font tag
		if(highlight)
		{
			out = "<font color=\"#003366\">" + out + "</font>";
		}
		
		//see if we need to add underline tags
		if(underline)
		{
			out = "<u>" + out + "</u>";
		}
	    
        return out;
    }
    
    /******** UI Event Handlers *********/
    
	//broadcast by ComboBox when user selects an item in the combo
    private function onCategorySelect(eventObj:Object):Void
    {        
		//get the selected category
        var category:String = category_cb.selectedItem[category_cb.labelField];  

		//broadcast an event that a category has been selected
        dispatchEvent({type:"onSelectCategory", category:category});
    }
    
	//broadcast by the DataGrid when the user selects a row
    private function onFeedGridSelect(eventObj:Object)
    {
		//get and display the item from the selected row
        var item:Object = feedDG.selectedItem;
        displayFeed(item);
    }
    
	//broadcast by the DataGrid when the user releases from click one of the
	//column headers
    private function headerRelease(eventObj:Object)
    {
		//we only care if they clicked the ranking column, so ignore clicks
		//from other columsn
		//TODO : columnIndex should be put in a CONSTANT
        if(eventObj.columnIndex != 2)
        {
            return;
        }
        
		//reverse the ranking
        rankingSortASC = !rankingSortASC;
        
		//figure out which way to sort, and then call the appropriate function
		//TODO : figure out if there is a better way to do this
        var sortFunc = (rankingSortASC)? sortGridByRankingASC : sortGridByRankingDESC;
		
		//sort the DG
        feedDG.sortItems(sortFunc);
    }    
    
	//custom sorting functions for the ranking column
    private function sortGridByRankingASC(a,b)
    {
        return Number(a.ranking) > Number(b.ranking);
    }  
  
    private function sortGridByRankingDESC(a,b)
    {
        return Number(a.ranking) < Number(b.ranking);
    }    
    
}</pre>
<p>`

 [1]: http://www.markme.com/mesh/archives/004255.cfm
 [2]: http://www.markme.com/mesh/archives/004267.cfm