---
title: 'Example : Using ANT with COMPC to compile SWCs'
author: mikechambers
date: 2006-05-19 12:25:01 -0800
layout: post
permalink: /2006/05/19/example-using-ant-with-compc-to-compile-swcs/
categories:
  - General
---


Following up on my previous post on [how to use compc to compile SWCs][1], here is an [ANT][2] build file that calls compc to compile a SWC:  
<!--more-->

  
`
<pre><?xml version="1.0" ?>
<project default="main">
	<property name="base" value="../" />
	<property name="componentName" value="MyWindow" />
	<property name="swcFile" value="${componentName}.swc" />
	<property name="manifest" value="${base}manifest.xml" />
	<property name="namespace" value="http://www.adobe.com/2006/foo" />

	<available property="swc.exists" file="${swcFile}"/>
	
	<target name="main" depends="init, compile">
	</target>
	
	<target name="init" if="swc.exists">
		<delete file="${swcFile}" />
	</target>

	<target name="compile" description="Compile SWC.">
		<echo>Building ${swcFile}</echo>
		<exec dir="." executable="cmd" failonerror="true">
		    <arg line="/c compc -namespace ${namespace} ${manifest} 
		        -source-path ${base}
		    	-include-namespaces ${namespace} -include-classes mx.containers.MyWindow
		    	-include-file MyWindow.png ${base}mx/containers/MyWindow.png 
				-output='${swcFile}'"/>
		</exec>        
	</target>
	
</project></pre>
<p>`

Put this in a file called build.xml, and run [ant][2] in the same directory.

 [1]: http://weblogs.macromedia.com/mesh/archives/2006/05/quick_example_u.html
 [2]: http://ant.apache.org