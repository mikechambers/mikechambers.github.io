---
title: Subclassing the mx:Application Tag in Flex
author: mikechambers
layout: post
permalink: /2004/10/08/subclassing-the-mxapplication-tag-in-flex/
categories:
  - Flex
---


Now that there is a [Free non-commercial license for Flex][1], I thought I would spend a little time playing around with it.

I went through this [great tutorial][2] by Robert Crooks, and was pretty impressed by how quick it was to put together the simple application. However, one thing felt weird to me, and that was mixing ActionScript in with my MXML. I am used to creating a class for my application controller. Including functions in an include file just felt weird to me (although behind the scenes they do get compiled into a class).

So, I asked around at Macromedia if it was possible for me to subclass the <mx:Application> tag with my custom class, and it turns out it is.

So, here is the modified code for the Coffee Application from Robert Crook&#8217;s [tutorial][2]. This one uses a custom controller class that extends the Flex Application class.

<!--more-->

&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;CoffeeApp.mxml&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;

`
<pre>
<?xml version="1.0"?>

<mc:CoffeeApp xmlns:mc="mc.*" xmlns:mx="http://www.macromedia.com/2003/mxml">
							
	<mx:Panel title="My First Flex App">
		<mx:Label text="Coffee Blends" />
		<mx:ComboBox id="coffeeCombo" dataProvider="{coffeeArray}" />
		<mx:Text text="Description: {coffeeCombo.selectedItem.data}" width="100%" />
		<mx:Button label="Add to Cart" click="addToCart()" />
		<mx:List id="cart" />
	</mx:Panel>
	
</mc:CoffeeApp></pre>
<p>`

&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;CoffeeApp.as&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;

`
<pre>
//located in /WEB-INF/flex/user_classes/mc

class mc.CoffeeApp extends mx.core.Application 
{
	var coffeeArray:Array;
	var cart:mx.controls.List;
	var coffeeCombo:mx.controls.ComboBox;

	function CoffeeApp() 
	{
		coffeeArray = new Array();
		
		coffeeArray.push({label:"Red Sea", data:"Smooth and Fragrant"});
		coffeeArray.push({label:"Andes", data:"Rich and Pungent"});
		coffeeArray.push({label:"Blue Mountain", data:"Delicate and Refined"});		
	}	


	function addToCart():Void
	{
		cart.addItem(coffeeCombo.selectedItem.label, coffeeCombo.selectedItem.data);
	}	

}
</pre>
<p>`

This works well, and feels a little more familiar to me. There are some draw backs to this though:

*   You have to declare references to your MXML components within your ActionScript code and keep them in sync.
*   You are adding an extra class which has a small impact on memory usage.

Personally, I am used to the first issue from doing development in Flash, and I don&#8217;t think the second issue is significant.

Anyways, I am still early in the process of understanding Flex and MXML, so I am not sure if this is a &#8220;good&#8221; or &#8220;bad&#8221; way to structure this.

Btw, thanks to Elliot Greenfield, Elliot Winfield and Matt Chotin for helping me figure out how to get this working.

Update : [10.11.2004] : Well after getting this to work, and developing for a couple of hours, I gave up on structuring my applications like this. Flex wasn&#8217;t really designed for this, so I ran into a couple of issues:

*   Couldn&#8217;t declare my constructor as &#8220;function Constructor(Void)&#8221; as this confused flex and caused errors (this was easy to work around).
*   Flex would over-write my constructor (again, something I could work around).
*   Flex got confused when I gave a tag an ID, and then added a reference to the tag in the ActionScript class. Flex was including it twice in the auto-generated ActionScript code, which led to warnings.

Again, Flex was really designed for this structure, and I didn&#8217;t feel like fighting to get it to work. I have gone back to just using the mx:Script tag and including my functions from an external as file. Thus far things have worked pretty well.

You can find more information on the new Free / Non-Commercial license for Flex [here][1].

 [1]: http://www.macromedia.com/macromedia/proom/pr/2004/flex_ncni_license.html
 [2]: http://www.macromedia.com/devnet/flex/articles/first_flexapp.html