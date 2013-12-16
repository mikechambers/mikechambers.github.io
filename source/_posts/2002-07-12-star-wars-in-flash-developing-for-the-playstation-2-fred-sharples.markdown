---
title: 'Star Wars in Flash: Developing for the Playstation 2 : Fred Sharples'
author: mikechambers
date: 2002-07-12 12:44:01 -0800
layout: post
permalink: /2002/07/12/star-wars-in-flash-developing-for-the-playstation-2-fred-sharples/
categories:
  - Conferences
---


I came in a little late.  
orangedesign created the menus for lucasart&#8217;s starfighter games (2) for ps2. All of the menus were created within macromedia flash, and played back within a Flash player included with the game.  
Have to conisder localization. They do the German version first since the german words tend to be the longest.  
Memory considerations, only 32 megs of ram on ps2. compressed sizes of images doesn&#8217;t matter, it is the uncompressed size. reducing the number of colors. the butterflyed the images (symetrical, so they only have to load half of each image (and then flip it)).  
design process  
fred is showing some of the images they presented to the lucas arts to get an idea of the type of imagery they were looking for in the jedi starfigter menus. (just regular images they found on the web).  
originally, they had a more dirty, mechaninal interface, but in the end it became more modern, clean look.  
showed series of drawings of early menu prototypes. really cool.  
tips and tricks  
memory issues  
  
*   use ntsc or pal on a television to determine how far you can compress bitmaps.  
    *   watch memory. major issue.  
        *   butterfly symetrical bitmaps whenever possible.  
            *   concern yourself with the unpacked size of images, not the file size.  
                *   Optimize your bitmaps before they are brough in.</UL>
                  
                framerate issues  
                  
                *   try breaking text if it doesnt animate fast enough.  
                    *   avoid using more that a paragraph of type on one screen.  
                        *   build all of your alpha effects into your bitmaps.  
                            *   give life to your art by animating smaller screen areas.  
                                *   with vectors, try finding shapes that use the fewsest number of triangles.  
                                    *   don&#8217;t use a lot of thin vector lines.</UL>
                                      
                                    Localization  
                                      
                                    *   design with plenty of space for copy. 150%.  
                                        *   localize early in german (long words, design issues)  
                                            *   test doubel byte comparison.  
                                                *   work with native speaker to avoid embarressment.  
                                                    *   have experienced designer do the final layout.</UL>
                                                      
                                                    Sony Requirements  
                                                      
                                                    *   memory cards stuff is more than half of the work. (what happens when the user pulls a card out, inserts it, etc...).  
                                                        *   sony design documentation manual. very big.</UL>
                                                          
                                                        card issues, example:  
                                                          
                                                        *   is card full  
                                                            *   formatted?  
                                                                *   saved data?  
                                                                    *   ps2 card or ps1?  
                                                                        *   damage?  
                                                                            *   is it being formatted?  
                                                                                *   being read?  
                                                                                    *   did you tell the user how much space is required?  
                                                                                        *   does the user want to format or save the data?  
                                                                                            *   etc...</UL>
                                                                                              
                                                                                            these all have to be asked and considered within the flash movie.  
                                                                                            Middleware layer. the layer of scripting between the hardware / game and flash.  
                                                                                              
                                                                                            *   written by game programmer.  
                                                                                                *   a simple script layer  
                                                                                                    *   communicates between game, flash and hardware.  
                                                                                                        *   almost all UI logic resideds in the flash later.  
                                                                                                            *   middleware never drives the flash movie.</UL>
                                                                                                              
                                                                                                            example of setting something in the game&#8217;s middleware. this tells the game to play in stereo mode:
                                                                                                            <PRE>getURL(&#8220;callback://SetStereoStatus&#8221;, 2);</PRE>
                                                                                                            
                                                                                                              
                                                                                                            getURL(&#8220;callback://GetStereoStatus&#8221;, &#8220;variableName&#8221;);  
                                                                                                            this tells the middleware what variable name to use when it passed the data back to flash. you have to wait one frame in flash before you can reference the data.  
                                                                                                            Why should flash be on Playstation 2?  
                                                                                                            Currently not avaliable. playstation 2 is very popular platform.  
                                                                                                            three versions of flash player for ps2  
                                                                                                              
                                                                                                            *   generation one, used on starfighter. only supported flash 4. built by secret level. software only, very slow. doesn&#8217;t support loadmovie, so memory issues cause problems.  
                                                                                                                *   strobe : (gen 2) &#8211; used by lucasarts for some other games (they have in house flash team). supports flash 5, working on MX version. hardware enabled. also ported to xBox and Directx8. supports loadmovie command.  
                                                                                                                    *   internet version for ps2 : developed by macromedia and sony. deomonstrated at E3 in may 2001. may be related to to linux os and network adaptor kit released by sony. did not play in browser.</UL>
                                                                                                                      
                                                                                                                    showing pictures on ps2 linux kit. pretty cool. comes with harddrive and ethernet port.  
                                                                                                                    website:  
                                                                                                                    Fred wrote a chapter on Flash for the PS2 in [Flash Enabled : Flash Design and Development for Devices][1].  
                                                                                                                    [orangedesign.com][2]  
                                                                                                                    [secretlevel.com][3]  
                                                                                                                    [lucasarts.com][4]  
                                                                                                                    future they want to be able to use the flash player within the games, overlaying the action and even showing video.  
                                                                                                                    testing. worked on pc. they had firewire connection into test unit that they used to upload the entire game into the ps2, and then test it on the console.  
                                                                                                                    orange did not do the sound.  
                                                                                                                    end of session.</p>

 [1]: http://www.amazon.com/exec/obidos/ASIN/0735711771/
 [2]: http://www.orangedesign.com
 [3]: http://www.secretlevel.com
 [4]: http://www.lucasarts.com