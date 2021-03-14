const { diffLines } = require('diff');
require("babel-core/register");
require("babel-polyfill");

module.exports = (html1, html2) => diffLines(html1, html2)
    .filter(change => change.added || change.removed)
    .map(change => change.count)
    .reduce((a, b) => a + b, 0);
