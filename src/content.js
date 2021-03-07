
var listURL = chrome.runtime.getURL("data/htmls.json");

$(document).ready(() => 
    $.get(listURL).then(data => analize(data))
)


function analize(data){
    
    //base64 decode values inside the json input 

    //find an html with a small diff with the current page
    //If found one, deter the user
}