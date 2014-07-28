var fix_offset = $('#fixed-part').offset();

$('#down-scroll .begin').click(function () {
    $('html, body').animate({scrollTop: $('#fixed-part').offset().top - 1});
});

$(window).scroll(function (e) {
    var top = $(window).scrollTop();

    if (top >= fix_offset.top) {
        $('#fixed-part').addClass('fixed');
    } else {
        $('#fixed-part').removeClass('fixed');
    }

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
});