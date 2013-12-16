---
title: Central SDK Beta Release Notes
author: mikechambers
date: 2003-10-15 12:10:01 -0800
layout: post
permalink: /2003/10/15/central-sdk-beta-release-notes/
categories:
  - Central
---


The releases notes for the [Central SDK beta][1] are included within the SDK zip file. I am posting them here for easier reference.

<!--more-->

This document lists known issues that may arise when using the contents of the SDK.

&nbsp; 

##### Component and API Help documents for the Flash Authoring Environment

The SDK beta does not contain Central component and API documentation and code hinting for Flash MX or Flash MX 2004. The final version of the SDK will contain full documentation and code hinting for the authoring environments.

&nbsp;

##### Sample Applications 

Some of the sample applications have not been updated and thus may contain code or techniques that will not be necessary in the release version of Macromedia Central. The sample applications will be updated for the final release of the SDK.

&nbsp;

##### Testing / Debugging Applications within Central

###### Using Trace statements 

The SDK contains a Central Debug panel that will print out trace statements from applications running within Macromedia Central. In order to enable trace support within your application, you must added the following line of code to your application:

`debug.enabled = true;`

This will allow Central to redirect all trace statements that it encounters to the Central Debug panel. This step will not be necessary in the final version of Central.

###### Capturing debug information within Central 

We will be making a debug panel available that runs within the Central authoring environment. This is currently not available.

&nbsp;

##### Installing Authoring Templates

The SDK includes authoring templates for both Flash MX and Flash 2004. However, if you have both versions of Flash installed on your system, the extension manager will only automatically install the extensions for the latest version of Flash. 

In order to install the authoring extensions for both version of Flash, you must follow the following steps:

1.  Open the Extension Manager
2.  Select the version of Flash that you want to install for from the product select drop down.
3.  Select File > Install Extension and locate the appropriate extension.
4.  Follow the prompts.

&nbsp;

##### Central Components

###### MDialogBox Component 

The Central Component documentation has documentation for the MDialogBox component. This is a component that creates advanced modal dialog boxes for applications. The component is not available within the SDK beta. It will be available in the final version of Central and the SDK.

&nbsp;

###### Components do not appear when testing in Authoring Environment

The Central Components are implemented as Remote Shared Libraries. Because of an issue with how the Flash authoring environment handles remote shared libraries, they will not work in authoring mode. In order to test the components, you must test your application within Macromedia Central. See chapter 1 of the Developing Applications PDF on the SDK for more information on testing and debugging applications within Central. 

&nbsp; </div>

 [1]: http://www.markme.com/mesh/archives/003544.cfm