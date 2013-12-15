---
title: Problems logging into DevChat?
author: mikechambers
layout: post
permalink: /2003/11/20/problems-logging-into-devchat/
categories:
  - Central
---


A lot of people have been telling me they have been having problems logging into DevChat lately. I have also noticed this and we finally figured out what the problem was. The server was moved recently, and it looks like they are blocking some FlashCom ports. Because of this, the Flash Player has to loops through trying to find a port that it can connect on (which ends up taking a long time).

We will release a new version of the chat soon that fixes this problem, but in the meantime, if you wait long enough, it should eventually connect. Sorry for the hassle.