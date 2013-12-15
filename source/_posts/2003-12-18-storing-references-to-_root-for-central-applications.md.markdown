---
title: Storing references to _root for Central Applications
author: mikechambers
layout: post
permalink: /2003/12/18/storing-references-to-_root-for-central-applications/
categories:
  - Central
---


As you may or may not know you cannot reference \_root or \_level0 from applications running within Central. This is because the application is actually running within the Central controller which itself is built within Flash (thus \_root does not reference your application&#8217;s \_root).

Ted Patrick has posted some information and code snippets showing how to work around this issue if you need to reference the root of your application.

You can view the post [here][1].

 [1]: http://www.powersdk.com/ted/2003_12_01_archive.php#107175411883992925