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

    sendResponse(new Promise((resolve,reject)=>{
        Promise.all(promises).then(() =>{
            resolve(result);
        });
    }));
    
})