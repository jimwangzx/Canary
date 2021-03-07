//on message from content script, convert urls to html (by fetching them)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    result = {};
    promises = []
    for(var site in request){
        p = $.get(request[site]);

        let siteT = site;
        p.then((html)=>result[siteT] = html);
        promises.push(p);
    }
    
    Promise.all(promises).then(() =>{
        sendResponse(result);
    });

    await sleep(1000)

    // sendResponse(new Promise((resolve,reject)=>{
    //     Promise.all(promises).then(() =>{
    //         console.log(+ new Date())
    //         console.log(result)
    //         resolve(result);
    //     });

        //resolves with empty object? check
    //}));
    
})