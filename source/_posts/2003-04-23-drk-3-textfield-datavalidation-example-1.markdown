---
title: 'DRK 3 : TextField / DataValidation Example 1'
author: mikechambers
date: 2003-04-23 12:19:01 -0800
layout: post
permalink: /2003/04/23/drk-3-textfield-datavalidation-example-1/
categories:
  - DRK
---


I have been getting some requests for some examples of the components included on DRK 3, so I am going to try and post a bunch over the coming days.

The first example is a simple one showing how to validate user input using the TextField component and Data Validation library.

<!--more-->

  
<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="250" HEIGHT="175" id="text_validation" ALIGN="">
  <PARAM NAME=movie VALUE="/mesh/drk/text_validation.swf"> <PARAM NAME=quality VALUE=high><PARAM NAME=bgcolor VALUE=#FFFFFF> <EMBED src="/mesh/drk/text_validation.swf" quality=high bgcolor=#FFFFFF WIDTH="250" HEIGHT="175" NAME="text_validation" ALIGN="" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED>
</OBJECT>

And here is the code:

`
<pre>
#include "com/macromedia/validation/DataValidation.as"

//set the function to be called when isValid is called.
//in this case it is the isDigit function from the DataValidation library
myTextField_txf.setValidationFunction("isDigit", DataValidation);

//set the default textfield icon to error.
myTextField_txf.setIcon("ftf_errorIcon");

//this is called when the validate button is pressed
validate_btn.onRelease = function()
{
	//call isValid to see if user input is valid.
	if(!myTextField_txf.isValid())
	{
		//if it is not, give an error and show the error icon.
		msgBox_txf.text = "Invalid Input. Please enter a number.";
		myTextField_txf.showIcon(true);
	}
	else
	{
		//if it is valid, make sure the icon is off.
		msgBox_txf.text = "The input is a valid number";
		myTextField_txf.showIcon(false);
	}
}
</pre>
<p>`

You can view the on-line docs for the TextField component [here][1].

You can find more information about the Flash UI Component Set 5 (which includes the TextField component) [here][2].

You can find more information about DRK 3 [here][3].

Post any requests for specific examples in the comments.

 [1]: http://www.macromedia.com/software/drk/productinfo/product_overview/volume3/drk3_docs/index.html
 [2]: http://www.macromedia.com/software/drk/productinfo/product_overview/volume3/flashmx.html
 [3]: http://www.macromedia.com/software/drk/