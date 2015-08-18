//焦点图效果
(function () {
    var $images = $('#background .stretch'),
        pic_id = 100000,
        timer_id = 0;

    var switch_to_pic = function () {

        $images.hide();
        $($images[pic_id % $images.length]).fadeIn(400);

        timer_id = setTimeout(function () {
            pic_id++;
            switch_to_pic();
        }, 8000);
    };

    $('.s-pre').click(function () {
        clearTimeout(timer_id);
        pic_id--;
        switch_to_pic();
    });

    $('.s-next').click(function () {
        clearTimeout(timer_id);
        pic_id++;
        switch_to_pic()
    });

    switch_to_pic();
})();


var img_nav_srcs = [
    "crm.png", "nondirect-chart.png", "arrow.png", "pencil.png", "salary.png",
    "lamp.png"
];

var arrow_nav_srcs = ["right-3.png", "right-2.png", "right-1.png" , "left-1.png", "left-2.png",
    "left-3.png"];

var R = 200, center = {
    left: 320, top: 250
};

var fix_offset = $('#fixed-part').offset(), privilege_offset = $('#privilege').offset(), tree_offset = $('#tree').offset();
var win_height = $(window).height();
var mission_offset = $('#mission').offset();

$('#down-scroll .begin').click(function () {
    $('html, body').animate({scrollTop: $('#fixed-part').offset().top - 1});
});

//专享特权绽放效果
function show_bloom() {
    $('#bloom .privilege-list').delay(500).show(1000)
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
        var R2 = 110;
        var x2 = R2 * Math.cos(hudu) + center.left,
            y2 = R2 * Math.sin(hudu) + center.top;

        $(div).css(center);
        $(div).animate({
            left: x2 + 30,
            top: y2 + 30
        });
    });
}

var is_mission_pic_show = false;
var is_show = false;
$(window).scroll(function (e) {
    var top = $(window).scrollTop();

    if (top + win_height / 3 * 2 >= privilege_offset.top && !is_show) {
        is_show = true;
        show_bloom();
    }

    if (top >= fix_offset.top) {
        $('#fixed-part').addClass('fixed');
    } else {
        $('#fixed-part').removeClass('fixed');
    }


    if (top + win_height / 3 * 2 >= tree_offset.top) {
        var SRC = 'images/gif.gif';
        var $img = $('#flow-gif');

        if ($img.attr('src') != SRC) {
            $('#flow-gif').attr('src', SRC)
        }
    }

    if (!is_mission_pic_show) {
        var $padoffset = $('#mission').offset();
        if (top >= ($padoffset.top / 2)) {
            $('.pad-pic').animate({top: 0}, 1000);
            is_mission_pic_show = true;
        }
    }
});

//专题回放效果
$(document).ready(function () {
    var carousel = $("#carousel").waterwheelCarousel({
        flankingItems: 3                });

    $('#prev').bind('click', function () {
        carousel.prev();
        return false
    });

    $('#next').bind('click', function () {
        carousel.next();
        return false;
    });
});

//登录框出现效果
$(function () {
    $('.login a,#login-chart').click(function () {

        $('#login-box,.overlay').fadeIn();


        return false;

    });
    $('#login-box span').click(function () {
        $('#login-box, .overlay').fadeOut();
    });
})