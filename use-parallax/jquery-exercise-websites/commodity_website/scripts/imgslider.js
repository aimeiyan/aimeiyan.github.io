/**
 * Created with IntelliJ IDEA.
 * User: nancy
 * Date: 12/21/13
 * Time: 4:33 PM
 * To change this template use File | Settings | File Templates.
 */
$(function(){
    $("#jnBrandTab li a").click(function(){
        $(this).parent().addClass("chos").siblings().removeClass("chos");
        var index=$("#jnBrandTab li a").index(this);
        showBrandList(index);
        return false
    }).eq(0).click();
    function showBrandList(index){
        var width=$("#jnBrandContent").width();
        console.log(width);
        console.log(index);
        $("#jnBrandContent ul").stop(true,false).animate({"left":-width*index},1000)}

})