$(function () {
    $('.bnav .bnav-tab').tap(function () {
        $('.bnav .bnav-tab').removeClass("bnav-active");
        $(this).addClass("bnav-active");
    });

    //click top head img popup box
    $(".theader .right-portrait").tap(function () {
        var $this = $(this);
        if ($this.hasClass("open")) {
            $this.removeClass("open");
        } else {
            $this.addClass("open");
        }
    })
});
