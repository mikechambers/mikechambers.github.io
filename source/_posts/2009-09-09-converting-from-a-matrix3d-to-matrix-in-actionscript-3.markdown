---
title: Converting from Matrix3D to Matrix in ActionScript 3
author: mikechambers
date: 2009-09-09 12:37:01 -0800
layout: post
permalink: /2009/09/09/converting-from-a-matrix3d-to-matrix-in-actionscript-3/
categories:
  - ActionScript
---


For the past month or two, I have been spending time building a game (something I havent done since my Flash 4 days). This has really been a lot of fun, as it has allowed me to use some of the Flash Player APIs which I really haven't had a chance or need to use before. 

One thing which I have been (slowly) learning about are using Matrix transformations on DisplayObjects. I made a post earlier showing how (with much, much help from [Senocular][1]), I was able to [use Matrix to do hit tests using BitmapData.hitTest on DisplayObjects][2] which have had transformations applied to them (in this case, rotation).

Well, I recently had the need to convert some of my DisplayObjects to use the 2.5D APIs (by setting the z property to a value). Unfortunately, this ended up breaking a lot of my code, mostly because of how it changes how transformations are applied to a DisplayObject. Specifically, when you set the `DisplayObject.z` property to any value, `DisplayObject.transform.matrix` will return null, and you must use `DisplayObject.transform.matrix3D` instead. Where this causes problems is when you are using APIs that expect to use a `Matrix` instance, as opposed to `Matrix3D` instance, such as `BitmapData.draw`.  
<!--more-->

  
This is exactly the scenario I ran into, and this post will show one solution for how to convert from a Matrix3D to a Matrix instance, which can then be passed to the BitmapData.draw.

First, lets look at my original code:

``` actionscript
shipBmpData = new BitmapData(shipBounds.width, 
				shipBounds.height, true, 0);

var shipOffset:Matrix = ship.transform.matrix;
shipOffset.tx = ship.x - shipBounds.x;
shipOffset.ty = ship.y - shipBounds.y;			

shipBmpData.draw(ship, shipOffset);
```

Basically, this draws the bitmap data for my ship into a `BitmapData` instance, taking into account any transformations which have been applied to the ship (in this case rotation). In my code, this bitmap data is cached, and then later used with `BitmapData.hitTest` for collision detection (not shown here).

However, as soon as I set the z property on the ship (which is a DisplayObject), this code will no longer work, as `ship.transform.matrix` will return null (since 3D transformations are now being used).

At first, I figured I would just change my code to access the Matrix3D instance like so:

``` actionscript
var shipOffset:Matrix3D = ship.transform.matrix3D;
```

and then pass this to the `BitmapData.draw` API. However, I was quickly reminded (by the compiler) that `Matrix3D` does not inherit from `Matrix`, and thus cannot be passed to `BitmapData.draw`.

Because of this I needed to convert from a `Matrix3D` to a `Matrix` instance, which could then be passed to `BitmapData.draw`. After some help from [Ralph Hauwert][3] (who tracked down a couple of bugs) I was able to get it working.

Before I show the code, it will be useful to look at which values `Matrix` and `Matrix3D` contain. First, here are the values held by a `Matrix` instance:

<pre>
a  c  tx
b  d  ty
u  v  w
</pre>

You can find a description of the properties in the [Matrix docs][4].

Here are the values held by a Matrix3D instance:

<pre>
scaleX    0       0          tx
0         scaleY  0          ty
0         0       scaleZ     tz
0         0       0          tw
</pre>


From the [Matrix3D docs][5]:

> The Matrix3D class uses a 4x4 square matrix: a table of four rows and columns of numbers that hold the data for the transformation. The first three rows of the matrix hold data for each 3D axis (x,y,z). The translation information is in the last column. The orientation and scaling data are in the first three columns. The scaling factors are the diagonal numbers in the first three columns

Basically, in addition to holding values for x and y, the `Matrix3D` class also has slots for z properties. Because the `Matrix` is a 3x3 matrix, and the `Matrix3D` is a 4x4 matrix converting from `Matrix3d` to `Matrix` means that we will have to discard some information. Luckily, in my case, I didnt need the z information, so i was able to discard it and map the related x, y values to the `Matrix` instance. We can then pass this new `Matrix` instance to the `BitmapData.draw` class.

For our purposes, the `Matrix3D` mapping to `Matrix` is:

<pre>
a  c  0          tx
b  d  0          ty
0  0  scaleZ     tz
0  0  0          tw
</pre>

Here is the code that maps between the two:

``` actionscript
var shipOffset:Matrix3D = ship.transform.matrix3D;

var rawMatrixData:Vector.<Number> = shipOffset.rawData;

var matrix:Matrix = new Matrix();
matrix.a = rawMatrixData[0];
matrix.c = rawMatrixData[1];
matrix.tx = ship.x - shipBounds.x;

matrix.b = rawMatrixData[4];
matrix.d = rawMatrixData[5];
matrix.ty = ship.y - shipBounds.y;

ship.transform.matrix3D = null;
shipBmpData.draw(ship, matrix);
ship.transform.matrix3D = shipOffset;
```

Basically, we get an instance of the `Matrix3D` class for the `DisplayObject`. We then access the raw data of the `Matrix3D` instance, and copy it into a new `Matrix` instance (ignoring and dropping the z values), and apply the transformation corrections in the process.

We can then pass this new `Matrix` instance to the `BitmapData.draw` API. However, as you probably noticed in the code, I had to first do an additional step. Specifically:</strike >

``` actionscript
ship.transform.matrix3D = null;
shipBmpData.draw(ship, matrix);
ship.transform.matrix3D = shipOffset;
```

Before we draw the data to the `BitmapData` instance, we have to clear out the existing `Matrix3D` applied to the `DisplayObject`. This is to work around a bug discovered by [Ralph Hauwert][3]. When passing a `DisplayObject` which does not have a `Matrix3D` transformation (as in our first example) to `BitmapData.draw`, any transformations on the `DisplayObject` ARE NOT taken into account when drawing. However, when the the `DisplayObject` does have a `Matrix3D` transformation applied to it (such as when the z property has been set to a value), then any transformations ARE applied when drawing to `BitmapData.draw`. Because of this, we have to first store the `Matrix3D` associated with the DisplayObject, set it to null, draw the `DisplayObject` to the `BitmapData` instance, and then reapply the `Matrix3D` to the `DisplayObject`.

<strike>**Update**: as [Ben Garney points out in the comments][6], since the transformation is applied to `BitmapData.draw` when `Matrix3D` is set, all we need to do is pass in either an identiy matrix, or null to the second argument of the API. So, in my case, this solves my problems, and removes the need to convert bewteen the matrix types.</strike>

<strike>The updated code is simply:</strike>
``` actionscript
shipBmpData = new BitmapData(shipBounds.width, 
				shipBounds.height, true, 0);
shipBmpData.draw(ship, null);
```


<strike>which turns out to be much less complex than when you use the 2D APIs. However, the technique above for converting between matrix types is still valid.</strike>

**Update 2**: It turns out passing in null or an identity matrix to `BitmapData.draw`. does not work correctly.

Of course, this is not always necessary when converting from a `Matrix` instance to a `Matrix3D` instance, but in my case it was. As you can imagine, this can have some significant performance implications, both because of memory allocation and deallocation, as well as the fact that removing the `Matrix3D`, even temporarily, changes how the `DisplayObject` is rendered.

Right now, this trade off is ok in my case, although I am not sure if it will be for the long term. Again, in my case, I may need to look at some re-architecting so I don't have to work around this issue (such as nesting clips and cacheing the parent `BitmapData`, so I don't have to apply the transformations).

Anyways, I am just learning the implications of using the 2.5D APIs in the Flash Player. This is an area where there is not currently a lot of information or documentation, especially information on the implications of moving from 2D to 2.5D APIs. Hopefully this will be useful.

Here are a couple of other resources which I found useful:

[API docs for Matrix, Matrix3D, Transformation and DisplayObject][7].

[Thibault Imbert's Flash Player 10 Presentation][8], which has some good info on the 2.5D APIS.

[Flash CS4 Docs : Working in three dimensions][9]

As I mentioned above, I am still getting my head around some of this stuff, so if you have any clarifications or corrections, post them in the comments.

 [1]: http://www.senocular.com/
 [2]: http://www.mikechambers.com/blog/2009/06/24/using-bitmapdata-hittest-for-collision-detection/
 [3]: http://www.unitzeroone.com/blog/
 [4]: http://livedocs.adobe.com/flex/3/langref/flash/geom/Matrix.html#propertySummary
 [5]: http://help.adobe.com/en_US/AS3LCR/Flash_10.0/flash/geom/Matrix3D.html
 [6]: http://www.mikechambers.com/blog/2009/09/09/converting-from-a-matrix3d-to-matrix-in-actionscript-3/#comment-16700
 [7]: http://adobe.com/go/AS3LR
 [8]: http://www.bytearray.org/wp-content/projects/fp10-session/
 [9]: http://help.adobe.com/en_US/ActionScript/3.0_ProgrammingAS3/WSF24A5A75-38D6-4a44-BDC6-927A2B123E90.html