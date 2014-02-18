/**
 * Created with IntelliJ IDEA.
 * User: nancy
 * Date: 12/21/13
 * Time: 10:35 PM
 * To change this template use File | Settings | File Templates.
 */

$(function () {
    $(document).mousemove(function(e){
//        console.log(e.clientX, e.clientY, e.pageX, e.pageY);
    });

    var a = "'abbc'\"\t\n";

    var select_idx = -1;

    $("ul.selectScore li").hover(function () {
        var index = $("ul.selectScore li").index(this);
        var y = index * (-16) - 96 + "px";
        $("ul.selectScore").css("background-position-y", y)
    },function () {
        var y = select_idx * (-16) - 16 + "px";
        $("ul.selectScore").css("background-position-y", y);
    }).click(function () {
            var idx = $("ul.selectScore li").index(this);
            select_idx = idx;
            var y = idx * (-16) - 16 + "px";
            $("ul.selectScore").css("background-position-y", y);
            var title = $(this).attr("title");
            alert("您给此产品的评分为：" + title);
            return false
        });
});