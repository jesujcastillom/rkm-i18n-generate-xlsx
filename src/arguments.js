var argv = require("argv");
var _argv = argv.option([
  {
    name: "inputFile",
    short: "i",
    type: "path",
    description: "JSON file path",
    example: "'i18n-generate-xlsx --inputFile=value'"
  },
  {
    name: "languages",
    short: "l",
    type: "csv,string"
  },
  {
    name: "outputPath",
    short: "o",
    type: "path",
    description: "output path for the xlsx file(s)"
  },
  {
    name: "separator",
    short: "s",
    type: "string"
  }
]);
var arguments = _argv.run();

module.exports = {
  inputFile: arguments.options.inputFile,
  languages: arguments.options.languages,
  outputFile: arguments.options.outputPath,
  separator: arguments.options.separator
};
