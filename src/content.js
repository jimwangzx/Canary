const Diff = require('diff')

var listURL = chrome.runtime.getURL("data/htmls.json");

$(document).ready(() => 
    $.get(listURL).then(data => analize(data))
)


function _diff(html1,html2){
    result = Diff.diffLines(html1,html2);
    //convert the json array to a result number

}

function analize(data){
    
    currentHTML = document.all[0].outerHTML;

    let minDiff = Number.MAX_VALUE;
    let minDiffSite = undefined;

    for(let site in data){
        html = atob(data[site])
        let diff = _diff(html,currentHTML);
        
        if(diff < minDiff){
            minDiff=diff;
            minDiffSite=site;
        }

    }

    console.log(`The current page is like ${minDiffSite}. There are ${diff} lines different`)
}

