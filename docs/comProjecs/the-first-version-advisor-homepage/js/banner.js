//焦点图效果
(function () {
    var $images = $('#background .stretch'),
        pic_id = 100000,
        timer_id = 0;

    var switch_to_pic = function () {

        $images.hide();
        $($images[pic_id % $images.length]).fadeIn(500);

        timer_id = setTimeout(function () {
            pic_id++;
//            switch_to_pic();
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

var fix_offset = $('#fixed-part').offset();

$('#down-scroll .begin').click(function () {
    $('html, body').animate({scrollTop: $('#fixed-part').offset().top - 1});
});


