//on message from content script, convert urls to html (by fetching them)
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    result = {};
    promises = []
    for(var site in request){
        p = $.get(request[site]);

        let siteT = site;
        p.then((html)=>result[siteT] = html);
        promises.push(p);
    }
    Promise.all(promises).then(() =>{console.log(result); sendResponse(result)})
})