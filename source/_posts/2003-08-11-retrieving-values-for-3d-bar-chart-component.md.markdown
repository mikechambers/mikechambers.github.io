---
title: Retrieving Values for 3D Bar Chart Component
author: mikechambers
layout: post
permalink: /2003/08/11/retrieving-values-for-3d-bar-chart-component/
categories:
  - DRK
---


A question was posted to my weblog asking how to retrieve the data for the individual bar chart section selected in the 3D Bar chart included as part of the Flash Charting Components Set 2 on DRK 4.

If you are using a listener to capture the select / press event, it is very simple as all of the data is passed to the listener method.

Here is an example:

<!--more-->

  
`
<pre>var dp = new DataProviderClass();
dp.addItem( { data: [1,2,3,4,5,6,7], color: 0xFF0000, label: "red co." } );
dp.addItem( { data: [3,4,5,6,7,8,9], color: 0x00FF00, label: "green co." } );
dp.addItem( { data: [4,9,8,7,6,5,4], color: 0x0000FF, label: "blue co." } );

myBarChart_abc.setDataProvider ( dp );

// define listener object and events
var listener = {};

listener.onSelect = function ( chart_component, groupIndex, itemIndex )
{
trace("data : " + chart_component.getItemAt(groupIndex).data[itemIndex])
}

// add the listener to the chart
myBarChart_abc.addListener ( listener );</pre>
<p>`

You can find more information on the Charting Component Set 2 and DRK 4 [here][1].

 [1]: http://www.macromedia.com/go/drk4/