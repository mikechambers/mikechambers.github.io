---
title: Sorting Date fields in a DataGrid in the Flex Framework
author: mikechambers
date: 2005-04-27 12:54:01 -0800
layout: post
permalink: /2005/04/27/sorting-date-fields-in-a-datagrid-in-the-flex-framework/
categories:
  - Flex
---


I was working on some new mini chart apps over the weekend for the [MXNA reports section][1], and had a DataGrid that contained dates. I wanted to allow the user to sort the datagrid by the DateField, but by default the DataGrid sorts dates with a string compare (calling toString on the Date instance).

I tried to set up a custom sort function for the DataGridColumn instance that contained the dates, but because I was using a custom label format function for the column, Flex passed the labels to me, and not the data items (which would allow me to get access to the Date instance). Because of this, I couldn&#8217;t sort on the date.

<!--more-->

There is an [example on Macromedia.com][2] that shows how to sort by dates, but it requires that you override and implement all sorting for the DataGrid (something which seemed unecessary and overkill to me). Peter Ent also [posted an example][3], but it required massaging the data on the server first, something which was not an option for me since I was using a public web service API.

So, after much trial and error, and help from [Matt Chotin][4], I finally got it working, and figured I would post it here.

Basically, I listen for the headerRelease event for the DataGrid. If it is in response to the date column being clicked, then I sort the dataprovider that the DataGrid is hooked up to (otherwise, I do nothing, and let the DataGrid do the sorting).

Here is an example:



Here is the Code:

&#8212;&#8212;&#8212;-DateSortExample.mxml&#8212;&#8212;&#8212;-

`
<pre><?xml version="1.0"?>

<mx:Application xmlns:mx="http://www.macromedia.com/2003/mxml" initialize="initTag()"
	backgroundColor="0xFFFFFF" marginTop="0" marginLeft="0" marginRight="0" marginBottom="0">		
	
	<mx:Script source="DateSortExample.as" />   

	<mx:Panel title="DataGrid Date sorting example" width="475" height="350">
	
	    <mx:DataGrid id="dg" height="100%" width="100%">
	        	<mx:columns>
		        <mx:Array>
            	        <mx:DataGridColumn headerText="Letters" width="50" columnName="letter" />
            	        <mx:DataGridColumn headerText="Numbers" width="50" columnName="number" />
            	        <mx:DataGridColumn headerText="Dates" columnName="date" />
            	   </mx:Array>
            	</mx:columns>
	    </mx:DataGrid>
	
	</mx:Panel>
</mx:Application></pre>
<p>`

&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;-

&#8212;&#8212;&#8212;-DateSortExample.as&#8212;&#8212;&#8212;-

`
<pre>

private var dp:Array;
private var sortOrder:Number = 1;

private  function initTag():Void
{
	//listend for the headerRelease event on the datagrid, which is broadcast
	//when any of the column headers are clicked.
	dg.addEventListener("headerRelease",
		mx.utils.Delegate.create(this, onDateHeaderRelease));
	
	dp = new Array();
	
	//pupulate the date grid with some data.
	var item:Object;
	var randomDay:Number;
	var randomMonth:Number;
	for(var i:Number = 0; i < 15; i++)
	{
		randomDay = Math.floor(Math.random() * 30);
		randomMonth = Math.floor(Math.random() * 12);
		
		item = new Object();
		item.date = new Date(2005, randomMonth, randomDay);
		item.letter = String.fromCharCode(i + 65);
		item.number = i;
		
		dp.push(item);
	}
	
	//set the dataProvider for the datagrid
	dg.dataProvider = dp;
}


//Note, this should be in a DateUtils class
/*
	returns
	-1 : first date is larger than the second
	 1 : first date is smaller than the second
	 0 : Both dates are the same
*/
private static function compareDates(d1:Date, d2:Date):Number
{
	var d1ms:Number = d1.getTime();
	var d2ms:Number = d2.getTime();
	
	if(d1ms > d2ms)
	{
		return -1;
	}
	else if(d1ms < d2ms)
	{
		return 1;
	}
	else
	{
		return 0;
	}
}


//compares the dates
private function dateFieldCompare(item1:Object, item2:Object, bit:Number):Number
{
	//determine which way the column should be sorted (ASC or DESC
	var toggle:Number = (bit == Array.DESCENDING)? 1 : -1;
	
	//call compare date function, and then toggle the sort direction
	return toggle * compareDates(item1.date,item2.date);
}

//called when any of the datagrids column headings are clicked
private function onDateHeaderRelease(eventObj:Object):Void
{	
	//Only sort if the Date column head was clicked
	if(eventObj.columnIndex == 2)
	{
		//sort the dataProvider directly, passing the function to do the sort
		//and a bit indicating whether to sort ascending or descending
		dp.sortItems(dateFieldCompare, ((sortOrder == 1)? 0: Array.DESCENDING));
		
		//reverse the sort order so the next time the column is clicked, it is
		//sorted in the reverse order
		sortOrder *= -1;
	}
}</pre>
<p>`

&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;-

You can download the source from [here][5] (or right click on the example).

<!-- Creative Commons License -->

  
<a rel="license" href="http://creativecommons.org/licenses/by/2.0/"><img alt="Creative Commons License" border="0" src="http://creativecommons.org/images/public/somerights20.gif" /></a>

This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/2.0/">Creative Commons License</a>.  
<!-- /Creative Commons License -->

<!--</p>

<rdf:RDF xmlns="http://web.resource.org/cc/"  
xmlns:dc="http://purl.org/dc/elements/1.1/"  
xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">  
<Work rdf:about=""><license rdf:resource="http://creativecommons.org/licenses/by/2.0/" /> </Work>

<License rdf:about="http://creativecommons.org/licenses/by/2.0/"><permits rdf:resource="http://web.resource.org/cc/Reproduction" /> <permits rdf:resource="http://web.resource.org/cc/Distribution" /> <requires rdf:resource="http://web.resource.org/cc/Notice" />

  
<requires rdf:resource="http://web.resource.org/cc/Attribution" /></p> <permits rdf:resource="http://web.resource.org/cc/DerivativeWorks" /> </License></p> 
</rdf:RDF>  
&#8211;>

 [1]: http://weblogs.macromedia.com/mxna/reports/
 [2]: http://www.macromedia.com/support/documentation/en/flex/1_5/releasenotes.html#latenews
 [3]: /pent/archives/006686.cfm
 [4]: /mchotin/
 [5]: /mesh/files/DateSortExample/DateSortExample.zip