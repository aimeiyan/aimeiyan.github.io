/**
 * Created with IntelliJ IDEA.
 * User: nancy
 * Date: 12/21/13
 * Time: 1:31 PM
 * To change this template use File | Settings | File Templates.
 */
$(function () {
    var x = 10;
    var y = 20;
    $("a.tooltip").mouseover(function (e) {
        this.mytitle = this.title;
        this.title = "";
        var tooltip = "<div id='tooltip'>" + this.mytitle + "</div>";
        $("body").append(tooltip)
        $("#tooltip").css(
            {"top": (e.pageY + y) + "px",
                "left": (e.pageX + x) + "px"
            }).show("fast")
    }).mouseout(function () {
            this.title = this.mytitle;
            $("#tooltip").remove()
        }).mousemove(function (e) {
            $("#tooltip").css(
                {"top": (e.pageY + y) + "px",
                    "left": (e.pageX + x) + "px"
                })
        })
})