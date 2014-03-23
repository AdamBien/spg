#!/usr/bin/jjs -fv
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
var extension = ".htm";
var debug = false;
var parameterExtension = ".json";
load("${homeDir}/lib/mustache.js");
generate();

function generate() {
    print("Reading from ${inputDir}, writing to ${outputDir}")
    var directories = Files.newDirectoryStream(Paths.get(inputDir), "*${extension}").iterator();
    while (directories.hasNext()) {
        var fileName = directories.next().getFileName().toString();
        print(fileName);
    var extensionIndex = fileName.indexOf(extension);
    var fileWithoutExtension = fileName.substring(0, extensionIndex);
    if(debug){
        print("File without extension ${fileWithoutExtension}");
    }
    write(
        process(read(fileName),loadParameters(fileWithoutExtension)),
        fileName);
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
function process(content,parameters) {
    if(debug){
        print("Processing: ${content} with ${parameters}");
    }
    var output = Mustache.render(content,parameters);
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