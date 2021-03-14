const myDiff = require('./myDiff');

let PhishingDomainsURL = 'https://raw.githubusercontent.com/mitchellkrogza/Phishing.Database/master/phishing-domains-ACTIVE.txt';
let PhishingDomains = null;
$.get(PhishingDomainsURL).then(domainsResponse => PhishingDomains = domainsResponse.split(/\r?\n/));

function checkDomain({ domain }, sendResponse) {
    domain = domain.replace(/^(www\.)/, "");//remove www. at the start
    sendResponse(PhishingDomains.includes(domain));
}

function checkHTMLDiff({ currentHTML, data }, sendResponse) {
    let min = { diff: Number.MAX_VALUE, site: null };

    for (let site in data) {

        const html = atob(data[site]);
        let diff = myDiff(html, currentHTML);

        if (diff < min.diff)
            min = { diff, site };

    }

    if (min.diff < 150)
        sendResponse(`The current page is like ${min.site}. There are ${min.diff} lines different`);
}

const operations = { "checkDomain": checkDomain, "checkHTMLDiff": checkHTMLDiff };
chrome.runtime.onMessage.addListener(({ op, params }, sender, sendResponse) => {
    operations[op](params, sendResponse);
});
