/**
 * Created with IntelliJ IDEA.
 * User: nancy
 * Date: 12/22/13
 * Time: 3:45 PM
 * To change this template use File | Settings | File Templates.
 */

$(function () {
    $("#detailSort .selectColor a").click(function () {
        var switchCol = $(this).find("img").attr("alt");
        $("#detailSort .switchColor").text(switchCol);
        var thissrc = $(this).find("img").attr("src");
        var idx = thissrc.lastIndexOf('.');
        var preImgsrc = thissrc.substring(0, idx);
        console.log(preImgsrc);
        var unit = thissrc.substring(idx);
        var imgBigSrc = preImgsrc + "_one_small" + unit;
        var imgZoomSrc = preImgsrc + "_one_big" + unit;
        console.log(imgBigSrc, '+++++++=');
        console.log(imgZoomSrc, '+++++++=');
        $("#bigImg").attr("src", imgBigSrc);
        $(".jqzoomWrap .jnzoom").attr("href", imgZoomSrc);
        var newImgSrc = preImgsrc.replace("images/pro_img/", "");
        console.log(newImgSrc, '------------');
        $("#imgList li").hide();
        $("#imgList").find("." + newImgSrc + "_hideImg").show();
        $("#imgList").find("." + newImgSrc + "_hideImg").eq(0).find("a").click()


//        $("#imgList li img[src*='images/pro_img/yellow']")
    })

})
