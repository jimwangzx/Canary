
var listURL = chrome.runtime.getURL("data/list.db");

$(document).ready(() => 
    $.get(listURL).then(data => analize(data))
)


function analize(data){

    chrome.runtime.sendMessage(JSON.parse(data),(response)=>console.log(response))//TODO: shoud print the same as in background
    //send urls as a message to the background script, get the matching htmls as a response

    //find an html with a small diff with the current page
    //If found one, deter the user
}