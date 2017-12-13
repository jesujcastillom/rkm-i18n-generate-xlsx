var argv = require("argv");
var _argv = argv.option([
  {
    name: "inputPath",
    short: "i",
    type: "path",
    description: "JSON files root path",
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
  inputPath: arguments.options.inputPath,
  languages: arguments.options.languages,
  outputPath: arguments.options.outputPath,
  separator: arguments.options.separator
};
