---
title: 'TIP : How to get Apache Location directive to match trailing slashes'
author: mikechambers
layout: post
permalink: /2008/05/01/tip-how-to-get-apache-location-directive-to-match-trailing-slashes/
categories:
  - General
tags:
  - apache django tip
---


I am working on deploying a [django][1] app online, and thus need to use the [Apache Location directive][2] to point to my django app.

This is pretty straight forward:  
<!--more-->

  
`
<pre><Location "/foo/">
        SetHandler python-program
        PythonPath "[&#x27;/path/to/djangositedir/&#x27;] + sys.path"
        PythonHandler django.core.handlers.modpython
        SetEnv DJANGO_SETTINGS_MODULE settings
        PythonDebug On
</Location></pre>
<p>`

Note: You will normally add / edit this in the httpd.conf file for your apache installation.

Basically, you just map &#8220;/foo/&#8221; to the python handler. Anytime someone goes to a URL that begins with &#8220;&#8221;/foo/&#8221;" on your site, it will be handled by Python and your django app.

However, if someone leaves of the trailing slash like so &#8220;/foo&#8221; then the location doesnt match and the server will return a 404. 

Luckily, this is fairly easy to fix, and I wanted to post it here for future reference. Just use a regular expression to match either &#8220;/foo&#8221; or &#8220;/foo/&#8221;. Here is the updated directive:

`
<pre><Location ~ "/foo(/|$)">
        ...
</Location></pre>
<p>`

Note that the &#8220;~&#8221; is important as it enabled regular expression support. Basically, this says match anything that begins with &#8220;/foo&#8221; and either has a trailing &#8220;/&#8221; or ends &#8220;$&#8221;.

 [1]: http://www.djangoproject.com/
 [2]: http://httpd.apache.org/docs/1.3/mod/core.html#location