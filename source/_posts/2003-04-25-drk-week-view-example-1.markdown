---
title: 'DRK : Week View Example 1'
author: mikechambers
date: 2003-04-25 12:30:01 -0800
layout: post
permalink: /2003/04/25/drk-week-view-example-1/
categories:
  - DRK
---


I have uploaded another component example from Flash UI Component Set 5 on [DRK 3][1]. This one uses the Week View component (DRK 3) as well as the Advanced Calendar Component from [DRK 2][2].

<!--more-->

  
<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="250" HEIGHT="300" id="week_getSelectedDate" ALIGN="">
  <PARAM NAME=movie VALUE="/mesh/drk/week_getSelectedDate.swf"> <PARAM NAME=quality VALUE=high> <PARAM NAME=bgcolor VALUE=#FFFFFF> <EMBED src="/mesh/drk/week_getSelectedDate.swf" quality=high bgcolor=#FFFFFF WIDTH="250" HEIGHT="300" NAME="week_getSelectedDate" ALIGN="" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED>
</OBJECT>

This example is included on the DRK (one of the 66 component sample files).

You can view the on-line docs for the Week View component[here][3].

You can find more information about the Flash UI Component Set 5 (which includes the Week View component) [here][1].

You can find more information about DRK 3 [here][4].

Here is the code:

`
<pre>
//Set up the arrays of French day and month abbreviations.
var days_fr = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
var months_fr = ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Jui",
				 "Aou", "Sep", "Oct", "Nov", "Dec"];

//store the english day and month abbreviations
var days_en = myWeekView_wkv.getDayArray();
var months_en = myWeekView_wkv.getMonthArray();

//this function sets the new languages for the components.
function setLanguage(lan)
{
	myWeekView_wkv.setDayArray(this["days_" + lan]);
	myWeekView_wkv.setMonthArray(this["months_" + lan]);
	
	myCalendar.setMonthNames(this["months_" + lan]);
}

//make sure the initial value matches the combo box.
setLanguage(language_cb.getValue());

//change handler for combo box
function onLanguageChange()
{
	var lan = language_cb.getValue();
	setLanguage(lan);
}

language_cb.setChangeHandler("onLanguageChange");

//change handler for week view component
function onWeekChange()
{
	var selectedDate = myWeekView_wkv.getSelectedDate();
	myCalendar.setSelectedItem(selectedDate);
	myCalendar.setDisplayedMonth(selectedDate);
}

//change handler for calendar component
function onCalendarChange()
{
	var selectedDate = myCalendar.getSelectedItem();
	myWeekView_wkv.setSelectedDate(selectedDate);
	
}

myCalendar.setChangeHandler("onCalendarChange");
myWeekView_wkv.setChangeHandler("onWeekChange");

//make sure both calendar components are synced up.
onWeekChange();
</pre>
<p>`

 [1]: http://www.macromedia.com/software/drk/productinfo/product_overview/volume3/flashmx.html
 [2]: http://www.macromedia.com/software/drk/productinfo/product_overview/volume2/
 [3]: http://www.macromedia.com/software/drk/productinfo/product_overview/volume3/drk3_docs/index.html
 [4]: http://www.macromedia.com/software/drk/