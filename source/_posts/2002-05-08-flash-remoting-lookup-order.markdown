---
title: Flash Remoting Lookup Order
author: mikechambers
layout: post
permalink: /2002/05/08/flash-remoting-lookup-order/
categories:
  - General
---


Here is the order in which Flash Remoting looks for server side code when a request is made from Flash MX to the server via Flash Remoting. Note that this order only applies when using ColdFusion MX:  
  
1.  CF Template
  
2.  CF Component
  
3.  ServerSide ActionScript
  
4.  JavaBean (stateful)
  
5.  Java Class (no state and no pool, new instance on every request)
  
6.  EJB (EJBHome and EJBObject)
  
7.  JMX MBean
  
8.  Web Service

  
I will post the order for other server when they become available.  
[thanks sean neville]