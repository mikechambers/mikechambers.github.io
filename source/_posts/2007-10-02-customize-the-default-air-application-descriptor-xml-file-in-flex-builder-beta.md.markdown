---
title: Customize the default AIR application descriptor xml file in Flex Builder beta
author: mikechambers
layout: post
permalink: /2007/10/02/customize-the-default-air-application-descriptor-xml-file-in-flex-builder-beta/
categories:
  - air
---


Here is a quick tip, that I got from Tom Lane on the Flex Builder team. If you do a lot of [AIR][1] development, then you have probably noticed that the default application descriptor file in [Flex Builder 3 Beta 2][2], is heavily commented. While this makes it easy to learn the new tags, it can be a little overwhelming, and make it difficult to find the actual tags you need.

Luckily, there is an easy way to edit the default template for the file. Note, this is not supported and subject to change in the future.  
<!--more-->

  
Simply edit the application descriptor file in the following directory:

`FLEXBUILDERINSTALLDIR/plugins/com.adobe.flexbuilder.apollo_3.0.183654/resources/default-application.xml`

Of course, make sure to back up the original one in case you ever want to get back to the default template.

 [1]: http://www.adobe.com/go/air
 [2]: http://labs.adobe.com/technologies/flex/flexbuilder3/