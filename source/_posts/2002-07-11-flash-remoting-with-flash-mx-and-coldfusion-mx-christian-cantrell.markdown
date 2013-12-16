---
title: 'Flash Remoting with Flash MX and ColdFusion MX : Christian Cantrell'
author: mikechambers
date: 2002-07-11 12:13:01 -0800
layout: post
permalink: /2002/07/11/flash-remoting-with-flash-mx-and-coldfusion-mx-christian-cantrell/
categories:
  - Conferences
---


Christian Cantrell : <qantrell@yahoo.com>&nbsp;: note all code examples, and slides (very nice) will be included online.  
Flash Remoting is a server-side technology which allows for the intergration of Flash applications with existing application server logic.  
Exposes remote services through a simple ActionScript API.  
Uses AMF (Action Messaging Format) to communicate with player / server. Very efficient binary format made specifically for ActionScript.  
Getting started : need  
  
*   Flash MX  
    *   Flash Remoting Components (avaliable from macromedia.com)  
        *   A server that has the Flash Remoting Adaptor installed.</UL>
          
        Flash Remoting ActionScript objects:  
          
        *   NetServices.as : core ActionScript logic of Flash Remoting. Provides functionality to connect to Flash Remoting adaptor on server.  
            *   RecordSet : Object representing a set of data records, usually returned from a database.  
                *   DataGlue : Utility object for mapping columns in a RecordSet to proerties of UI components.  
                    *   NetDebug : Utlity object for helping to debug&nbsp;client/server interactions (using NetConnectoin Debugger Panel).</UL>
                      
                    Creating packages for Flash Remoting Services  
                    A package is implimented as a logical directory structure where the files that contain Flash Remoting services are kept. (start from the document root).  
                    Uses domain name in reverse (com/domainname) to prevent namespace collisions (i.e. two services with the same name). by placing them in a directory structure like this, you dont have to worry about other peoples files overwriting yours (just like java packages).  
                    In actionscript, you use dots, instead of slashes to refer to directory structure (com.domainname) (*note, i think you can do it either way-mc*).  
                    Creating Flash Remoting Services with ColdFusion pages (.cfm)  
                    ColdFusion pahes that are called through Flash Remoting have access to the &#8220;flash&#8221; variable scope, which contains all of the data sent from Flash.  
                    The directory containing the page is considered the service, and the page name is treated like the function name.  
                    simple flash remoting service in CFML
                    <PRE>&lt;!&#8212;package com.macromedia.flashforward&#8212;&gt;</PRE>
                    
                    <PRE>&lt;cfset str = #flash.params[1]# /&gt;</PRE>
                    
                    <PRE>&lt;cfset flash.result = Reverse(#str#) /&gt;</PRE>
                    
                      
                    This is a ColdFusion service that takes a string, and returns it in reverse. The params array is an array that contains all of the aruguments and data passed in from the Flash applicaiton (via Flash Remoting).  
                    ActionScript:  
                    NetServices.setGatewayURL(url); this tells Flash where the server is located.  
                    var con = NetServices.createGatewayConnection(); //this returns a reference to the server.  
                    var pageService = con.getService(&#8220;com.macromedia.flashforward&#8221;, this); //this gets a reference to the remote service. the second parameter, specifies where the functions that will handle the data sent back from the server will be (in this case on the same timeline as the ActionScript code).  
                    (note : christian is running his presentation from a powerbook with OSX. He is running ColdFusion MX on OSX.).  
                    Creating services for Flash using ColdFusion Components  
                    A single ColdFusion Component can provide multiple services (implimented as functions). These can also be called directly from ColdFusion pages, or as web services.  
                    note : code will be avaliable online.  
                    ActionScript  
                    Instead of specifying callback functions that receive the data from the server, on the main timeline, you should attach them to an object, so you keep the functions within their own scope / namespace.
                    <PRE>var result = new Object();</PRE>
                    
                    <PRE>result.onResult = function(data){//stuff here};</PRE>
                    
                      
                    christian named his buttons the same as his remote service, that way he can use the button labels to decide which function to call:
                    <PRE>function clickHandler(button){urlService[button.getLabel()](input.text);};</PRE>
                    
                      
                    performing a databse query using a ColdFusion Component (CFCs)  
                    The entire ColdFusion Query object can be returned directly to Flash. it will be converted to an ActionScript RecordSet object.  
                    You can set a pagesize which determines the number of rows the server wil lreturn to the client until the client asks for more (i.e. only initially send first 10 rows of 1000). Server will then send the rest of the rows on demand (without going back to the database, only to Flash Remoting Adaptor).  
                    Just use a regular CFQUERY tag to get a Query object. You can then return it directly to Flash using CFRETURN.  
                    ActionScript  
                    function that receives data from server:
                    <PRE>function onResult(result)</PRE>
                    
                    <PRE>{</PRE>
                    
                    <PRE>//dataConsumer, dataProvider, labelString, dataString</PRE>
                    
                    <PRE>DataGlue.bindFormatStrings(name, result, &#8220;#LastName#, #FirstName#&#8221;,&#8221; #EmployeeID#&#8221;)</PRE>
                    
                    <PRE>}</PRE>
                    
                      
                    note, my battery is running low.  
                    ServerSide ActionScript  
                    SSAS allows Flash Developers and designers access to server-side programming with almost no learning code.  
                    simple SSAS service:
                    <PRE>function sayHello()</PRE>
                    
                    <PRE>{</PRE>
                    
                    <PRE>&nbsp;&nbsp;&nbsp; return &#8220;Hello World&#8221;;</PRE>
                    
                    <PRE>}</PRE>
                    
                      
                    called the same way from Flash as you would call ColdFusion services.  
                    my battery died. Christian showed some server side actionscript examples, and (connecting to DB and loading files).  
                    he then showed an Flash App that used Flash Remoting to play mp3s off of his iPod. pretty sweet.  
                    end of session.</p>