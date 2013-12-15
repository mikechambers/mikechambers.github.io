---
title: 'EventProxy.as : Proxying Events'
author: mikechambers
layout: post
permalink: /2004/01/28/eventproxyas-proxying-events/
categories:
  - ActionScript
---


One of the issues I ran into while building the [MXNA WebService example app][1], was that both the ComboBox and DataGrid both broadcast &#8220;change&#8221; events. This meant that I could not have a separate function to listen for each event (and have the functions run within the scope of the [feedView][2] class).

<!--more-->

There were two solutions to this. The first was to have a switch statement in my change event handler, that checked the eventObt.target property to see where the event came from. I could then dispatch the call as appropriate. Here is an example of what the event handler would look like:

`
<pre>private function change(eventObj:Object)
{
	switch(eventObj:target)
	{
		case myDataGrid :
		{
			//the datagrid event fired
			break;
		}
		case myComboBox :
		{
			//the combobox event fired
			break;
		}
	}
}</pre>
<p>`

However, I personally don&#8217;t like this as it means I have to define an event handler, maintain a switch statement, and then define individual methods to handle the events. Jesse Warden posted a [good example][3] of this on his weblog.

The other option was to create a simple class that basically proxies the events to different scopes and methods. I like this solution as it felt a little cleaner to me. I put together a simple proxy class (EventProxy) based on a [FlashCoder&#8217;s post][4] by Sam Neff.

Here is an example of how it works (from MXNAFeedView.as):

`
<pre>

    public function onLoad(Void):Void
    {
        categoryProxy = new EventProxy(this, "onCategorySelect");
        category_cb.addEventListener("change", categoryProxy);
        
        feedGridProxy = new EventProxy(this, "onFeedGridSelect");
        feedDG.addEventListener("change", feedGridProxy);
    }
       
	//broadcast by ComboBox when user selects an item in the combo
    private function onCategorySelect(eventObj:Object):Void
    {        
        //ComboBox change event fired
    }
    
	//broadcast by the DataGrid when the user selects a row
    private function onFeedGridSelect(eventObj:Object):Void
    {
        //datagrid change event fired
    }        
        
</pre>
<p>`

This does two things:

1.  It allows change events from two different components to be dispatched to two methods.
2.  It allows the event handlers to be called within the scope of the containing class (in this case [MXNAFeedView][2])

Here is the code for the class:

`
<pre>/*
    EventProxy class
    
    Allows:
		-scope of events to be changed
		-events calls to be proxied to arbitrary functions
*/

class com.macromedia.mesh.events.EventProxy
{
        private var receiverObj:Object;
        private var funcName:String;

		/*
			Constructor:
				-receiverObj : the receiverObj in which the event will be called
				-the function name to be called in response to the event
		*/
        function EventProxy(receiverObj:Object, funcName:String)
        {
                this.receiverObj = receiverObj;
                this.funcName = funcName;
        }

		//this is called before the event is broadcast by the components
        private function handleEvent(eventObj:Object):Void
        {
			//if not function name has been defined
            if(funcName == undefined)
            {
				//pass the call to the event name method
                receiverObj[eventObj.type](eventObj);
            }
            else
            {
				//pass the call to the specified method name
                receiverObj[funcName](eventObj);
            }
        }
}</pre>
<p>`

Post any suggestions or bugs in the comments.

 [1]: http://www.markme.com/mesh/archives/004255.cfm
 [2]: http://www.markme.com/mesh/archives/004269.cfm
 [3]: http://www.jessewarden.com/archives/000426.html
 [4]: http://chattyfig.figleaf.com/ezmlm/ezmlm-cgi/1/98729