---
title: 'Example : loading data from a data base into Flash MX with Flash Remoting and ServerSide ActionScript'
author: mikechambers
layout: post
permalink: /2002/04/30/example-loading-data-from-a-data-base-into-flash-mx-with-flash-remoting-and-serverside-actionscript/
categories:
  - General
---


First, view the following tutorial / example:  
[Example : loading data from a data base into Flash MX with Flash Remoting and CF MX][1]  
we will use the same Flash MX&nbsp;code in that example, and just change the server side code.  
Instead of creating a ColdFusion component called DbTest.cfc, create a file called DbTest.asr. Make&nbsp;sure that you rename the DbTest.cfc to something else if you did the first tutorial.  
Add the following to the DbTest.asr file:
<PRE>function getData()<BR />{</PRE>

<PRE>&nbsp;/**create an object to hold our parameters**/<BR />&nbsp;var queryData = new Object();<BR />&nbsp;<BR />&nbsp;/**set the DSN name pointing to the database**/<BR />&nbsp;queryData.datasource = &#8220;CompanyInfo&#8221;;</PRE>

<PRE>&nbsp;/**setup our SQL Query**/<BR />&nbsp;queryData.sql = &#8220;select * from Employee&#8221;;</PRE>

<PRE>&nbsp;/**Execute the query, and store the results in a variable**/<BR />&nbsp;var rs = CF.query(queryData);<BR />&nbsp;<BR />&nbsp;/**return the RecordSet to flash**/<BR />&nbsp;return rs;<BR />}</PRE>

  
You don&#8217;t need to change anything in the Flash code. Create the Flash movie according to the directions in the tutorial and test your movie.

 [1]: http://radio.weblogs.com/0106797/categories/examples/2002/04/29.html#a20