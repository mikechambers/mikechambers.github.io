---
title: Looping Through DataProviders in ActionScript
author: mikechambers
layout: post
permalink: /2003/02/14/looping-through-dataproviders-in-actionscript/
categories:
  - General
---


I have received a couple of emails over the past couple of days, asking how to manually loop through a RecordSet / DataProviderClass. It is actually pretty simple and utilizes the `getItemAt()` and `getLength()` methods of the DataProviderClass (pseudo interface).

Here is the code:

`
<pre>//rs is a RecordSet object retrieved via FlashRemoting<br /><br />var len = rs.getLength();<br />var tmpObj;<br /><br />for(var i = 0; i < len; i++)<br />{<br />	tmpObj = rs.getItemAt(i);<br />	trace("Field 1 : " + tmpObj.field1);<br />	trace("Field 2 : " + tmpObj.field2);<br />}</pre>
<p>`

This will work for all RecordSet and DataProviderClass classes.