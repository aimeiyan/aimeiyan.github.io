var fix_offset = $('#fixed-part').offset();

    $('#down-scroll .begin').click(function () {
        $('html, body').animate({scrollTop: $('#fixed-part').offset().top - 1});
    });

    $(window).scroll(function (e) {
        var top = $(window).scrollTop();

        var $fixed = $('#fixed-part');
        if (top >= fix_offset.top) {
            if (!$fixed.hasClass('fixed')) {
                $fixed.addClass('fixed');
                $fixed.after('<div id="fixed-height"></div>');
                $('#fixed-height').height($fixed.height());
            }
        } else {
            $fixed.removeClass('fixed');
            $('#fixed-height').remove();
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
