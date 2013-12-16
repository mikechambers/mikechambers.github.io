---
title: Playing a Sound from JavaScript in the Apollo Beta
author: mikechambers
date: 2007-06-06 12:54:01 -0800
layout: post
permalink: /2007/06/06/playing-a-sound-from-javascript-in-the-apollo-beta/
categories:
  - air
---


I just finished up a book I have been working on (along with [Kevin Hoyt][1] and [Danny Dura][2]) that covers using JavaScript and HTML to build Apollo applications. In celebration of finally writing my last example, I wanted to post it here.

Here is a simple example that shows how to use Flash Player and ActionScript APIs directly from JavaScript to play a sound in the upcoming [Apollo beta][3].  
<!--more-->

  
`
<pre><html>
<head>

	<script src="ApolloAliases.js" />
	<script type="text/javascript">
	
		function playSound()
		{
			var soundPath = new apollo.URLRequest("app-resource:/sound.mp3");
			var s = new apollo.Sound();
				s.load(soundPath);
				s.play();
		}		
	</script>

</head>

<body>
	<input type="button" value="Play" onClick="playSound()">
</body>
</html></pre>
<p>`

It should be pretty self explanatory, and is a good example of how easy it is to use Flash and ActionScript APIs from JavaScript within Apollo applications.

Btw, ApolloAliases.js is a file included in the beta SDK that provides JavaScript aliases into ActionScript APIs to make them easier and more convenient to use from JavaScript.

 [1]: http://blog.kevinhoyt.org/
 [2]: http://www.danieldura.com/
 [3]: http://www.adobe.com/go/apollo