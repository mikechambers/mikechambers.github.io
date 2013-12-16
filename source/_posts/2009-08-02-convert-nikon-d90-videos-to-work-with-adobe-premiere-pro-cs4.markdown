---
title: Converting Nikon D90 Videos to work with Adobe Premiere Pro CS4
author: mikechambers
date: 2009-08-02 12:24:01 -0800
layout: post
permalink: /2009/08/02/convert-nikon-d90-videos-to-work-with-adobe-premiere-pro-cs4/
categories:
  - General
  - Photography
tags:
  - d90
  - nikon
  - Photography
  - premiere
  - video
---


I recently bought my first DSLR, the [Nikon D90][1], which I have been [having a blast with][2]. One of the cool features of the camera, is that it supports creating HD video clips (of up to 5 minutes) (view an example [here][3]). However, the way the clips are created seems to confuse [Adobe Premiere Pro CS4][4], which won't open or import the clips without a little work on your part.  
<!--more-->

  
I found instructions [here][5] on how to use the terminal to get Premiere to understand the clips, and based on that (with some tweaks and fixes), I have put together a bash script that will "fix" all of the Nikon D90 AVI clips in a directory so that Premiere Pro will recognize them.

**Usage:**

`d90topremier [dirWithClips]`

The *dirWithClips* argument is optional, and if not specified will assume the clips are in the current working director.

The output will look something like this:

<pre>
./DSC_0002.AVI --> ./DSC_0002.mov
./DSC_0003.AVI --> ./DSC_0003.mov
./DSC_0004.AVI --> ./DSC_0004.mov
./DSC_0005.AVI --> ./DSC_0005.mov
./DSC_0007.AVI --> ./DSC_0007.mov
./DSC_0008.AVI --> ./DSC_0008.mov
./DSC_0009.AVI --> ./DSC_0009.mov
./DSC_0010.AVI --> ./DSC_0010.mov
./DSC_0011.AVI --> ./DSC_0011.mov
./DSC_0014.AVI --> ./DSC_0014.mov
</pre>


**Requirements**

The script requires the *setfile* command, which is available in the free [Mac OS X Developer SDK][6].

**Script**

``` bash
#################################################
#
# Bash script that modifies Nikon D90 AVI Video
# file so they are reconized by Adobe Preiere Pro CS4
#
# Created by Mike Chambers
# http://www.mikechambers.com
#
# Based on original script at:
# http://www.alexbeckett.co.uk/blog/2009/07/02/techie-importing-d90-dmovie-video-into-premiere-pro/
#
#################################################i

oldExt=mov
newExt=AVI

d="./"

if [ -n "$1" ];then
        d="$1"
fi

if [ ! -e "$d" ]; then
        echo "$d does not exist"
        exit 0;
fi


for filename in "$d"*.$oldExt
  do
        if [ ! -e "$filename" ]; then
                continue;
        fi

        setfile -t "VfW " "$filename"

        newFileName="${filename%$oldExt}$newExt"
        mv "$filename" "$newFileName"

        echo "$filename --> $newFileName"
  done
```

Just place this into a file called *d90topremier*, place it in your path, and make sure to chmod it like so:

`chmod 755 d90topremier`

If you run into any issues, or have any improvements for the script, post them in the comments.

 [1]: http://www.nikonusa.com/Find-Your-Nikon/Product/Digital-SLR/25446/D90.html
 [2]: http://www.flickr.com/photos/mikechambers/collections/72157621787429394/
 [3]: http://www.flickr.com/photos/mikechambers/3774623194/in/set-72157621777297569/
 [4]: http://tryit.adobe.com/us/cs4/premiere/p/?sdid=ETRZP
 [5]: http://www.alexbeckett.co.uk/blog/2009/07/02/techie-importing-d90-dmovie-video-into-premiere-pro/
 [6]: https://connect.apple.com/cgi-bin/WebObjects/MemberSite.woa/wa/getSoftware?bundleID=20414