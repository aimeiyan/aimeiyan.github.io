/**
 * Created with IntelliJ IDEA.
 * User: nancy
 * Date: 12/17/13
 * Time: 10:05 PM
 * To change this template use File | Settings | File Templates.
 */
$(function () {
//        $(".fore1").hover(function () {
//            $(this).parent().find(".detail").slideToggle(100);
//        }, function () {
//            $(this).parent().find(".detail").hide(100);
//        })
    $(document).ready(function () {
        $('.item').mousemove(function () {
            $(this).find(".detail").show();
//                $(this).find('h3').addClass('hover');
        });
        $('.item').mouseleave(function () {
            $(this).find(".detail").hide(100);
//                $(this).find('h3').removeClass('hover');
        });
    });
})