---
title: Restricting Access to Flash Remoting
author: mikechambers
layout: post
permalink: /2003/01/16/restricting-access-to-flash-remoting/
categories:
  - General
---


Tom Muck has [posted][1] some concerns about malicious developers potentially hijacking a Flash Remoting adaptor and using it to call external web services without permission (essentially stealing resources and bandwidth from the server). The problem arises because there is no way to configure Flash Remoting to deny / authenticate requests for web service proxying.  
<!--more-->

  
Taken a step further, this could be perceived as a potential security issue, if Flash Remoting was installed on a server that was publicly accessible and at the same time had access inside the firewall. A malicious user could proxy a web service request to Flash Remoting that attempted to connect to a web service inside the firewall, thus bypassing the firewall.

These issues are not necessarily specific to Flash Remoting, but rather to proxies in general (Flash Remoting is essentially just a proxy). So, how do you prevent the malicious use of your Flash Remoting adaptor? 

There are a couple of potential solutions:

1. First and most importantly, you should be very careful when placing a proxy on a server that is publicly accessible and can connect inside your firewall. In fact, you should be careful about having this setup at all, because if the server is compromised, hackers now have easy access to your entire internal network. I am not saying that you shouldn&#8217;t do it, but rather, make sure that you have the appropriate safeguards in place.

2. You should be able to restrict Flash Remoting access at the firewall level. For example, you could have your firewall block web services requests from your webserver to inside your firewall. The firewall could block requests to external webservices, or only allow web service requests to specific web services. You could even go as far as to filter on the content of the request.

Currently, there is no way to configure the Flash Remoting adaptor to deny these types of requests or to disable web service proxying. However, this is something that we are currently looking at.

Note that these issues do not concern calling local code (such as ColdFusion Components) as you can authenticate the requests at that level.

If you have any other possible solutions, post them in the comments.

 [1]: http://www.flash-remoting.com/notablog/home.cfm