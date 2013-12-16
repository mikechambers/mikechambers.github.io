---
title: 'DRK : Stock Services Sample Application Update'
author: mikechambers
date: 2002-10-15 12:06:01 -0800
layout: post
permalink: /2002/10/15/drk-stock-services-sample-application-update/
categories:
  - DRK
---


I have&nbsp;found an issue&nbsp;with the Stock Services [sample application][1] and ActionScript / ColdFusion Library available on the [DRK][2]. In the Stock.cfc ColdFusion component file, the following code that starts at line 89:
<PRE>&nbsp;&nbsp;&lt;cfset var startMonth =&nbsp; Month(startDate)&nbsp; /&gt;<BR />&nbsp;&nbsp;&lt;cfset var startDay =&nbsp; Day(startDate)/&gt;<BR />&nbsp;&nbsp;&lt;cfset var startYear =&nbsp; Year(startDate) /&gt;<BR />&nbsp;&nbsp;&lt;cfset var endMonth =&nbsp; Month(endDate) /&gt;</PRE>

  
should be changed to:
<PRE>&nbsp;&nbsp;&lt;cfset var startMonth =&nbsp; Month(startDate) &#8211; 1 /&gt;<BR />&nbsp;&nbsp;&lt;cfset var startDay =&nbsp; Day(startDate)/&gt;<BR />&nbsp;&nbsp;&lt;cfset var startYear =&nbsp; Year(startDate) /&gt;<BR />&nbsp;&nbsp;&lt;cfset var endMonth =&nbsp; Month(endDate) &#8211; 1 /&gt;</PRE>

  
If you noticed that the sample stock charting application began acting erratically, this should solve the problem. Sorry for the hassle.

 [1]: http://www.macromedia.com/software/drk/productinfo/volume1/product_overview/additional_resources.html#1
 [2]: http://www.macromedia.com/software/drk/