browser.runtime.onInstalled.addListener(function(details){
     browser.tabs.create({ url: browser.extension.getURL('error.html') });
});
browser.browserAction.onClicked.addListener(function(tab) {
     browser.tabs.create({ url: browser.extension.getURL('error.html') });
});
