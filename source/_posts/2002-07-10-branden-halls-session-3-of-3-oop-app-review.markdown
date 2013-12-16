---
title: 'Branden Hall&#8217;s Session : 3 of 3 : OOP App Review'
author: mikechambers
date: 2002-07-10 12:05:01 -0800
layout: post
permalink: /2002/07/10/branden-halls-session-3-of-3-oop-app-review/
categories:
  - Conferences
---


Branden is going to disset his bibliofile application.  
The app helps him keep trakc of all of his books.  
  
*   Based on MVP  
    *   View is on main timline (different frames represent different application states).  
        *   Presenter is very simplistic.</UL>
          
        Uses Tab component, TreeView Component, push button component.  
        Application gets information from a remote web service via Flash Remoting. (branden uses a cue cat to scan in the books isbn into flash. flash then sends the isbn via flash remoting to a remote web service which returns information about the book. the book information is then stored locally. *cool stuff! &#8211; mc*).  
        Data is stored in Shared Objects.  
        Branden is using Object.register class to cast the object from the shared object to a specific class. (SharedObjects all you to basically serialize any object, but it strips of functions).  
        If symbol name is not in library it assumes class name.
        <PRE>Object.registerClass(&#8220;castToClassName&#8221;, objectToCast);</PRE>
        
          
        Note, that using this, the object&#8217;s data is populated before the constructor is run, so you need to check in you constructor whether the data has been initialized yet.  
        Did you know? Branden&#8217;s wireless network at home goes down whenever his phone rings.  
        *note : i missed some of branden&#8217;s discussion of the different models he uses within his app. &#8211; mc.*  
        BooksModel  
        based on associative array. easy search, creation and removal. Cannot directly sort, can have key collisions.  
        Categories Model  
        based on a tree structure. Easy to add items, searching is easy, holds hierachical data well. Difficult to code, spanning tree can be slow, can use a lot of memory.  
        categories is split into two objects. one represents a single node / item. the other provides access to the tree, (you dont access the first directly, simplar to how the XML and XMLNode object are related).  
        branden is going over the elements of the applications UI, and show the code that responds to UI events.  
        end of session.</p>