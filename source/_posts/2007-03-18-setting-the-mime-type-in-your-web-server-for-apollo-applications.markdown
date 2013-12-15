---
title: Setting the mime type in your Web Server for Apollo applications
author: mikechambers
layout: post
permalink: /2007/03/18/setting-the-mime-type-in-your-web-server-for-apollo-applications/
categories:
  - General
---


From the Apollo Release Notes:

> <strike>In order for client browsers to recognize an Apollo application when being downloded, the Web Server hosting the Apollo applications needs to map the following mimetype  
> &#8220;application/vnd.adobe.air-application-installer-package+zip&#8221;  
> to the Apollo extension &#8220;.air&#8221;. For example, for an Apache Web Server you will add to the AddType section:  
> AddType application/vnd.adobe.apollo-application-installer-package+zip .air</strike>

Note, you can do this in the web server config, or if using Apache, in the .htaccess file.

**Update (8/26/08)** : The mime type changed for the AIR 1.0 release.

The correct MIME type for an AIR file is:

<pre>application/vnd.adobe.air-application-installer-package+zip</pre>

For example, to set the MIME type for the Apache server, you would add the following line to your Apache configuration file:

<pre>AddType application/vnd.adobe.air-application-installer-package+zip .air</pre>