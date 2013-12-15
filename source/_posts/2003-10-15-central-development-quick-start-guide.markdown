---
title: Central Development Quick Start Guide
author: mikechambers
layout: post
permalink: /2003/10/15/central-development-quick-start-guide/
categories:
  - Central
---


I have put together a quick, step by step guide to getting started with application development for Central.

Note that all page numbers refer to the Developing Central Applications pdf included on the SDK.  
<!--more-->

*   Download and install Macromedia Central (http://www.macromedia.com/go/install_central)
*   Download the Central beta SDK (http://www.macromedia.com/go/central_sdk)
*   Install the Central Components from the SDK (components/) (page 12)
*   Install the Central Debug Panel from the SDK (Utilities/DebugPanel) (page 17)
*   Create a new FLA (you can use the Authoring Templates on the SDK (Utilities/AuthoringTemplates)) (page 13)
*   If you didn&#8217;t use the Authoring templates, set the FPS to 21 (that is what Central runs at).
*   Open File > Publish Settings > Flash. Set to publish as Flash 6. If you are using Flash MX 2004, set it to optimize for Flash Player 6,0,65,0.
*   Make sure &#8220;Omit Trace Actions&#8221; is not checked.
*   Add the following functions to your Application onActivate (page 103), onDeactivate (page 104), Central.initApplication() (page 144). (If you use the template, these are already added) (page 14)
*   Add initialization code to onActivate and clean up code to onDeactivate.
*   Add a graphic to the stage so you can tell whether or not it loads into Central.
*   Publish your movie to create a SWF file.
*   Get a development product id from http://www.macromedia.com/go/central_productid (page 15)
*   Create a product.xml file (you can use the one from the product id page). Make sure it includes your product id and the application tag (page 15).
*   Copy the product.xml file and your swf file into a separate directory.
*   Copy the install badge from the SDK (Utilities/InstallBadge/installer.swf) into the same directory as the product.xml and SWF files (page 15).
*   Copy the directory to a web server (local or remote).
*   Load the installer.swf file into a web browser via the web server.
*   Install your application from the badge.
*   Once it is installed into Central, you can then publish directly from Flash into Central (page 16).
*   Find the location where you application files were installed by Central. On Windows this will be similar to: C:\Documents and Settings\USERNAME\Application Data\Macromedia\Central\DOMAINNAME\APPNAME . On Mac, this will be similar to: Hard Drive/Users/USERNAME/Library/Application Support/Macromedia/Central/DOMAINNAME/APPNAME/
*   Open the Publish Settings Dialog (File > Publish Settings).
*   Set the file to Publish into the directory located above. Make sure that the file is published with the same file name that was installed by Central.
*   Save the settings, by clicking OK.
*   To test your application, you must publish it (File > Publish). This will compile the SWF into its application directory within Central. You can then view the updated application file by switching to Central and reloading the application by switching to another application within Central and then switching back. If you are testing a Pod, you must close the pod and reopen it. If you are testing an Agent, you must restart Central.
*   You can now use trace statements in your app to debug apps running within Central (page 17)
*   Open the debug panel in the Flash Authoring Environment. In Flash MX it is located in the Windows > Central Debug Panel menu. In Flash MX 2004 it can be located in the Windows> Other Panels > Central Debug Panel.
*   Make sure that Â“Omit trace actionsÂ“ is not checked in the public settings (File > Publish Settings > Flash).
*   Add debug.enabled = true to your application. This will enabled debugging.
*   Add trace statements to your application. You can pass in various data types including strings, objects and arrays.
*   Test your application within Central. Any trace statements encounter during the applicationÂ’s runtime will be printed out into the Debug Panel within the Flash Authoring Environment. If they don&#8217;t appear, close the debug panel and re-open it.

You can find more info on Macromedia Central [here][1].

 [1]: http://www.macromedia.com/devnet/central/