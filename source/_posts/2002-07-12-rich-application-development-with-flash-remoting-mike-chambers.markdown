---
title: 'Rich Application Development with Flash Remoting : Mike Chambers'
author: mikechambers
date: 2002-07-12 12:45:01 -0800
layout: post
permalink: /2002/07/12/rich-application-development-with-flash-remoting-mike-chambers/
categories:
  - Conferences
---


This was my session on Flash Remoting (sorry,&nbsp;i couldn&#8217;t blog it in real time). It was an advanced session, and i spent a lot of time talking about architeting Flash Remoting Applications.  
I discussed Object Oriented Client / Server interfaces, which is a design patter where you encapsulte all of your client / server code within ActionScript objects. This makes the code more reusable, but also creates a simplified ActionScript API for the service. It also abstracts all of the complexity of the code, and client / server communications away from the developer / user.  
I show some simple ActionScript examples that demonstrated this (i will upload them later). I then went through and showed some Applications that used some Client / Server Service Libraries (Email and Stock). I showed an stock charting app, and well as a Flash Email client i created (which has a sneak peak of some new components).  
I then showed a simple flash application that called the google web service via Flash Remoting, and allowed you to search google from Flash.  
Finally, i pulled up the stock application again, change one line of code (pointing to the server), and switched the back end code from ColdFusion to an .NET DLL written in c#. The Flash Remoting code was the same conencting to both. The server side code has no flash specific code in it, and I pulled up a windows app that used the DLL to deomstrate this.  
I will try to post some more details and files later.  
end of session