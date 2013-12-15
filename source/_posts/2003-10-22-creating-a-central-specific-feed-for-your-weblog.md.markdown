---
title: Creating a Central Specific Feed for your weblog
author: mikechambers
layout: post
permalink: /2003/10/22/creating-a-central-specific-feed-for-your-weblog/
categories:
  - Central
---


A couple of people have asked me how to set up a separate RSS feed on their weblogs just for Macromedia Central. If you are using [Moveable Type][1] it is actually pretty simple.

<!--more-->

*   Login to the Moveable Type admin.
*   Create a new Category in Movable Type. For this post, let&#8217;s assume you name it *Central*.
*   Create a new Template in Moveable Type
*   On the Templates page, click the &#8220;Add a new Index Template&#8221; link.
*   For Template Name and Output file, put *central.rdf*
*   Make sure the rebuild automatically check box is checked.
*   For the template body, add the following:

<pre>&lt;?xml version="1.0" encoding="&lt;$MTPublishCharset$&gt;"?&gt;

&lt;rdf:RDF
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns##"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
  xmlns:admin="http://webns.net/mvcb/"
  xmlns:cc="http://web.resource.org/cc/"
  xmlns="http://purl.org/rss/1.0/"&gt;

&lt;channel rdf:about="&lt;$MTBlogURL$&gt;"&gt;
&lt;title&gt;&lt;$MTBlogName encode_xml="1"$&gt;&lt;/title&gt;
&lt;link&gt;&lt;$MTBlogURL$&gt;&lt;/link&gt;
&lt;description&gt;&lt;$MTBlogDescription encode_xml="1"$&gt;&lt;/description&gt;
&lt;dc:language&gt;en-us&lt;/dc:language&gt;
&lt;dc:creator&gt;&lt;/dc:creator&gt;
&lt;dc:date&gt;&lt;MTEntries lastn="1"&gt;&lt;$MTEntryDate format="%Y-%m-%dT%H:%M:%S" language="en"$&gt;&lt;$MTBlogTimezone$&gt;&lt;/MTEntries&gt;&lt;/dc:date&gt;
&lt;admin:generatorAgent rdf:resource="http://www.movabletype.org/?v=&lt;$MTVersion$&gt;" /&gt;
&lt;MTBlogIfCCLicense&gt;
&lt;cc:license rdf:resource="&lt;$MTBlogCCLicenseURL$&gt;" /&gt;
&lt;/MTBlogIfCCLicense&gt;

&lt;items&gt;
	&lt;rdf:Seq&gt;&lt;MTEntries lastn="15"&gt;
	&lt;rdf:li rdf:resource="&lt;$MTEntryPermalink encode_xml="1"$&gt;" /&gt;
	&lt;/MTEntries&gt;&lt;/rdf:Seq&gt;
&lt;/items&gt;

&lt;/channel&gt;

&lt;MTEntries category="Central" lastn="15"&gt;
	&lt;item rdf:about="&lt;$MTEntryPermalink encode_xml="1"$&gt;"&gt;
		&lt;title&gt;&lt;$MTEntryTitle encode_xml="1"$&gt;&lt;/title&gt;
		&lt;link&gt;&lt;$MTEntryPermalink encode_xml="1"$&gt;&lt;/link&gt;
		&lt;description&gt;&lt;$MTEntryExcerpt encode_xml="1"$&gt;&lt;/description&gt;
		&lt;dc:subject&gt;&lt;$MTEntryCategory encode_xml="1"$&gt;&lt;/dc:subject&gt;
		&lt;dc:creator&gt;&lt;$MTEntryAuthor encode_xml="1"$&gt;&lt;/dc:creator&gt;
		&lt;dc:date&gt;&lt;$MTEntryDate format="%Y-%m-%dT%H:%M:%S" language="en"$&gt;&lt;$MTBlogTimezone$&gt;&lt;/dc:date&gt;
	&lt;/item&gt;
&lt;/MTEntries&gt;

&lt;/rdf:RDF&gt;
</pre>

If you did not name your new category *Central* then you will need to put the category name in the following line:

>MTEntries category=&#8221;Central&#8221; lastn=&#8221;15&#8243;<

*   Now, when ever you publish a new item on your weblog in the Central category, it will be added to the feed.</i> 
    *   The last step is to submit your new feed to the [Macromedia XML News Aggregator][2].

 [1]: http://www.movabletype.org/
 [2]: http://www.markme.com/mxna/about.cfm#a6