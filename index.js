var xlsx = require("node-xlsx").default;
var _ = require("lodash");
var fs = require("fs");

var parser = require("./src/parser");
var arguments = require("./src/arguments");

var languages = arguments.languages;
var inputPath = arguments.inputFile;
var outputPath = arguments.outputFile;
var separator = arguments.separator;

_.forEach(languages, function(_language) {});

fs.readFile(inputPath, "utf8", function(err, data) {
  if (err) {
    console.log(err);
    throw err;
  }
  var obj = JSON.parse(data);
  var csvArray = parser(obj, separator);
  var rows = _.map(csvArray, function(item) {
    return item.split(separator);
  });
  rows.splice(0, 0, ["key", ...languages]);
  var buffer = xlsx.build([{ name: "test", data: rows }]);
  writeFile(buffer);
});

function writeFile(buffer) {
  fs.exists(`${outputPath}`, function(exists) {
    if (!exists) {
      fs.mkdir(outputPath, function(err, data) {
        if (err) {
          console.error(err);
          throw err;
        }
        writeContentToXlsx(buffer);
      });
    } else {
      writeContentToXlsx(buffer);
    }
  });
}

function writeContentToXlsx(buffer) {
  fs.writeFile(`${outputPath}/es.xlsx`, buffer, function(err, data) {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log(data);
  });
}
