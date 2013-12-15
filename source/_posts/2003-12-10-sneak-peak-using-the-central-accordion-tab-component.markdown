---
title: 'Sneak Peak : Using the Central Accordion Tab Component'
author: mikechambers
layout: post
permalink: /2003/12/10/sneak-peak-using-the-central-accordion-tab-component/
categories:
  - Central
---


I just finished an article on using the Central Accordion Tab component. It will be on the Central DevNet Center in a week, but I thought I would go ahead and give a sneak peak.

Below is an excerpt from the article that shows how to manage application views using the component. Note, that this has not been edited yet, so may contain typos, grammar mistakes or code errors. If you have any questions or run into any problems, post them in the comments.

<!--more-->

**Switching between views when the selected tab changes.**

Because tabs provide an interface for multiple related items, tabbed controls lend themselves to applications that contain multiple views. The tabs can be used to manage the state and presentation of the views.

This section will provide a simple example that shows:

1.  How to store references to a view / MovieClip within each tab.
2.  How to use the tab control to manage the state of the possible views.

We will create a simple example that toggles the state of three simple movie clips. However, the example can easily be applied to managing more complex movie clips that have classes associated with them.

First we will need to create the views / MovieClips whose state will be controlled by the Accordion Tab component. We will then write the ActionScript code necessary.

The article assumes that you are starting with the file you created in the addItem section. If not, just create a new movie with two layers named Actions and accordion. Drag an instance of the Accordion Tab component onto the accordion layer, and give it an instance name of myTab.

1.  Create three MovieClips, and name them red, green and blue.
2.  Open each one and draw a 100 x 100 square. The color of the square should match the clips name (i.e. red, green or blue).
3.  Make sure that each square is at coordinate 0,0.
4.  Create three new layers on your timeline (above the accordion layer) and name them red, green and blue. If you like, you can place these within a folder to help organize them.
5.  Drag an instance of each clip onto its respective timeline.
6.  Give each clip an instance name that matches its symbol name (i.e. red, green, or blue).
7.  Finally, position each clip in the bottom left of the accordion tab and make sure that the x, y coordinates of each clip are exactly the same.

Now we can add the ActionScript that manages the application. We will show all of the code, and then discuss the new sections.

`
<pre>function onActivate()
{
	green._visible = false;
	blue._visible = false;
	
	myTab.addItem("red", red);
	myTab.addItem("green", green);
	myTab.addItem("blue", blue);
	
	selectedTab = red;
	
	myTab.setChangeHandler("onTabChange");
}

function onTabChange()
{
	selectedTab._visible = false;
	
	var tab = myTab.getSelectedItem().data;
	
	tab._visible = true;
	selectedTab = tab;
}

Central.initApplication(this, this);</pre>
<p>`

Basically, we make all of the clips that are not selected invisible (_visible = false). We then store a reference to each clip in its respective tab, and when a tab is selected, we toggle the visibility of the clips.

The default-selected item is the red clip. So we make the green and blue clips invisible:

`
<pre>green._visible = false;
	blue._visible = false;</pre>
<p>`

We then add the tabs to the component using the addItem method.

`
<pre>myTab.addItem("red", red);
	myTab.addItem("green", green);
	myTab.addItem("blue", blue);</pre>
<p>`

Notice that the data stored with each tab (the second parameter) is actually a reference to the tabs respective clip.

We could also use the setDataProvider method, in which case the reference to the clip would be stored in the data property.

We then create a new property called selectedTab. This will store a reference to the currently selected (and thus visible tab).

`
<pre>selectedTab = red;</pre>
<p>`

Finally, we set the change handler for the component to the onTabChange function.

The onTabChange function gets the clip reference from the selected tab, and then based on that toggles the state of the clips.

First, it sets the selectedTabs visibility to false.

`
<pre>selectedTab._visible = false;</pre>
<p>`

Then, we get a reference to the clip from the newly selected tab. We make that clip visible, and then set it as the selected tab:

`
<pre>var tab = myTab.getSelectedItem().data;
	
	tab._visible = true;
	selectedTab = tab;</pre>
<p>`

If you publish the application into Central and test it, the visible clip will change based on the selected tab.

Of course, in most cases the clips would be more complex and have classes associated with them. However, the code for switching between then would be the same.

Instead of toggling the visibility, you could also dynamically attach and remove the MovieClips. The code would pretty much be the same, except instead of setting the visibility, you would attach the clip to be displayed, and remove the previously selected clip. The main advantage to this technique is that all of your clips do not have to be loaded into memory. For applications with many views, or views that encompass a lot of functionality, this can make a significant difference in performance and memory usage.

Here are the pros and cons of each technique:

**Switching Visibility**

*   Pro
    
    *   Switching between views is relatively fast.
    *   Views automatically maintain state.
    *   Can access all views via ActionScript even if they are not currently displayed.
    *   View do not need to initialize when they are switched to.

*   Cons
    
    *   Requires that all clips be loaded into memory (thus requires more memory).
    *   Initial initialization takes longer, since each view has to initialize on load / activate.

**Dynamically Attaching / Removing**

*   Pro
    
    *   Uses less memory, as only active views are loaded at any one time.
    *   Initial initialization is relatively faster, since only the selected item has to be initialized on load /activate.

*   Cons
    
    *   Switching between views is relatively slower, since the view must initialize itself.
    *   Not as efficient, since views must be initialized every time they are loaded.
    Views do not automatically maintain their state. State must be explicitly managed via ActionScript.</li> </ul> </li> </ul> 
    You can use these pros and cons to help determine the technique best suited for your application.