---
title: 'Branden Hall Session 2 of 3 : Creating applications in Flash MX'
author: mikechambers
layout: post
permalink: /2002/07/10/branden-hall-session-2-of-3-creating-applications-in-flash-mx/
categories:
  - Conferences
---


**Components**  
  
*   Self encapsultated widgets  
    *   at the core, they are just movie clips  
        *   usually drag and drop (i.e scrollbar)  
            *   Full API</UL>
              
            UI Component Set 2 From Macromedia. Avaliable from [Flash Exchange][1].  
            Most components support handlers, which is the name of the function that you want to be called when an event happens. By default the function is on the same timeline as the components. You can set them via the API to use functions on any object.  
            Components are similar to components in MS visual studio, or Swing.  
            Component API : Extensive, full featured API. Components can be treated like class instances.  
            Data Providers  
              
            *   interface for a way to access sets of data.  
                *   can set via setDataProvider methods (in supported components). accepts DataProviderClass, RecordSet, arrays of objects.  
                    *   DataProviderClass, included with some of the components (look in the components assets in the library).  
                        *   Using data provider means that data will always be in sync, so if data in dataprovider changes, any components using that dataprovider class will update themselves with the changes.</UL>
                          
                        Data Glue  
                          
                        *   Used to &#8220;auto-mungh&#8221; dataproviders to work with some components. it maps the properties to those required by listbox, and combo box components (and some others).  
                            *   Simple built in formatter.  
                                *   Included with Flash Remoting Components (avaliable from macromedia).  
                                    *   Branden will put up an example at his website, [waxpraxis.org][2].</UL>
                                      
                                    Skinning Components  
                                    Can do with code using FStyleFormat class. Created a new syle format object, and then you can set all of its properties (look in reference panel for complete list).
                                    <PRE>sf = new FStyleFormat();</PRE>
                                    
                                    <PRE>sf.face = 0x00ff00;</PRE>
                                    
                                    <PRE>sf.addListener(componentName);</PRE>
                                    
                                    <PRE>sf.applyChanges();</PRE>
                                    
                                      
                                    you can also set individual properties through setStyleProperty on the component.
                                    <PRE>componentName.setStyleProperty(&#8220;face&#8221;, 0x00ff00);</PRE>
                                    
                                      
                                    Can set globally using GlobalStyleFormat class.  
                                    Can also skin in the library, by actually editing graphics. Library > Flash UI Components > Component Skins.  
                                    Skins are broken into very small pieces. if you are making you own skins, you dont have to make them into so many small peices. it is done this way in the flash components to work with stye objects.  
                                    Customizing Components  
                                    Can extend and customize components. Extending Listbox.  
                                      
                                    *   Create symbol that will be used for the item, and associate a class with it.  
                                        *   The class has certain methods that will draw internals of listbox.  
                                            *   Need to register the new symbol with the component.  
                                                *   Couple of articles on [Flash Application Developer Center][3] on this. (one by branden, one by nigel pegg, one by greg burch).</UL>
                                                  
                                                Creating Components  
                                                  
                                                *   can be difficult.  
                                                    *   one off components, and robust, generic components. the latter can take a long time, but are usually more useful in more situations.</UL>
                                                      
                                                    main pieces  
                                                      
                                                    *   main code, displays item, drawing  
                                                        *   API code, runtime manipulation  
                                                            *   Parameter, customer UI (PI)  
                                                                *   Live Preview (can become complex).</UL>
                                                                  
                                                                branden is showing the TabBar component that he built, showing how the live preview automatically updates when properties in the property inspector is updated. Nigel Pegg is going to have a lot more info on this during his session.  
                                                                Dont name a parameter &#8220;horizontal&#8221;, if it gets set to true, it will rotate component.  
                                                                Flash Remoting  
                                                                Branden really likes it.  
                                                                  
                                                                *   &#8220;Best way to connect flash to servers. period. end of story.&#8221;  
                                                                    *   Can send and receive native Flash / Data types. don&#8217;t have to do any data serialization / de-serialization.  
                                                                        *   Can directly call remote services from flash (java, .net, cfmx, web services, etc...).  
                                                                            *   Authoring Components are free from macromedia.com. Gateway is included with jrun4, and cfmx. will be avaliable for .net and java servers.</UL>
                                                                              
                                                                            XML is a very verbose way to serialize data. Flash Player communicates with Flash Remoting Adaptor via AMF, a binary format created specifically to serialize ActionScript data types. very efficient and lightweight.  
                                                                            branden is showing his book app again.&nbsp;&nbsp;when specifying URL for remote web service, you point to the web services WSDL file (in this case, he is calling a remote web service creating in ASP.NET).  
                                                                            branden is passing the responder object as the first parameter to the remote method. onResult method is automatically called when data is returned from remote service.  
                                                                            NetDebug.as, include this and you can use the NetConnection Debuger Panel (Window > NetConnection Debugger), and it will show all of the communication bewtween flash and the server.  
                                                                            end of session.</p>

 [1]: http://www.macromedia.com/exchange/flash/
 [2]: http://www.waxpraxis.org
 [3]: http://www.macromedia.com/desdev/mx/flash/