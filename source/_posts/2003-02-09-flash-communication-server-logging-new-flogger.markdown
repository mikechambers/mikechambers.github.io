---
title: 'Flash Communication Server Logging : New Flogger'
author: mikechambers
date: 2003-02-09 12:49:01 -0800
layout: post
permalink: /2003/02/09/flash-communication-server-logging-new-flogger/
categories:
  - General
---


We are releasing a slightly [updated version ][1]of our Flash Communication Server bandwidth monitoring tool (Flogger). This version has not been fully QAed by us and is thus not support by Macromedia. However, we wanted to get it out to developers as soon as possible.

It&#8217;s basically the same old Flogger, but now works with servers that have multiple vhosts.

The old Flogger collected stats from the default, main vhost: \_defaultVhost\_. If a server had multiple vhosts (usually only in ISP situations like MediaTemple) they could not get usage info on the applications running under other vhosts.

This version of Flogger asks the server for a list of the installed vhosts via a custom config tag in server.xml. It then connects as an administrator to each of these vhosts, and gathers information about the applications, bandwidth usage, etc.

The reporting is similar to the earlier version as well, but it has a new listbox for the various vhosts on the machine and a user can limit the reports to a particular vhost or applications from the vhost.

Flogger should work the same as before for single, default vhost servers.

Download [Flogger 1.1][1] (unsupported).

You can read more about Flogger [here][2]. Note, that this document does not cover Flogger 1.1.

Thanks to every one on the Flash Communication Server team for making this happen.

 [1]: /mesh/files/flogger/Flogger1.1.zip
 [2]: http://www.macromedia.com/support/flashcom/ts/documents/flashcom_logging.htm