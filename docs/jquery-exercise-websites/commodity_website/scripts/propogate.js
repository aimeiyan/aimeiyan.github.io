/**
 * Created with IntelliJ IDEA.
 * User: nancy
 * Date: 12/21/13
 * Time: 10:06 AM
 * To change this template use File | Settings | File Templates.
 */

$(function () {
    var index = 0;
    $("#imagecontrol a").mouseover(function(){
        console.log($(this),'----------');
        console.log($("#imagecontrol a"),'+++++++++++');
        index=$("#imagecontrol a").index(this);
        console.log(this,'###########');
        showImg(index)
    }).eq(0).mouseover();

    function showImg(index){
        $("#imagelist li").eq(index).stop(true,true).fadeIn().siblings().fadeOut();
        $("#imagecontrol a").removeClass("chos").eq(index).addClass("chos")
    }
})