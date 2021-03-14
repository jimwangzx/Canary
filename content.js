
notified = false;
function NotifyUser(message) {
    if (notified) return;
    notified = true;

    alert(message);
}

function executeBackground(op, params, sendResponse) {
    chrome.runtime.sendMessage({ op: op, params: params }, sendResponse);
}

function checkDomain(domain) {
    executeBackground('checkDomain',{domain:domain}, response => {
            if (response)
                NotifyUser('The current website have been reported as a DANGEROUS one, beware.');
        });
}

function checkHTMLDiff() {
    var listURL = chrome.runtime.getURL("data/result.json");
    $(document).ready(() =>
        $.get(listURL).then(data => analize(data))
    )
}

function analize(data) {
    currentHTML = document.documentElement.innerHTML;
    executeBackground('checkHTMLDiff',{ currentHTML: currentHTML, data: data }, response => {
        if (response)
            NotifyUser(response);
    });
}

const currentURL = window.location.href;
let domain = (new URL(currentURL)).hostname;
checkDomain(domain)
checkHTMLDiff();






