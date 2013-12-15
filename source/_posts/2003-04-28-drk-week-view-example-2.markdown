---
title: 'DRK : Week View Example 2'
author: mikechambers
layout: post
permalink: /2003/04/28/drk-week-view-example-2/
categories:
  - DRK
---


I have posted another example of the Week View component from the [Flash UI Component Set 5][1] on [DRK 3][2]. This example creates a simple TV listings browser, and uses the Week View component to navigate through the days.

<!--more-->

  
<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="300" HEIGHT="400" id="WeekView_Example2" ALIGN="">
  <PARAM NAME=movie VALUE="/mesh/drk/WeekView_Example2.swf"> <PARAM NAME=quality VALUE=high> <PARAM NAME=bgcolor VALUE=#FFFFFF> <EMBED src="/mesh/drk/WeekView_Example2.swf" quality=high bgcolor=#FFFFFF WIDTH="300" HEIGHT="400" NAME="WeekView_Example2" ALIGN="" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED>
</OBJECT>

This example is included on the DRK (one of the 66 component sample files).

You can view the on-line docs for the Week View component [here][3].

You can find more information about the Flash UI Component Set 5 [here][1].

You can find more information about DRK 3 [here][4].

Here is the code:

`
<pre>
//random show titles
showStrs = ["Survivor", "Road Rules", "Simpsons", "John Doe", "24", "American Chopper", 
	"Saturday Night Live", "CNN News", "The Late Show", "X-Files", "South Park", "Man Show",
	"SmallVille", "Charmed", "Frasier", "That 70's Show", "Friends", "American Idol", 
	"Star Search", "Forensic Files", "Unsolved Mysteries", "Sliders"
];

//use this to generate dates based when this is run
var dateStub = new Date();
//this dataprovider represents a week of tv programming
var dp = new DataProviderClass();

//a months worth or shows starting from today
for(var i = 0; i < 32; i++){
	dp.addItem({dateObj: new Date(dateStub.getFullYear(), dateStub.getMonth(), dateStub.getDate()+i), data: generateShows()});
}

//set the dataprovider
weekView_wkv.setDataProvider(dp);

//for this exaxmple to save time
//we will generate some fake programming 
function generateShows(){
	var shows = [];
	for(var i = 0; i < 23; i++){
		var index = Math.floor(Math.random() * showStrs.length);
		var name = showStrs[index];
		var time;
		//probably a better way
		if(i == 0){
			time = "12AM";			
		}else if(i==11){
			time = "12PM";
		}else{
			time = (i>10) ? (i-11)+"PM" : (i+1)+"AM";			
		}
		shows.push({time: time, name: name});
	}
	return shows;
}

function onDayChange(){
	//get the selected date
	var dt = weekView_wkv.getSelectedDate();
	//get the first item in the cell data (we only set one)
	var shows = weekView_wkv.getCellData(dt)[0];
	//reset the text in the textfield
	textfield_txf.text = "";
	
	//populate the guide
	for(var i = 0; i < shows.length; i++){
		textfield_txf.text += (shows[i].time+": "+shows[i].name+"\n");
	}
}

onDayChange();
</pre>
<p>`

 [1]: http://www.macromedia.com/software/drk/productinfo/product_overview/volume3/flashmx.html
 [2]: http://www.macromedia.com/software/drk/productinfo/product_overview/volume3/
 [3]: http://www.macromedia.com/software/drk/productinfo/product_overview/volume3/drk3_docs/index.html
 [4]: http://www.macromedia.com/software/drk/