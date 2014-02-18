/**
 * Created with IntelliJ IDEA.
 * User: nancy
 * Date: 12/19/13
 * Time: 12:41 PM
 * To change this template use File | Settings | File Templates.
 */

$(function(){
    $("#nav li").hover(function(){
        $(this).find(".jnNav").show();
    },function(){
        $(this).find(".jnNav").hide();
    })
});

