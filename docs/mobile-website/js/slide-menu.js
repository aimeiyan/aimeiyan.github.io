/**
 * Created by Bingluo on 6/17/2014.
 */
$(function () {
    $("aside.slide_menu").on("touchstart", "a", function () {
        $(this).addClass("current").siblings("a").removeClass("current");
    });
    $("#container a.menu").on("click", function (a) {
        a.preventDefault();
        $(".slide_menu").show();
        $("#container").toggleClass("show");
    })
});



