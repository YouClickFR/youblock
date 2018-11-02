document.getElementById('slide1').addEventListener('input', function() {
    if(document.getElementById('slide1').value>0){
        document.getElementById('score1').innerHTML=document.getElementById('slide1').value;
    }else{
        document.getElementById('score1').innerHTML="OFF"
    }
});
document.getElementById('slide2').addEventListener('input', function() {
    if(document.getElementById('slide2').value>0){
        document.getElementById('score2').innerHTML=document.getElementById('slide2').value;
    }else{
        document.getElementById('score2').innerHTML="OFF"
    }
});
document.getElementById('slide3').addEventListener('input', function(){
    document.getElementById('score3').innerHTML=document.getElementById('slide3').value;
});

document.getElementById('slide1').addEventListener('change', function() {
    if(document.getElementById('slide1').value<1){
        document.getElementById('slide1').value=-45;
        document.getElementById('score1').innerHTML="OFF";
    };
});
document.getElementById('slide2').addEventListener('change', function() {
    if(document.getElementById('slide2').value<1){
        document.getElementById('slide2').value=-45;
        document.getElementById('score2').innerHTML="OFF";
    };
});

document.getElementById("able-switch").addEventListener("change", function(){
    if(document.getElementById("able-switch").checked){
        $(document.getElementById("able-desc")).show();
        $(document.getElementById("disable-desc")).hide();
        chrome.storage.local.set({enabled: true});
    }else{
        $(document.getElementById("disable-desc")).show();
        $(document.getElementById("able-desc")).hide();
        chrome.storage.local.set({enabled: false});
    }
});
$(".s_menu").click(function () {
    id = $(this).attr('id');
    if (id == "design") {
        window.open('design/design.html');
    } else {
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
        $('.body').hide();
        $('.body.' + id).show();
    }
});
$("#state").click(function () {
    $('#able-switch').click();
    stateChange();
});