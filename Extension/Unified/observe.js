chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        chrome.storage.local.set({
            gray: 100,
            remove: 130,
            pro: true,
            blacklist: null,
            wordlist: null,
            whitelist: null,
            interval: 1.5,
            enabled: true,
            lang: "en"
        });
    } else {
        chrome.storage.local.get(function (result) {
            if(typeof result.storagecleared == 'unefined'){
                chrome.storage.local.set({
                    gray: 100,
                    remove: 130,
                    pro: true,
                    blacklist: null,
                    wordlist: null,
                    whitelist: null,
                    interval: 1.5,
                    enabled: true,
                    lang: "en",
                    storagecleared: true
                });
            }
            if (typeof result.gray == 'undefined') chrome.storage.local.set({ gray: 100 });
            if (typeof result.remove == 'undefined') chrome.storage.local.set({ remove: 130 });
            if (typeof result.blacklist == 'undefined') chrome.storage.local.set({ blacklist: null });
            if (typeof result.whitelist == 'undefined') chrome.storage.local.set({ whitelist: null });
            if (typeof result.interval == 'undefined') chrome.storage.local.set({ interval: 1.5 });
            if (typeof result.enabled == 'undefined') chrome.storage.local.set({ enabled: true });
            if (typeof result.lang == 'undefined') chrome.storage.local.set({ lang: "en" });
        });
    }
    initCss();
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
        if (request.videoplus) {
            chrome.browserAction.getBadgeText({ tabId: sender.tab.id }, function (badgecount) {
                if (!badgecount) {
                    text = "1";
                } else {
                    text = +badgecount + 1;
                    text = "" + text;
                }
                chrome.browserAction.getBadgeText({}, function (badgecount) {
                    chrome.browserAction.setBadgeText({ text: text, tabId: sender.tab.id });
                });
            });
            sendResponse({ added: "Count +1" });
        }
        if (request.videonull) {
            chrome.browserAction.getBadgeText({}, function (badgecount) {
                chrome.browserAction.setBadgeText({ text: "", tabId: sender.tab.id });
            });
            sendResponse({ added: "Count 0" });
        }
    }
);

/*var black;
$.ajax({
    async: false,
    type: "POST",
    global: false,
    crossDomain: true,
    dataType: "text",
    data: { 'request': "", 'target': 'arrange_url', 'method': 'method_target' },
    url: "https://youclick.fr/youblock/blacklisted.yb",
    success: function (data) {
        black = JSON.parse(data);
    }
});
var white;
$.ajax({
    async: false,
    type: "POST",
    global: false,
    crossDomain: true,
    dataType: "text",
    data: { 'request': "", 'target': 'arrange_url', 'method': 'method_target' },
    url: "https://youclick.fr/youblock/whitelisted.yb",
    success: function (data) {
        white = JSON.parse(data);
    }
});
chrome.storage.local.set({ YouClickWhite: white });
chrome.storage.local.set({ YouClickFullBlack: black });
chrome.storage.local.get(function (stored) {
    if (!stored.YouClickBlack) {
        chrome.storage.local.set({ YouClickBlack: stored.YouClickFullBlack });
    }
    var YouClickFullBlack = stored.YouClickFullBlack||[];
    var YouClickNotBlack = stored.YouClickNotBlack||[];
    var YouClickBlack = [];

    for (i = 0; i < YouClickFullBlack.length; i++) {
        if (!YouClickNotBlack.includes(YouClickFullBlack[i])) {
            YouClickBlack.push(YouClickFullBlack[i]);
        }
    }
    chrome.storage.local.set({
        YouClickBlack: YouClickBlack
    });
});
*/

function initCss() {
    var css = ".YouBlock ytd-thumbnail a:first-of-type::before { background-color: #dc3030; border-color: #c52020; color: #ffffff; opacity: 1; border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 11px; border-bottom-left-radius: 0px; border-width: 2px; border-top-style: none; border-right-style: solid; border-bottom-style: solid; border-left-style: none; font-size: 16px; line-height: 18px; min-width: 0px; min-height: 0px; top: 0px; right: auto; bottom: auto; left: 0px; }.blurred img{filter: blur(7px) grayscale(100%);}.blurred #details{filter: blur(1px) grayscale(100%);}";
    chrome.storage.local.set({
        css: css,
        cssbgcolor: "#dc3030",
        cssbordercolor: "#c52020",
        csstextcolor: "#ffffff",
        cssopacity: "1",
        cssborderradius1: "0",
        cssborderradius2: "0",
        cssborderradius3: "0",
        cssborderradius4: "11",
        cssborderwidth: "2",
        cssbordertop: false,
        cssborderright: true,
        cssborderbottom: true,
        cssborderleft: false,
        cssfontsize: "16",
        csslineheight: "18",
        cssdimwidth: "0",
        cssdimheight: "0",
        cssaligntopleft: true,
        cssaligntopright: false,
        cssalignbottomleft: false,
        cssalignbottomrigh: false,
        cssblurradiusthumb: "7",
        cssblurradiustext: "1",
        cssgrayscale: "100"
    });
}