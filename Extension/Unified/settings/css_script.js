function safe(css){
    chrome.storage.local.set({
        css: css
    });
    console.log(css);
}
function load(){
    chrome.storage.local.get(function(result){
        document.getElementsByTagName("textarea")[0].value = result.css;
    });
    document.getElementsByTagName("textarea")[0].addEventListener("change", function() {
        safe(document.getElementsByTagName("textarea")[0].value);
    });
    document.getElementsByTagName("textarea")[0].addEventListener("keyup", function() {
        safe(document.getElementsByTagName("textarea")[0].value);
    });
    document.getElementsByTagName("textarea")[0].addEventListener("paste", function() {
        safe(document.getElementsByTagName("textarea")[0].value);
    });
}
load();
