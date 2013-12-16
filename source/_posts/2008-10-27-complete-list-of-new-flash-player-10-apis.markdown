---
title: Complete List of new Flash Player 10 APIs
author: mikechambers
date: 2008-10-27 12:33:01 -0800
layout: post
permalink: /2008/10/27/complete-list-of-new-flash-player-10-apis/
categories:
  - General
---


I am working on updating the [ActionScript RIA Reference Guide][1]. As part of that, I have to figure add all of the new APIs added to Flash Player 10.

Below is a list of such APIs generated and parsed from the APIs docs. I figured I would post it here as a reference, and also a sanity check (if you see anything wrong or missing, please post in the comments).  
<!--more-->

Update : I just updated the list and added a bunch of missing APIs. Thanks for all of the input.

`
<pre>--------------------------------Flash Player------------------------
--------------------------------Flash Player------------------------
--------------------------------Flash Player------------------------
Vector
p:Top Level
->Object
Implements:

Fields
	length:uint
	fixed:Boolean
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------
	concat():Vector.<T>
	every():Boolean
	filter():Vector.<T>
	forEach():void
	indexOf():int
	join():String
	lastIndexOf():int
	map():Vector.<T>
	pop():T
	push():uint
	reverse():Vector.<T>
	shift():T
	slice():Vector.<T>
	some():Boolean
	sort():Vector.<T>
	splice():Vector.<T>
	toString():String
	toLocaleString():String
	unshift():uint



-------------------------------------------
-------------------------------------------
NetStreamPlayOptions
p:flash.net
->EventDispatcher
Implements:

Fields
-------------
	len:Number
	oldStreamName:String
	start:Number
	streamName:String
	transition:String

Static Fields

-------------

Static Methods
-------------

Methods
-------------


-------------------------------------------
-------------------------------------------
BlendMode
p:flash.display
->Object
Implements:

Fields
-------------

Static Fields
-------------
	SHADER:String

Static Methods
-------------

Methods
-------------


-------------------------------------------
-------------------------------------------
Event
p:flash.events
->Object
Implements:

Fields
-------------

Static Fields
-------------
	CLEAR:String
	COPY:String
	CUT:String
	PASTE:String
	SELECT_ALL:String

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
FontType
p:flash.text
->Object
Implements:

Fields
-------------

Static Fields
-------------
	EMBEDDED_CFF:String;

Static Methods
-------------

Methods
-------------


-------------------------------------------
-------------------------------------------
ApplicationDomain
p:flash.system
->Object
Implements:

Fields
-------------
	domainMemory:ByteArray
	
Static Fields
-------------
	MIN_DOMAIN_MEMORY_LENGTH:uint

Static Methods
-------------

Methods
-------------

	
-------------------------------------------
-------------------------------------------
DisplayObject
p:flash.system
->EventDispatcher
Implements:
IBitmapDrawable

Fields
-------------
	blendShader:void
	rotationX:Number
	rotationY:Number
	rotationZ:Number
	scaleZ:Number
	z:Number

	
Static Fields
-------------

Static Methods
-------------

Methods
-------------	
	globalToLocal3D():Vector3D
	local3DToGlobal():Point
	


-------------------------------------------
-------------------------------------------
Microphone
p:flash.media
->EventDispatcher
Implements:

Fields
-------------
	codec:String
	encodeQuality:int
	framesPerPacket:int

Static Fields
-------------


Static Methods
-------------

Methods
-------------


-------------------------------------------
-------------------------------------------
MovieClip
p:flash.display
->Sprite
Implements:

Fields
-------------
	currentFrameLabel:String

	
Static Fields
-------------


Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
NetConnection
p:flash.net
->EventDispatcher
Implements:

Fields
-------------
	farID:String
	farNonce:String
	maxPeerConnections:uint
	nearID:String
	nearNonce:String
	protocol:String
	unconnectedPeerStreams:Array

	
Static Fields
-------------


Static Methods
-------------

Methods
-------------


-------------------------------------------
-------------------------------------------
ShaderParameter
p:flash.display
->Object
Implements:

Fields
-------------
	index:int
	type:String
	value:Array
	
Static Fields
-------------


Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
Sound
p:flash.media
->EventDispatcher
Implements:

Fields
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------
	extract():Number


-------------------------------------------
-------------------------------------------
Mouse
p:flash.ui
->Object
Implements:

Fields
-------------
	cursor:String
	
Static Fields
-------------

Static Methods
-------------

Methods
-------------



-------------------------------------------
-------------------------------------------
NetStream
p:flash.net
->EventDispatcher
Implements:

Fields
-------------
	farID:String
	info:NetStreamInfo
	nearNonce:String
	farNonce:String
	peerStreams:Array
	
Static Fields
-------------
	DIRECT_CONNECTIONS:String;
	CONNECT_TO_FMS:String

Static Methods
-------------

Methods
-------------
	onPeerConnect():Boolean
	play2():void
	
	
-------------------------------------------
-------------------------------------------
NetStreamInfo
p:flash.net
->Object
Implements:

Fields
-------------
	audioBufferByteLength:Number
	audioBufferLength:Number
	audioByteCount:Number
	audioBytesPerSecond:Number
	audioLossRate:Number
	byteCount:Number
	currentBytesPerSecond:Number
	dataBufferByteLength:Number
	dataBufferLength:Number
	dataByteCount:Number
	dataBytesPerSecond:Number
	droppedFrames:Number
	maxBytesPerSecond:Number
	playbackBytesPerSecond:Number
	SRTT:Number
	videoBufferByteLength:Number
	videoBufferLength:Number
	videoByteCount:Number
	videoBytesPerSecond:Number

	
Static Fields
-------------
	EMBEDDED_CFF:String;

Static Methods
-------------

Methods
-------------	
	toString():String
	
-------------------------------------------
-------------------------------------------
DigitCase
p:flash.text.engine
->Object
Implements:

Fields
-------------

Static Fields
	DEFAULT:String
	LINING:String
	OLD_STYLE:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
FontWeight
p:flash.text.engine
->Object
Implements:

Fields
-------------

Static Fields
	NORMAL:String
	BOLD:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
Kerning
p:flash.text.engine
->Object
Implements:

Fields
-------------

Static Fields
	ON:String
	OFF:String
	AUTO:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
FontDescription
p:flash.text.engine
->Object
Implements:

Fields
	renderingMode:String
	fontLookup:String
	fontName:String
	fontPosture:String
	fontWeight:String
	cffHinting:String
	locked:Boolean
-------------

Static Fields
-------------

Static Methods
-------------
	isFontCompatible():Boolean

Methods
-------------
	FontDescription()
	clone():FontDescription

-------------------------------------------
-------------------------------------------
LigatureLevel
p:flash.text.engine
->Object
Implements:

Fields
-------------

Static Fields
	NONE:String
	MINIMUM:String
	COMMON:String
	UNCOMMON:String
	EXOTIC:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
RenderingMode
p:flash.text.engine
->Object
Implements:

Fields
-------------

Static Fields
	NORMAL:String
	CFF:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
TextElement
p:flash.text.engine
->ContentElement
Implements:

Fields
	text:String
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------
	replaceText():void

-------------------------------------------
-------------------------------------------
FontPosture
p:flash.text.engine
->Object
Implements:

Fields
-------------

Static Fields
	NORMAL:String
	ITALIC:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
TextLineValidity
p:flash.text.engine
->Object
Implements:

Fields
-------------

Static Fields
	VALID:String
	POSSIBLY_INVALID:String
	INVALID:String
	STATIC:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
TextLineCreationResult
p:flash.text.engine
->Object
Implements:

Fields
-------------

Static Fields
	SUCCESS:String
	EMERGENCY:String
	COMPLETE:String
	INSUFFICIENT_WIDTH:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
BreakOpportunity
p:flash.text.engine
->Object
Implements:

Fields
-------------

Static Fields
	AUTO:String
	ANY:String
	NONE:String
	ALL:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
ContentElement
p:flash.text.engine
->Object
Implements:

Fields
	userData:*
	textBlock:TextBlock
	textBlockBeginIndex:int
	elementFormat:ElementFormat
	eventMirror:EventDispatcher
	groupElement:GroupElement
	rawText:String
	text:String
	textRotation:String
-------------

Static Fields
	GRAPHIC_ELEMENT:uint
-------------

Static Methods
-------------

Methods
-------------
	ContentElement()
	
-------------------------------------------
-------------------------------------------
TabStop
p:flash.text.engine
->Object
Implements:

Fields
	alignment:String
	position:Number
	decimalAlignmentToken:String
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
TabAlignment
p:flash.text.engine
->Object
Implements:

Fields
-------------

Static Fields
	START:String
	CENTER:String
	END:String
	DECIMAL:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
JustificationStyle
p:flash.text.engine
->Object
Implements:

Fields
-------------

Static Fields
	PUSH_IN_KINSOKU:String
	PUSH_OUT_ONLY:String
	PRIORITIZE_LEAST_ADJUSTMENT:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
FontMetrics
p:flash.text.engine
->Object
Implements:

Fields
	emBox:Rectangle
	strikethroughOffset:Number
	strikethroughThickness:Number
	underlineOffset:Number
	underlineThickness:Number
	subscriptOffset:Number
	subscriptScale:Number
	superscriptOffset:Number
	superscriptScale:Number
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------
	FontMetrics()
-------------------------------------------
-------------------------------------------
TextLineMirrorRegion
p:flash.text.engine
->Object
Implements:

Fields
	textLine:TextLine
	nextRegion:TextLineMirrorRegion
	previousRegion:TextLineMirrorRegion
	mirror:EventDispatcher
	element:ContentElement
	bounds:Rectangle
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
TextLine
p:flash.text.engine
->DisplayObjectContainer
Implements:

Fields
	userData:*
	textBlock:TextBlock
	hasGraphicElement:Boolean
	nextLine:TextLine
	previousLine:TextLine
	ascent:Number
	descent:Number
	textHeight:Number
	textWidth:Number
	textBlockBeginIndex:int
	rawTextLength:int
	specifiedWidth:Number
	unjustifiedTextWidth:Number
	validity:String
	atomCount:int
	mirrorRegions:Vector.<TextLineMirrorRegion>
-------------

Static Fields
	MAX_LINE_WIDTH:int
-------------

Static Methods
-------------

Methods
-------------
	getMirrorRegion():TextLineMirrorRegion
	flushAtomData():void
	getAtomIndexAtPoint():int
	getAtomIndexAtCharIndex():int
	getAtomBounds():Rectangle
	getAtomBidiLevel():int
	getAtomTextRotation():String
	getAtomTextBlockBeginIndex():int
	getAtomTextBlockEndIndex():int
	getAtomCenter():Number
	getAtomWordBoundaryOnLeft():Boolean
	getAtomGraphic():DisplayObject
	getBaselinePosition():Number
	dump():String

-------------------------------------------
-------------------------------------------
CFFHinting
p:flash.text.engine
->Object
Implements:

Fields
-------------

Static Fields
	NONE:String
	HORIZONTAL_STEM:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
ElementFormat
p:flash.text.engine
->Object
Implements:

Fields
	alignmentBaseline:String
	alpha:Number
	baselineShift:Number
	breakOpportunity:String
	color:uint
	dominantBaseline:String
	fontDescription:FontDescription
	digitCase:String
	digitWidth:String
	ligatureLevel:String
	fontSize:Number
	kerning:String
	locale:String
	textRotation:String
	trackingRight:Number
	trackingLeft:Number
	typographicCase:String
	locked:Boolean
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------
	ElementFormat()
	getFontMetrics():FontMetrics
	clone():ElementFormat

-------------------------------------------
-------------------------------------------
GraphicElement
p:flash.text.engine
->ContentElement
Implements:

Fields
	graphic:DisplayObject
	elementHeight:Number
	elementWidth:Number
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------
	GraphicElement()
	
-------------------------------------------
-------------------------------------------
DigitWidth
p:flash.text.engine
->Object
Implements:

Fields
-------------

Static Fields
	DEFAULT:String
	PROPORTIONAL:String
	TABULAR:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
TextJustifier
p:flash.text.engine
->Object
Implements:

Fields
	locale:String
	lineJustification:String
-------------

Static Fields
-------------

Static Methods
-------------
	getJustifierForLocale():TextJustifier

Methods
-------------
	clone():TextJustifier

-------------------------------------------
-------------------------------------------
TextBlock
p:flash.text.engine
->Object
Implements:

Fields
	userData:*
	applyNonLinearFontScaling:Boolean
	baselineFontDescription:FontDescription
	baselineFontSize:Number
	baselineZero:String
	content:ContentElement
	bidiLevel:int
	firstInvalidLine:TextLine
	firstLine:TextLine
	lastLine:TextLine
	textJustifier:TextJustifier
	textLineCreationResult:String
	lineRotation:String
	tabStops:Vector.<TabStop>
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------
	findNextAtomBoundary():int
	findPreviousAtomBoundary():int
	findNextWordBoundary():int
	findPreviousWordBoundary():int
	getTextLineAtCharIndex():TextLine
	createTextLine():TextLine
	releaseLines():void
	dump():String

-------------------------------------------
-------------------------------------------
GroupElement
p:flash.text.engine
->ContentElement
Implements:

Fields
	elementCount:int
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------
	getElementAt():ContentElement
	setElements():void
	groupElements():GroupElement
	ungroupElements():void
	mergeTextElements():TextElement
	splitTextElement():TextElement
	replaceElements():Vector.<ContentElement>
	getElementAtCharIndex():ContentElement
	getElementIndex():int

-------------------------------------------
-------------------------------------------
TypographicCase
p:flash.text.engine
->Object
Implements:

Fields
-------------

Static Fields
	DEFAULT:String
	TITLE:String
	CAPS:String
	SMALL_CAPS:String
	UPPERCASE:String
	LOWERCASE:String
	CAPS_AND_SMALL_CAPS:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
EastAsianJustifier
p:flash.text.engine
->TextJustifier
Implements:

Fields
	justificationStyle:String
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------
	clone():TextJustifier
	EastAsianJustifier()
-------------------------------------------
-------------------------------------------
LineJustification
p:flash.text.engine
->Object
Implements:

Fields
-------------

Static Fields
	UNJUSTIFIED:String
	ALL_BUT_LAST:String
	ALL_INCLUDING_LAST:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
SpaceJustifier
p:flash.text.engine
->TextJustifier
Implements:

Fields
	letterSpacing:Boolean
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------
	clone():TextJustifier

-------------------------------------------
-------------------------------------------
FontLookup
p:flash.text.engine
->Object
Implements:

Fields
-------------

Static Fields
	DEVICE:String
	EMBEDDED_CFF:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
TextRotation
p:flash.text.engine
->Object
Implements:

Fields
-------------

Static Fields
	ROTATE_0:String
	ROTATE_90:String
	ROTATE_180:String
	ROTATE_270:String
	AUTO:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
TextBaseline
p:flash.text.engine
->Object
Implements:

Fields
-------------

Static Fields
	ROMAN:String
	ASCENT:String
	DESCENT:String
	IDEOGRAPHIC_TOP:String
	IDEOGRAPHIC_CENTER:String
	IDEOGRAPHIC_BOTTOM:String
	USE_DOMINANT_BASELINE:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
TriangleCulling
p:flash.display
->Object
Implements:

Fields
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
ShaderData
p:flash.display
->Object
Implements:

Fields
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
GraphicsEndFill
p:flash.display
->Object
Implements:
	IGraphicsFill
	IGraphicsData

Fields
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------
	GraphicsEndFill()
-------------------------------------------
-------------------------------------------
ColorCorrectionSupport
p:flash.display
->Object
Implements:

Fields
-------------

Static Fields
	UNSUPPORTED:String
	DEFAULT_ON:String
	DEFAULT_OFF:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
ShaderInput
p:flash.display
->Object
Implements:

Fields
	input:Object
	width:int
	height:int
	channels:int
	index:int
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
GraphicsGradientFill
p:flash.display
->Object
Implements:
	IGraphicsFill
	IGraphicsData

Fields
	colors:Array
	alphas:Array
	ratios:Array
	matrix:Matrix
	focalPointRatio:Number
	type:String
	spreadMethod:String
	interpolationMethod:String
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
GraphicsPathWinding
p:flash.display
->Object
Implements:

Fields
-------------

Static Fields
	EVEN_ODD:String
	NON_ZERO:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
GraphicsStroke
p:flash.display
->Object
Implements:
	IGraphicsStroke
	IGraphicsData

Fields
	thickness:Number
	pixelHinting:Boolean
	miterLimit:Number
	fill:IGraphicsFill
	caps:String
	joints:String
	scaleMode:String
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
ShaderParameterType
p:flash.display
->Object
Implements:

Fields
-------------

Static Fields
	FLOAT:String
	FLOAT2:String
	FLOAT3:String
	FLOAT4:String
	INT:String
	INT2:String
	INT3:String
	INT4:String
	BOOL:String
	BOOL2:String
	BOOL3:String
	BOOL4:String
	MATRIX2X2:String
	MATRIX3X3:String
	MATRIX4X4:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
IGraphicsStroke
p:flash.display
->Object
Implements:

Fields
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
ShaderJob
p:flash.display
->EventDispatcher
Implements:

Fields
	shader:Shader
	target:Object
	width:int
	height:int
	progress:Number
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------
	start():void
	cancel():void

-------------------------------------------
-------------------------------------------
GraphicsBitmapFill
p:flash.display
->Object
Implements:
	IGraphicsFill
	IGraphicsData

Fields
	bitmapData:BitmapData
	matrix:Matrix
	repeat:Boolean
	smooth:Boolean
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------
	GraphicsBitmapFill()
-------------------------------------------
-------------------------------------------
IGraphicsData
p:flash.display
->Object
Implements:

Fields
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
Shader
p:flash.display
->Object
Implements:

Fields
	byteCode:ByteArray
	data:ShaderData
	precisionHint:String
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
GraphicsPath
p:flash.display
->Object
Implements:
	IGraphicsPath
	IGraphicsData

Fields
	commands:Vector.<int>
	data:Vector.<Number>
	winding:String
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------
	moveTo():void
	lineTo():void
	curveTo():void
	wideLineTo():void
	wideMoveTo():void

-------------------------------------------
-------------------------------------------
IGraphicsFill
p:flash.display
->Object
Implements:

Fields
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
GraphicsShaderFill
p:flash.display
->Object
Implements:
	IGraphicsFill
	IGraphicsData

Fields
	shader:Shader
	matrix:Matrix
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
ShaderPrecision
p:flash.display
->Object
Implements:

Fields
-------------

Static Fields
	FULL:String
	FAST:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
IDrawCommand
p:flash.display
->Object
Implements:

Fields
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
GraphicsTrianglePath
p:flash.display
->Object
Implements:
	IGraphicsPath
	IGraphicsData

Fields
	indices:Vector.<int>
	vertices:Vector.<Number>
	uvtData:Vector.<Number>
	culling:String
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
ColorCorrection
p:flash.display
->Object
Implements:

Fields
-------------

Static Fields
	DEFAULT:String
	ON:String
	OFF:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
GraphicsPathCommand
p:flash.display
->Object
Implements:

Fields
-------------

Static Fields
	NO_OP:int
	MOVE_TO:int
	LINE_TO:int
	CURVE_TO:int
	WIDE_MOVE_TO:int
	WIDE_LINE_TO:int
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
IGraphicsPath
p:flash.display
->Object
Implements:

Fields
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
GraphicsSolidFill
p:flash.display
->Object
Implements:
	IGraphicsFill
	IGraphicsData

Fields
	color:uint
	alpha:Number
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
ShaderFilter
p:flash.filters
->BitmapFilter
Implements:

Fields
	shader:Shader
	leftExtension:int
	topExtension:int
	rightExtension:int
	bottomExtension:int
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
NetStreamPlayTransitions
p:flash.net
->Object
Implements:

Fields
-------------

Static Fields
	APPEND:
	RESET:
	SWITCH:
	SWAP:
	STOP:
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
SoundCodec
p:flash.media
->Object
Implements:

Fields
-------------

Static Fields
	NELLYMOSER:String
	SPEEX:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
ContextMenuClipboardItems
p:flash.ui
->Object
Implements:

Fields
	cut:Boolean
	copy:Boolean
	paste:Boolean
	clear:Boolean
	selectAll:Boolean
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
MouseCursor
p:flash.ui
->Object
Implements:

Fields
-------------

Static Fields
	AUTO:String
	ARROW:String
	BUTTON:String
	HAND:String
	IBEAM:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
ClipboardTransferMode
p:flash.desktop
->Object
Implements:

Fields
-------------

Static Fields
	ORIGINAL_PREFERRED:String
	ORIGINAL_ONLY:String
	CLONE_PREFERRED:String
	CLONE_ONLY:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
Clipboard
p:flash.desktop
->Object
Implements:

Fields
	formats:Array
-------------

Static Fields
	generalClipboard:Clipboard
-------------

Static Methods
-------------

Methods
-------------
	clear():void
	clearData():void
	setData():Boolean
	setDataHandler():Boolean
	getData():Object
	hasFormat():Boolean

-------------------------------------------
-------------------------------------------
ClipboardFormats
p:flash.desktop
->Object
Implements:

Fields
-------------

Static Fields
	TEXT_FORMAT:String
	HTML_FORMAT:String
	RICH_TEXT_FORMAT:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
ShaderEvent
p:flash.events
->Event
Implements:

Fields
	bitmapData:BitmapData
	byteArray:ByteArray
	vector:Vector.<Number>
-------------

Static Fields
	COMPLETE:String
-------------

Static Methods
-------------

Methods
-------------
	clone():Event
	toString():String

-------------------------------------------
-------------------------------------------
SampleDataEvent
p:flash.events
->Event
Implements:

Fields
	position:Number
	data:ByteArray
-------------

Static Fields
	SAMPLE_DATA:String
-------------

Static Methods
-------------

Methods
-------------
	clone():Event
	toString():String

-------------------------------------------
-------------------------------------------
Vector3D
p:flash.geom
->Object
Implements:

Fields
	x:Number
	y:Number
	z:Number
	w:Number
	length:Number
	lengthSquared:Number
-------------

Static Fields
	X_AXIS:Vector3D
	Y_AXIS:Vector3D
	Z_AXIS:Vector3D
-------------

Static Methods
-------------
	angleBetween():Number
	distance():Number

Methods
-------------
	clone():Vector3D
	dotProduct():Number
	crossProduct():Vector3D
	normalize():Number
	scaleBy():void
	incrementBy():void
	decrementBy():void
	add():Vector3D
	subtract():Vector3D
	negate():void
	equals():Boolean
	nearEquals():Boolean
	project():void
	toString():String

-------------------------------------------
-------------------------------------------
Orientation3D
p:flash.geom
->Object
Implements:

Fields
-------------

Static Fields
	EULER_ANGLES:String
	AXIS_ANGLE:String
	QUATERNION:String
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
PerspectiveProjection
p:flash.geom
->Object
Implements:

Fields
	fieldOfView:Number
	projectionCenter:Point
	focalLength:Number
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------
	toMatrix3D():Matrix3D

-------------------------------------------
-------------------------------------------
Matrix3D
p:flash.geom
->Object
Implements:

Fields
	rawData:Vector.<Number>
	position:Vector3D
	determinant:Number
-------------

Static Fields
-------------

Static Methods
-------------
	interpolate():Matrix3D

Methods
-------------
	clone():Matrix3D
	append():void
	prepend():void
	invert():Boolean
	identity():void
	decompose():Vector.<Vector3D>
	recompose():Boolean
	appendTranslation():void
	appendRotation():void
	appendScale():void
	prependTranslation():void
	prependRotation():void
	prependScale():void
	transformVector():Vector3D
	deltaTransformVector():Vector3D
	transformVectors():void
	transpose():void
	pointAt():void
	interpolateTo():void

-------------------------------------------
-------------------------------------------
Utils3D
p:flash.geom
->Object
Implements:

Fields
-------------

Static Fields
-------------

Static Methods
-------------
	projectVector():Vector3D
	projectVectors():void
	pointTowards():Matrix3D

Methods
-------------

-------------------------------------------
-------------------------------------------
JPEGLoaderContext
p:flash.system
->LoaderContext
Implements:

Fields
	deblockingFilter:Number
-------------

Static Fields
-------------

Static Methods
-------------

Methods
-------------

-------------------------------------------
-------------------------------------------
</pre>
<p>`

 [1]: http://www.mikechambers.com/blog/2008/03/17/actionscript-3-ria-reference-guide/