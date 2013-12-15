---
title: Macromedia News FireFox Extension Preferences
author: mikechambers
layout: post
permalink: /2004/12/09/macromedia-news-firefox-extension-preferences/
categories:
  - General
---


As I [posted][1] the other day, I have built an [extension][2] for [FireFox][3] that makes it easy to keep up with the latest news and information from Macromedia. Judging by the number of downloads, as well as emails I have received, it seems to be pretty popular.

I have also received a couple of emails asking for features / changes that are already possible by tweaking the preferences. So, I figured I would make a post to describes in detail what each preference does, as well as describe some undocumented settings.  
<!--more-->

  
First, if you have not already installed the extension, then:

[Install the Macromedia News FireFox Extension][4] (requires [FireFox 1.0][3])

Once you have installed the extension and restarted FireFox, then you are ready to go.

You can modify the preferences a number of ways:

*   Click the extension icon (bottom right of status bar) and click Preferences.
*   Open the Extension Manager (Tools > Extensions), choose Macromedia News, right click and select Preferences.
*   Type about:config in the URL field for FireFox, and filter for settings that start with &#8220;macromedianews&#8221;.

All preferences will take affect as soon as they have been changed.

Once you open the preferences you will see the following window:

<img src="/macromedianews/images/prefs_screen.gif" width="215" height="357" />  
Preferences Menu

&nbsp;

Lets go over each preference:

**Trim Title** : If checked, if the length of the title of an item is greater than the trimTitleLength setting (default of 35), then the title will be shortened to the trimTitleLength setting, and an ellipsis will be added. If not checked, then the entire title will be shown (FireFox may cut it off to make it fit in the menu).

This setting is useful if you don&#8217;t want the menu to take up a lot of space.

Here are some examples:

<img width="317" height="22" src="/mesh/files/macromedianews/trim_on_scrn.gif" />  
Item with Trim Title on.

&nbsp;

<img width="317" height="22" src="/mesh/files/macromedianews/trim_off_scrn.gif" />Item with Trim Title off.

&nbsp;

**Display Source** : This determines whether the name of the source that the item is from will be displayed (i.e. which weblog it is from). If checked, then the source will be added in parentheses after the title.

<img width="317" height="22" src="/mesh/files/macromedianews/showsource_on_scrn.gif" />  
Item with Display Source on.

&nbsp;

<img width="317" height="22" src="/mesh/files/macromedianews/showsource_off_scrn.gif" />  
Item with Display Source off.

&nbsp;

**Blink Icon on New Items** : This one should be pretty self-explanatory. If checked, then the extension icon will blink when new items are found. If un-checked, then the icon will turn green but will not blink.

**Open Items In**: this setting determines how items will be opened when they are clicked. There are three possible options:

<li**Current Tab** : Opens the item in the currently selected / visible tab.</li> 
*   **New Tab (background)** : Opens the item in a new tab in the background, i.e. focus will remain on the currently selected / visible tab.
*   **New Tab (focus)** : Opens the item in a new tab in the foreground, i.e. focus switches away from the current / visible tab, to the newly created tab and item.

**View items** : This preference allows you to determine how the items will be viewed within the menu. There are two options:

*   **Chronologically** : This displays the items in the chronological order (i.e. the order in which the posts were made) with the most recent items at the top of the menu.
*   **By Source** : This separates the items within the menu by their source. The source name will appear, with items from that source listed under it. You can click on the source name to view that source in your browser.

<img src="/macromedianews/images/screen_category_menu.gif" width="360" height="672" />  
Displayed by Source

&nbsp;

<img src="/macromedianews/images/screen_normal_menu.gif" width="353" height="466" />  
Displayed in Chronological order

&nbsp;

In addition to the preferences available to the preferences panel, there are two additional preferences which can only be set via about:config.

**macromedianews.refreshInterval** : This specifies in milliseconds how often the extension will check for new data.

**macromedianews.trimTitleLen** : This specifies the maximum length of titles when the Trim Title preference is checked.

While the entire extension is not supported, changing these two preferences is extra not support, mostly because I have not had a chance to test them very much. If you try the settings, let me know if you have any problems with them (or if they work as expected).

If you have any questions or need something clarified, just post it in the comments.

 [1]: /mesh/archives/006507.cfm
 [2]: /macromedianews/
 [3]: http://www.getfirefox.com
 [4]: /mesh/files/firefox/extensions/macromedianews.xpi