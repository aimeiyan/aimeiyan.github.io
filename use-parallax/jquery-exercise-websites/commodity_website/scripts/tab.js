/**
 * Created with IntelliJ IDEA.
 * User: nancy
 * Date: 12/21/13
 * Time: 9:05 PM
 * To change this template use File | Settings | File Templates.
 */

$(function () {
    var log = false;
    $("#introduce .introTab li").click(function () {
        log = true;
        $(this).addClass("appearence").siblings().removeClass("appearence");
        var index = $("#introduce .introTab li").index(this)
        $("#introduce .introContent>div").eq(index).show().siblings().hide();
    })
})