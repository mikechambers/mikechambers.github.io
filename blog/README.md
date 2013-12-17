#Blog

## Todo

* compress pngs
* run page through tidy
* continue to update blogs
* next / previous posts : [info](http://stackoverflow.com/questions/2026023/having-difficulties-with-jekyll-liquid)
* Figure out what to do with : <!--more-->
* set up rss
* give credit for icons
* add continuos scroll to main page
* push content through tidy
* filter files that are moved to web server

### Page

* Create about page
* Link email in footer?
* impliment smart loading
* add comments

## Requirements

* jekyll 1.4.2
* redcarpet
* albino (required by redcarpet)

## General Resources
* [jekyll Front-matter docs](http://jekyllrb.com/docs/frontmatter/)

## Using Redcardpet 2 for Markdown

We are using the Redcarpet 2 markdown renderer. Need to follow install instructions for the plugin on the project page:

[https://github.com/nono/Jekyll-plugins](https://github.com/nono/Jekyll-plugins)

Install commands:

``` bash
sudo gem install redcarpet
sudo gem install albino
```

Additional info at:

* [Stackoverflow : Github flavored markdown and pigments highlighting](http://stackoverflow.com/questions/13464590/github-flavored-markdown-and-pygments-highlighting-in-jekyll)
* [Stackoverflow : Using redcarpet with Jekyll](https://github.com/vmg/redcarpet/blob/v2.2.2/README.markdown#and-its-like-really-simple-to-use)


## Liquid

Liquid is the tempting engine used by Jekyll. Below are some useful resources / references:

* [Formatting dates](http://alanwsmith.com/jekyll-liquid-date-formatting-examples).
* [Liquid Cheatsheet for designers](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)


## Code Highlighting

Getting code highlighting working like I want requires some work. Specifically:

* Install and configured Redcarpet 2 for Markdown (this allows for Github type code blocks)
* Install a a plugin to enable line numbers.
* Update the CSS to to support the styling
* Remove existing code / pre CSS classes which were causing some issues.

Resources:

* [Code fenced blocks, Pygments and line numbers with jekyll](http://blog.leonardfactory.com/2013/05/05/code-fenced-blocks-pygments-and-line-numbers-with-jekyll/) : This has everything you need to get code hints working with styling and line numbers. Note, the CSS in the post sass or less, so you have to replace the mixins.
* [Collection of pygments CSS themes](https://github.com/richleland/pygments-css)
* [Solarized theme for pygments/ jekyll](https://gist.github.com/scotu/1272660)


## excerpt_separator

You can specify an *excerpt_separator* property that will allow you to specify which part of your post should be considered an excerpt.

Current have it set in the *_config.yaml* as:

``` yaml
excerpt_separator: <!--more-->
```

which is the separator used by wordpress (which is where my posts were exported from)

I have not confirmed if it works.

# General Tips

Command to list installed Gems

``` bash
gem query --local
```
