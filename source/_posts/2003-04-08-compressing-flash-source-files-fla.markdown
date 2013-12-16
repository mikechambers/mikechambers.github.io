---
title: Compressing Flash Source Files (FLA)
author: mikechambers
date: 2003-04-08 12:35:01 -0800
layout: post
permalink: /2003/04/08/compressing-flash-source-files-fla/
categories:
  - General
---


Have you noticed that the longer you work on your project, the larger your FLA file gets (even though you may remove items from the FLA)? The Flash authoring environment saves new data by appending it to the end of the FLA. If you remove something from the Flash movie (lets say you delete a Movie Clip), then Flash will just write a note in the FLA to not use that asset anymore. However, it is still contained within the FLA.

You can force Flash to rebuild the FLA (essentially compressing it), by doing a Save As to a new file name. This will force Flash to rewrite the FLA and only include the current data / assets from the movie. After that you can delete the original file, and rename the new one to the previous name.

For projects that you have been working on for a while, this can lead to drastic FLA file size reductions.

Btw, the reason Flash does this is to save resources. It could potentially be very resource intensive to rewrite the entire FLA every time that it is saved.