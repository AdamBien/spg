#!/usr/bin/jjs -fv --language=es6
if(arguments.length === 0){
    print("Hint: no parameters specified, invoke with spg.js -- [input.dir] [output.dir]");
}
var inputDir = arguments[0];
var outputDir = arguments[1];

if(undefined === inputDir){
    inputDir = "./input";
    print("Reading from ${inputDir}")
}

if(undefined === outputDir){
    outputDir = "./output";
    print("Writing to ${outputDir}")
}

var homeDir = $ENV.SPG_HOME;
if (undefined === homeDir) {
    print("No SPG_HOME is defined, using the current directory")
    homeDir = ".";
}

var Files = Java.type("java.nio.file.Files");
var Paths = Java.type("java.nio.file.Paths");
var JString = Java.type("java.lang.String");
var extension = "*.{htm,html,xml}";
var debug = false;
var parameterExtension = ".json";
//load("${homeDir}/lib/mustache.js");
load("${homeDir}/lib/handlebars-v4.0.12.js")

Handlebars.registerHelper("subtract", subtract);
Handlebars.registerHelper("add", add);
Handlebars.registerHelper("multiply", multiply);
Handlebars.registerHelper("divide", divide);

function subtract(lvalue, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
    return lvalue - rvalue;
}
function add(lvalue, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
    return lvalue - rvalue;
}
function multiply(lvalue, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
    return lvalue * rvalue;
}
function divide(lvalue, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
    return lvalue / rvalue;
}

generate();

function generate() {
    print("Reading from ${inputDir}, writing to ${outputDir}")
    var directories = Files.newDirectoryStream(Paths.get(inputDir), "${extension}").iterator();
    while (directories.hasNext()) {
        var fileName = directories.next().getFileName().toString();
        print(fileName);
    var extensionIndex = fileName.lastIndexOf(".");
    var fileWithoutExtension = fileName.substring(0, extensionIndex);
    if(debug){
        print("File without extension ${fileWithoutExtension}");
    }
        let rawTemplate = read(fileName);
        let compiledTemplate = compileTemplate(rawTemplate);
        let parameters = loadParameters(fileWithoutExtension);
        let result = process(compiledTemplate,parameters);
        write(result,fileName);
    }
}

function read(file){
   print("Reading ${file}");
   return String(new JString(Files.readAllBytes(Paths.get("${inputDir}/${file}")),"UTF-8"));
}

function loadParameters(file){
    var parameterContent = read("${file}${parameterExtension}")
    print(parameterContent);
    return JSON.parse(parameterContent);

}

function compileTemplate(content) { 
    return Handlebars.compile(content);
}

function process(template,parameters) {
    if(debug){
        print("Processing: ${content} with ${parameters}");
    }

    var output = template(parameters);
    if(debug){
        print("Rendered ${output}");
    }
    return output;
}

function write(content, file) {
    var output = "${outputDir}/${file}";
    if(debug){
        print(typeof content);
        print("Writing ${content} to ${output}");
    }
    print("Writing: ${file}")
    Files.write(Paths.get(output), new JString(content).bytes);
}

