/**
 * Created with IntelliJ IDEA.
 * User: nancy
 * Date: 12/22/13
 * Time: 3:10 PM
 * To change this template use File | Settings | File Templates.
 */

$(function(){
    $("#imgList li a").bind("click",function(){
        var imgsrc=$(this).find("img").attr("src");
        var idx=imgsrc.lastIndexOf(".");
        var endImgSrc=imgsrc.substring(idx);
        var preImgSrc=imgsrc.substring(0,idx);
        var zoomImgSrc=preImgSrc+"_big"+endImgSrc;
        console.log("imgsrc=",imgsrc,"preImgSrc=",preImgSrc,"endImgSrc",endImgSrc,"zoomImgSrc=",zoomImgSrc)
        $("#zoomPicGlass a").attr("href",zoomImgSrc)
    })
})
