const myDiff = require('./myDiff')

let PhishingDomainsURL = 'https://raw.githubusercontent.com/mitchellkrogza/Phishing.Database/master/phishing-domains-ACTIVE.txt';
PhishingDomains = undefined
$.get(PhishingDomainsURL).then(domainsResponse => PhishingDomains = domainsResponse.split(/\r?\n/));

function checkDomain(params,sendResponse){
    domain = params.domain
    domain = domain.replace(/^(www\.)/,"");//remove www. at the start
    sendResponse(PhishingDomains.includes(domain));
}
function checkHTMLDiff(params,sendResponse){
    currentHTML = params.currentHTML;
    data = params.data;

    let min = { diff:Number.MAX_VALUE , site:undefined };

    for(let site in data){

        html = atob(data[site])
        let diff = myDiff(html,currentHTML);

        if(diff < min.diff)
            min = {diff:diff,site:site};

    }

    if(min.diff < 150)
        sendResponse(`The current page is like ${min.site}. There are ${min.diff} lines different`);
}

operations = {"checkDomain":checkDomain,"checkHTMLDiff":checkHTMLDiff}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        operations[request.op](request.params,sendResponse);
    }
  );