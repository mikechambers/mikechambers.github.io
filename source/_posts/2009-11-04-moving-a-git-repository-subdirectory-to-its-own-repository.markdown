---
title: Moving a git repository subdirectory to its own repository
author: mikechambers
layout: post
permalink: /2009/11/04/moving-a-git-repository-subdirectory-to-its-own-repository/
categories:
  - General
tags:
  - git
---

I use [Git][1] and [GitHub][2] to manage all of my personal code projects. I have one large repository called projects, which is then broken into sub directories based on the main technology used for each project (i.e. Flash, JavaScript, iphone, etc...).

I am currently working on a Flash based iphone game code-named "pewpew", which is maintained within my projects repository. As I have begun to work on it more and more, I decided that I wanted to have pewpew in its own git repository. This will make it easier to track issues, as well as give me the option of open sourcing it and allow others to create and submit forks.  
<!--more-->

  
Initially it looked like the way to do this was to use [git submodules][3]. However that seemed to keep the code linked to the original repository, which I did not want. I could have simply copied the code over and then initialized it as a new repository, but I wanted to maintain the commit history. Finally, I came across an article at [GitHub titled Splitting a subpath out into a new repo][4]. This does exactly what I needed (basically, create a new repository from a directory within an existing repository).

After following the steps in the article, I had to do one additional step before I could push the new repository to GitHub. I had to change the origin from the old repository url, to the new one. You can do this by changing the *[remote "origin"]* url property in the .git/config file to point to the new repository.

Anyways, this worked perfectly, and maintained the history. If anyone has any suggestions for other or better ways to accomplish this, please post it in the comments. Thanks for to everyone who had suggestions about this on twitter.

 [1]: http://git-scm.com/
 [2]: http://www.github.com
 [3]: http://www.kernel.org/pub/software/scm/git/docs/git-submodule.html
 [4]: http://help.github.com/splitting-a-subpath-to-a-new-repo/