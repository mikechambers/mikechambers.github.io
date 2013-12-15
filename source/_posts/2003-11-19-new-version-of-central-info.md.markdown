---
title: New Version of Central Info
author: mikechambers
layout: post
permalink: /2003/11/19/new-version-of-central-info/
categories:
  - Central
---


A couple of people have noticed that there is a new version of [Central][1] available, but have run into some issues with it.

Well, here are the solutions:

-**DevChat won&#8217;t install**. Beta product ids will not work in the final version of Central. The current version of DevChat has a beta product id, which is why it won&#8217;t install in the new version.

You can install it with a different product.xml file that works by:

1. Open Central  
2. File > Install from URL  
3. Enter this URL : <http://nbo02.macromedia.com/devchat/product2.xml>

We will have a new version of the chat in the next couple of days that will fix this issue. If you have an existing app that has a beta product id, you can get a new product id from:

<http://www.macromedia.com/go/central_productid>

You can find a complete technote on this issue [here][2].

-**Blog Reader is not installed in the update**. When Central updates itself, it cannot install new applications. Since the beta did not contain the blog reader application, it is not installed when Central does an auto-update.

There are two solutions. Uninstall Central, and then reinstall it. Or, wait a couple of hours, and you will be able to install the blog reader from the app finder.

-**Central is not prompting to update**. That is the expected behavior. Central checks for updates periodically (I think it is every couple of days), and thus everyone won&#8217;t be prompted to update. You can manually get Central to check for updates by:

1. Opening Central  
2. View > Preferences  
3. General Tab  
4. Click the Check Now Button.

Sorry for the confusion. I meant to post this information before the new version was out, but a combination of factors prevented that. I will be posting a lot more information shortly.

 [1]: http://www.macromedia.com/go/central/
 [2]: http://www.macromedia.com/support/central/ts/documents/beta_id.htm