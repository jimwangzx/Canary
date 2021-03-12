const Diff = require('diff')

var listURL = chrome.runtime.getURL("data/result.json");

$(document).ready(() => 
    $.get(listURL).then(data => analize(data))
)


function _diff(html1,html2){
    d = Diff.diffLines(html1,html2);
    
    result = 0;
    d.forEach(element => {
        if(element.added || element.removed)
            result += element.count;
    });
    return result;
}

function analize(data){
    
    currentHTML = document.all[0].outerHTML;
    
    let min = { diff:Number.MAX_VALUE , site:undefined };

    for(let site in data){

        html = atob(data[site])
        let diff = _diff(html,currentHTML);

        console.log(diff)

        if(diff < min.diff)
            min = {diff:diff,site:site};

    }

    console.log(`The current page is like ${min.site}. There are ${min.diff} lines different`)
}

