---
title: 'MXNA Reports : Flex / Flash / AJAX Integration'
author: mikechambers
layout: post
permalink: /2005/04/26/mxna-reports-flex-flash-ajax-integration/
categories:
  - Weblog
---


As Christian just [posted][1], we have added a new section to the MXNA 2 beta. The new section is titled [Reports][2], and lists all of the reports and analytics available at MXNA.  
<!--more-->

  
The report / charting mini-apps are built using the Flex Framework, and are then compiled into SWF. The ColdFusion page they are contained within dynamically passes info into the chart to configure default parameters. The charts and graphs are created using the components built into the Flex framework, and get their data from the [MXNA web service API][3]. When the user clicks on a chart item, Flash calls out to the containing HTML page, and a Javascript function uses some AJAX to load context sensitive posts into the HTML page. All without having to refresh the page.

We started this as a way to experiment with the Flex framework, and Flash / AJAX integration, and have been really happy with the results. By leveraging Flash and AJAX together, we can take advantage of the strengths of both Flash/ Flex (interactivity, ease of development, experience) and HTML (easy layout and formatting, displaying large amount of text based data), and ultimately provide an over all better user experience. Plus, if the user is using a browser that does not support AJAX, you can still view the data within the charting app.

Anyways, we are going to try to make another post with more detailed technical info on how the reports are put together.

You can view all of the reports [here][2].

Btw, these reports are a lot of fun to make (we have two more about ready to launch), so if you have a suggestion for a specific report, please send it <mxna@macromedia.com>.

 [1]: /cantrell/archives/007597.cfm
 [2]: http://weblogs.macromedia.com/mxna/reports/
 [3]: http://weblogs.macromedia.com/mxna/Developers.cfm