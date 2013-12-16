---
title: 'Firefox Ubiquity Command : fyi'
author: mikechambers
layout: post
permalink: /2008/08/31/firefox-ubiquity-command-fyi/
categories:
  - General
tags:
  - fyi
  - ubiquity
---


I have just created a new Firefox [Ubiquity][1] plugin command named &#8220;fyi&#8221;. The command makes it super simple to email info about a web page to anyone. 

I wrote the command because I am often finding myself forwarding URLs to friends and co-workers. This is normally much more tedious than it needs to be, involving the following steps:  
<!--more-->

1.  Copy the URL from the browser
2.  Switch to mail client
3.  Create new Email
4.  Paste URL into the email body
5.  Switch back to the browser
6.  Copy the post title
7.  Switch back to email
8.  Paste the title as the subject
9.  Switch back to the browser
10. Copy a snippet from the page
11. Switch back to the email
12. Paste in the snippet
13. Enter the TO email address
14. Finally send the email

Phew...

Well, no more. By using the &#8220;fyi&#8221; command, you can quickly and easily forward information about a page to anyone.

<link rel="commands" href="/mesh/files/ubiquity/fyi/fyi.js" name="fyi" />

**Install**:

Press the &#8220;Subscribe&#8221; button that appears at the top of the page. (You must be running in Firefox, and have the Ubiquity plugin installed).

**Usage**:

`fyi [to_email]`

Open the Ubiquity command window and type:

`fyi`

and hit enter. This will open your default email program and create a new email with the current page title set as the email&#8217;s subject, and the current page url / location included in the email&#8217;s body.

The command optionally takes 1 argument, which includes one or more email addresses, separated by commas. The email address(es) will be placed in the TO field of the generated email.

If any text on the page is selected, then the selected text will also be included within the body of the generated email.

**Requirements**:

*   [Firefox 3.*][2]
*   [Ubiquity extension][3]

Note, the command has only been tested with Ubiquity 0.5.0 on Mac with Mac Mail. Please post results with other operating systems, and email programs in the comments.

**Version History**:

Version .90 (July 13, 2009)

*   Updated to work with [Ubiquity 0.5][4].

Version .87 (September 1, 2008)

*   Made fixed for &raquo; issue in title to only take effect on Mac. (Issue doesnt affect windows).

Version .86 (September 1, 2008)

*   fixed issue where selected text could be specified as email address if no email address argument was passed in
*   Fixed issue where pages with &raquo; in title would break command
*   Removed some debug code that was generating Growl messages on Mac

Version .85 (August 31, 2008)

*   Initial Release

**Known Issues**:

*   Email address will only appear in live preview once the &#8220;@&#8221; symbol is entered.
*   Pages with titles that contain characters that must be URL encoded MAY break the command. If you come across a page that breaks the command, please post it in the comments.

**License**:

[MIT][5]

**Source**:

[View Source][6]

Post any bugs, questions, comments or suggestions in the comments.

 [1]: http://labs.mozilla.com/2008/08/introducing-ubiquity/
 [2]: http://www.mozilla.com/firefox/
 [3]: http://labs.mozilla.com/projects/ubiquity/
 [4]: http://labs.mozilla.com/2009/07/ubiquity-0-5/
 [5]: http://www.opensource.org/licenses/mit-license.php
 [6]: /mesh/files/ubiquity/fyi/fyi.js