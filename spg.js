#!/usr/bin/jjs -fv
var homeDir = $ENV.SPG_HOME;
if(undefined === homeDir){
    print("No SPG_HOME is defined, using the current directory")
    homeDir = ".";
}
var Files = Java.type("java.nio.file.Files");
var Paths = Java.type("java.nio.file.Paths");
var JString = Java.type("java.lang.String");
var inputDir = "./input";
var outputDir = "./output";
var extension = ".htm";
var parameterExtension = ".json";
load("${homeDir}/lib/mustache.js");
generate();

function generate() {
    var directories = Files.newDirectoryStream(Paths.get(inputDir), "*${extension}").iterator();
    while (directories.hasNext()) {
        var fileName = directories.next().getFileName().toString();
        print(fileName);
    var extensionIndex = fileName.indexOf(extension);
    var fileWithoutExtension = fileName.substring(0, extensionIndex);
    print("File without extension ${fileWithoutExtension}");
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
    print("Processing: ${content} with ${parameters}")
    var output = Mustache.render(content,parameters);
    print("Rendered ${output}");
    return output;

}


function write(content, file) {
    var output = "${outputDir}/${file}";
    print(typeof content);
    print("Writing ${content} to ${output}");
    Files.write(Paths.get(output), new JString(content).bytes);
}