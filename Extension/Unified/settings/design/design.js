$("#presets").change(function () {
    switch (this.value) {
        case "Red":
            //chrome.storage.local.set({cssbordercolor: '#c82020', cssbgcolor: '#dc3030'});
            $("#bgcolor").changeVal("#dc3030");
            $("#bordercolor").changeVal("#dc3030");
            $("#opacity").changeVal("1");
            break;
        case "Blue":
            //chrome.storage.local.set({cssbordercolor: '#2064c8', cssbgcolor: ##3080dc'});
            $("#bgcolor").changeVal("#3080dc");
            $("#bordercolor").changeVal("#2064c8");
            $("#opacity").changeVal("1");
            break;
        case "Green":
            //chrome.storage.local.set({cssbordercolor: '#1ea01e', cssbgcolor: '#1bbe1b'});
            $("#bgcolor").changeVal("#1bbe1b");
            $("#bordercolor").changeVal("#1ea01e");
            $("#opacity").changeVal("1");
            break;
        case "Black":
            //chrome.storage.local.set({cssbordercolor: '#000000', cssbgcolor: '#141414'});
            $("#bgcolor").changeVal("#141414");
            $("#bordercolor").changeVal("#000000");
            $("#opacity").changeVal("1");
            break;
        case "Invisible":
            //chrome.storage.local.set({cssbordercolor: 'transparent', cssbgcolor: 'transparent'});
            $("#opacity").changeVal("0");
            break;
        case "White":
            //chrome.storage.local.set({cssbordercolor: 'transparent', cssbgcolor: 'transparent', csstextshadow: '0px 0px 2px black'});
            break;
        default:
            break;
    }
});
$("#bgcolor").change(function () {
    $(".thumbnail-corner").css("background-color", this.value);
});
$("#bordercolor").change(function () {
    $(".thumbnail-corner").css("border-color", this.value);
});
$("#textcolor").change(function () {
    $(".thumbnail-corner").css("color", this.value);
});
$("#opacity").change(function () {
    $(".thumbnail-corner").css("opacity", this.value);
});
$("#borderradius1").change(function () {
    $(".thumbnail-corner").css("border-top-left-radius", this.value + "px");
});
$("#borderradius2").change(function () {
    $(".thumbnail-corner").css("border-top-right-radius", this.value + "px");
});
$("#borderradius3").change(function () {
    $(".thumbnail-corner").css("border-bottom-left-radius", this.value + "px");
});
$("#borderradius4").change(function () {
    $(".thumbnail-corner").css("border-bottom-right-radius", this.value + "px");
});
$("#borderwidth").change(function () {
    $(".thumbnail-corner").css("border-width", this.value + "px");
});
$("#bordertop").change(function () {
    $(".thumbnail-corner").css("border-top-style", this.checked ? "solid" : "none");
});
$("#borderright").change(function () {
    $(".thumbnail-corner").css("border-right-style", this.checked ? "solid" : "none");
});
$("#borderbottom").change(function () {
    $(".thumbnail-corner").css("border-bottom-style", this.checked ? "solid" : "none");
});
$("#borderleft").change(function () {
    $(".thumbnail-corner").css("border-left-style", this.checked ? "solid" : "none");
});
$("#fontsize").change(function () {
    $(".thumbnail-corner").css("font-size", this.value + "px");
});
$("#lineheight").change(function () {
    $(".thumbnail-corner").css("line-height", this.value + "px");
});
$("#dimwidth").change(function () {
    $(".thumbnail-corner").css("min-width", this.value);
});
$("#dimheight").change(function () {
    $(".thumbnail-corner").css("min-height", this.value);
});
$("#aligntopleft").change(function () {
    if (this.checked) {
        $(".thumbnail-corner").css("top", 0);
        $(".thumbnail-corner").css("left", 0);
        $(".thumbnail-corner").css("right", "");
        $(".thumbnail-corner").css("bottom", "");
    }
});
$("#aligntopright").change(function () {
    if (this.checked) {
        $(".thumbnail-corner").css("top", 0);
        $(".thumbnail-corner").css("left", "");
        $(".thumbnail-corner").css("right", 0);
        $(".thumbnail-corner").css("bottom", "");
    }
});
$("#alignbottomleft").change(function () {
    if (this.checked) {
        $(".thumbnail-corner").css("top", "");
        $(".thumbnail-corner").css("left", 0);
        $(".thumbnail-corner").css("right", "");
        $(".thumbnail-corner").css("bottom", $("img.details").prop("height"));
    }
});
$("#alignbottomright").change(function () {
    if (this.checked) {
        $(".thumbnail-corner").css("top", "");
        $(".thumbnail-corner").css("left", "");
        $(".thumbnail-corner").css("right", 0);
        $(".thumbnail-corner").css("bottom", $("img.details").prop("height"));
    }
});
$("#blurradiusthumb").change(function () {
    $(".blurred .thumbnail").css("filter", "blur(" + this.value + "px) grayscale(" + document.getElementById("grayscale").value + "%)");
});
$("#blurradiustext").change(function () {
    $(".blurred .details").css("filter", "blur(" + this.value + "px) grayscale(" + document.getElementById("grayscale").value + "%)");
});
$("#grayscale").change(function () {
    $(".blurred .details").css("filter", "blur(" + document.getElementById("blurradiustext").value + "px) grayscale(" + this.value + "%)");
    $(".blurred .thumbnail").css("filter", "blur(" + document.getElementById("blurradiusthumb").value + "px) grayscale(" + this.value + "%)");
});

$(document).ready(function () {
    chrome.storage.local.get(function (stored) {
        $("#bgcolor").changeVal(stored.cssbgcolor);
        $("#bordercolor").changeVal(stored.cssbordercolor);
        $("#textcolor").changeVal(stored.csstextcolor);
        $("#opacity").changeVal(stored.cssopacity);
        $("#borderradius1").changeVal(stored.cssborderradius1);
        $("#borderradius2").changeVal(stored.cssborderradius2);
        $("#borderradius3").changeVal(stored.cssborderradius3);
        $("#borderradius4").changeVal(stored.cssborderradius4);
        $("#borderwidth").changeVal(stored.cssborderwidth);
        $("#bordertop").changeProp("checked", stored.cssbordertop);
        $("#borderright").changeProp("checked", stored.cssborderright);
        $("#borderbottom").changeProp("checked", stored.cssborderbottom);
        $("#borderleft").changeProp("checked", stored.cssborderleft);
        $("#fontsize").changeVal(stored.cssfontsize);
        $("#lineheight").changeVal(stored.csslineheight);
        $("#dimwidth").changeVal(stored.cssdimwidth);
        $("#dimheight").changeVal(stored.cssdimheight);
        $("#aligntopleft").changeProp("checked", stored.cssaligntopleft);
        $("#aligntopright").changeProp("checked", stored.cssaligntopright);
        $("#alignbottomleft").changeProp("checked", stored.cssalignbottomleft);
        $("#alignbottomright").changeProp("checked", stored.cssalignbottomright);
        $("#blurradiusthumb").changeVal(stored.cssblurradiusthumb);
        $("#blurradiustext").changeVal(stored.cssblurradiustext);
        $("#grayscale").changeVal(stored.cssgrayscale);
    });
});

$("#reset1").click(reset1);
$("#reset2").click(reset2);
$("#reset3").click(reset3);

$("#save1").click(save1);
$("#save2").click(save2);
$("#save3").click(save3);

function reset1() {
    $("#bgcolor").changeVal("#dc3030");
    $("#bordercolor").changeVal("#c52020");
    $("#textcolor").changeVal("#ffffff");
    $("#opacity").changeVal(1);
    $("#borderradius1").changeVal(0);
    $("#borderradius2").changeVal(0);
    $("#borderradius3").changeVal(0);
    $("#borderradius4").changeVal(11);
    $("#borderwidth").changeVal(2);
    $("#bordertop").changeProp("checked", false);
    $("#borderright").changeProp("checked", true);
    $("#borderbottom").changeProp("checked", true);
    $("#borderleft").changeProp("checked", false);
}
function reset2() {
    $("#fontsize").changeVal(16);
    $("#lineheight").changeVal(18);
    $("#dimwidth").changeVal(0);
    $("#dimheight").changeVal(0);
    $("#aligntopleft").changeProp("checked", true);
    $("#aligntopright").changeProp("ckecked", false);
    $("#alignbottomleft").changeProp("checked", false);
    $("#alignbottomright").changeProp("checked", false);
}
function reset3() {
    $("#blurradiusthumb").changeVal(7);
    $("#blurradiustext").changeVal(1);
    $("#grayscale").changeVal(100);
}
function save1() {
    chrome.storage.local.set({
        cssbgcolor: $("#bgcolor").val(),
        cssbordercolor: $("#bordercolor").val(),
        csstextcolor: $("#textcolor").val(),
        cssopacity: $("#opacity").val(),
        cssborderradius1: $("#borderradius1").val(),
        cssborderradius2: $("#borderradius2").val(),
        cssborderradius3: $("#borderradius3").val(),
        cssborderradius4: $("#borderradius4").val(),
        cssborderwidth: $("#borderwidth").val(),
        cssbordertop: $("#bordertop").prop("checked"),
        cssborderright: $("#borderright").prop("checked"),
        cssborderbottom: $("#borderbottom").prop("checked"),
        cssborderleft: $("#borderleft").prop("checked")
    });
    chrome.storage.local.get(function (s) {
        chrome.storage.local.set({
            css: generateCSS(s)
        });
    });
}
function save2() {
    chrome.storage.local.set({
        cssfontsize: $("#fontsize").val(),
        csslineheight: $("#lineheight").val(),
        cssdimwidth: $("#dimwidth").val(),
        cssdimheight: $("#dimheight").val(),
        cssaligntopleft: $("#aligntopleft").prop("checked"),
        cssaligntopright: $("#aligntopright").prop("checked"),
        cssalignbottomleft: $("#alignbottomleft").prop("checked"),
        cssalignbottomright: $("#alignbottomright").prop("checked")
    });
    chrome.storage.local.get(function (s) {
        chrome.storage.local.set({
            css: generateCSS(s)
        });
    });

}

function save3() {
    chrome.storage.local.set({
        cssblurradiusthumb: $("#blurradiusthumb").val(),
        cssblurradiustext: $("#blurradiustext").val(),
        cssgrayscale: $("#grayscale").val()
    });
    chrome.storage.local.get(function (s) {
        chrome.storage.local.set({
            css: generateCSS(s)
        });
    })

}

$.fn.changeVal = function (v) {
    return this.val(v).trigger("change");
}
$.fn.changeProp = function (p, v) {
    return this.prop(p, v).trigger("change");
}

function generateCSS(s) {
    var css = ".YouBlock ytd-thumbnail a:first-of-type::before { " +
        "background-color: " + s.cssbgcolor + "; " +
        "border-color: " + s.cssbordercolor + "; " +
        "color: " + s.csstextcolor + "; " +
        "opacity: " + s.cssopacity + "; " +
        "border-top-left-radius: " + s.cssborderradius1 + "px; " +
        "border-top-right-radius: " + s.cssborderradius2 + "px; " +
        "border-bottom-right-radius: " + s.cssborderradius4 + "px; " +
        "border-bottom-left-radius: " + s.cssborderradius3 + "px; " +
        "border-width: " + s.cssborderwidth + "px; " +
        "border-top-style: " + (s.cssbordertop ? "solid" : "none") + "; " +
        "border-right-style: " + (s.cssborderright ? "solid" : "none") + "; " +
        "border-bottom-style: " + (s.cssborderbottom ? "solid" : "none") + "; " +
        "border-left-style: " + (s.cssborderleft ? "solid" : "none") + "; " +
        "font-size: " + s.cssfontsize + "px; " +
        "line-height: " + s.csslineheight + "px; " +
        "min-width: " + s.cssdimwidth + "px; " +
        "min-height: " + s.cssdimheight + "px; " +
        "top: " + ((s.cssaligntopleft || s.cssaligntopright) ? "0px" : "auto") + "; " +
        "right: " + ((s.cssalignbottomright || s.cssaligntopright) ? "0px" : "auto") + "; " +
        "bottom: " + ((s.cssalignbottomright || s.cssalignbottomleft) ? "0px" : "auto") + "; " +
        "left: " + ((s.cssaligntopleft || s.cssalignbottomleft) ? "0px" : "auto") + "; " +
        "}" +
        ".blurred img{filter: blur("+s.cssblurradiusthumb+"px) grayscale("+s.cssgrayscale+"%);}" +
        ".blurred #details{filter: blur("+s.cssblurradiustext+"px) grayscale("+s.cssgrayscale+"%);}";
    console.log(s.cssalignbottomright);
    console.log("bottom: " + ((s.cssalignbottomright || s.cssalignbottomleft) ? "0px" : "auto") + "; ")
    return css;
}