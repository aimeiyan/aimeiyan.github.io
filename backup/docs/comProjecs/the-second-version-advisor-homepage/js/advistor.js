//登陆和加入按钮效果
$(function(){
    $('#login-btn').hover(function(){
        $(this).attr('src','images/hover-login-btn.png')
    },function(){
        $(this).attr('src','images/login-btn.png')
    });

    $('#signup-btn').hover(function(){
        $(this).attr('src','images/hover-joinin-btn.png')
    },function(){
        $(this).attr('src','images/signup-btn.png')
    });
})


var img_nav_srcs = [
    "crm.png", "nondirect-chart.png", "arrow.png", "pencil.png", "salary.png",
    "lamp.png"
];

var arrow_nav_srcs = ["right-3.png", "right-2.png", "right-1.png" , "left-1.png", "left-2.png",
    "left-3.png"];

var R = 165, center = {
    left: 280, top: 250
};

var privilege_offset = $('#privilege').offset();
var win_height = $(window).height();



//专享特权绽放效果
function show_bloom() {
    $('#bloom .privilege-list').delay(500).show(1000);
    $('.i-nav').delay(500).show().each(function (idx, div) {
        var $img = $(div).find('img');
        $img.attr('src', 'images/' + img_nav_srcs[idx]);

        var jiaodu = idx * (-325) / (img_nav_srcs.length + 1) + 26;
        var hudu = jiaodu * 2 * Math.PI / 360;

        var x1 = R * Math.cos(hudu) + center.left,
            y1 = R * Math.sin(hudu) + center.top;

        $(div).css(center);

        $(div).animate({
            left: x1,
            top: y1
        });
    });

    $('.i-arrow').show().each(function (idx, div) {
        var $img = $(div).find('img');
        $img.attr('src', 'images/' + arrow_nav_srcs[idx]);

        var jiaodu = idx * (-270) / (arrow_nav_srcs.length) + 20;
        var hudu = jiaodu * 2 * Math.PI / 360;
        var R2 = 95;
        var x2 = R2 * Math.cos(hudu) + center.left,
            y2 = R2 * Math.sin(hudu) + center.top;

        $(div).css(center);
        $(div).animate({
            left: x2 + 30,
            top: y2 + 30
        });
    });
};

window.onload=show_bloom();


//var is_show = false;
//$(window).scroll(function (e) {
//
//    if (top + win_height / 3 * 2 >= privilege_offset.top && !is_show) {
//        is_show = true;
//        show_bloom();
//    }



