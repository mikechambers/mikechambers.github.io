---
title: Updated Flash Communication Server Components
author: mikechambers
date: 2002-11-13 12:37:01 -0800
layout: post
permalink: /2002/11/13/updated-flash-communication-server-components/
categories:
  - General
---


We have released updated Flash Communication Server components. It includes a number of bugs fixes, as well as two new components:  
  
*   VideoRecord
  
*   VideoPlayback

  
I think that these are the components that Jeremy used to create the DevCon [video blog applicaiton][1]. Here is some info from the errata.txt file included with the components:  
**CLIENT-SIDE**  
  
*   The SimpleConnect component no longer has a memory leak on the client-side; previously, the memory leak occurred if you&nbsp;&nbsp;typed faster than 1 character every 10 milliseconds.
  
*   The Presenter Shared Object property of the AVPresence component has been removed. Flash Communication Server now&nbsp; sets the value property of the property automatically. You can use multiple instances of the AVPresence component in one&nbsp; application without having to set this property for each instance.  
    &nbsp;

  
**SERVER-SIDE**  
  
*   The application.asc and framework.asc files have been modified to allow garbage collection for applications using&nbsp; components.&nbsp;
  
*   A new method, getClientID(client), has been added to the components framework. This method returns a unique ID for each client. The server-side scripts of the components provided have been updated to use this method.

  
You can download the updated components from [here][2].

 [1]: http://bilbo.macromedia.com/devconblog/blogitems.cfm
 [2]: http://www.macromedia.com/software/flashcom/download/components/