const Diff = require('diff')

var listURL = chrome.runtime.getURL("data/htmls.json");

$(document).ready(() => 
    $.get(listURL).then(data => analize(data))
)


function _diff(html1,html2){

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

    //If found one, deter the user
}

