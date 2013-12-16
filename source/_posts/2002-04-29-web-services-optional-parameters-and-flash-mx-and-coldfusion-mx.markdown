---
title: Web Services, Optional Parameters and Flash MX and ColdFusion MX
author: mikechambers
date: 2002-04-29 12:56:01 -0800
layout: post
permalink: /2002/04/29/web-services-optional-parameters-and-flash-mx-and-coldfusion-mx/
categories:
  - General
---


If you are playing around with calling web services from Flash Remoting or ColdFusion MX, you have to pass all parameters to the web service even if they are not required.  
From what i understand, this is an issue with the [Axis][1] code that CFMX uses for communicating with web services.

 [1]: http://xml.apache.org/axis/