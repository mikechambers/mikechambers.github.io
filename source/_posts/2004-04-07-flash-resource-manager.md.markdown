---
title: Flash Resource Manager
author: mikechambers
layout: post
permalink: /2004/04/07/flash-resource-manager/
categories:
  - Flash Resource Manager
---


As I [posted][1] last week, I have been playing around (in my free time) with building a small app for viewing the Flash documentation outside of the Flash IDE. Well, the first public version of the Flash Resource Manager is now available.

<img src="/mesh/files/helpapp/screen_2_sm.gif" width="500" height="360" border="0" />

<!--more-->

Flash Resource Manager  
Beta 0.93  
Last Updated July 26, 2004

Created by Mike Chambers

Default graphics and application icons created by Josh Dura.

**Requirements**  
&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;

Requires Windows running the .NET framework. You can download the .NET framework (all 23 megs of it) from:<br?

<http://www.microsoft.com/downloads/details.aspx?FamilyID=262d25e3-f589-4842-8157-034d1e7cf3a3&displaylang=en>

**Installation**  
&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;

It is recommended that you first uninstall previous versions of the application before installing a new version. 
**Features**  
&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;

This application is a standalone resource manager for Macromedia Flash. It offers a number of features, including:

*   Ability to view Flash help outside of the Flash Help panel.
*   Ability to open multiple tabs, and thus view multiple help items at a time.
*   Very fast search that can be filtered by help book.
*   Ability to search with regular expressions.
*   Livedocs integration (only with ActionScript dictionary).
*   Ability to write custom search plug-ins (based on FireFox search plug-in format).
*   Ability to re-skin graphics, and switch between icon themes.
*   Online integration so you always get the latest Flash community news.
*   Ability to set window to always be on top.
*   Support for Macromedia Livedoc HTML format.
*   Highlight search terms in search results.
*   Much, much more&hellip;

&nbsp;

**Screenshots**  
&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;-</strong>

[<img alt="help_prefs_sm.gif" src="/mesh/files/helpapp/help_prefs_sm.gif" width="500" height="365" border="0" />][2]  
Help Preferences with Flex and ColdFusion Docs

&nbsp; 

[<img alt="search_hi_scrn_sm.gif" src="/mesh/files/helpapp/search_hi_scrn_sm.gif" width="500" height="359" border="0" />][3]  
Search Results with search term being highlighted.

&nbsp; 

[<img src="/mesh/files/helpapp/screen_2_sm.gif" width="500" height="360" border="0" />][4]  
Application showing livedocs support

&nbsp; 

[<img src="/mesh/files/helpapp/screen_1_sm.gif" width="500" height="351" border="0" />][5]  
Application showing latests Flash community news and info. 

&nbsp;

[<img src="/mesh/files/helpapp/screen_3_sm.gif" width="500" height="360" border="0" />][6]  
Search results from Regular Expression based search. 

&nbsp;

[<img src="/mesh/files/helpapp/screen_4_sm.gif" width="500" height="341" border="0" />][7]  
Search the macromedia.flash.actionscript newsgroup via a search plugin. 

&nbsp;

**Change Log**  
&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;

July 26, 2004

*   Added support for Flash MX 2004 7.2.
*   Added option to not view help files installed by extensions.
*   You can now set files as start page. You must enter a valid URI.
*   Added home page link to go menu.
*   Latest News link in go menu now goes to latest news, and not home page.
*   Added version support to application settings. The application will only load settings if the settings were created by the same version of the application.

April 15, 2004

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

April 8, 2004

*   Added ability to automatically determine Flash Authoring language
*   Fixed problems with parsing non-English help XML documents

**Change Log**  
&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;

*   The application does not always have focus when it starts.
*   Search highlighting is experimental. Some search terms will break the HTML. (If you know Regular Expressions well, and want to help, let me know).

**Adding Macromedia HTML Help**  
&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;

Flash Resource Manager now has the ability to use Macromedia help in downloadable Livedoc HTML format. This has been tested with the following docs:

Macromedia Flex

http://www.macromedia.com/support/documentation/en/flex/

Macromedia ColdFusion

http://www.macromedia.com/support/documentation/en/coldfusion/

Macromedia Central

http://www.macromedia.com/go/central_sdk

In order to add the docs to the application:

1.  Download and unzip the docs.
2.  Open the Resource Manager Application.
3.  Open View > Preferences Help.
4.  In the HTML section, press the Add button.
5.  Navigate the appropriate XML file within the download docs. There will normally be 2. In general, you want the one with the product name in the file name. The application will validate that you have selected the correct format.
    
    For example, the Flex XML file is:  
    *Htmldoc/000_flex.xml*

6.  The default name for the doc will be the XML file name. Type in the name you want it to appear as.
7.  Click ok, and restart the application.
8.  The new docs should now appear.

If you test it with docs other than the products mentioned above, let me know and I will add it to the list.

Creating new themes  
&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;

To create a new icon theme, copy the themes/Default folder to a new folder within the themes directory. You can then change the images within the directory. Any bitmap image type should work (bmp, gif, jpg, png). You can set the mask color as well as other information about the theme, within the index.xml file included within your theme directory. Images should be 16&#215;16.

The theme name is determined by the name of the theme&#8217;s directory. 

Creating new search plug-ins  
&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;

You can add new search plug-ins by placing them within the search/ directory. Flash Resource Manager uses a subset of the FireFox search plug-in format (which itself is based on the Apple Sherlock plug-in format). It currently only supports GET based plug-ins.

You can read the FireFox plug-in docs at:  
<http://mycroft.mozdev.org/deepdocs/quickstart.html>

Note, the plug-ins must be well formed XML. Many of the FireFox plug-ins are not well formed, and thus you may have to fix them. If you are not sure, just look at one of the existing plug-ins.

&nbsp;

Reporting bugs  
&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;

If you find a bug or have a suggestion, please send it to mesh@macromedia.com. If you experience an application crash, please also send the logs/error.log file, as well as a description of your computer setup, and what you were doing when the application crashed. 

Tips  
&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;

CTRL-Click on a node to open it in a new tab.

SHIFT-Click on a node to open it in a new browser.

If the app seems to be using a lot of memory, try to minimize and then maximize it.

You can customize which buttons appear on the tool bar. The layout will be saved between sessions. 

Notes  
&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;

Resources menu is not yet complete. 

Special Thanks  
&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8211;  
[Chafic Kazoun][8]  
[Robin Debreuil][9]  
Jason Merrill  
Christian Cantrell  
Owen van Dijk

&nbsp;

THIS APPLICATION WAS NOT CREATED BY AND IS NOT AFFILIATED WITH NOR SUPPORTED BY MACROMEDIA.

USE AT YOUR OWN RISK. 

**Download**

**&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;-**

[Download Flash Resource Manager Beta 0.93][10]

&nbsp;

Post suggestions, feature requests and bugs in the comments.

 [1]: /mesh/archives/004640.cfm
 [2]: /mesh/files/helpapp/help_prefs.gif
 [3]: /mesh/files/helpapp/search_hi_scrn.gif
 [4]: /mesh/files/helpapp/screen_2.gif
 [5]: /mesh/files/helpapp/screen_1.gif
 [6]: /mesh/files/helpapp/screen_3.gif
 [7]: /mesh/files/helpapp/screen_4.gif
 [8]: http://www.rewindlife.com
 [9]: http://blog.debreuil.com/
 [10]: /mesh/files/helpapp/FlashResourceManager.zip