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
    });


    // 控制课程类型和时间安排内容的出现和消失
    var $courseTypeOverlay = $(".course-type,.overlay");
    var $timeArrangementOverlay = $(".time-arrangement,.overlay");

    // 课程类型出现
    $(".switch-course-type").tap(function () {
        $courseTypeOverlay.removeClass("slideInUp animated");
        $courseTypeOverlay.addClass("slideInDown animated");
//        setTimeout(function(){
//            $("body").scrollTop(0);
//        },1000)
    });

    // 课程类型消失
    $(".course-type").tap(function () {
        $courseTypeOverlay.removeClass("slideInDown animated");
        $courseTypeOverlay.addClass("slideInUp animated");
    });


    // 课程类型页面点击选择项
    $(".course-type .course-type-img").tap(function (e) {
        console.log("课程类型页面点击选择项");
        event.stopPropagation();
    });

    // 时间安排出现
    $(".switch-time-arrangement").tap(function () {
        $timeArrangementOverlay.removeClass("slideInUp animated");
        $timeArrangementOverlay.addClass("slideInDown animated");
//        $("body").scrollTop(0);
    });

    // 时间安排消失
    $(".time-arrangement").tap(function () {
        $timeArrangementOverlay.removeClass("slideInDown animated");
        $timeArrangementOverlay.addClass("slideInUp animated");
    });

    // 时间安排页面选项点击高亮
    // 上课日期
    $(".course-date-list a").tap(function (e) {
        event.stopPropagation();
        $(".course-time-list li").removeClass("active");  //去掉时间安排选项

        var $this = $(this);
        var $parent = $this.parent();

        if ($parent.hasClass("active")) {
            $this.parent().removeClass("active");
        } else {
            $this.parent().addClass("active");
            setTimeout(function(){
                location.href="oneDayTimetable.html";
            },100);
        }

    });

    //授课时间
    $(".course-time-list a").tap(function (e) {
        event.stopPropagation();
        $(".course-date-list .course-date-text-wrp").removeClass("active");  //去掉上课日期选项
        var $this = $(this);
        var $parent = $this.parent();
        if ($parent.hasClass("active")) {
            $this.parent().removeClass("active");
        } else {
            $this.parent().addClass("active");
            setTimeout(function(){
                location.href="hourTimetable.html";
            },100);
        }
    });

});
