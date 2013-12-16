---
title: Simple HTTP Server for local testing
author: mikechambers
date: 2012-04-08 12:11:01 -0800
layout: post
permalink: /2012/04/08/simple-http-server-for-local-testing/
categories:
  - General
tags:
  - bash
  - html5
  - http
  - script
---

I am currently playing around with the [HTML5 FileSystem API][1], and have a need to test my files served via a web server. I could setup a virtual director for my local apache server, but given the number of simple tests and experiments I do, I wanted something easier that required little to no configuration and setup.

So, I put together a super simple script that uses [python's SimpleHTTPServer class][2].  
<!--more-->

Here is the script (requires that python is installed and in your path)

``` bash
#!/bin/bash
 
python -m SimpleHTTPServer $1
```

To use it, just switch the the directory that contains your files and run:

``` bash
http
```

This will open a simple webserver on port 8000.

You can optionally pass in the port like so:

``` bash
http 2030
```

Which will start a simple web server listening on port 2030.

Again, this is something really simple, but also very useful. If you need to quickly test a file, just switch to the directory and run the script.

Btw, another work around for playing with the FileSystem APIs would be to pass the:

``` bash
--allow-file-access-from-files
```

to Chrome when launching it.

 [1]: http://www.html5rocks.com/en/tutorials/file/filesystem/
 [2]: http://docs.python.org/library/simplehttpserver.html