---
title: Flash Resource Manager Updated / Flex and ColdFusion Support
author: mikechambers
date: 2004-04-15 12:15:01 -0800
layout: post
permalink: /2004/04/15/flash-resource-manager-updated-flex-and-coldfusion-support/
categories:
  - Flash Resource Manager
---


I have released a new version of my [Flash Resource Manager application][1]. It includes a bunch of bug fixes, as well as the ability to highlight the search term in search results, and support for Livedoc based HTML docs (Flex, CF and Central have been tested).

Here is the change Log

*   Added ability to add Macromedia HTML based docs (tested with Flex, ColdFusion and Central)
*   Added Preferences > Help to manage, add and edit which HTML docs are included.
*   Added Flash HowTo help books to default install.
*   Added ability to search documents from the help tree context menu (will search for currently selected item).
*   Added ability to search plugins from the help tree context menu (will search for currently selected item).
*   Fixed bug where application window would not always have focus when launched.
*   Added preference to toggle the collapsed state of a node when it is clicked.
*   Fixed bug where regular expression check box was being ignore in searches (all searches were treated as regular expressions)
*   Fixed bug where items were added to search filter even if index file was invalid. (Thanks Jason Merrill)
*   Moved Flash docs to be contained within top level folders / nodes.
*   Added ability to toggle which top level Flash documents / books are available (View > Preferences > Help).
*   Improved start up time
*   Search terms will now be highlighted when viewing search results (this is currently an experimental feature). 
*   Added back / forward browser buttons (I will implement browser features better in future releases)
*   removed toolbar layout persistence into separate file. This should not be edited by hand. 

You can find more information, view screenshots, and download the application from [here.][1]

 [1]: /mesh/archives/004700.cfm