---
title: Executing JSFL files
author: mikechambers
layout: post
permalink: /2003/09/11/executing-jsfl-files/
categories:
  - General
---


My favorite feature of [Flash 2004][1] is the addition of an extensibility layer into the IDE. This allows you to use JavaScript (JSFL) to script the IDE.

Did you know that you can execute JSFL files from outside of Flash? There are two ways to do this. The first is to simply double click the jsfl file. Flash 2004 will open up and execute the JSFL contained within the file.

The second is to call the Flash 2004 executable from the command line passing the JSFL file as the first argument:

flash.exe command.jsfl

This will open Flash and execute the commands within the jsfl file. 

Among other things, this will allow you to process Flash movies from the command line. 

You cannot pass arguments to the JSFL file though, but one work around is to create another program that dynamically writes out the JSFL file, and then executes it.

 [1]: www.macromedia.com/software/flash/