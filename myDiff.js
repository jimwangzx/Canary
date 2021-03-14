const Diff = require('diff');
require("babel-core/register");
require("babel-polyfill");

function _diff(html1,html2){
    d = Diff.diffLines(html1,html2);
    
    result = 0;
    d.forEach(element => {
        if(element.added || element.removed)
            result += element.count;
    });
    return result;
}

module.exports = _diff;
