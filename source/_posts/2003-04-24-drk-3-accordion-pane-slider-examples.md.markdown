---
title: 'DRK 3 : Accordion Pane / Slider Examples'
author: mikechambers
layout: post
permalink: /2003/04/24/drk-3-accordion-pane-slider-examples/
categories:
  - DRK
---


I have uploaded another example of some of the components included the [DevNet Resource Kit (DRK) Volume 3][1]. This example uses the Accordion Pane and Slider components, and demonstrates sorting sections, and changing the transition speed within the Accordion Pane components. In this example, the sections do not have any content, although when you are using them they would.

<!--more-->

  
<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="300" HEIGHT="300" id="accordion_setTransitionTime" ALIGN="">
  <PARAM NAME=movie VALUE="/mesh/drk/accordion_setTransitionTime.swf"> <PARAM NAME=quality VALUE=high> <PARAM NAME=bgcolor VALUE=#FFFFFF> <EMBED src="/mesh/drk/accordion_setTransitionTime.swf" quality=high bgcolor=#FFFFFF WIDTH="300" HEIGHT="300" NAME="accordion_setTransitionTime" ALIGN="" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED>
</OBJECT>

This example is included on the DRK (one of the 66 component sample files).

You can view the online docs for the Accordion Pane and Slider component [here][1].

You can find more information about the Flash UI Component Set 5 (which includes the TextField and Tab components) [here][2].

You can find more information about DRK 3 [here][3].

Here is the code:  
`
<pre>
//This gets called when the value of the slider changes
onSliderChange = function()
{
	var val = transition_sld.getIntValue();
	transition_txf.text = val;
	
	myAccordion_acp.setTransitionTime(val);
}

//set the change handler for the slider
transition_sld.setChangeHandler("onSliderChange");

//This will sort in ascending order
onSortASCPress = function()
{
	myAccordion_acp.sortItemsBy("label");
}

//this will sort in descending order
onSortDESCPress = function()
{
	myAccordion_acp.sortItemsBy("label", "desc");
}

//initialize values
onSliderChange();
</pre>
<p>`

 [1]: http://www.macromedia.com/software/drk/productinfo/product_overview/volume3/drk3_docs/index.html
 [2]: http://www.macromedia.com/software/drk/productinfo/product_overview/volume3/flashmx.html
 [3]: http://www.macromedia.com/software/drk/