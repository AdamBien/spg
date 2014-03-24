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
```java
 spg.js
 ```
 will read any *.htm file process it with *.json from input folder and write the resulting *.htm file into output.

 input/index.htm [mustache template](http://mustache.github.io/mustache.5.html)
 input/index.json (mustache view / json)

 output/index.htm -> the result.

 # References

 spg is used to maintain the [http://workshops.adam-bien.com](http://workshops.adam-bien.com) pages and particularly the
 workshop dates and badges.


