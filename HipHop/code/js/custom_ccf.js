$(function () {
    //主页面底部导航高亮效果
    $('.bnav .bnav-tab').tap(function () {
        $('.bnav .bnav-tab').removeClass("bnav-active");
        $(this).addClass("bnav-active");
    });


    //右上角头像弹出框效果
    $(".theader .right-portrait .head-img").tap(function (e) {
        e.stopPropagation();
        var $this = $(this);
        var $parent = $this.parent();
        if ($parent.hasClass("open")) {
            $parent.removeClass("open");
        } else {
            $parent.addClass("open");
        }
    });

    //点击空白处隐藏右上角头像弹出框
    $(document).off("tap");
    $(document).on("tap", function (e) {
//        console.log(e.target, "e----");
        var $topRightHead = $(".theader .right-portrait .head-img");
        var $headParent = $topRightHead.parent();

        if (e.target.className === "head-img") return;

        if ($headParent.hasClass("open")) {
            $headParent.removeClass("open");
        }
    });


});
