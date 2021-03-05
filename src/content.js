console.log(0);

var listURL = chrome.runtime.getURL("data/list.db");

$(document).ready(() => 
    $.get(listURL).then(data => analize(data))
)


function analize(data){
    alert(data);
    //TO DO: find url in the list with small diff with the current page
    //If found one, deter the user
}