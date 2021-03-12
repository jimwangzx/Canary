const myDiff = require('./myDiff')

notified = false;
function NotifyUser(message){
    if(notified) return;
    notified=true;

    alert(message);
}

function checkDomain(domain){
    chrome.runtime.sendMessage({domain: domain}, function(response) {
        if(response === true)
            NotifyUser('The current website have been reported as a DANGEROUS one, beware.');
      });
}

function checkHTMLDiff(){
    var listURL = chrome.runtime.getURL("data/result.json");
    $(document).ready(() => 
        $.get(listURL).then(data => analize(data))
    )
}

function analize(data){
    currentHTML = document.all[0].outerHTML;
    
    let min = { diff:Number.MAX_VALUE , site:undefined };

    for(let site in data){

        html = atob(data[site])
        let diff = myDiff(html,currentHTML);

        console.log(diff)

        if(diff < min.diff)
            min = {diff:diff,site:site};

    }

    if(min.diff < 150)
        NotifyUser(`The current page is like ${min.site}. There are ${min.diff} lines different`);
}

const currentURL = window.location.href;
let domain = (new URL(currentURL)).hostname;
checkDomain(domain)
checkHTMLDiff();






