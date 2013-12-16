---
title: 'Branden Hall&#8217;s Session 1 of 3.'
author: mikechambers
date: 2002-07-10 12:19:01 -0800
layout: post
permalink: /2002/07/10/branden-halls-session-1-of-3/
categories:
  - Conferences
---


The first day of Flash Forward involves a number of half day sessions / classes. I am sitting in Branden Hall&#8217;s first session of three. The first session is on Object Oriented Programming in Flash (something that Branden and Sam Wan just wrote a book on).  
Branden is discussing some of the basics of Object oriented programming in Flash, including objects vs instances, and how to create custom classes.&nbsp;  
Importance of encapsulation  
  
*   Using getter / setter methods to access internal properties.  
    *   Should not directly access internal object properties.  
        *   Don&#8217;t hard code references to timelines (if they are needed, pass them in through a method).  
            *   many getter / setter methods can inidcate design problems.</UL>
              
            Composition vs Inheritance  
            Branden says that Generally you should avoid inheritance *(i don&#8217;t agree with this, and Branden and i got into a pretty heated discussion about it on the train-mc)*. Inheritance in Flash can be messy.  
            You should consider using composition instead of inheritance. Composition is a &#8220;has a&#8221; relationship. Inhiritance is a &#8220;is a&#8221; relationship.  
            **Design Patterns**  
              
            *   Take advantage of previous work that has already solved common problems.  
                *   Object oriented and language independent (any design patter book can be applied to flash).</UL>
                  
                3 patterns  
                Value Object Pattern : don&#8217;t use multiple getter / setter methods. multiple function calls can cause performance issues, especially for remote methods. Send a value / object which contains properties and values. Only requires one method call, and properties can be set at once:
                <PRE>foo.setValues({name:&#8221;mike&#8221;, address:&#8221;500 main st.&#8221;});</PRE>
                
                  
                Observer Pattern : Multiple events need to listen for events from a single object. The event source object allows other objects to add or remove themselves as listeners.  
                Easiest way is to use undocumented AsBroadcaster
                <PRE>FooClass = function(){ AsBroadcaster.initialize(this);}</PRE>
                
                <PRE>FooClass.prototype.sendEvent = function(){this.broadcastMessage(&#8220;onEvent&#8221;);}</PRE>
                
                <PRE>myFoo = new Foo();</PRE>
                
                <PRE>myFoo.addListener(this);</PRE>
                
                  
                See [flash coders wiki][1] for more info.  
                Model / View Controller Patter : Some articles at [Des / Dev][2] Center.  
                  
                *   Seperate data from presentation.  
                    *   Model : Data  
                        *   View : Interface  
                            *   Controller &#8221; Logic  
                                *   All pieces are independent of one another, although code for pieces are often all combined in one place in flash (on main timlines). *just make sure to comment the different sections-mc. *  
                                    *   Sections can be swapped out and changed without affecting other layers. (i.e. switch out view to create new interface for different devices&nbsp;/ platforms).  
                                        *   Model View Presenter (more advanced).  
                                            *   This architeture works very well for creating applications in Flash.  
                                                *   Layers should be completely independent of each other.  
                                                    *   Model should be abstracted away from viewer and controller (it should not know about them).  
                                                        *   The view listens for events.</UL>
                                                          
                                                        Branden is showing a new app called bibliofile that he uses to keep track of all of his books. uses treemenu component, and new tabbed view component that branden built. Showing some of the listener code in the model section of the application. Uses value object pattern to pass properties / values into objects. the app has multiple frames, which each frame representing a different state of his application. The app uses Flash Remoting to get information on books from a remote web service.  
                                                        TabBar component : Branden is very happy with this, he feels he hit the &#8220;sweet spot&#8221; with it (not over or under engineering it). Live preview, scalling. You add tabs through PI and set alignment, and then when the tabs are clicked, callback methods are called where you can have code that reacts to the event. In the case of brandens app, it either moves between frames, or hides movie clips (he is using it in two places).  
                                                        ToolTip component : Drag and drop, add message in PI. Super easy to use.  
                                                        KeyBoard Navigation Component. Isn&#8217;t showing it because he didnt have time to get it in the session.  
                                                        end of first hour, next hour is about components and working with flash remoting.  
                                                        &nbsp;</p>

 [1]: http://chattyfig.figleaf.com
 [2]: http://www.macromedia.com/desdev/