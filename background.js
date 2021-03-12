let PhishingDomainsURL = 'https://raw.githubusercontent.com/mitchellkrogza/Phishing.Database/master/phishing-domains-ACTIVE.txt';
PhishingDomains = undefined
$.get(PhishingDomainsURL).then(domainsResponse => PhishingDomains = domainsResponse.split(/\r?\n/));

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(PhishingDomains.includes(request.domain))
            sendResponse(true)
    }
  );