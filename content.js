let notified = false;
function NotifyUser(message) {
    if (notified) return;
    notified = true;

    alert(message);
}

function executeBackground(op, params, responseCallback) {
    chrome.runtime.sendMessage({ op, params }, responseCallback);
}

function checkDomain(domain) {
    executeBackground('checkDomain', { domain }, response => {
        if (response)
            NotifyUser('The current website have been reported as a DANGEROUS one, beware.');
    });
}

function checkHTMLDiff() {
    const listURL = chrome.runtime.getURL("data/result.json");
    $(document).ready(() => {
        $.get(listURL).then(data => analize(data));
    });
}

function analize(data) {
    const currentHTML = document.documentElement.innerHTML;
    executeBackground('checkHTMLDiff', { currentHTML, data }, response => {
        if (response)
            NotifyUser(response);
    });
}

const currentURL = window.location.href;
const domain = new URL(currentURL).hostname;
checkDomain(domain);
checkHTMLDiff();
