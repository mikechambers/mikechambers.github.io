---
title: Flash / JavaScript Integration Kit (with Open License)
author: mikechambers
layout: post
permalink: /2005/06/14/flash-javascript-integration-kit-with-open-license/
categories:
  - General
---


Well, as many noticed last week from the [Flash Platform whitepaper][1], we have released a beta of the [Flash / JavaScript Integration kit][2]. The kit allows you to call functions from Flash to JavaScript and JavaScript to Flash, all while working cross browser, and supporting passing complex data types.  
<!--more-->

  
Here is a list of the data types that the kit supports:

*   Object
*   Array
*   String
*   Number
*   Boolean
*   Date
*   null
*   undefined

Here is a simple code example that show a call to a JavaScript function from within Flash:

`
<pre>
import com.macromedia.javascript.JavaScriptProxy;

var proxy:JavaScriptProxy = new JavaScriptProxy();
proxy.call("javaScriptMethodName", "arg1", new Object());
</pre>
<p>`

We are starting to use the kit at [MXNA][3], and you can view an example [here][4] (right click the chart to view the source).

You can find the latest info on the kit, as well as download the most current release from [here][2].

The kit has been live since last week, but we haven&#8217;t posted about it until now because we wanted to finalize the details on the licensing. Well, we finally worked out all of the details, and I am really excited to announce that the project is being licensed under an open license (based on the Apache 1.1 Software license). You can view a copy of the license [here][5]. 

Since the project is now an open project, we have moved it from our internal servers over to [osflash.org][6]. 

Here are the main links:

*   [Main Project Site (including docs)][6]
*   [Project Mailing List][7]
*   [Source Tree][8]
*   [Main Release Site][9]

The main project site is hosted on the [osflash wiki][6], so anyone can add to the docs, samples, etc...

Anyways, expect a lot more info in the coming days and weeks. We have been getting [some bug submissions][10], and are planning on doing a new release soon.

Also, I want to give a big thanks to [Aral Balkan][11], for setting up [osflash][12], but also helping us work out all of the details and helping make the project being open source possible.

 [1]: http://www.macromedia.com/platform/whitepapers/platform_overview.pdf
 [2]: http://www.macromedia.com/go/flashjavascript/
 [3]: /mxna/
 [4]: /mxna/reports/categoryFeedReport/index.cfm
 [5]: http://weblogs.macromedia.com/flashjavascript/license.txt
 [6]: http://www.osflash.org/doku.php?id=flashjs
 [7]: http://osflash.org/mailman/listinfo/flashjs_osflash.org
 [8]: http://sourcesecure.co.uk/trac/osflash/flashjavascript/browser/
 [9]: http://weblogs.macromedia.com/flashjavascript
 [10]: http://sourcesecure.co.uk/trac/osflash/flashjavascript/report/1
 [11]: http://www.flashant.org/
 [12]: http://www.osflash.org