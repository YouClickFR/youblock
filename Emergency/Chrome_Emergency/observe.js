chrome.runtime.onInstalled.addListener(function(details){
     chrome.tabs.create({ url: chrome.extension.getURL('error.html') });
});
chrome.browserAction.onClicked.addListener(function(tab) {
     chrome.tabs.create({ url: chrome.extension.getURL('error.html') });
});
