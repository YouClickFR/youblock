
function saveOptions() {
    black = document.getElementById("text1").value;
    if(black==""){
        black=null;
    }
    word = document.getElementById("text2").value;
    if(word==""){
        word=null;
    }
    white = document.getElementById("text3").value;
    if(white==""){
        white=null;
    }
    var YouClickBlack = "";
    var YouClickNotBlack = "";
    var elems = $("#checklist input");
    var texts = $("#checklist input ~ label");
    console.log(elems);
    for (i=0;i<elems.length;i++){
        console.log(!$(elems[i]).prop("checked"));
        if ($(elems[i]).prop("checked")) YouClickBlack += texts[i].textContent+", ";
        if (!$(elems[i]).prop("checked")) YouClickNotBlack += texts[i].textContent+", ";
    }
    if(YouClickBlack!="") YouClickBlack=YouClickBlack.substring(0, YouClickBlack.length - 2);
    console.log(YouClickBlack);
    chrome.storage.local.set({
        blacklist: black,
        wordlist: word,
        whitelist: white,
        gray: document.getElementById("slide1").value,
        remove: document.getElementById("slide2").value,
        interval: document.getElementById("slide3").value,
        YouClickBlack: YouClickBlack,
        YouClickNotBlack: YouClickNotBlack,
    });
    $('#savedDiv').fadeIn('fast',function() {$('#savedDiv').fadeOut(1000);});
    
}

function restoreOptions() {
    function setCurrentChoice(stored) {
        document.getElementById("text1").value = stored.blacklist || "";
        document.getElementById("text2").value = stored.wordlist || "";
        document.getElementById("text3").value = stored.whitelist || "";
        document.getElementById("slide1").value = stored.gray || 0;
        document.getElementById("score1").innerHTML = stored.gray || "ERROR";
        document.getElementById("slide2").value = stored.remove|| 0;
        document.getElementById("score2").innerHTML = stored.remove || "ERROR";
        document.getElementById("slide3").value = stored.interval || 1.5;
        document.getElementById("score3").innerHTML = stored.interval || "ERORR";
        document.getElementById("score3").innerHTML = document.getElementById("score3").innerHTML;
        document.getElementById("able-switch").checked = stored.enabled;
        if(stored.enabled){
            $(document.getElementById("able-desc")).show();
            $(document.getElementById("disable-desc")).hide();
        }else{
            $(document.getElementById("disable-desc")).show();
            $(document.getElementById("able-desc")).hide();
        }
        if(document.getElementById("score1").innerHTML < 10) document.getElementById("score1").innerHTML = "OFF";
        if(document.getElementById("score2").innerHTML < 10) document.getElementById("score2").innerHTML = "OFF";
        
        var YouClickFullBlack = stored.YouClickFullBlack || "";
        YouClickFullBlack = YouClickFullBlack.split(", ");
        var YouClickNotBlack = stored.YouClickNotBlack || "";
        YouClickNotBlack = YouClickNotBlack.split(", ");
        var YouClickBlack = stored.YouClickBlack;
        YouClickBlack = YouClickBlack.split(", ");
        console.log(YouClickFullBlack);
        console.log(YouClickBlack);
        for (i=0; i<YouClickFullBlack.length; i++){
            $('<input type="checkbox" id="check'+i+'"><label for="check'+i+'">'+YouClickFullBlack[i]+'</label><br>').appendTo("#checklist");
            if(YouClickBlack.includes(YouClickFullBlack[i])||!YouClickNotBlack.includes(YouClickFullBlack[i])
            ){
                $("#checklist input:last").prop("checked",true);
            }else{
                $("#checklist input:last").prop("checked",false);
            }
        }
        
        var lang = localStorage.getItem("lang") || navigator.language || navigator.userLanguage;
        if(lang.length>2) lang = lang.substring(0,2);
        lang = lang.toLowerCase();
        if (!(lang=="en"||lang=="fr"||lang=="es"||lang=="de")) lang = "en";
        document.getElementById("lang-chooser").value = lang;
        
    }
    chrome.storage.local.get(setCurrentChoice);
}
document.addEventListener("DOMContentLoaded", restoreOptions);
/*$('input[type=range]').on('input', function() {
    saveOptions();
    console.log('Saved!');
});*/
window.onkeyup = saveOptions;
window.oninput = saveOptions;
window.onclick = saveOptions;
document.getElementById("lang-chooser").addEventListener("change", function () {
    localStorage.setItem("lang", this.value);
    window.location.reload();
});

function stateChange() {
    if ($('#able-switch').is(':checked')) {
        $("#state").attr("style", "color:#E61818!important;");
    } else {
        $("#state").attr("style", "color:#86A8CE!important;");
    }
}
stateChange();