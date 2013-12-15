---
title: Shell Scripting on OS X with ECMA / JavaScript
author: mikechambers
layout: post
permalink: /2003/12/06/shell-scripting-on-os-x-with-ecma-javascript/
categories:
  - General
---


Just this week I switched to OS X and found my self wanting to really take advantage of the shell. I have always wanted to be able to do shell scripting in a language that I know well, and I finally found a solution (I know enough bash shell scripting to get in trouble).

You may have heard of the [Rhino project][1]. A Mozzila project for creating and maintaining a Java based JavaScript parser. Well, what you may not have know, and what I just found out, is that it also includes a command line javascript interpreter that allows you to write shell scripts in JavaScript.

Since ActionScript is based on ECMA / JavaScript, this means that you can leverage the core of your ActionScript knowledge to write shell scripts on OS X and / or Linux.

Here is what you need to set it up.

<!--more-->

First, make sure that you have Java installed and it is in your path (this is already setup on OS X 10.3). You can check by opening a shell / terminal window and typing &#8216;java&#8217;

`
<pre>java</pre>
<p>`

This should output some options and info about Java. If you get an error, install and configure java.

Next, download the Rhino java files from:

<http://www.mozilla.org/rhino/download.html>

Download the latest version (I have 1.5 R4.1). Once you have downloaded it to your computer, uncompress it. In the root directory, there is a file called js.jar. This contains all of the Rhino code, including the JavaScript command line interpreter. Copy this file into a permanent location.

I put mine in

`
<pre>~/classpath/js.jar</pre>
<p>`

That is:

`
<pre>/Users/mesh/classpath/js.jar</pre>
<p>`

You will probably have to create the classpath folder.

Next, you need to add the path to js.jar to your Java classpath environment variable, so Java can find it when you try to run the interpreter.

I use the bash shell, so I added the following lines to my .bash_profile in my home directory:

`
<pre>PATH="/bin:/sbin:/usr/bin:/usr/sbin"
CLASSPATH="/Users/mesh/classpath:/Users/mesh/classpath/js.jar"
export PATH CLASSPATH</pre>
<p>`

Notice that I point directly to the js.jar file. I also include the directory, but this is not necessary to run the js.jar file. The PATH variable was already defined. Finally, I added CLASSPATH to the export line, so it is available to my environment.

Re-initialize the shell, by either running

`
<pre>source ~/.bash_profile</pre>
<p>`

or just closing and re-opening the shell / terminal window.

At this point, you should be able to run the interpreter. To test, create a file named helloworld.js and add the following code:

`
<pre>print("Hello World");</pre>
<p>`

Now run the script with the following command:

`
<pre>java org.mozilla.javascript.tools.shell.Main helloworld.js</pre>
<p>`

*   **java** : runs the java command
*   **org.mozilla.javascript.tools.shell.Main** : the class that java should run. In this case it is the command line JavaScript interpreter.
*   **helloworld.js** : the JavaScript file that will be run by the interpreter.

This should then print out:

`
<pre>Hello World</pre>
<p>`

Pretty cool heh? Except that is a lot to type in to run one file. Luckily, bash provides an [alias][2] command that allows you to create aliases for commands.

So, open the ~/.bash_profile file and add the following line:

`
<pre>alias js='java org.mozilla.javascript.tools.shell.Main'</pre>
<p>`

Save the file, and reinitialize it.

Now, you can run the interpreter like so:

`
<pre>js helloworld.js</pre>
<p>`

You can find complete usage info at:

<http://www.mozilla.org/rhino/shell.html>

Probably the two most useful commands are:

print() which prints out to the console, and runCommand, which runs a command.

You can also pass command line arguments to the script. Here is a simple command that prints out the number of arguments passed in, as well as their values:

`
<pre>var len = arguments.length;

print("Arg Len : " + len);

for(var i = 0; i < len; i++)
{
        print("Arg[" + i + "] = " + arguments[i]);
}</pre>
<p>`

Save this in a file called args.js and run it like so:

`
<pre>js args.js</pre>
<p>`

This will output:

`
<pre>Arg Len : 0</pre>
<p>`

Now run it like so:

`
<pre>js args.js foo bar "foo bar"</pre>
<p>`

which will output:

`
<pre>Arg Len : 3
Arg[0] = foo
Arg[1] = bar
Arg[2] = foo bar</pre>
<p>`

Of course, the real power comes when you start to integrate this with existing unix commands.

I&#8217;ll post more examples as I create them, in the mean time if you have any good examples, post them in the comments section.

 [1]: http://www.mozilla.org/rhino/
 [2]: http://www.nmt.edu/tcc/swinv/bash/2.03/info/(bash)Alias%20Builtins.html