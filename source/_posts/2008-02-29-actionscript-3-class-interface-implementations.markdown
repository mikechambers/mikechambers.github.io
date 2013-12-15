---
title: ActionScript 3 Class Interface Implementations
author: mikechambers
layout: post
permalink: /2008/02/29/actionscript-3-class-interface-implementations/
categories:
  - General
---


Below is a list of all [ActionScript 3 classes][1] in the Flash Player, Flex 3, and Adobe AIR 1.0 APIs that implement interfaces, as well a list of the interfaces that they implement.

I had to create the list for a reference guide I am working on, so I figured I would post it here in case anyone found it useful. Post in the comments if you find any errors.  
<!--more-->

  
**AbstractMessage ** : IMessage  
**AbstractService ** : IEventDispatcher  
**AbstractTarget ** : ILoggingTarget, IMXMLObject  
**Accordion ** : IHistoryManagerClient, IFocusManagerComponent  
**AccordionHeader ** : IDataRenderer  
**AddChild ** : IOverride  
**AdvancedDataGridBaseEx ** : IIMESupport  
**AdvancedDataGridColumn ** : IIMESupport  
**AdvancedDataGridGroupItemRenderer ** : IDataRenderer, IDropInListItemRenderer, IListItemRenderer, IFontContextComponent  
**AdvancedDataGridHeaderRenderer ** : IDataRenderer, IDropInListItemRenderer, IListItemRenderer  
**AdvancedDataGridItemRenderer ** : IDataRenderer, IDropInListItemRenderer, ILayoutManagerClient, IListItemRenderer, IStyleClient  
**AdvancedDataGridRendererProvider ** : IAdvancedDataGridRendererProvider  
**AdvancedListBase ** : IDataRenderer, IFocusManagerComponent, IListItemRenderer, IDropInListItemRenderer, IEffectTargetHost  
**AreaRenderer ** : IDataRenderer  
**AreaSeries ** : IStackable2  
**ArrayCollection ** : IExternalizable  
**AsyncResponder ** : IResponder  
**AverageAggregator ** : IOLAPCustomAggregator  
**AxisRenderer ** : IAxisRenderer  
**BarSeries ** : IStackable2, IBar  
**BarSet ** : IBar  
**BitmapAsset ** : IFlexAsset, IFlexDisplayObject  
**BitmapData ** : IBitmapDrawable  
**BitmapFill ** : IFill  
**Border ** : IBorder  
**BoxItemRenderer ** : IDataRenderer  
**Button ** : IDataRenderer, IDropInListItemRenderer, IFocusManagerComponent, IListItemRenderer, IFontContextComponent, IButton  
**ButtonAsset ** : IFlexAsset, IFlexDisplayObject  
**ButtonBar ** : IFocusManagerComponent  
**ByteArray ** : IDataInput, IDataOutput  
**ByteArrayAsset ** : IFlexAsset  
**CandlestickItemRenderer ** : IDataRenderer  
**Canvas ** : IConstraintLayout  
**CategoryAxis ** : IAxis  
**Channel ** : IMXMLObject  
**ChartBase ** : IFocusManagerComponent  
**ChartElement ** : IChartElement2  
**ChartLabel ** : IDataRenderer  
**CircleItemRenderer ** : IDataRenderer  
**ClassFactory ** : IFactory  
**ColumnSeries ** : IColumn, IStackable2  
**ColumnSet ** : IColumn  
**ComboBase ** : IIMESupport, IFocusManagerComponent  
**ComboBox ** : IDataRenderer, IDropInListItemRenderer, IListItemRenderer  
**ConstraintColumn ** : IMXMLObject  
**ConstraintRow ** : IMXMLObject  
**Container ** : IContainer, IDataRenderer, IFocusManagerContainer, IListItemRenderer, IRawChildrenContainer  
**CountAggregator ** : IOLAPCustomAggregator  
**CrossItemRenderer ** : IDataRenderer  
**DataGrid ** : IIMESupport  
**DataGridBase ** : IFontContextComponent  
**DataGridColumn ** : IIMESupport  
**DataGridItemRenderer ** : IDataRenderer, IDropInListItemRenderer, ILayoutManagerClient, IListItemRenderer, IStyleClient  
**DataTip ** : IDataRenderer  
**DateChooser ** : IFocusManagerComponent, IFontContextComponent  
**DateField ** : IDataRenderer, IDropInListItemRenderer, IFocusManagerComponent, IListItemRenderer  
**DefaultDataDescriptor ** : ITreeDataDescriptor2, IMenuDataDescriptor  
**DeferredInstanceFromClass ** : IDeferredInstance  
**DeferredInstanceFromFunction ** : IDeferredInstance  
**DiamondItemRenderer ** : IDataRenderer  
**DisplayObject ** : IBitmapDrawable  
**DownloadProgressBar ** : IPreloaderDisplay  
**Effect ** : IEffect  
**EffectInstance ** : IEffectInstance  
**EventDispatcher ** : IEventDispatcher  
**FileStream ** : IDataInput, IDataOutput  
**FlexHTMLLoader ** : IFocusManagerComplexComponent  
**FlexNativeMenu ** : ILayoutManagerClient, IFlexContextMenu  
**FocusManager ** : IFocusManager  
**FontAsset ** : IFlexAsset  
**GroupingCollection ** : IGroupingCollection  
**HaloFocusRect ** : IStyleClient  
**HierarchicalCollectionView ** : IHierarchicalCollectionView  
**HierarchicalCollectionViewCursor ** : IHierarchicalCollectionViewCursor  
**HierarchicalData ** : IHierarchicalData  
**HLOCItemRenderer ** : IDataRenderer  
**HLOCSeriesBase ** : IColumn  
**HTML ** : IDataRenderer, IDropInListItemRenderer, IListItemRenderer, IFocusManagerComponent  
**HTTPService ** : IMXMLSupport, IMXMLObject  
**IDropInListItemRenderer** : Implements the listData property  
**IDropInListItemRenderer** : Implements the listData property  
**Image ** : IDataRenderer, IDropInListItemRenderer, IListItemRenderer  
**ItemResponder ** : IResponder  
**JPEGEncoder ** : IImageEncoder  
**Label ** : IDataRenderer, IDropInListItemRenderer, IListItemRenderer, IFontContextComponent  
**LayoutContainer ** : IConstraintLayout  
**LayoutManager ** : ILayoutManager  
**LinearGradient ** : IFill  
**LinearGradientStroke ** : IStroke  
**LineRenderer ** : IDataRenderer  
**List ** : IIMESupport  
**ListBase ** : IDataRenderer, IFocusManagerComponent, IListItemRenderer, IDropInListItemRenderer, IEffectTargetHost  
**ListCollectionView ** : ICollectionView, IList, IMXMLObject  
**ListItemRenderer ** : IDataRenderer, IDropInListItemRenderer, IListItemRenderer, IFontContextComponent  
**LogLogger ** : ILogger  
**MaxAggregator ** : IOLAPCustomAggregator  
**Menu ** : IFocusManagerContainer  
**MenuBar ** : IFocusManagerComponent  
**MenuBarItem ** : IMenuBarItemRenderer, IFontContextComponent  
**MenuItemRenderer ** : IDataRenderer, IListItemRenderer, IMenuItemRenderer, IDropInListItemRenderer, IFontContextComponent  
**MessageAgent ** : IMXMLObject  
**MinAggregator ** : IOLAPCustomAggregator  
**ModuleLoader ** : IDeferredInstantiationUIComponent  
**MovieClipAsset ** : IFlexAsset, IFlexDisplayObject, IBorder  
**MovieClipLoaderAsset ** : IFlexAsset, IFlexDisplayObject  
**NumericAxis ** : IAxis  
**NumericStepper ** : IDataRenderer, IDropInListItemRenderer, IFocusManagerComponent, IIMESupport, IListItemRenderer  
**ObjectProxy ** : IExternalizable, IPropertyChangeNotifier  
**OLAPAttribute ** : IOLAPAttribute  
**OLAPAxisPosition ** : IOLAPAxisPosition  
**OLAPCell ** : IOLAPCell  
**OLAPCube ** : IOLAPCube, IEventDispatcher  
**OLAPDataGridGroupRenderer ** : IDataRenderer, IDropInListItemRenderer, IListItemRenderer  
**OLAPDimension ** : IOLAPDimension  
**OLAPElement ** : IOLAPElement  
**OLAPHierarchy ** : IOLAPHierarchy  
**OLAPLevel ** : IOLAPLevel  
**OLAPMember ** : IOLAPMember  
**OLAPQuery ** : IOLAPQuery  
**OLAPQueryAxis ** : IOLAPQueryAxis  
**OLAPResult ** : IOLAPResult  
**OLAPResultAxis ** : IOLAPResultAxis  
**OLAPSchema ** : IOLAPSchema  
**OLAPSet ** : IOLAPSet  
**OLAPTuple ** : IOLAPTuple  
**Operation ** : IMXMLSupport  
**Operation ** : IMXMLSupport  
**Panel ** : IConstraintLayout, IFontContextComponent  
**PNGEncoder ** : IImageEncoder  
**PopUpButtonSkin ** : IProgrammaticSkin  
**ProgrammaticSkin ** : IFlexDisplayObject, IInvalidating, ILayoutManagerClient, ISimpleStyleClient, IProgrammaticSkin  
**ProgressBar ** : IFontContextComponent  
**RadialGradient ** : IFill  
**RadioButton ** : IFocusManagerGroup  
**RadioButtonGroup ** : IMXMLObject  
**RectangularBorder ** : IRectangularBorder  
**RemoteObject ** : IMXMLSupport, IMXMLObject  
**RemoveChild ** : IOverride  
**Repeater ** : IRepeater  
**ResourceBundle ** : IResourceBundle  
**ResourceManagerImpl ** : IResourceManager  
**Responder ** : IResponder  
**SetEventHandler ** : IOverride  
**SetProperty ** : IOverride  
**SetStyle ** : IOverride  
**ShadowBoxItemRenderer ** : IDataRenderer  
**ShadowLineRenderer ** : IDataRenderer  
**Socket ** : IDataInput, IDataOutput  
**SolidColor ** : IFill  
**SoundAsset ** : IFlexAsset  
**SpriteAsset ** : IFlexAsset, IFlexDisplayObject, IBorder  
**Stroke ** : IStroke  
**StyleProxy ** : IStyleClient  
**SumAggregator ** : IOLAPCustomAggregator  
**SystemManager ** : IChildList, IFlexDisplayObject, IFlexModuleFactory, ISystemManager  
**TabNavigator ** : IFocusManagerComponent  
**TextArea ** : IDataRenderer, IDropInListItemRenderer, IFocusManagerComponent, IIMESupport, IListItemRenderer, IFontContextComponent  
**TextFieldAsset ** : IFlexAsset, IFlexDisplayObject  
**TextInput ** : IDataRenderer, IDropInListItemRenderer, IFocusManagerComponent, IIMESupport, IListItemRenderer, IFontContextComponent  
**TileListItemRenderer ** : IDataRenderer, IDropInListItemRenderer, IListItemRenderer, IFontContextComponent  
**ToolTip ** : IToolTip, IFontContextComponent  
**Tree ** : IIMESupport  
**TreeItemRenderer ** : IDataRenderer, IDropInListItemRenderer, IListItemRenderer, IFontContextComponent  
**TriangleItemRenderer ** : IDataRenderer  
**UIComponent ** : IAutomationObject, IChildList, IDeferredInstantiationUIComponent, IFlexDisplayObject, IFlexModule, IInvalidating, ILayoutManagerClient, IPropertyChangeNotifier, IRepeaterClient, ISimpleStyleClient, IStyleClient, IToolTipManagerClient, IUIComponent, IValidatorListener, IStateClient, IConstraintClient  
**UIComponentAutomationImpl ** : IAutomationObject  
**UIMovieClip ** : IDeferredInstantiationUIComponent, IToolTipManagerClient, IStateClient, IFocusManagerComponent, IConstraintClient, IAutomationObject  
**UIMovieClipAutomationImpl ** : IAutomationObject  
**UITextField ** : IAutomationObject, IIMESupport, IFlexModule, IInvalidating, ISimpleStyleClient, IToolTipManagerClient, IUITextField  
**UITextFieldAutomationImpl ** : IAutomationObject  
**URLStream ** : IDataInput  
**Validator ** : IMXMLObject  
**ViewStack ** : IHistoryManagerClient  
**WebService ** : IMXMLSupport, IMXMLObject  
**WedgeItemRenderer ** : IDataRenderer  
**Window ** : IWindow  
**WindowedApplication ** : IWindow  
**WindowedSystemManager ** : ISystemManager

 [1]: http://livedocs.adobe.com/flex/3/langref/index.html