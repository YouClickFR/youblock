//gobal variables
var blacklist = [];
var whitelist = [];
var subscriptions = [];
var wordlist = [];

var allVideos = [];
var allIds = [];

var limitgray = 999;
var limitremove = 999;

var loadedSettings = false;

//fetch Settings
chrome.storage.local.get(function(saved){

    //update Lists
    blacklist = saved.blacklist;
    whitelist = saved.whitelist;
    subscriptions = saved.subscriptions;
    wordlist = saved.wordlist;

    //update limits
    limitgray = saved.limitgray;
    limitremove = saved.limitremove;

    //load CSS
    $('head').append('<style type="text/css">' + saved.css + '</style>');

    //add our suggestions
    /*
    if ((/(http|https):\/\/([^\/\.]+\.)?youtube\.[^\/\.]+\/?$/gi).test(window.location.href)) {
        var subsstring = JSON.stringify(saved.subscriptions);
        $.ajax({
            dataType: "text",
            url: "https://youclick.fr/youblock/homepage.php?creators&subscriptions=" + encodeURIComponent(subsstring) + "&lang=" + saved.lang,
            success: function (data) {
                $("#content > ytd-page-manager > ytd-browse[page-subtype='home'] > ytd-two-column-browse-results-renderer > ytd-section-list-renderer > div#contents > ytd-item-section-renderer:nth-child(1)").after(data);
            }
        });
        $.ajax({
            dataType: "text",
            url: "https://youclick.fr/youblock/homepage.php?trends&subscriptions=" + encodeURIComponent(subsstring) + "&lang=" + saved.lang,
            success: function (data) {
                $("#content > ytd-page-manager > ytd-browse[page-subtype='home'] > ytd-two-column-browse-results-renderer > ytd-section-list-renderer > div#contents").prepend(data);
            }
        });
    }
    */

    loadedSettings = true;
});

//start Timer
setInterval(editAllNewVideos,1500);
setInterval(changeHREFs,5000);

function editAllNewVideos() {
    if (!loadedSettings) return;
    updateAllVideos();
    var toAnalyse = {};
    var hasNewVideos = false;
    for(var id in allVideos){
        if (allVideos[id].score == -1) {
            toAnalyse[id] = allVideos[id].title;
            hasNewVideos = true;
        }
    }
    if (hasNewVideos) $.post("https://youclick.fr/api/?key=YouClick", {youblock: toAnalyse}, function (result) {
        scores = JSON.parse(result);
        $.each(scores, function (id, score) {
            allVideos[id].score = score;
            applyScore(allVideos[id].videoElement, score);
        });
    });

}

function updateAllVideos(){
    //get all Elements
    if (window.location.pathname.indexOf("watch") != -1) {
        elements = $("h3.style-scope.ytd-compact-video-renderer span.style-scope.ytd-compact-video-renderer");
    } else {
        elements = $(".yt-simple-endpoint.style-scope.ytd-grid-video-renderer").add(".yt-simple-endpoint.style-scope.ytd-video-renderer");
    }
    //iterate
    elements.each(function() {
        el = this;
        var dataset = [];
        id = getId(el);
        if (allIds.indexOf(id)!=-1){                                        //if it exists
            dataset = allVideos[id];                                        //fetch existing dataset
        }else{                                                              //if not, create it
            dataset["title"] = el.textContent.trim();
            dataset["videoElement"] = getVideoElement(el);
            dataset["creator"] = getCreator(dataset["videoElement"]);
            dataset["score"] = -1;
        }
        allVideos[id] = dataset;                                            //save the data
        allIds.push(id);
    });
}

function getId(el) {
    if (el.href) {
        return (/(youtu\.be\/|\/watch\?v=)[^\/&?]+/gi).exec(el.href)[0].substring(9);
    } else {
        return (getId(el.parentNode));
    }
}

function getVideoElement(el) {
    if (el == null) { return null; }
    if (el.tagName == "YTD-COMPACT-VIDEO-RENDERER" || el.tagName == "YTD-GRID-VIDEO-RENDERER" || el.tagName == "YTD-VIDEO-RENDERER") {
        return $(el)[0];
    } else {
        return getVideoElement(el.parentNode);
    }
}

function getCreator(el) {
    var tmp = $(el).find(".yt-simple-endpoint.style-scope.yt-formatted-string")[0];
    if (tmp) return tmp.textContent;
    tmp = $(el).find("yt-formatted-string.style-scope.ytd-video-meta-block")[0];
    if (tmp) return tmp.textContent;
    return null;
}

function applyScore(vidEl, score) {
    vidEl.className = vidEl.className.replace(/\s*youblock[^\s]*/gi, "");
    vidEl = $(vidEl);
    if (!((new RegExp(/youtube\.[^\/]*(\/feed\/subscriptions\/|\/user\/|\/feed\/channels\/|\/channel\/)/i)).test(window.location.href))) {
        if (+score > +limitgray && +limitgray > 0) {
            vidEl.addClass("blurred");
            chrome.runtime.sendMessage({ videoplus: true }, function (response) { });
        }
        if (+score > +limitremove && +limitremove > 0) {
            vidEl.addClass("removed");
            chrome.runtime.sendMessage({ videoplus: true }, function (response) { });
        }
    }
    vidEl.addClass("YouBlock" + score);
    vidEl.addClass("YouBlock");
}

function changeHREFs() {
    if ((new RegExp(/\/watch/gi)).test(window.location.href)) {
        Aelems = $("ytd-watch-next-secondary-results-renderer a");
        for (i = 0; i < Aelems.length; i++) {
            if (!($(Aelems[i]).attr("modified") == "true")) {
                if ((/\/watch\?v=.*/gi).test(Aelems[i].href)) {
                    if (!(/(&start_radio|&list)/gi).test(Aelems[i].href)) {
                        Aelems[i].href = ("https://youtu.be/" + ((/\?v=.*/gi).exec(Aelems[i].href)[0].substring(3))).replace(/&t=/gi, "?t=");
                        Aelems[i].addEventListener("click", function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            return false;
                        }, true);
                        Aelems[i].addEventListener("mouseup", function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            if (e.which === 1) {
                                location.assign(this.href);
                            } else if (e.which === 2) {
                                chrome.tabs.create({ url: this.href, active: false });
                            }
                        }, true);
                        Aelems[i].addEventListener("mousedown", function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            return false;
                        }, true);
                        $(Aelems[i]).attr("modified", "true");
                    }
                }
            }
        }
    }
}
