---
title: Example loading data from a data base into Flash MX with Flash Remoting and CF MX
author: mikechambers
layout: post
permalink: /2002/04/29/example-loading-data-from-a-data-base-into-flash-mx-with-flash-remoting-and-cf-mx/
categories:
  - General
---


Below is sample code that shows how to load data from a data base from Flash MX using Flash Remoting and ColdFusion components.  
Download and install the [ColdFusion MX preview release][1].  
Download and install the [Flash Remoting Addons][2] for Flash MX.  
You can download the files [here][3].  
First create a new ColdFusion component, name it DbTest.cfc and save it in wwwroot\com\macromedia\dbtest  
Here is the component code:
<PRE>&lt;cfcomponent&gt;</PRE>

<PRE>&nbsp;&lt;cffunction name=&#8221;getData&#8221; access=&#8221;remote&#8221; returntype=&#8221;query&#8221;&gt;</PRE>

<PRE>&nbsp;&nbsp;&lt;!&#8211; CompanyInfo is a DSN name for an example DB that CFMX sets up by default &#8211;&gt;<BR />&nbsp;&nbsp;&lt;cfquery datasource=&#8221;CompanyInfo&#8221; name=&#8221;result&#8221;&gt;<BR />&nbsp;&nbsp;&nbsp;&nbsp;select * from Employee<BR />&nbsp;&nbsp;&lt;/cfquery&gt;</PRE>

<PRE>&nbsp;&nbsp;&lt;cfreturn result /&gt;</PRE>

<PRE>&nbsp;&lt;/cffunction&gt;</PRE>

<PRE>&lt;/cfcomponent&gt;</PRE>

  
Open Flash, and place a Combo Box component on the stage, and give it an instance name of &#8220;dataBox&#8221;  
add the following ActionScript to the first frame of the Flash movie:
<PRE>#include &#8220;NetServices.as&#8221;<BR />#include &#8220;NetDebug.as&#8221;</PRE>

<PRE>/** we will use an instance of the Result class to capture<BR />&nbsp;the data from the server **/<BR />Result = function()<BR />{<BR />}</PRE>

<PRE>/** onResult is called when data is loaded from the server.<BR />&nbsp;In this case, a RecordSet object will be passed to it **/<BR />Result.prototype.onResult = function(rs)<BR />{<BR />&nbsp;trace(&#8220;Data Received : &#8221; + rs.getLength() + &#8221; rows.&#8221;);<BR />&nbsp;<BR />&nbsp;//data box is a simple combo box on the stage.<BR />&nbsp;dataBox.setDataProvider(rs);<BR />}</PRE>

<PRE>/** onStatus is called if any errors occur when communicating<BR />&nbsp;with the server **/<BR />Result.prototype.onStatus = function(error)<BR />{<BR />&nbsp;trace(&#8220;Error : &#8221; + error.description);<BR />}</PRE>

<PRE>/** set the location of the Flash Remoting gateway **/<BR />NetServices.setDefaultGatewayURL(&#8220;<A href="http://localhost:8500/flashservices/gateway">http://localhost:8500/flashservices/gateway</A>&#8220;);<BR />var gw = NetServices.createGatewayConnection();</PRE>

<PRE>/** get a reference to the service on the server<BR />&nbsp;First param is the path to the service on the server<BR />&nbsp;Second param is the object to send the server response too **/<BR />var server = gw.getService(&#8220;com.macromedia.dbtest.DbTest&#8221;, new Result());</PRE>

<PRE>/** call the remote method **/<BR />server.getData();</PRE>

  
  
Save your Flash movie, and test. You should see all of the data displayed in the combo box. If it is formatted weird, then make the combo box wider.  
If you get any errors, open the NetConnection Debugger (Windows > NetConnection Debugger) and then retest your movie. This will show all of the communication between Flash and the server.  
This is just a simple example, but shows how easy it is to do some pretty complex stuff in Flash MX with Flash Remoting.

 [1]: http://www.macromedia.com/software/trial_download/
 [2]: http://www.macromedia.com/software/flash/flashremoting/
 [3]: /mesh/files/dbtest.zip