/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global window, XMLHttpRequest, ActiveXObject, document, clearTimeout */

(function () {
    "use strict";
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    var x;
    for (x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}());

(function () {
    "use strict";
    
    var archiveDataURL = "/blog/js/archives.json";
    var httpRequest;
    var LOAD_STEPS = 50;
    
    var animationId;
    
    var startIndex = 0;
    var archives;
	var handleArchiveData = function () {
        
        if (!archives) {
            return;
        }
        
        var endIndex;
        var len = archives.length;
        if (startIndex + LOAD_STEPS > len) {
            endIndex = len;
        } else {
            endIndex = startIndex + LOAD_STEPS;
        }
        
        var archive_list = document.getElementById("archive_list");

        var fragment = document.createDocumentFragment();
        
        //var len = data.length;
        
        var i;
        var item;
        
        for (i = startIndex; i < endIndex; i++) {
            item = archives[i];
            
            var div = document.createElement('div');
            div.innerHTML = "<li><span>" + item.pubdate + "</span> : <a href=\"" + item.url + "\">" + item.title + "</a></li>";
            fragment.appendChild(div);
        }
        
        archive_list.appendChild(fragment.cloneNode(true));
        
        if (endIndex < len) {
            startIndex = endIndex;
            animationId = window.requestAnimationFrame(handleArchiveData);
        } else {
            if (animationId) {
                window.cancelAnimationFrame(animationId);
            }
        }
	};

    //pass in arg
    var onDataLoad = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                try {
                    archives = JSON.parse(httpRequest.responseText);
                    handleArchiveData();
                } catch (e) {
                    return;
                    //console.log("Error parsing archive json. aborting", e);
                }
            } else {
                return;
                //console.log('There was a problem with the request.');
            }
        }
    };
    
    var makeRequest = function (url) {
        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            httpRequest = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE
            try {
                httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e2) {}
            }
        }
        
        if (!httpRequest) {
            //console.log('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        
        httpRequest.onreadystatechange = onDataLoad;
        httpRequest.open('GET', url);
        httpRequest.send();
    };
    
    
    var onload = function () {
        if (!(JSON && typeof JSON.parse === 'function')) {
            //json is not supported, so we silently fail
            return;
        }
        
        makeRequest(archiveDataURL);
    };
    
    window.onload = onload;
}());