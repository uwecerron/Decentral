     chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
//chrome.tabs.update( {url: "chrome-extension://nfonenboggiglblbcjjjfpfckglicaco/index.html"});
        chrome.tabs.create({url: "chrome-extension://" + chrome.runtime.id + "/index.html"});
        
    }); 
