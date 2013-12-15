---
title: Creating a default DATETIME_FORMAT filter for django
author: mikechambers
layout: post
permalink: /2008/05/02/creating-a-default-datetime_format-filter-for-django/
categories:
  - General
tags:
  - django
---


Here is a simple [django][1] [template][2] [filter][3] that will format a date according to the [DATETIME_FORMAT][4] variable in the settings file.  
<!--more-->

<div class="highlight">
  <pre><code>&lt;span style="color: #008000; font-weight: bold">from&lt;/span> &lt;span style="color: #0000FF; font-weight: bold">django&lt;/span> &lt;span style="color: #008000; font-weight: bold">import&lt;/span> template
&lt;span style="color: #008000; font-weight: bold">from&lt;/span> &lt;span style="color: #0000FF; font-weight: bold">settings&lt;/span> &lt;span style="color: #008000; font-weight: bold">import&lt;/span> DATETIME_FORMAT
&lt;span style="color: #008000; font-weight: bold">from&lt;/span> &lt;span style="color: #0000FF; font-weight: bold">django.template.defaultfilters&lt;/span> &lt;span style="color: #008000; font-weight: bold">import&lt;/span> date

register &lt;span style="color: #666666">=&lt;/span> template&lt;span style="color: #666666">.&lt;/span>Library()
	
&lt;span style="color: #AA22FF">@register&lt;/span>&lt;span style="color: #666666">.&lt;/span>filter
&lt;span style="color: #008000; font-weight: bold">def&lt;/span> &lt;span style="color: #0000FF">default_datetime&lt;/span>(value):
	&lt;span style="color: #008000; font-weight: bold">try&lt;/span>:
		v &lt;span style="color: #666666">=&lt;/span> date(value, DATETIME_FORMAT)
	&lt;span style="color: #008000; font-weight: bold">except&lt;/span>:
		&lt;span style="color: #008000; font-weight: bold">return&lt;/span> value
	
	&lt;span style="color: #008000; font-weight: bold">return&lt;/span> v
	
&lt;/pre>
&lt;p></code></div>
<p>
  Save this in a file named <em>default_date_filters.py</em> and place it in a directory called <em>templatetags</em> in your application directory (along with a file named <em>__init__.py</em>.
</p>


<p>
  You can then use the filter in a template like so:
</p>


<pre><code>
{% raw  %}
{% load default_date_filters  %}

{% item.created_date|default_datetime%}
{% endraw %}
</code></pre>


<p>
  &nbsp;
</p>


<p>
  You can find more information and how to create and use custom template filters in django <a href="http://www.biais.org/blog/index.php/2007/01/11/11-django-custom-template-filters">here</a> and <a href="http://www.djangoproject.com/documentation/templates_python/#writing-custom-template-filters">here</a>. You can find information on django settings <a href="http://www.djangoproject.com/documentation/settings/#datetime-format">here</a>.
</p>

 [1]: http://www.djangoproject.com
 [2]: http://www.djangoproject.com/documentation/templates/
 [3]: http://www.djangoproject.com/documentation/templates/#built-in-filter-reference
 [4]: http://www.djangoproject.com/documentation/settings/#datetime-format