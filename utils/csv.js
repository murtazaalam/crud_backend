const { Parser } = require("json2csv");
const convertToCsv = (array) => {
  if (Array.isArray(array) == false) {
    throw new Error("Passed data is not array");
  }
  const parser = new Parser();
  return parser.parse(array);
};

module.exports = convertToCsv;
