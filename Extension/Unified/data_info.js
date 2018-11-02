document.querySelector("#accept").onclick = function () {
    chrome.storage.local.set({
        disclaimer_shown: true
    });
    window.close();
}
document.querySelector("#decline").onclick = function(){
    chrome.management.uninstallSelf({showConfirmDialog: true});
}