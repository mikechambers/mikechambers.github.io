---
title: 'GoogleSearch.as : new GoogleSearch ActionScript Class'
author: mikechambers
date: 2003-04-15 12:08:01 -0800
layout: post
permalink: /2003/04/15/googlesearchas-new-googlesearch-actionscript-class/
categories:
  - General
---


I have created two classes that wrap the [Google Search API / Webservice][1]. They use Flash Remoting to connect to the Google API and then return a GoogleSearchResults object which includes the results and other information about the query.

It requires a valid google id key, which you can get for free from [google][1]. Also, if you download the developer&#8217;s kit from google, you can find information on what the search api returns.

The code below isn&#8217;t documented (or extensively tested), but if people are interested I will clean it up, fully document it and release it.

<!--more-->

  
`
<pre>
/************************ Example usage ************************/
#include "NetServices.as"
#include "GoogleSearch.as"

var gs = new GoogleSearch();
gs.setGatewayURL("http://127.0.0.1:8500/flashservices/gateway");
gs.setKey("XXXXXXXXXXXXXXXXXXXXXXXXXXX");

var listener = new Object();

listener.onSearchResult = function(gsr)
{
     //grid is an instance of the DataGrid
     //component
     grid.setDataProvider(gsr.getResults());
}

listener.onError = function(info)
{
     trace("Error : " + info.description);
}

gs.addListener(listener);
     
System.onStatus = listener.onError;

gs.search("search term here");


/************************ GoogleSearch.as ************************/
/*
	GoogleSearch.as

	This is a ActionScript Class that uses Flash Remoting to provide
	a simple API for accessing the Google search web service API.

	You can find information on the Google search web service API at:

http://www.google.ca/apis/


http://www.google.ca/apis/reference.html

	This class requires a valid google key in order to call the
	google web services. You can get a google key from google at:

http://www.google.ca/apis/

	Mike Chambers
	mesh@macromedia.com
*/

/* The GoogleSearchResponse.as file is required. */
#include "GoogleSearchResponse.as"

/*
	GoogleSearch Constructor
*/
_global.GoogleSearch = function()
{
	if(_global.NetServices == undefined)
	{
		trace("NetServices.as is required and must be included before GoogleSearch.as");
	}

	/*
		Use ASBroadcaster to add event support to the class.

		This will add the following methods to the class instance:

		-addListener
		-removeListener
		-broadcastMessage
	*/
	ASBroadcaster.initialize(this);

	/*
		Create an object to store the parameters for the google web service.

		Note, we store these within an object instead of directly in the 
		class instance to avoid the overhead of copying them to another
		object whenever we make the google web service call.
	*/
	this.params = new Object();

	this.init();
}

GoogleSearch.prototype.params = null;

GoogleSearch.prototype.gatewayURL = "/flashservices/gateway";
GoogleSearch.prototype.wsdlURL = "http://api.google.com/GoogleSearch.wsdl";

/*
	This method is used to copy the set the default values for
	the properties of the class.

	It is automatically called from the constructor, and can also be
	used to reset the properties of the object.
*/
GoogleSearch.prototype.init = function()
{
	this.params.key = null;
	this.params.start = 0;
	this.params.maxResults = 10;
	this.params.filter = true;
	this.params.restrict = "";
	this.params.safesearch = true;
	this.params.lr = "lang_en";
	this.params.q = null;

	// Note, the next two properties have been deprecated
	// by google and will be ignored by them. They are included
	// here for backward compatibility with older versions of
	// Flash Remoting.
	this.params.ie = "lating1";
	this.params.oe = "latin1";
}

/* Sets the URL to the Flash Remoting adapter on the server */
GoogleSearch.prototype.setGatewayURL = function(url)
{
	this.gatewayURL = url;
}

/*
	Sets the URL to the Google Web Service WSDL file. 
	
	The default value points to the WSDL file on Google's
	website.
*/
GoogleSearch.prototype.setGoogleWSDL = function(wsdlURL)
{
	this.wsdlURL = wsdlURL;
}

/*
	Sets the Google key necessary to use the Google
	web services.

	This is required.

	You can get a google key from:

http://www.google.ca/apis/

*/
GoogleSearch.prototype.setKey = function(key)
{
	this.params.key = key;
}

/*
	Sets the Number of results desired per query.
	The maximum value per query is 10.
*/
GoogleSearch.prototype.setMaxResults = function(num)
{
	this.params.maxResults = num;
}

/* Sets the Zero-based index of the first desired result. */
GoogleSearch.prototype.setStartIndex = function(startIndex)
{
	this.params.start = startIndex;
}

/*
	Activates or deactivates automatic results filtering, which
	hides very similar results and results that all come from
	the same Web host. 
*/
GoogleSearch.prototype.setUseFilter = function(useFilter)
{
	this.params.filter = useFilter;
}

/*
	Restricts the search to a subset of the Google Web index,
	such as a country like "Ukraine" or a topic like "Linux."

	See the google web service development kit for a complete
	list of restrict terms:

http://www.google.ca/apis/reference.html#2_4

*/
GoogleSearch.prototype.setRestrict = function(restrictString)
{
	this.params.restrict = restrictString;
}

/*
	Sets whether filtering of adult content in the search results
	will be activated.

	Takes a Boolean value.
*/
GoogleSearch.prototype.setSafeSearch = function(useSafeSearch)
{
	this.params.safesearch = useSafeSearch;
}

/*
	Restricts the search to documents within one or more languages.

	See the google web service development kit for a complete
	list of language abbreviations:

http://www.google.ca/apis/reference.html#2_4

*/
GoogleSearch.setLanguageRestrict = function(lr)
{
	this.params.lr = lr;
}

/*
	Takes a string that specifies the search term, and then
	calls the google web service to search for it.

	See the google web service development kit for a complete
	list of query terms:

http://www.google.ca/apis/reference.html#2_2

	When the search is returned, a "onSearchResult" event will
	be broadcast, with a GoogleSearchResponse object passed to 
	any listeners.

	If an error occurs, an "onError" event will be broadcast
	with an info object passed to any listeners.
*/
GoogleSearch.prototype.search = function(searchString)
{	
	
	if(searchString.length < 1)
	{
		this.onStatus({description:"You must specify a search term."});
		return;
	}


	var server = NetServices.createGatewayConnection(this.gatewayURL);
	var service = server.getService(this.wsdlURL, this);

	var searchParams = this._getParams();
	searchParams.q = searchString;

	service.doGoogleSearch(searchParams);
}

/*
	Private method that receives the data from the server, and broadcasts
	the "onSearchResponse" event.
*/
GoogleSearch.prototype.doGoogleSearch_Result = function(rawGoogleResponse)
{
	var gsr = new GoogleSearchResponse(rawGoogleResponse);

	this.broadcastMessage("onSearchResult", gsr);
}

/*
	Private method that gets called if an error occurs when calling the
	google web service, and broadcasts the "onError" event.
*/
GoogleSearch.prototype.onStatus = function(info)
{
	this.broadcastMessage("onError", info);
}

/* private method that encapsulates access to the params property */
GoogleSearch.prototype._getParams = function()
{
	return this.params;
}








/************************ GoogleSearchResponse.as ************************/
/*
	GoogleSearchResponse.as

	This is a ActionScript Class that represents the response from google
	when the doGoogleSearch web service is called.

	The class provides a simple API for access the data returned, and
	makes the search results available as a RecordSet object.

	The original google response is also available.

	You can find information on the Google search web service API at:

http://www.google.ca/apis/


http://www.google.ca/apis/reference.html

	Mike Chambers
	mesh@macromedia.com
*/

_global.GoogleSearchResponse = function(rawGoogleResponse)
{
	if(RecordSet.prototype == undefined)
	{
		trace("RecordSet.as (included within NetServices.as) is required and must be included before GoogleSearchResponse.as");
	}

	this.setRawGoogleResponse(rawGoogleResponse);
}

GoogleSearchResponse.prototype.documentFiltering = null;
GoogleSearchResponse.prototype.searchComments = null;
GoogleSearchResponse.prototype.estimatedTotalResultsCount = null;
GoogleSearchResponse.prototype.estimateIsExact = null;
GoogleSearchResponse.prototype.results = null;
GoogleSearchResponse.prototype.searchQuery = null;
GoogleSearchResponse.prototype.startIndex = null;
GoogleSearchResponse.prototype.endIndex = null;
GoogleSearchResponse.prototype.searchTips = null;
GoogleSearchResponse.prototype.directoryCategories = null;
GoogleSearchResponse.prototype.searchTime = null;

// Stores the raw google result as returned from google.
GoogleSearchResponse.prototype.rawGoogleResponse = null;

/*
	Private method that takes the raw response from google and copies
	its values into the current instance of the class, as well as
	transforms the search results into an ActionScript RecordSet
	Object.
*/
GoogleSearchResponse.prototype.setRawGoogleResponse = function(rawGoogleResponse)
{
	//store the response from google
	this.rawGoogleResponse = rawGoogleResponse;

	//place the search results in a RecordSet
	var rs = new RecordSet();
	
	var items = rawGoogleResponse.resultElements;
	var len = items.length;

	var obj;
	var item;
	for(var i = 0; i < len; i++)
	{
		obj = new Object();
		item = items[i];

		for(var x in item)
		{
			obj[x] = item[x];
		}

		obj.catFullViewableName = item.directoryCategory.fullViewableName;
		obj.catSpecialEncoding = item.directoryCategory.specialEncoding;

		delete obj.directoryCategory;

		rs.addItem(obj);
	}

	this.results = rs;

	//copy the other properties over.
	this.documentFiltering = rawGoogleResponse.documentFiltering;
	this.searchComments = rawGoogleResponse.searchComments;
	this.estimatedTotalResultsCount = rawGoogleResponse.estimatedTotalResultsCount;
	this.estimateIsExact = rawGoogleResponse.estimateIsExact;
	this.searchQuery = rawGoogleResponse.searchQuery;
	this.startIndex = rawGoogleResponse.startIndex;
	this.endIndex = rawGoogleResponse.endIndex;
	this.searchTips = rawGoogleResponse.searchTips;
	this.directoryCategories = rawGoogleResponse.directoryCategories;
	this.searchTime = rawGoogleResponse.searchTime;
}

/* Returns the raw, umodified response returned from google */
GoogleSearchResponse.prototype.getRawGoogleResponse = function()
{
	return this.rawGoogleResponse;
}

/*
	Returns a Boolean value indicating whether filtering was performed
	on the search results. This will be "true" only if (a) you
	requested filtering and (b) filtering actually occurred.
*/
GoogleSearchResponse.prototype.getDocumentFiltering = function()
{
	return this.documentFiltering;
}

/*
	Returns a text string intended for display to an end user. One of the most
	common messages found here is a note that "stop words" were removed
	from the search automatically. (This happens for very common words
	such as "and" and "as.")
*/
GoogleSearchResponse.prototype.getSearchComments = function()
{
	return this.searchComments;
}

/*
	Returns the estimated total number of results that exist for the query. 
	
	Note: The estimated number may be either higher or lower than the actual 
	number of results that exist.
*/
GoogleSearchResponse.prototype.getEstimatedTotalResultsCount = function()
{
	return this.estimatedTotalResultsCount;
}

/*
	Returns a Boolean value indicating that the estimate is actually the
	exact value.
*/
GoogleSearchResponse.prototype.getEstimateIsExact = function()
{
	return this.estimateIsExact;
}

/*
	Returns an ActionScript RecordSet object containing the results 
	of the search query.

	The RecordSet will contain the following columns:

	summary : If the search result has a listing in the ODP directory,
		the ODP summary appears here as a text string.

	URL : The URL of the search result, returned as text, with an
		absolute URL path.

	snippet : A snippet which shows the query in context on the URL
		where it appears. This is formatted HTML and usually includes
		<B> tags within it. Note that the query term does not always
		appear in the snippet. Note: Query terms will be in highlighted
		in bold in the results, and line breaks will be included for
		proper text wrapping.

	title : The title of the search result, returned as HTML.

	cachedSize : Text (Integer + "k"). Indicates that a cached version of
		the <URL> is available; size is indicated in kilobytes.

	relatedInformationPresent : Boolean indicating that the "related:"
		query term is supported for this URL.

	hostName : When filtering occurs, a maximum of two results from any
		given host is returned. When this occurs, the second resultElement
		that comes from that host contains the host name in this parameter.

	directoryName : If the URL for this resultElement is contained in the ODP
		directory, the title that appears in the directory appears here as
		a text string. Note that the directoryTitle may be different from
		the URL's title.

		
	catFullViewableName :  Text, containing the ODP directory name for the 
		current ODP category.

	catSpecialEncoding : Specifies the encoding scheme of the directory
		information.
*/
GoogleSearchResponse.prototype.getResults = function()
{
	return this.results;
}

/*
	Returns the query used to generate the response.
*/
GoogleSearchResponse.prototype.getSearchQuery = function()
{
	return this.searchQuery;
}

/*
	Returns a number which indicates the index (1-based)
	of the first search result in the results.
*/
GoogleSearchResponse.prototype.getStartIndex = function()
{
	return this.startIndex;
}

/*
	Returns a number which indicates the index (1-based)
	of the last search result in the results.
*/
GoogleSearchResponse.prototype.getEndIndex = function()
{
	return this.endIndex;
}

/*
	Returns a text string intended for display to the
	end user. It provides instructive suggestions on how
	to use Google.
*/
GoogleSearchResponse.prototype.getSearchTips = function()
{
	return this.searchTips;
}

/*
	Returns an array of directoryCategory objects. This corresponds
	to the ODP directory matches for this search.
*/
GoogleSearchResponse.prototype.getDirectoryCategories = function()
{
	return this.directoryCategories;
}

/*
	Returns text representing the floating-point number indicating
	the total server time to return the search results, measured in seconds.
*/
GoogleSearchResponse.prototype.getSearchTime = function()
{
	return this.searchTime;
}

/*
	Setter methods for all of the properties. I can't think of when
	these would be useful, but I am adding them just in case.
*/
GoogleSearchResponse.prototype.setDocumentFiltering = function(df)
{
	this.documentFiltering = df;
}

GoogleSearchResponse.prototype.setSearchComments = function(sc)
{
	this.searchComments = sc;
}

GoogleSearchResponse.prototype.setEstimatedTotalResultsCount = function(etrc)
{
	this.estimatedTotalResultsCount = etrc;
}

GoogleSearchResponse.prototype.setEstimateIsExact = function(eis)
{
	this.estimateIsExact = eis;
}

GoogleSearchResponse.prototype.setResults = function(r)
{
	this.results = r;
}

GoogleSearchResponse.prototype.setSearchQuery = function(sq)
{
	this.searchQuery = sq;
}

GoogleSearchResponse.prototype.setStartIndex = function(si)
{
	this.startIndex = si;
}

GoogleSearchResponse.prototype.setEndIndex = function(ei)
{
	this.endIndex = ei;
}

GoogleSearchResponse.prototype.setSearchTips = function(st)
{
	this.searchTips = st;
}

GoogleSearchResponse.prototype.setDirectoryCategories = function(dc)
{
	this.directoryCategories = dc;
}

GoogleSearchResponse.prototype.setSearchTime = function(st)
{
	this.searchTime = st;
}
</pre>
<p>`

 [1]: http://www.google.ca/apis/