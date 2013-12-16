---
title: 'DRK 3 : Tab Component Example 1'
author: mikechambers
date: 2003-04-23 12:50:01 -0800
layout: post
permalink: /2003/04/23/drk-3-tab-component-example-1/
categories:
  - DRK
---


Here is another example of one of the [DevNet Resource Kit (DRK) 3][1] components. This one is an advanced usage of the Tab component, which shows how to specify custom tabs (in this case to add icons to the tabs). It also uses the TextField Component.

<!--more-->

Basically, each tab represents the type of input for its associated text field. Icons will appear indicating the status of its text field. This example is included on the DRK (one of the 66 total component sample files).

<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="325" HEIGHT="125" id="tab_Example2" ALIGN="">
  <PARAM NAME=movie VALUE="/mesh/drk/tab_Example2.swf"> <PARAM NAME=quality VALUE=high> <PARAM NAME=bgcolor VALUE=#FFFFFF> <EMBED src="/mesh/drk/tab_Example2.swf" quality=high bgcolor=#FFFFFF WIDTH="325" HEIGHT="125" NAME="tab_Example2" ALIGN="" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED>
</OBJECT>

You can view the online docs for the TextField component [here][2].

You can find more information about the Flash UI Component Set 5 (which includes the TextField and Tab components) [here][3].

You can find more information about DRK 3 [here][4].

Here is the code:

`
<pre>
/*
This example requires the ActionScript DataValidation Library which is included
on DRK 3 (The same DRK that theTab View component is included).
*/
#include "com/macromedia/validation/DataValidation.as"

tab_tbv.removeAll();

//sets our custom tab symbol
tab_tbv.setItemSymbol("MyCustomTabSymbol");

//sets the listener for changed tabs
tab_tbv.addListener(this);

//hide the initial screens
date_mc._visible = false;

//styles
tab_tbv.setStyleProperty("activeHighlight3d",0xEEEEE6);
tab_tbv.setStyleProperty("highlight3d",0xCECDBF);
tab_tbv.setStyleProperty("activeDarkShadow",0xFFFFFF);
tab_tbv.setStyleProperty("darkShadow",0x888878);
tab_tbv.setStyleProperty("seperator",0xFFFFFF);


//our custom tab uses the icon field in the data object.
//we also pass in pane_mc in the data object so we can easily
//control the visibility of the correct panes.
tab_tbv.addItem("Numbers",{icon: "warningIcon", pane_mc: number_mc});
tab_tbv.addItem("Letters",{icon: "warningIcon", pane_mc: letter_mc});
tab_tbv.addItem("Date",{icon: "warningIcon", pane_mc: date_mc});

//below are all the callbacks that are called when the text changes
number_mc.onChanged = function(){
	var item = tab_tbv.getItemAt(0);
	if(this.text == ""){
		item.data.icon = "warningIcon";
	}else if(isNaN(this.text)){
		item.data.icon = "errorIcon";
	}else{
		delete item.data.icon;
	}
	
	tab_tbv.replaceItemAt(0, item);
}

date_mc.setValidationFunction("isDate", DataValidation);

date_mc.onChanged = function(){
	var item = tab_tbv.getItemAt(2);
	var  valid = this.isValid();
	
	if(this.text == ""){
		item.data.icon = "warningIcon";
	}else if(!valid){
		item.data.icon = "errorIcon";		
	}else{
		delete item.data.icon;
	}

	tab_tbv.replaceItemAt(2, item);
}

letter_mc.onChanged = function(){
	var item = tab_tbv.getItemAt(1);

	if(this.text == ""){
		item.data.icon = "warningIcon";
	}else if(!DataValidation.hasValidChars(this.text, "abcdefghijklmnopqrstuvwxyz")){
		item.data.icon = "errorIcon";		
	}else{
		delete item.data.icon;
	}

	tab_tbv.replaceItemAt(1, item);
}


//tab event
function onSelect(oldIndex, newIndex){
	tab_tbv.getItemAt(oldIndex).data.pane_mc._visible = false;
	tab_tbv.getItemAt(newIndex).data.pane_mc._visible = true;	
}
</pre>
<p>`

 [1]: http://www.macromedia.com/software/drk/productinfo/product_overview/volume3/
 [2]: http://www.macromedia.com/software/drk/productinfo/product_overview/volume3/drk3_docs/index.html
 [3]: http://www.macromedia.com/software/drk/productinfo/product_overview/volume3/flashmx.html
 [4]: http://www.macromedia.com/software/drk/