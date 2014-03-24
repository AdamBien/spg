spg
===

Static Page Generator based on Nashorn, Java 8 and Mustache

# Prerequisites
1. Java 8 is installed
2. jjs is [linked](http://download.java.net/jdk8/docs/technotes/guides/scripting/nashorn/shell.html)

# Installation

1. git clone https://github.com/AdamBien/spg.git
2. cd spg
3. chmod +x spg.js

# Usage

spg heavily relies on conventions. Executing:
```javascript
 spg.js
 ```
 
will read any `[name].htm` file process it with `[name].json` from input folder and write the resulting `[name].htm` file in output folder.

## Sample

 1. [input/index.htm](https://github.com/AdamBien/spg/blob/master/input/input.htm) (mustache template) [syntax](http://mustache.github.io/mustache.5.html)
 2. [input/index.json](https://github.com/AdamBien/spg/blob/master/input/input.json) (mustache view / json)
 3. [output/index.htm](https://github.com/AdamBien/spg/blob/master/output/input.htm) -> the result.

You can also pass the folders as arguments

```javascript
 spg.js [source] [target]
 ```


 # References

 spg is used to maintain the [http://workshops.adam-bien.com](http://workshops.adam-bien.com) pages and particularly the
 workshop dates and badges.


