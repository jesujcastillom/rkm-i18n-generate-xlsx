var xlsx = require("node-xlsx").default;
var _ = require("lodash");
var fs = require("fs");
var glob = require("glob");
var rimraf = require("rimraf");
var path = require("path");
var mkdirp = require("mkdirp");

var parser = require("./src/parser");
var arguments = require("./src/arguments");

var languages = arguments.languages;
var inputPath = arguments.inputPath;
var outputPath = arguments.outputPath;
var separator = arguments.separator;

function processFiles() {
  glob(`${inputPath}${path.sep}**${path.sep}*.json`, function(err, filePaths) {
    _.forEach(filePaths, function(_filePath) {
      fs.readFile(_filePath, "utf8", function(err, data) {
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
        var fileName = _filePath
          .replace(inputPath, "")
          .replace(/.json$/, ".xlsx");
        writeFile(buffer, `${outputPath}${fileName}`);
      });
    });
  });
}

rimraf(outputPath, { glob: false }, function(err) {
  if (err) {
    console.error(err);
    throw err;
  }
  processFiles();
});

function writeFile(buffer, filePath) {
  var _outputPath = filePath.substring(0, filePath.lastIndexOf(path.sep));
  fs.exists(`${_outputPath}`, function(exists) {
    if (!exists) {
      mkdirp(_outputPath, function(err, data) {
        if (err) {
          console.error(err);
          throw err;
        }
        writeContentToXlsx(buffer, filePath);
      });
    } else {
      writeContentToXlsx(buffer, filePath);
    }
  });
}

function writeContentToXlsx(buffer, outputFilePath) {
  fs.writeFile(outputFilePath, buffer, function(err, data) {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log(data);
  });
}
