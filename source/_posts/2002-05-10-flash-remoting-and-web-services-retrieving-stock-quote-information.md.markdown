---
title: 'Flash Remoting and Web Services : Retrieving Stock Quote Information'
author: mikechambers
layout: post
permalink: /2002/05/10/flash-remoting-and-web-services-retrieving-stock-quote-information/
categories:
  - General
---


This is a simple Flash example that calls a Stock quote web service via Flash Remoting. You can find more info on the web service being used below at [xmethods.net][1].  
1. Download and install the ColdFusion MX [preview release][2].  
2. Download and install the [Flash Remoting add-ons][3] for Flash MX.  
3. Create a new Flash movie and enter the the following code in the first frame of the movie.
<PRE>#include &#8220;NetServices.as&#8221;</PRE>

<PRE>var params = new Object();</PRE>

<PRE>\//this is always 0, and is specific to the web service.<BR />params.LicenseKey = &#8220;0&#8243;;</PRE>

<PRE>\//stock symbol we want information about<BR />params.StockSymbol = &#8220;macr&#8221;;</PRE>

<PRE>\//create an object to catch the response from the web service<BR />var result = new Object();</PRE>

<PRE>\//data is an object which contains properties with information about the stock.<BR />result.onResult = function(data)<BR />{<BR />&nbsp;\//loop through all of the properties and print them out<BR />&nbsp;for(var x in data)<BR />&nbsp;{<BR />&nbsp;&nbsp;trace(x + &#8221; : &#8221; + data[x]);<BR />&nbsp;}<BR />}<BR />&nbsp;<BR />\//this gets called if an error occurs.<BR />result.onStatus = function(error)<BR />{<BR />&nbsp;\//print out the error<BR />&nbsp;trace(&#8220;Error : &#8221; + error.description);<BR />}</PRE>

<PRE>\//the path to the web service&#8217;s WSDL file.<BR />var webServiceWSDL = &#8220;<A href="http://ws.cdyne.com/delayedstockquote/delayedstockquote.asmx?wsdl">http://ws.cdyne.com/delayedstockquote/delayedstockquote.asmx?wsdl</A>&#8220;;<BR />var gw = NetServices.createGatewayConnection(&#8220;<A href="http://localhost:8500/flashservices/gateway/">http://localhost:8500/flashservices/gateway/</A>&#8220;);<BR />var service = gw.GetService(webServiceWSDL, result);</PRE>

<PRE>\//call a method on the web service, passing params.<BR />service.GetQuote(params);</PRE>

<PRE>Test the movie. You should see the data from the web service print in the Output window. </PRE>

 [1]: http://www.xmethods.com/ve2/ViewListing.po;jsessionid=lRlMD1-IEsCVGBCh9jUloy3f(QhxieSRM)?serviceid=47221
 [2]: http://www.macromedia.com/software/trial_download/
 [3]: http://www.macromedia.com/software/flash/flashremoting/#200