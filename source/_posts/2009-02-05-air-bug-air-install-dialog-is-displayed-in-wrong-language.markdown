---
title: 'AIR Bug : AIR Install dialog is displayed in wrong language'
author: mikechambers
layout: post
permalink: /2009/02/05/air-bug-air-install-dialog-is-displayed-in-wrong-language/
categories:
  - General
tags:
  - air
---


There is a known issue with the Adobe AIR 1.5 install on Mac where in certain circumstances the install dialog will appear in the wrong language (usually Japanese or Chinese). If you run into this, here are the steps to work around it:

1.  Go to System Preferences
2.  Select International
3.  Make some changes to the Language list: add a language, re-order a language. Also, might want to make sure English is the first one in his list at this point.
4.  Try installing Air again.

This is a known issue and will be fixed in the next AIR dot release.